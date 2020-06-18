package com.goptions.bp.service.impl;

import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.core.manager.IPositionManager;
import com.goptions.bp.dao.impl.PositionDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.bactivity.BActivityType;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionStatus;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.position.PositionDirection;
import com.goptions.bp.model.position.PositionOutcome;
import com.goptions.bp.model.position.PositionStatus;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.*;
import com.goptions.bp.utils.DateUtils;
import org.hibernate.FetchMode;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional(value = "transactionManager")
public class PositionService implements IPositionService {

    private static final Logger logger = LoggerFactory.getLogger(PositionService.class);

    private TransactionTemplate transactionTemplate;

    @Autowired
    public void setTransactionManager(HibernateTransactionManager transactionManager) {
        transactionTemplate = new TransactionTemplate(transactionManager);
    }

    @Autowired
    private PositionDao positionDao;

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IPositionManager positionManager;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IBActivityService activityService;

    @Autowired
    private IOptionService optionService;

    @Autowired
    private IQuotesService quotesService;

    @Autowired
    private IAssetService assetService;




    private Position buildHedgePosition(Option option, Quote quote, PositionDirection direction,
                                        Long openTime, BigDecimal investedAmount) {

        long start = System.currentTimeMillis();

        Position position = new Position();
        position.setOption(option);
        position.setInvestedAmount(investedAmount);
        position.setOpenPrice(quote.getValue());
        position.setOpenTime(openTime);
        position.setPositionDirection(direction);
        position.setAccount(accountService.getBankAccount());

        System.out.println("build position " + (System.currentTimeMillis() - start));

        return position;
    }

    @Override
    public List<Position> getAllOptionOpenPositions() throws GOptionsException {

        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);

        //TODO test
        criteria.setFetchMode("option", FetchMode.SELECT);
        criteria.setFetchMode("asset", FetchMode.SELECT);

        criteria.createAlias("option", "option");

        long now = System.currentTimeMillis();

        criteria.add(Restrictions.eq("option." + Option.F_OPTION_STATUS, OptionStatus.OPENED));
        criteria.add(Restrictions.le("option." + Option.F_BID_START_TIME, now));
        criteria.add(Restrictions.ge("option." + Option.F_TRADE_END_TIME, now));

