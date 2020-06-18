package com.goptions.bp.core.manager.impl;

import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Created by kudelin on 8/8/17.
 */
@Component
public class EventManagerMock implements IEventManager {

    @Override
    public void sendOptionUpdate(Option option) {

    }

    @Override
    public void sendPositionUpdate(Position position) {

    }

    @Override
    public void sendAccountUpdate(Account account) {

    }

    @Override
    public void sendNewQuote(String externalId, BigDecimal value, Long timestamp) {

    }

    @Override
    public void receiveNewQuote() {

    }
}
