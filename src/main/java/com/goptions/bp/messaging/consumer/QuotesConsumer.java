package com.goptions.bp.messaging.consumer;

import com.goptions.bp.core.manager.IEventManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by matvei on 1/3/15.
 */
@Component
public class QuotesConsumer {

    @Autowired
    private IEventManager eventManager;

    public void consume() {
        eventManager.receiveNewQuote();
    }
}