        //TODO think about adding index to database
        criteria.add(Restrictions.or(
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.OPENED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.IN_TRADE)));
        criteria.addOrder(Order.asc(Position.F_OPTION_ID));

        return positionDao.getAll(criteria);
    }

    @Override
    public List<Position> getUnfinishedPositions(){
        Account account = accountService.getCurrentAccount().getAccount();
        DetachedCriteria criteria = getUnfinishedPositionCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, account.getId()));
        return positionDao.list(criteria);
    }

    @Override
    public List<Position> getAdminUnfinishedPositions(Map<String, String[]> params) throws GOptionsException{
       DetachedCriteria criteria = getUnfinishedPositionCriteria();
       buildAdminPositionCriteria(criteria, params);
       return positionDao.list(criteria);
    }

    private DetachedCriteria getUnfinishedPositionCriteria(){
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);
        criteria.createAlias("option", "option");
        criteria.add(Restrictions.lt("option." + Option.F_TRADE_END_TIME, System.currentTimeMillis()));
        criteria.add(Restrictions.not(
                Restrictions.or(
                        Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CLOSED),
                        Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CANCELED),
                        Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.REJECTED))
                ));
        return criteria;
    }

    @Override
    public Position read(Long id) {
        return positionDao.read(id);
    }

    @Override
    public BigDecimal getAccountPl(Account account) {
        BigDecimal accountPl = positionDao.getAccountPl(account);
        if(accountPl==null){
            accountPl = new BigDecimal("0");
        }
        return accountPl;
    }

    @Override
    public List<Position> getPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);

        buildAdminPositionCriteria(criteria, params);

        criteria.addOrder(Order.desc(Position.F_OPEN_TIME));
        return positionDao.list(criteria, pageNumber);
    }

    private void buildAdminPositionCriteria(DetachedCriteria criteria, Map<String, String[]> params) throws GOptionsException{
        try {

            String[] openTimeFromArr = params.get(Position.F_OPEN_TIME + "From");
            if(openTimeFromArr != null && !StringUtils.isEmpty(openTimeFromArr[0])){
                long openTime = DateUtils.parse(openTimeFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Position.F_OPEN_TIME, openTime));
            }

            String[] openTimeToArr = params.get(Position.F_OPEN_TIME + "To");
            if(openTimeToArr != null && !StringUtils.isEmpty(openTimeToArr[0])) {
                //System.out.println("ota: " + openTimeToArr[0]);
                long openTime =  DateUtils.parse(openTimeToArr[0]).getTime();
                criteria.add(Restrictions.le(Position.F_OPEN_TIME, openTime));
            }

            String[] closeTimeFromArr = params.get(Position.F_CLOSE_TIME + "From");
            if(closeTimeFromArr != null && !StringUtils.isEmpty(closeTimeFromArr[0])){
                long closeTime =  DateUtils.parse(closeTimeFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Position.F_CLOSE_TIME, closeTime));
            }

            String[] closeTimeToArr = params.get(Position.F_CLOSE_TIME + "To");
            if(closeTimeToArr!=null && !StringUtils.isEmpty(closeTimeToArr[0])) {
                long closeTime =  DateUtils.parse(closeTimeToArr[0]).getTime();
                criteria.add(Restrictions.le(Position.F_CLOSE_TIME, closeTime));
            }

            String[] accountIdArr = params.get(Position.F_ACCOUNT_ID);
            if(accountIdArr != null && !StringUtils.isEmpty(accountIdArr[0])) {
                criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, Long.parseLong(accountIdArr[0])));
            }

            String[] positionStatusArr = params.get(Position.F_POSITION_STATUS);
            if(positionStatusArr!=null && !StringUtils.isEmpty(positionStatusArr[0])){
                criteria.add(Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.valueOf(positionStatusArr[0])));
            }

            String[] positionOutcomeArr = params.get(Position.F_POSITION_OUTCOME);
            if(positionOutcomeArr != null && !StringUtils.isEmpty(positionOutcomeArr[0])){
                criteria.add(Restrictions.eq(Position.F_POSITION_OUTCOME, PositionOutcome.valueOf(positionOutcomeArr[0])));
            }

            String[] optionTypeArr = params.get(Option.F_OPTION_TYPE);
            String[] assetIdArr = params.get(Option.F_ASSET_ID);

            if((optionTypeArr != null && !StringUtils.isEmpty(optionTypeArr[0])) ||
                    assetIdArr != null && !StringUtils.isEmpty(assetIdArr[0])){

                criteria.createAlias("option", "option");
                if(optionTypeArr!= null && !StringUtils.isEmpty(optionTypeArr[0])){
                    criteria.add(Restrictions.eq("option." + Option.F_OPTION_TYPE, OptionType.valueOf(optionTypeArr[0])));
                }

                if(assetIdArr != null && !StringUtils.isEmpty(assetIdArr[0])){
                    criteria.add(Restrictions.eq("option." + Option.F_ASSET_ID, OptionType.valueOf(assetIdArr[0])));
                }
            }
        }catch (Exception e){
            logger.error("Parsing exception", e);
            throw new GOptionsException("Parsing exception");
        }
    }

    @Override
    public List<Position> getPositionsByOption(Option option) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);
        criteria.add(Restrictions.eq(Position.F_OPTION_ID, option.getId()));
        return positionDao.list(criteria);
    }

    @Override
    public List<Position> getOpenPositions() {
        DetachedCriteria criteria = getOpenPositionsCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, accountService.getCurrentAccount().getAccount().getId()));
        //decided to limit max positions number in order not to overload ui.
        int maxOpenPositions = 15;
        return positionDao.list(criteria, maxOpenPositions, 0);
    }

    @Override
    public List<Position> getAdminOpenPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = getOpenPositionsCriteria();
        buildAdminPositionCriteria(criteria, params);
        return positionDao.list(criteria, pageNumber);
    }

    @Override
    public List<Position> getAdminAccountOpenPositions(Long accountId, Integer pageNumber, Map<String, String[]> params) throws GOptionsException {
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);

        Account account = accountService.read(accountId);
        if (account == null) {
            throw new GOptionsException("Account " + accountId + " not found");
        }

        //this code is different when we are talking about opened positions in order to include newly CREATED.
        criteria.add(Restrictions.or(
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CREATED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.OPENED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.IN_TRADE)));

        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, account.getId()));

        buildAdminPositionCriteria(criteria, params);
        criteria.addOrder(Order.desc(Position.F_OPEN_TIME));

        return positionDao.list(criteria, pageNumber);
    }

    @Override
    public List<Position> getAdminAccountHistoryPositions(Long accountId, Integer pageNumber, Map<String, String[]> params) throws GOptionsException {
        Account account = accountService.read(accountId);
        if (account == null) {
            throw new GOptionsException("Account " + accountId + " not found");
        }

        DetachedCriteria criteria = getHistoryPositionsCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, account.getId()));
        buildAdminPositionCriteria(criteria, params);
        return positionDao.list(criteria, pageNumber);
    }

    @Override
    public List<Position> getAdminHistoryPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = getHistoryPositionsCriteria();
        buildAdminPositionCriteria(criteria, params);
        return positionDao.list(criteria, pageNumber);
    }

    @Override
    public List<Position> getHistoryPositions(Integer pageNumber) {
        DetachedCriteria criteria = getHistoryPositionsCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, accountService.getCurrentAccount().getAccount().getId()));
        return positionDao.list(criteria, ICustomerService.PAGE_SIZE_FOR_CUSTOMER, pageNumber);
    }

    /*
    @Override
    public List<Position> getClosedPositions() throws GOptionsException{
        AccountDetails accountDetails = accountService.getCurrentAccount();
        if(accountDetails==null){
            throw new GOptionsException("Current account is null!");
        }
        DetachedCriteria criteria = getHistoryPositionsCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, accountDetails.getAccount().getId()));
        criteria.add(Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CLOSED));
        return positionDao.list(criteria);
    }*/

    @Override
    public List<Position> getFailedPositions(Integer pageNumber) throws GOptionsException {
        AccountDetails accountDetails = accountService.getCurrentAccount();
        if (accountDetails == null) {
            throw new GOptionsException("Current account is null!");
        }
        DetachedCriteria criteria = getHistoryPositionsCriteria();
        criteria.add(Restrictions.eq(Position.F_ACCOUNT_ID, accountDetails.getAccount().getId()));
        criteria.add(Restrictions.or(
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CANCELED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.REJECTED)));
        return positionDao.list(criteria, ICustomerService.PAGE_SIZE_FOR_CUSTOMER, pageNumber);
    }

    private DetachedCriteria getOpenPositionsCriteria() {
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);

        criteria.add(Restrictions.or(
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.OPENED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.IN_TRADE)));

        criteria.addOrder(Order.desc(Position.F_OPEN_TIME));
        return criteria;
    }

    private DetachedCriteria getHistoryPositionsCriteria() {
        DetachedCriteria criteria = DetachedCriteria.forClass(Position.class);
        criteria.add(Restrictions.or(
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CLOSED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.CANCELED),
                Restrictions.eq(Position.F_POSITION_STATUS, PositionStatus.REJECTED)));
        criteria.addOrder(Order.desc(Position.F_CLOSE_TIME));
        return criteria;
    }

    //TODO think about money return and moving method to the manager
    @Override
    public void cancelPosition(Long id) throws GOptionsException {
        Position position = read(id);
        if (position != null) {

            //in case if position already closed
            if (position.getPositionStatus() == PositionStatus.CLOSED) {
                throw new GOptionsException("Can't cancel position " + position.getId() + " because position is already closed");
            }

            accountService.updateBalance(position.getAccount(), position.getInvestedAmount());
            activityService.create(BActivityType.CANCEL_POSITION, position.getInvestedAmount(), position.getId(), position.getAccount());

            //TODO check jackpot after position canceling
            Option option = position.getOption();
            optionService.update(option);

            eventManager.sendOptionUpdate(option);

            position.setPositionStatus(PositionStatus.CANCELED);
            update(position);

            eventManager.sendPositionUpdate(position);

        }
    }


    //TODO move to manager
    @Override
    public void rejectPosition(Position position) {
        position.setPositionStatus(PositionStatus.REJECTED);
        update(position);

        eventManager.sendPositionUpdate(position);
    }

    @Override
    public void update(Position position) {
        positionDao.update(position);
    }

    @Override
    public void update(List<Position> positions) {
        if (positions != null && positions.size() > 0) {
            positionDao.update(positions);
        }
    }

    @Override
    public Position openPosition(Position position, Quote quote) throws GOptionsException {

        long start  = System.currentTimeMillis();

        if (position == null) {
            throw new GOptionsException("Position is null ");
        }

        System.out.println(" p1 open : " + (System.currentTimeMillis() - start));

        long now = System.currentTimeMillis();
            // allowed deviation in seconds is 1 second
            // here i check if position was opened really now and there is no connection delay
        if ((quote.getTime() < (now - IQuotesService.ALLOWED_DEVIATION)) || (quote.getTime() > (now + IQuotesService.ALLOWED_DEVIATION))) {
            logger.debug("quote time {} now {} ", new Date(quote.getTime()), new Date(now));
                throw new GOptionsException("Can't open position, the time deviation are exceeded: now," +
                        " quoteId, quoteTime , difference " + now + " " + quote.getId()
                        + " " + quote.getTime() + " " + (now - quote.getTime()));
        }

        System.out.println(" p2 open : " + (System.currentTimeMillis() - start));

        position.setPositionStatus(PositionStatus.CREATED);
        positionDao.save(position);

        System.out.println(" p3 open : " + (System.currentTimeMillis() - start));

        if (position.getInvestedAmount() == null) {
            rejectPosition(position);
            throw new GOptionsException("Invested amount is null for position " + position.getId());
        }

        if (position.getPositionDirection() == null) {
            rejectPosition(position);
            throw new GOptionsException("Direction is null for position " + position.getId());
        }

        if (position.getOpenPrice() == null) {
            rejectPosition(position);
            throw new GOptionsException("Open price is null for position " + position.getId());
        }

        if (position.getOpenTime() == null) {
            rejectPosition(position);
            throw new GOptionsException("Open time is null for position " + position.getId());
        }

        System.out.println(" p4 open : " + (System.currentTimeMillis() - start));

        Option option = position.getOption();
        if (option == null) {
            rejectPosition(position);
            throw new GOptionsException("Option is null for position " + position.getId());
        }

        if(option.getOptionType() == null){
            rejectPosition(position);
            throw new GOptionsException("OptionType is null for " + option.getId());
        }


        if (position.getAccount() == null) {
            rejectPosition(position);
            throw new GOptionsException("Can't open position with null account, position " + position.getId());
        }

        if (position.getAccount().getBalance().doubleValue() < position.getInvestedAmount().doubleValue()) {
            rejectPosition(position);
            throw new GOptionsException("Not enough to open position!");
        }

        if (position.getPositionStatus() != PositionStatus.CREATED) {
            rejectPosition(position);
            throw new GOptionsException("Position status should be created instead of " + position.getPositionStatus());
        }

        System.out.println(" p5 open : " + (System.currentTimeMillis() - start));
        System.out.println("before openPosJob creating: " + new Date());

        positionManager.createOpenPositionJob(position);

        System.out.println(" p6 open : " + (System.currentTimeMillis() - start));
        return position;
    }
}
