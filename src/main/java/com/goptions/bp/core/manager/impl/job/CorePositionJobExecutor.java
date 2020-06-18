package com.goptions.bp.core.manager.impl.job;

import com.goptions.bp.core.calculator.ICalculatorService;
import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.core.manager.IPositionManager;
import com.goptions.bp.core.manager.job.ICorePositionJobExecutor;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.bactivity.BActivityType;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionStatus;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.position.PositionStatus;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.math.BigDecimal;

/**
 * Created by matvei on 3/15/15.
 */
@Service
//@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class CorePositionJobExecutor implements ICorePositionJobExecutor {

    private static final Logger logger = LoggerFactory.getLogger(CorePositionJobExecutor.class);

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IPositionService positionService;

    @Autowired
    private IOptionService optionService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IBActivityService activityService;

    @Autowired
    private IQuotesService quotesService;

    @Autowired
    private ICalculatorService calculatorService;

    @Autowired
    private IPositionManager positionManager;

    private TransactionTemplate transactionTemplate;

    @Autowired
    @Qualifier(value = "transactionManager")
    public void setTransactionManager(HibernateTransactionManager transactionManager){
        transactionTemplate = new TransactionTemplate(transactionManager);
        transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    @Override
    public void openPositionExecute(Long positionId) throws Exception {

        Long entityId = positionId;

        Position position = positionService.read(entityId);

        if (position == null) {
            logger.info("Position is empty. Can't open position.");
            return;
        }

        Account account = position.getAccount();

        if (account == null) {
            logger.info("Account is null. Rejecting position " + position.getId());
            positionService.rejectPosition(position);
            return;
        }

        if (account.getBalance().doubleValue() < position.getInvestedAmount().doubleValue()) {
            logger.info("Not enough funds. Rejecting position " + position.getId());
            positionService.rejectPosition(position);
            return;
        }

        if (position.getPositionStatus() != PositionStatus.CREATED) {
            logger.info("Position status is " + position.getPositionStatus() + " instead of CREATED. Rejecting position " + position.getId());
            positionService.rejectPosition(position);
            return;
        }

        //setting jackpot
        Option option = position.getOption();

        //TODO condition for hedge options
        if (option.getOptionStatus() != OptionStatus.OPENED) {
            logger.info("Option status is not opened ( " + option.getOptionStatus() +  " ) Rejecting position " + position.getId());
            positionService.rejectPosition(position);
            return;
        }

        position.setPositionStatus(PositionStatus.OPENED);

        optionService.update(option);
        positionService.update(position);

        activityService.create(BActivityType.OPEN_POSITION, new BigDecimal(-1 * position.getInvestedAmount().doubleValue()), position.getId(), account);
        accountService.updateBalance(account, new BigDecimal(-1 * position.getInvestedAmount().doubleValue()));

        //eventManager.sendAccountUpdate(account);
        eventManager.sendPositionUpdate(position);
        eventManager.sendOptionUpdate(option);
        //eventManager.sendNewPosition(position);
        if(option.getOptionType() == OptionType.SHORT_TERM){
            positionManager.createCloseShortPositionJob(position);
        }
    }

    @Override
    public void closePosition(Option option, Position position, BigDecimal closePrice, Long closeTime) throws Exception {

        //setting close price and close time
        position.setClosePrice(closePrice);
        position.setCloseTime(closeTime);

        calculatorService.calculateOutcome(option, position);

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    long start = System.currentTimeMillis();

                    positionService.update(position);
                    //TODO think about updating options
                    optionService.update(option);
                    accountService.updateBalance(position.getAccount(), position.getReturnedAmount());
                    activityService.create(BActivityType.RETURNED_POSITION, position.getReturnedAmount(), position.getId(), position.getAccount());

                    System.out.println("close short term duration : " + (System.currentTimeMillis() - start));
                }catch (Exception e){
                    e.printStackTrace();
                    logger.error("{}", e);
                    status.setRollbackOnly();
                }
            }
        });

        eventManager.sendPositionUpdate(position);
    }

    @Override
    public void closeShortPositionExecute(Long positionId) throws Exception {
        Position position = positionService.read(positionId);
        if (position==null){
            logger.error("Short term position " + positionId + " not found in ClosePositionExecutor.");
            return;
        }

        Option option = position.getOption();
        if (option == null) {
            logger.error("Can't find option for position " + positionId);
            return;
        }

        if(option.getOptionType() != OptionType.SHORT_TERM){
            logger.error("Can't close position. Position should be short term instead of " + option.getOptionType());
            return;
        }

        Quote closeQuote = quotesService.getQuoteByTime(option.getAsset(), System.currentTimeMillis());
        if (closeQuote == null) {
            logger.info("Can't find quote to close positions,  optionId  " + option.getId());
            return;
        }

        closePosition(option, position, closeQuote.getValue(), System.currentTimeMillis());
    }
}
