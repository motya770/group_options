package com.goptions.bp.service.impl;

import com.goptions.bp.dao.IEntityDao;
import com.goptions.bp.dao.IOptionCreatorDao;
import com.goptions.bp.dao.ITimeFrameDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionConfigHolder;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.model.option.creator.FramesContainer;
import com.goptions.bp.model.option.creator.OptionCreator;
import com.goptions.bp.model.option.creator.OptionMask;
import com.goptions.bp.model.option.creator.TimeFrame;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.IOptionCreatorService;
import com.goptions.bp.service.IOptionService;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;

/**
 * Created by matvei on 3/7/15.
 */
@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class OptionCreatorService implements IOptionCreatorService {

    private static final Logger logger = LoggerFactory.getLogger(OptionCreatorService.class);

    @Autowired
    private IOptionCreatorDao optionCreatorDao;

    @Autowired
    private IAssetService assetService;

    @Autowired
    private ITimeFrameDao timeFrameDao;

    @Autowired
    private IOptionService optionService;

    private TransactionTemplate transactionTemplate;

    private HibernateTransactionManager transactionManager;

    @Autowired
    @Qualifier(value = "hedgeExecutor")
    private ThreadPoolTaskExecutor hedgeExecutor;

    @Autowired
    @Qualifier(value = "transactionManager")
    public void setTransactionManager(HibernateTransactionManager transactionManager){
        this.transactionManager = transactionManager;
        transactionTemplate = new TransactionTemplate(transactionManager);
    }

    private DateTimeFormatter frameFormatter = DateTimeFormat.forPattern("HH:mm");


    @Override
    public void cancelGeneratedOption(Long creatorId) throws GOptionsException {
        long start = System.currentTimeMillis();
        OptionCreator optionCreator = optionCreatorDao.read(creatorId);
        if(optionCreator==null){
            throw new GOptionsException("Option creator with id " + creatorId + " not found.");
        }

        //TODO more options generated than options returned
        int page = 0;
        while (true){
            List<Option> options =  optionService.getFutureGeneratedOptions(optionCreator, page);
            options.forEach((option) -> {
                logger.debug("Canceling options " + option.getId() + " in batch");
                try {
                    optionService.cancelOption(option.getId());
                } catch (Exception e) {
                    logger.error("Can't cancel option with id: " + option.getId(), e);
                }
            });

            if(options.size() < IEntityDao.DEFAULT_PAGE_SIZE){
                break;
            }
            page++;
        }

        long end = (start - System.currentTimeMillis());
        logger.info("Canceling options for " + end);
    }


    @Override
    public List<Option> generateOptions(Long creatorId) throws GOptionsException {

        long start = System.currentTimeMillis();

        List<Option> options = new ArrayList<>();

        OptionCreator optionCreator = optionCreatorDao.read(creatorId);

        OptionType optionType = optionCreator.getOptionType();

        if(optionCreator==null){
            throw new GOptionsException("OptionCreator with id " + creatorId + " not found");
        }

        OptionConfigHolder optionConfigHolder  = optionService.getCurrencyConfigHolder(optionCreator.getCurrency());

        //BidAmountType[] bidAmountTypes = BidAmountType.values();

        List<OptionMask> masks = Collections.synchronizedList(new LinkedList<>());

        //optionCreator.getAssets().parallelStream().forEach(asset -> {
        for(Asset asset: optionCreator.getAssets()){
            final List<TimeFrame> frames = Collections.synchronizedList(optionCreator.getTimeFrames());
            for(TimeFrame frame: frames) {
                Callable<Object> callable = () -> {
                //Runnable runnable = () -> {
                    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                        @Override
                        protected void doInTransactionWithoutResult(TransactionStatus status) {
                            // try {
                            //frames.parallelStream().forEach(frame->{

                            //for (BidAmountType bidType : bidAmountTypes) {
                                logger.info("preparing to generate for " + asset.getName() + " " + frame.toString() + " " + optionType.name());

                                DateTime bidStartTime = frameFormatter.parseLocalTime(frame.getBidStart()).toDateTimeToday();
                                DateTime tradeStartTime = frameFormatter.parseLocalTime(frame.getTradeStart()).toDateTimeToday();
                                DateTime tradeEndTime = frameFormatter.parseLocalTime(frame.getTradeEnd()).toDateTimeToday();

                                bidStartTime = bidStartTime.withZoneRetainFields(DateTimeZone.UTC);
                                tradeStartTime = tradeStartTime.withZoneRetainFields(DateTimeZone.UTC);
                                tradeEndTime = tradeEndTime.withZoneRetainFields(DateTimeZone.UTC);

                                logger.info("parsed: " + bidStartTime);

                                DateTime now = DateTime.now();
                                now = now.withZoneRetainFields(DateTimeZone.UTC);

                                logger.info("now: " + now);

                                if (now.isBefore(bidStartTime) && now.isBefore(tradeStartTime) && now.isBefore(tradeEndTime)) {

                                    long optionsFind = System.currentTimeMillis();
                                    Option sameOption = optionService.findSameOption(asset, bidStartTime.getMillis(), tradeStartTime.getMillis(),
                                            tradeEndTime.getMillis(), optionCreator.isDemo(),
                                            optionType);
                                    logger.info("findOptions time: " + (System.currentTimeMillis() - optionsFind));
                                    if (sameOption == null) {
                                        OptionMask optionMask = optionService.buildMaskOption(asset,
                                                bidStartTime,
                                                tradeStartTime,
                                                tradeEndTime,
                                                optionType);

                                        masks.add(optionMask);
                                    } else {
                                        logger.error("Same option found, decided not to generate.");
                                    }

                                } else {
                                    logger.warn("Decided not generate option because it's too late. Now {}, " +
                                            "BidStart {}, TradeStart {}, TradeEnd {} " + now + " " + bidStartTime + " "
                                            + tradeStartTime + " " + tradeEndTime);
                                }
                            }
                       // }

                        /*} catch (GOptionsException e) {
                            throw new RuntimeException(e);
                        }*/

                    });
                    return new Object();
                };
                Future<Object> future = hedgeExecutor.submit(callable);
                try {
                    future.get();
                }catch (Exception e){
                    logger.error("Error executing callable", e);
                }
            }

            //});
        }

        //masks.parallelStream().forEach(mask->{
        synchronized (masks) {
            //masks.parallelStream().forEach(mask->{
            for (OptionMask mask : masks) {
                try {
                    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                        @Override
                        protected void doInTransactionWithoutResult(TransactionStatus status) {
                            try {
                                logger.info("generating for " + mask.getAsset().getName() + " " + mask.getBidStartTime()
                                        + " " + mask.getOptionType().name());
                                optionService.create(mask.getAsset(), mask.getBidStartTime().getMillis(),
                                        mask.getTradeStartTime().getMillis(),
                                        mask.getTradeEndTime().getMillis(),
                                        optionCreator.isDemo(),
                                        optionCreator.getCurrency(),
                                        optionConfigHolder, mask.getOptionType(), optionCreator);

                            } catch (GOptionsException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    logger.error("error generation option", e);
                }
            }
            //});
        }
        //});

        logger.info("GENERATING FOR SECONDS: " +  ((int)((System.currentTimeMillis() - start)/1000)));

        return options;
    }

    @Override
    public List<OptionCreator> getAllCreators() {
        DetachedCriteria criteria = DetachedCriteria.forClass(OptionCreator.class);
        criteria.addOrder(Order.desc(BaseEntity.F_DATE_CREATED));
        return optionCreatorDao.list(criteria);
    }

    @Override
    public OptionCreator read(Long id) {
        OptionCreator creator = optionCreatorDao.read(id);
        return creator;
    }

    @Override
    public OptionCreator update(Long id, FramesContainer framesContainer) throws GOptionsException {

        if(id==null){
            throw new GOptionsException("Option creator id can't be empty");
        }

        OptionCreator optionCreator = buildOptionCreator(framesContainer);
        optionCreator.setId(id);
        optionCreatorDao.update(optionCreator);
        return optionCreator;
    }

    @Override
    public OptionCreator create(FramesContainer container) throws GOptionsException {
        OptionCreator optionCreator = buildOptionCreator(container);
        optionCreatorDao.save(optionCreator);
        return optionCreator;
    }

    private OptionCreator buildOptionCreator(FramesContainer container)throws GOptionsException{
        String name = container.getName();
        Long[] assetsIds = container.getAssets();
        List<TimeFrame> timeFrames = container.getTimeFrames();

        if (StringUtils.isEmpty(name)) {
            throw new GOptionsException("name can't be null");
        }

        if(assetsIds==null || assetsIds.length == 0){
            throw new GOptionsException("assetsIds can't be null or empty");
        }

        if (timeFrames == null || timeFrames.size() == 0) {
            throw new GOptionsException("timeFrames can't be null or empty");
        }

        Currency currency = container.getCurrency();
        if(currency==null){
            throw new GOptionsException("Currency can't be null");
        }

        Boolean demo = container.getDemo();
        if(demo==null){
            throw new GOptionsException("Demo is null");
        }

        OptionType optionType = container.getOptionType();
        if(optionType == null){
            throw new GOptionsException("Option Type is null");
        }

        for(TimeFrame frame: timeFrames){

            String bidStart = frame.getBidStart();
            String tradeStart = frame.getTradeStart();
            String tradeEnd = frame.getTradeEnd();

            logger.debug("adding frame " + bidStart + " " + tradeStart + " " + tradeEnd);

            if(StringUtils.isEmpty(bidStart)){
                throw new GOptionsException("Frame bidStart can't be empty");
            }

            if(StringUtils.isEmpty(tradeStart)){
                throw new GOptionsException("Frame tradeStart can't be empty");
            }

            if(StringUtils.isEmpty(tradeEnd)){
                throw new GOptionsException("Frame tradeEnd can't be empty");
            }

            DateTime bidStartTime = frameFormatter.parseLocalTime(bidStart).toDateTimeToday();
            DateTime tradeStartTime = frameFormatter.parseLocalTime(tradeStart).toDateTimeToday();
            DateTime tradeEndTime = frameFormatter.parseLocalTime(tradeEnd).toDateTimeToday();

            if(!bidStartTime.isBefore(tradeStartTime)){
                throw new GOptionsException("Bid time should be before trade start time.");
            }

            if(!tradeStartTime.isBefore(tradeEndTime)){
                throw new GOptionsException("Trade start time should be before trade end time");
            }
        }

        //timeFrames.sort(Comparator.comparing(timeFrame -> frameFormatter.parseLocalTime(fist.getBidStart())  ));


         Collections.sort(timeFrames, new Comparator<TimeFrame>() {
               @Override
               public int compare(TimeFrame fist, TimeFrame second) {

                   DateTime firstBidStart = frameFormatter.parseLocalTime(fist.getBidStart()).toDateTimeToday();
                   DateTime secondBidStart = frameFormatter.parseLocalTime(second.getBidStart()).toDateTimeToday();

                   return firstBidStart.compareTo(secondBidStart);
               }
         });

        timeFrames.forEach((frame)->{
            timeFrameDao.save(frame);
        });

        Set<Asset> assets = new TreeSet<>();
        for (Long assetId : assetsIds) {
            Asset asset = assetService.read(assetId);
            assets.add(asset);
        }

        OptionCreator optionCreator = new OptionCreator();
        optionCreator.setName(name);
        optionCreator.setAssets(new ArrayList<>(assets));
        optionCreator.setTimeFrames(timeFrames);
        optionCreator.setCurrency(currency);
        optionCreator.setDemo(demo);
        optionCreator.setOptionType(optionType);

        return optionCreator;
    }



    @Override
    public void delete(OptionCreator optionCreator) {
        optionCreatorDao.delete(optionCreator);
    }
}
