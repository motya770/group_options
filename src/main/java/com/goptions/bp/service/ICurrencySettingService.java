package com.goptions.bp.service;

import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by matvei on 5/31/15.
 */
public interface ICurrencySettingService {

    CurrencySetting read(Long id);

    CurrencySetting find(Currency currency);

    List<CurrencySetting> listAll();

    CurrencySetting create(
            Currency currency,
            BigDecimal minBid,
            BigDecimal maxBid,
            //BigDecimal recommendedBid,
            BigDecimal minDeposit,
            BigDecimal maxDeposit
    );

    void delete(CurrencySetting entity);

    void update(CurrencySetting entity);

    Currency getDefaultCurrency();
}
