package com.goptions.bp.core.manager.impl.job;

import com.goptions.bp.core.calculator.ICalculatorService;
import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.core.manager.IOptionManager;
import com.goptions.bp.core.manager.job.ICoreOptionJobExecutor;
import com.goptions.bp.core.manager.job.ICorePositionJobExecutor;
import com.goptions.bp.exceptions.GOptionsException;
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
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

/**
 * Created by matvei on 3/16/15.
 */
@Service
//@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class CoreOptionJobExecutor implements ICoreOptionJobExecutor {

    private static final Logger logger = LoggerFactory.getLogger(CoreOptionJobExecutor.class);

    @Autowired
    private IOptionService optionService;

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IOptionManager optionManager;

    @Autowired
    private IPositionService positionService;

    @Autowired
    private IQuotesService quotesService;

    @Autowired
    private IBActivityService activityService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private ICalculatorService calculatorService;

    @Autowired
    private ICorePositionJobExecutor corePositionJobExecutor;

    @Qualifier(value = "taskExecutor")
    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    private TransactionTemplate transactionTemplate;

    private HibernateTransactionManager transactionManager;

    @Autowired
    @Qualifier(value = "transactionManager")
    public void setTransactionManager(HibernateTransactionManager transactionManager){
        this.transactionManager = transactionManager;
        transactionTemplate = new TransactionTemplate(transactionManager);
        transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    @Override
    public void openOptionExecute(Long optionId) throws Exception {

        final Option option = optionService.read(optionId);
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                if (option == null) {
                    logger.info("Can't find option.");
                    return;
                    //throw new GOptionsException("Can't find option " + optionId);
                }

                if (option.getOptionStatus() != OptionStatus.CREATED) {
                    logger.info("Option status should be created instead of " + option.getOptionStatus());
                    return;
                    //throw new GOptionsException("Option status should be created instead of " + option.getOptionStatus());
                }

                option.setOptionStatus(OptionStatus.OPENED);

                /*try {
                    optionService.update(option);
                } catch (GOptionsException e) {
                    logger.error(e.getMessage(), e);
                    throw new GOptionsException("Can't make option OPEN : " + optionId);
                }*/

                //TODO think about create or update notifications! (for option)
                transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                    @Override
                    protected void doInTransactionWithoutResult(TransactionStatus status) {
                        try {
                            optionService.update(option);
                        } catch (GOptionsException e) {
                            throw new RuntimeException(e);
                        }
                    }
                });

                eventManager.sendOptionUpdate(option);
                optionManager.createStartTradeOptionJob(option);
            }
        });
    }

    @Override
    public void startOptionTradeExecute(Long optionId) throws Exception {

        Option option = optionService.read(optionId);
        if (option == null) {
            throw new GOptionsException("Can't find option " + optionId);
        }

        if (option.getOptionStatus() != OptionStatus.OPENED) {
            throw new GOptionsException("Option status should be OPENED instead of " + option.getOptionStatus());
        }

        List<Position> positions = positionService.getPositionsByOption(option);

        option.setOptionStatus(OptionStatus.TRADE_STARTED);

        positions.forEach((p) -> {
            p.setPositionStatus(PositionStatus.IN_TRADE);
        });

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                positionService.update(positions);
                try {
                    optionService.update(option);
                } catch (GOptionsException e) {
                    logger.error(e.getMessage(), e);
                    throw new RuntimeException("Can't make option TRADE_STARTED : " + optionId, e);
                }
            }
        });

        eventManager.sendOptionUpdate(option);

        //TODO stupid code (make review and testing)
        if (option.getOptionStatus() == OptionStatus.TRADE_STARTED) {
            positions.forEach((p) -> {
                eventManager.sendPositionUpdate(p);
            });

            optionManager.createCloseOptionJob(option);
        }
    }


    @Override
    public void closeOptionExecute(Long optionId) throws Exception {

        Option option = optionService.read(optionId);
        if (option == null) {
            logger.info("Can't find option " + optionId);
            return;
        }

        if (option.getOptionStatus() != OptionStatus.TRADE_STARTED) {
            logger.info("Option status should be TRADE_STARTED instead of " + option.getOptionStatus() + " optionId " + option.getId());
            return;
        }

        List<Position> positions = positionService.getPositionsByOption(option);
        if (positions.size() == 0) {
            logger.info("There is no positions in CloseOptionJob in option: " + optionId);
        }

        //setting close price
        Quote closeQuote = quotesService.getQuoteByTime(option.getAsset(), option.getTradeEndTime());
        if (closeQuote == null) {
            logger.info("Can't find quote to close positions,  optionId  " + optionId);
            return;
        }

        option.setOptionStatus(OptionStatus.CLOSED);


        if(option.getOptionType()!= OptionType.SHORT_TERM){
            for (Position position : positions) {
                corePositionJobExecutor.closePosition(option, position, closeQuote.getValue(), option.getTradeEndTime());
            }
        }else {
            optionService.update(option);
            logger.info("This option is short term there is no need to close positions here");
        }

        eventManager.sendOptionUpdate(option);
    }

    /*
    @Override
    public void closeOptionExecute(Long optionId) throws Exception {

        Option option = optionService.read(optionId);
        if (option == null) {
            logger.info("Can't find option " + optionId);
            return;
        }

        if (option.getOptionStatus() != OptionStatus.TRADE_STARTED) {
            logger.info("Option status should be TRADE_STARTED instead of " + option.getOptionStatus() + " optionId " + option.getId());
            return;
        }

        List<Position> positions = positionService.getPositionsByOption(option);
        if (positions.size() == 0) {
            logger.info("There is no positions in CloseOptionJob in option: " + optionId);
        }

        //setting close price
        Quote closeQuote = quotesService.getQuoteByTime(option.getAsset(), option.getTradeEndTime());
        if (closeQuote == null) {
            logger.info("Can't find quote to close positions,  optionId  " + optionId);
            return;
        }

        final Map<Account, BigDecimal> accountsToUpdate = new HashMap<>();
        final List<Position> positionsToUpdate = new ArrayList<>();

        for (Position position : positions) {

            position.setClosePrice(closeQuote.getValue());
            position.setCloseTime(option.getTradeEndTime());

            calculatorService.calculateOutcome(option,position);

            BigDecimal addToBalance = accountsToUpdate.get(position.getAccount());
            if(addToBalance==null){
                accountsToUpdate.put(position.getAccount(), position.getReturnedAmount());
            }else{
                addToBalance = addToBalance.add(position.getReturnedAmount());
                accountsToUpdate.put(position.getAccount(), addToBalance);
            }
            positionsToUpdate.add(position);

            //TODO move to the same transaction
            activityService.create(BActivityType.RETURNED_POSITION, position.getReturnedAmount(), position.getId(), position.getAccount());
        }

        option.setOptionStatus(OptionStatus.CLOSED);

         //TODO
         transactionTemplate.execute(new TransactionCallbackWithoutResult() {
               @Override
               protected void doInTransactionWithoutResult(TransactionStatus status) {
                       try {
                           long start = System.currentTimeMillis();

                           positionService.update(positionsToUpdate);
                           optionService.update(option);

                           for (Map.Entry<Account, BigDecimal> pair : accountsToUpdate.entrySet()) {
                               accountService.updateBalance(pair.getKey(),pair.getValue());
                           }

                           System.out.println("close tx duration : " + (System.currentTimeMillis() - start));
                       }catch (Exception e){
                           e.printStackTrace();
                           logger.error("{}", e);
                           status.setRollbackOnly();
                       }
               }
        });

        positionsToUpdate.forEach((position) -> {
            eventManager.sendPositionUpdate(position);
        });

        eventManager.sendOptionUpdate(option);
    }*/
}
