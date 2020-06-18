package com.goptions.bp.service.impl;

import com.goptions.bp.model.bactivity.BActivity;
import com.goptions.bp.service.IAccountService;
import com.goptions.bp.service.IBActivityService;
import com.goptions.bp.service.IPositionService;
import com.goptions.bp.service.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 8/4/15.
 */
@Service
public class ReportService implements IReportService {

    public static final String ACCOUNT_PL = "accountPl";
    public static final String BURSA_PL = "bursaPl";
    public static final String GENERAL_PL = "generalPl";
    public static final String BURSA_ACTIVITIES = "bursaActivities";

    @Autowired
    private IPositionService positionService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IBActivityService activityService;

    @Override
    public Map<String, Object> getPl() {

        Map<String, Object> result = new HashMap<>();

        BigDecimal accountPl = positionService.getAccountPl(accountService.getBankAccount());
        result.put(ACCOUNT_PL, accountPl);

        BigDecimal bursaPl = new BigDecimal("0");
        List<BActivity> bursaActivities = activityService.getBursaActivities();
        result.put(BURSA_ACTIVITIES, bursaActivities);

        for(BActivity activity: bursaActivities){
            bursaPl = bursaPl.add(activity.getAmount());
        }
        result.put(BURSA_PL, bursaPl);

        BigDecimal generalPl = bursaPl.add(accountPl);
        result.put(GENERAL_PL, generalPl);
        
        return result;
    }
}
