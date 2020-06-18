package com.goptions.bp.service.impl;

import com.goptions.bp.dao.ICurrencySettingDao;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;
import com.goptions.bp.service.ICurrencySettingService;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by matvei on 5/31/15.
 */
@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class CurrencySettingService implements ICurrencySettingService {

    @Autowired
    private ICurrencySettingDao currencySettingDao;

    @Override
    public CurrencySetting read(Long id) {
        return currencySettingDao.read(id);
    }

    @Override
    public CurrencySetting find(Currency currency) {
        DetachedCriteria criteria = DetachedCriteria.forClass(CurrencySetting.class);
        criteria.add(Restrictions.eq(CurrencySetting.F_CURRENCY, currency));
        return currencySettingDao.findOne(criteria);
    }

    @Override
    public List<CurrencySetting> listAll() {
        DetachedCriteria criteria = DetachedCriteria.forClass(CurrencySetting.class);
        return currencySettingDao.list(criteria);
    }

    @Override
    public CurrencySetting create(Currency currency,
                                  BigDecimal minBid,
                                  BigDecimal maxBid,
                                  //BigDecimal recommendedBid,
                                  BigDecimal minDeposit,
                                  BigDecimal maxDeposit) {
        CurrencySetting currencySetting = new CurrencySetting();
        currencySetting.setCurrency(currency);
        currencySetting.setMinBid(minBid);
        currencySetting.setMaxBid(maxBid);
        //currencySetting.setRecommendedBid(recommendedBid);
        currencySetting.setMinDeposit(minDeposit);
        currencySetting.setMaxDeposit(maxDeposit);

        currencySettingDao.save(currencySetting);
        return currencySetting;
    }

    @Override
    public void delete(CurrencySetting entity) {
        currencySettingDao.delete(entity);
    }

    @Override
    public void update(CurrencySetting entity) {
        currencySettingDao.update(entity);
    }

    @Override
    public Currency getDefaultCurrency() {
        return Currency.USD;
    }
}
