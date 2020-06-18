package com.goptions.bp.core.manager;

import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;

import java.math.BigDecimal;

/**
 * Created by matvei on 1/3/15.
 */
public interface IEventManager {

    //void sendNewQuote();

    //void sendNewOption();

    void sendOptionUpdate(Option option);

    //void sendNewPosition(Position position);

    void sendPositionUpdate(Position position);

    void sendAccountUpdate(Account account);

    void sendNewQuote(String externalId, BigDecimal value, Long timestamp);

    void receiveNewQuote();

}
