package com.goptions.bp.service.impl;

import com.goptions.bp.dao.impl.BActivityDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.account.AccountType;
import com.goptions.bp.model.bactivity.BActivity;
import com.goptions.bp.model.bactivity.BActivityType;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.IAccountService;
import com.goptions.bp.service.IBActivityService;
import com.goptions.bp.service.ICustomerService;
import com.goptions.bp.utils.DateUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 3/10/15.
 */
@Service
@Transactional(value = "transactionManager")
public class BActivityService implements IBActivityService {

    private static final Logger logger = LoggerFactory.getLogger(OptionService.class);

    @Autowired
    private BActivityDao activityDao;

    @Autowired
    private IAccountService accountService;

    @Override
    public List<BActivity> getAccountActivities(Integer pageNumber) throws GOptionsException {

        AccountDetails accountDetails = accountService.getCurrentAccount();
        if (accountDetails == null) {
            throw new GOptionsException("Current account is null!");
        }

        DetachedCriteria criteria = DetachedCriteria.forClass(BActivity.class);
        criteria.add(Restrictions.eq(BActivity.F_ACCOUNT_ID, accountDetails.getAccount().getId()));
        return activityDao.list(criteria, ICustomerService.PAGE_SIZE_FOR_CUSTOMER, pageNumber);
    }

    @Override
    public List<BActivity> getPagedBActivity(int pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(BActivity.class);
        buildAdminBActivityCriteria(criteria, params);
        criteria.addOrder(Order.desc(BaseEntity.F_DATE_CREATED));
        return activityDao.list(criteria, pageNumber);
    }

    private void buildAdminBActivityCriteria(DetachedCriteria criteria, Map<String, String[]> params)
            throws GOptionsException{

        if(params == null){
            return;
        }

        try {
            String[] dateCreatedFromArr = params.get(BActivity.F_DATE_CREATED + "From");
            if (dateCreatedFromArr != null && !StringUtils.isEmpty(dateCreatedFromArr[0])) {
                long dateCreated = DateUtils.parse(dateCreatedFromArr[0]).getTime();
                criteria.add(Restrictions.ge(BActivity.F_DATE_CREATED, dateCreated));
            }

            String[] dateCreatedToArr = params.get(BActivity.F_DATE_CREATED + "To");
            if (dateCreatedToArr != null && !StringUtils.isEmpty(dateCreatedToArr[0])) {
                long dateCreated = DateUtils.parse(dateCreatedToArr[0]).getTime();
                criteria.add(Restrictions.le(BActivity.F_DATE_CREATED, dateCreated));
            }

            String[] activityTypeArr = params.get(BActivity.F_ACTIVITY_TYPE);
            if (activityTypeArr != null && !StringUtils.isEmpty(activityTypeArr[0])) {
                criteria.add(Restrictions.eq(BActivity.F_ACTIVITY_TYPE, BActivityType.valueOf(activityTypeArr[0])));
            }

        }catch (Exception e){
            logger.error("parsing error", e);
            throw  new GOptionsException("parsing error");
        }
    }

    @Override
    public List<BActivity> getBursaActivities() {
        DetachedCriteria criteria = DetachedCriteria.forClass(BActivity.class);
        criteria.add(Restrictions.eq(BActivity.F_ACTIVITY_TYPE, BActivityType.BURSA_PERCENT));
        criteria.addOrder(Order.desc(BaseEntity.F_DATE_CREATED));
        return activityDao.getAll(criteria);
    }

    @Override
    public List<BActivity> getAdminAccountActivities(Long accountId, int pageNumber) throws GOptionsException {
        Account account = accountService.read(accountId);
        if (account == null) {
            throw new GOptionsException("Account " + accountId + " not found!");
        }
        DetachedCriteria criteria = DetachedCriteria.forClass(BActivity.class);
        criteria.createAlias("account", "account");
        criteria.add(Restrictions.eq(BActivity.F_ACCOUNT_ID, account.getId()));
        criteria.addOrder(Order.desc(BaseEntity.F_DATE_CREATED));
        return activityDao.list(criteria, pageNumber);
    }

    @Override
    public BActivity buildActivity(BActivityType activityType, BigDecimal amount, Long entityId, Account account)throws GOptionsException {

        if (activityType == null) {
            throw new GOptionsException("ActivityType can't be null");
        }

        if (amount == null) {
            throw new GOptionsException("Amount can't be null");
        }

        if (entityId == null) {
            throw new GOptionsException("EntityId can't be null");
        }

        if (account == null) {
            throw new GOptionsException("Account can't be null");
        }

        BActivity activity = new BActivity();
        activity.setActivityType(activityType);
        activity.setAmount(amount);
        activity.setEntityId(entityId);
        activity.setAccount(account);
        return activity;
    }

    @Override
    public BActivity create(BActivity activity) throws GOptionsException {
        activityDao.save(activity);
        return activity;
    }

    @Override
    public BActivity create(BActivityType activityType, BigDecimal amount, Long entityId, Account account) throws GOptionsException {
        BActivity activity = buildActivity(activityType, amount, entityId, account);
        return create(activity);
    }
}
