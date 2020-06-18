package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.quotes.Quote;
import org.hibernate.cfg.beanvalidation.GroupsPerOperation;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
public interface IPositionService {

    //TODO check when there is too many open positions
    List<Position> getAllOptionOpenPositions() throws GOptionsException;

    Position read(Long id);

    BigDecimal getAccountPl(Account account);

    List<Position> getUnfinishedPositions();

    List<Position> getAdminUnfinishedPositions(Map<String, String[]> params) throws GOptionsException;

    List<Position> getPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<Position> getPositionsByOption(Option option);

    List<Position> getOpenPositions();

    List<Position> getHistoryPositions(Integer pageNumber);

    //List<Position> getClosedPositions() throws GOptionsException;

    List<Position> getFailedPositions(Integer pageNumber) throws GOptionsException;

    List<Position> getAdminOpenPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<Position> getAdminHistoryPositions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<Position> getAdminAccountOpenPositions(Long accountId, Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<Position> getAdminAccountHistoryPositions(Long accountId, Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    Position openPosition(Position position, Quote quote) throws GOptionsException;

    void update(List<Position> positions);

    void update(Position position);

    void cancelPosition(Long id) throws GOptionsException;

    void rejectPosition(Position position);

}
