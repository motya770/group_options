package com.goptions.bp.utils;

import com.goptions.bp.messaging.consumer.QuotesConsumer;
import com.goptions.bp.messaging.producer.QuotesSimulator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * Created by matvei on 1/12/15.
 */
@Component
public class LiveCycleApplication implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private QuotesSimulator quotesSimulator;

    @Autowired
    private QuotesConsumer quotesConsumer;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

    }
}
