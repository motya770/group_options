package com.goptions.bp.config;

import com.goptions.bp.core.manager.scheduler.ISchedulerManager;
import com.goptions.bp.messaging.consumer.QuotesConsumer;
import com.goptions.bp.messaging.producer.QuotesSimulator;
import com.goptions.bp.service.IAccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * Created by matvei on 2/11/15.
 */
@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationStartup.class);

    @Autowired
    private QuotesSimulator quotesSimulator;

    @Autowired
    private QuotesConsumer quotesConsumer;

    @Autowired
    private ISchedulerManager schedulerManager;


    @Autowired
    private IAccountService accountService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event)  {
        logger.debug("Application started!");
        quotesSimulator.produce();
        quotesConsumer.consume();
        schedulerManager.start();

        try {
            accountService.createDemoAccount("motya770", "12345678a", "052-891-34-34", "USD");
        }catch (Exception e){
            logger.error("{}", e);
        }
    }
}