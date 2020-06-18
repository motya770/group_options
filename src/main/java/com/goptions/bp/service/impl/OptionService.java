package com.goptions.bp.service.impl;

import com.goptions.bp.core.job.option.CloseOptionJob;
import com.goptions.bp.core.job.option.OpenOptionJob;
import com.goptions.bp.core.job.option.StartOptionTradeJob;
import com.goptions.bp.core.job.position.OpenPositionJob;
import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.core.manager.IOptionManager;
import com.goptions.bp.core.manager.scheduler.ISchedulerManager;
import com.goptions.bp.dao.IOptionDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.bactivity.BActivityType;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;
import com.goptions.bp.model.option.*;
import com.goptions.bp.model.option.creator.OptionCreator;
import com.goptions.bp.model.option.creator.OptionMask;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.position.PositionStatus;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.*;
import com.goptions.bp.utils.DateUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class OptionService implements IOptionService {

    private static final Logger logger = LoggerFactory.getLogger(OptionService.class);

    @Autowired
    private IOptionDao optionDao;

    @Autowired
    private IOptionManager optionManager;

    @Autowired
    private ISchedulerManager schedulerManager;

    @Autowired
    private IPositionService positionService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IBActivityService activityService;

    @Autowired
    private IAssetService assetService;

    @Autowired
    private ICurrencySettingService currencySettingService;

    @Autowired
    @Qualifier(value = "hedgeExecutor")
    private ThreadPoolTaskExecutor hedgeExecutor;

    private TransactionTemplate transactionTemplate;

    @Autowired
    public void setTransactionManager(HibernateTransactionManager transactionManager) {
        transactionTemplate = new TransactionTemplate(transactionManager);
        transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    @Override
    public OptionMask buildMaskOption(Asset asset, DateTime bidStartTime, DateTime tradeStartTime,
                                      DateTime tradeEndTime, OptionType optionType) {
        OptionMask optionMask = new OptionMask();
        optionMask.setAsset(asset);
        optionMask.setBidStartTime(bidStartTime);
        optionMask.setTradeStartTime(tradeStartTime);
        optionMask.setTradeEndTime(tradeEndTime);
        ///optionMask.setBidAmountType(bidAmountType);
        optionMask.setOptionType(optionType);

        return optionMask;
    }

    @Override
    public List<OpenOptionHolder> getOpenOptionsMap(OptionType optionType) throws GOptionsException{

        if(optionType==null){
            throw new GOptionsException("OptionType can't be null");
        }

        //0 means MAX_PAGE_SIZE

        Currency currency = null;
        AccountDetails accountDetails = accountService.getCurrentAccount();
        if (accountDetails != null) {
            currency = accountDetails.getAccount().getCurrency();
        }

        if (currency == null) {
            //should show default values for usd
            currency = currencySettingService.getDefaultCurrency();
        }

        long start = System.currentTimeMillis();
        List<Option> openOptions = getOpenOptions(0, currency, optionType, null);
        System.out.println("dbr: " + (System.currentTimeMillis() - start));

        //assetExternalId
        Map<Asset, OpenOptionHolder> sorted = new TreeMap<>();

        openOptions.forEach((o) -> {
            OpenOptionHolder holder = sorted.get(o.getAsset());
            if (holder == null) {
                holder = new OpenOptionHolder(o.getAsset(), new ArrayList<>());

                sorted.put(o.getAsset(), holder);
            }

            holder.addOption(o);
        });

        List<OpenOptionHolder> holders = new ArrayList<>(sorted.values());
        if (holders.size() < 20) {
            holders = buildSimulationHolders(sorted, holders);
        }
        return holders;
    }

    private List<OpenOptionHolder> buildSimulationHolders(Map<Asset, OpenOptionHolder> mappedHolders,
                                                          List<OpenOptionHolder> holders) {
        //TODO write method
        List<Asset> assets = assetService.listAllActive();

        assets.forEach((asset) -> {
            //if empty
            if (mappedHolders.get(asset) == null) {
                OpenOptionHolder holder = new OpenOptionHolder(asset, new ArrayList<Option>(), true);
                holders.add(holder);
            }
        });

        return holders;
    }

    @Override
    public Option read(Long id) {
        return optionDao.read(id);
    }


    @Override
    public boolean delete(Option entity) {
        return optionDao.delete(entity);
    }

    @Override
    public void update(Option entity) throws GOptionsException {
        validateTimes(entity.getBidStartTime(), entity.getTradeStartTime(), entity.getTradeEndTime());
        optionDao.update(entity);
    }

    @Override
    public List<Option> getAllOptions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(Option.class);
        buildAdminOptionCriteria(criteria, params);
        //criteria.add(Restrictions.or(Restrictions.eq(Option.F_OPTION_STATUS, OptionStatus.CREATED), Restrictions.eq(Option.F_OPTION_STATUS, OptionStatus.OPENED)));
        criteria.addOrder(Order.desc(Option.F_BID_START_TIME));
        return optionDao.list(criteria, pageNumber);
    }


    @Override
    public List<Option> getOpenOptions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException{
        return this.getOpenOptions(pageNumber, null, null, params);
    }


    @Override
    public List<Option> getOpenOptions(Integer pageNumber, Currency currency) throws GOptionsException{
        return this.getOpenOptions(pageNumber, currency, null, null);
    }

    @Override
    public List<Option> getOpenOptions(Integer pageNumber, Currency currency, OptionType optionType,
                                       Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(Option.class);
        //TODO copy paste TO getAlOpenPositions

        buildAdminOptionCriteria(criteria, params);

        long now = System.currentTimeMillis();
        criteria.add(Restrictions.or(
                Restrictions.and(
                    Restrictions.eq(Option.F_OPTION_STATUS, OptionStatus.CREATED),
                    Restrictions.ge(Option.F_BID_START_TIME, now)),
                Restrictions.and(
                        Restrictions.eq(Option.F_OPTION_STATUS, OptionStatus.OPENED),
                        Restrictions.ge(Option.F_TRADE_START_TIME, now)
                )

        ));

        //criteria.add(Restrictions.ge(Option.F_TRADE_END_TIME, now));

        AccountDetails accountDetails = accountService.getCurrentAccount();
        if (accountDetails != null) {
            criteria.add(Restrictions.eq(Option.F_DEMO, accountDetails.getAccount().getDemo()));
        } else {
            criteria.add(Restrictions.eq(Option.F_DEMO, Boolean.FALSE));
        }

        if (currency != null) {
            criteria.add(Restrictions.eq(Option.F_CURRENCY, currency));
        }

        if(optionType != null){
            criteria.add(Restrictions.eq(Option.F_OPTION_TYPE, optionType));
        }

        criteria.addOrder(Order.asc(Option.F_BID_START_TIME));
        int openOptionsNumber = 400;
        return optionDao.list(criteria, openOptionsNumber, pageNumber);
    }

    @Override
    public Option cancelOption(Long id) throws GOptionsException {
        //TODO think about design

        long start  = System.currentTimeMillis();
        Option option = optionDao.read(id);

        System.out.println("c1 " + (System.currentTimeMillis() - start));
        if (option != null) {

            if(option.getOptionStatus() == OptionStatus.CANCELED){
                logger.info("Options " + option.getId() + " already canceled.");
                return option;
            }

            option.setOptionStatus(OptionStatus.CANCELED);

            schedulerManager.deleteEntityJob(OpenOptionJob.class, option);
            schedulerManager.deleteEntityJob(StartOptionTradeJob.class, option);
            schedulerManager.deleteEntityJob(CloseOptionJob.class, option);

            System.out.println("c2 " + (System.currentTimeMillis() - start));

            System.out.println("c3 " + (System.currentTimeMillis() - start));
            //cancel job
            List<Position> positions = option.getPositions();

            System.out.println("c4 " + (System.currentTimeMillis() - start));

            if(positions != null){
                for(Position position: positions){
                    //TODO use cancelPosition in positionService

                    if(position.getPositionStatus() == PositionStatus.REJECTED
                            || position.getPositionStatus() == PositionStatus.CANCELED){
                        logger.info("Can't cancel position " + position.getId() +
                                " because current position status is " + position.getPositionStatus());
                        continue;
                    }

                    position.setPositionStatus(PositionStatus.CANCELED);
                    position.setReturnedAmount(position.getInvestedAmount());

                    schedulerManager.deleteEntityJob(OpenPositionJob.class, position);
                    positionService.update(position);
                    eventManager.sendPositionUpdate(position);

                    System.out.println("c4.1 " + (System.currentTimeMillis() - start));

                    //Account account = accountService.read(position.getAccount().getId());

                    System.out.println(position.getId() + " " + position.getInvestedAmount());

                    accountService.updateBalance(position.getAccount(), position.getInvestedAmount());
                    eventManager.sendAccountUpdate(position.getAccount());

                    System.out.println("c4.2 " + (System.currentTimeMillis() - start));

                    try {
                        activityService.create(BActivityType.CANCEL_OPTION, position.getInvestedAmount(), option.getId(), position.getAccount());
                    } catch (Exception e) {
                        logger.error("Can't create balance activity for canceling option ", e);
                        throw new RuntimeException(e);
                    }

                    System.out.println("c4.3 " + (System.currentTimeMillis() - start));
                }
            }


            System.out.println("c5 " + (System.currentTimeMillis() - start));

            update(option);
            eventManager.sendOptionUpdate(option);

            System.out.println("c6 " + (System.currentTimeMillis() - start));
        }

        return option;
    }

    @Override
    public OptionConfigHolder getCurrencyConfigHolder(Currency currency) {

        CurrencySetting currencySetting = currencySettingService.find(currency);

        OptionConfigHolder optionConfigHolder = new OptionConfigHolder();
        OptionConfiguration configuration = new OptionConfiguration();

        //TODO move to currency settings
        configuration.setProfitPercent(new BigDecimal(80));
        configuration.setLossInsurance(new BigDecimal(0));

        configuration.setMinLimitation(currencySetting.getMinBid());
        configuration.setMaxLimitation(currencySetting.getMaxBid());

        optionConfigHolder.setOptionConfiguration(configuration);
        return optionConfigHolder;
    }

    private void buildAdminOptionCriteria(DetachedCriteria criteria, Map<String, String[]> params)
            throws GOptionsException{

        if(params == null){
            return;
        }

        try {
            String[] bidStartFromArr = params.get(Option.F_BID_START_TIME + "From");
            if (bidStartFromArr != null && !StringUtils.isEmpty(bidStartFromArr[0])) {
                long bidTime = DateUtils.parse(bidStartFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Option.F_BID_START_TIME, bidTime));
            }

            String[] bidStartToArr = params.get(Option.F_BID_START_TIME + "To");
            if (bidStartToArr != null && !StringUtils.isEmpty(bidStartToArr[0])) {
                long bidTime = DateUtils.parse(bidStartToArr[0]).getTime();
                criteria.add(Restrictions.le(Option.F_BID_START_TIME, bidTime));
            }

            String[] tradeStartFromArr = params.get(Option.F_TRADE_START_TIME + "From");
            if (tradeStartFromArr != null && !StringUtils.isEmpty(tradeStartFromArr[0])) {
                long tradeStartTime = DateUtils.parse(tradeStartFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Option.F_TRADE_START_TIME, tradeStartTime));
            }

            String[] tradeStartToArr = params.get(Option.F_TRADE_START_TIME + "To");
            if (tradeStartToArr != null && !StringUtils.isEmpty(tradeStartToArr[0])) {
                long tradeStartTime = DateUtils.parse(tradeStartToArr[0]).getTime();
                criteria.add(Restrictions.le(Option.F_TRADE_START_TIME, tradeStartTime));
            }

            String[] tradeEndFromArr = params.get(Option.F_TRADE_END_TIME + "From");
            if (tradeEndFromArr != null && !StringUtils.isEmpty(tradeEndFromArr[0])) {
                long tradeEndTime = DateUtils.parse(tradeEndFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Option.F_TRADE_END_TIME, tradeEndTime));
            }

            String[] tradeEndToArr = params.get(Option.F_TRADE_END_TIME + "To");
            if (tradeEndToArr != null && !StringUtils.isEmpty(tradeEndToArr[0])) {
                long tradeEndTime = DateUtils.parse(tradeEndToArr[0]).getTime();
                criteria.add(Restrictions.le(Option.F_TRADE_END_TIME, tradeEndTime));
            }

            String[] optionStatusArr = params.get(Option.F_OPTION_STATUS);
            if (optionStatusArr != null && !StringUtils.isEmpty(optionStatusArr[0])) {
                criteria.add(Restrictions.eq(Option.F_OPTION_STATUS, OptionStatus.valueOf(optionStatusArr[0])));
            }

            String[] optionTypeArr = params.get(Option.F_OPTION_TYPE);
            if (optionTypeArr != null && !StringUtils.isEmpty(optionTypeArr[0])) {
                criteria.add(Restrictions.eq(Option.F_OPTION_TYPE, OptionType.valueOf(optionTypeArr[0])));
            }

        }catch (Exception e){
            logger.error("Parsing error", e);
            throw new GOptionsException("Parsing error");
        }
    }

    @Override
    public List<Option> getFutureGeneratedOptions(OptionCreator optionCreator, Integer pageNumber) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Option.class);
        criteria.add(Restrictions.eq(Option.F_OPTION_CREATOR_ID, optionCreator.getId()));
        criteria.add(Restrictions.gt(Option.F_BID_START_TIME, System.currentTimeMillis()));
        return optionDao.list(criteria, pageNumber);
    }

    @Override
    public Option findSameOption(Asset asset, Long bidStartTime, Long tradeStartTime, Long tradeEndTime, Boolean demo, OptionType optionType) {
         return optionDao.findSameOption(asset, bidStartTime, tradeStartTime, tradeEndTime, demo, optionType);
    }

    @Override
    public Option create(Asset asset, Long bidStartTime, Long tradeStartTime, Long tradeEndTime, Boolean demo,
                         Currency currency,
                         OptionConfigHolder optionConfigHolder,
                         OptionType optionType,
                         OptionCreator optionCreator) throws GOptionsException {

        long start = System.currentTimeMillis();

        if (asset == null) {
            throw new GOptionsException("Asset can't be null!");
        }
        if (optionConfigHolder == null || optionConfigHolder.getOptionConfiguration() == null) {
            throw new GOptionsException("Option creator and it's options configurations can't be null!");
        }

        if (currency == null) {
            throw new GOptionsException("Currency can't be null!");
        }

        if(optionType == null){
            throw new GOptionsException("OptionType can't be null!");
        }

        validateTimes(bidStartTime, tradeStartTime, tradeEndTime);

        System.out.println("g1 : " + (System.currentTimeMillis() - start));

        //TODO return this fragment
        Option sameOption = null;
        if(optionCreator==null) {
            //checked before generation
            sameOption = findSameOption(asset, bidStartTime, tradeStartTime, tradeEndTime, demo, optionType);
        }

        System.out.println("g2 : " + (System.currentTimeMillis() - start));

        if (sameOption != null) {
            logger.error("The same option already created {}", sameOption.getId());
            throw new GOptionsException("The same option already created: " + sameOption.getId());
        }

        final Option option = new Option();
        option.setAsset(asset);
        option.setBidStartTime(bidStartTime);
        option.setTradeStartTime(tradeStartTime);
        option.setTradeEndTime(tradeEndTime);
        option.setOptionConfiguration(optionConfigHolder.getOptionConfiguration());
        option.setOptionStatus(OptionStatus.CREATED);
        option.setDemo(demo);
        option.setCurrency(currency);
        option.setOptionCreator(optionCreator);
        option.setOptionType(optionType);
       //option.setBidAmountType(bidAmountType);

        transactionTemplate.execute(new TransactionCallback<Option>() {
            @Override
            public Option doInTransaction(TransactionStatus status) {
                return optionManager.createOption(option);
            }
        });

        logger.info("option creat time: " + (System.currentTimeMillis() - start));
        return option;
    }

    /*public void buildOption(){

    }*/

    private void validateTimes(Long bidStartTime, Long tradeStartTime, Long tradeEndTime) throws GOptionsException {
        if (bidStartTime == null || tradeStartTime == null || tradeEndTime == null) {
            throw new GOptionsException("Bid or Trade time can't be null!");
        }

        if (bidStartTime >= tradeEndTime) {
            throw new GOptionsException("Bid start can't be greater than trade end ");
        }

        if (tradeStartTime >= tradeEndTime) {
            throw new GOptionsException("Trade start can't be greater than trade end");
        }

        if (bidStartTime >= tradeStartTime) {
            throw new GOptionsException("Bid start  can't be greater that trade start");
        }
    }
}
