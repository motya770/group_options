package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.ICurrencySettingDao;
import com.goptions.bp.model.currency.CurrencySetting;
import org.springframework.stereotype.Repository;

/**
 * Created by matvei on 5/31/15.
 */
@Repository
public class CurrencySettingDao extends EntityDao<CurrencySetting> implements ICurrencySettingDao {
    public CurrencySettingDao() {
        super(CurrencySetting.class);
    }
}
