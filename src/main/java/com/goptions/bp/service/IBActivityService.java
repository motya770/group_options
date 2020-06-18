package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.bactivity.BActivity;
import com.goptions.bp.model.bactivity.BActivityType;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 3/10/15.
 */
public interface IBActivityService {

    List<BActivity> getAccountActivities(Integer pageNumber) throws GOptionsException;

    BActivity create(BActivityType activityType, BigDecimal amount, Long entityId, Account account) throws GOptionsException;

    BActivity create(BActivity activity) throws GOptionsException;

    BActivity buildActivity(BActivityType activityType, BigDecimal amount, Long entityId, Account account) throws GOptionsException;

    List<BActivity> getPagedBActivity(int pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<BActivity> getAdminAccountActivities(Long accountId, int pageNumber) throws GOptionsException;

    List<BActivity> getBursaActivities();

}
