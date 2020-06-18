package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.option.OpenOptionHolder;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionConfigHolder;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.model.option.creator.OptionCreator;
import com.goptions.bp.model.option.creator.OptionMask;
import org.joda.time.DateTime;

import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
public interface IOptionService {

    //void setBidSum(Option option, BigDecimal bidsValue);

    OptionMask buildMaskOption(Asset asset,
             DateTime bidStartTime,
             DateTime tradeStartTime,
             DateTime tradeEndTime,
             OptionType optionType);

    List<Option> getFutureGeneratedOptions(OptionCreator optionCreator, Integer pageNumber);

    Option findSameOption(Asset asset, Long bidStartTime, Long tradeStartTime,
                          Long tradeEndTime, Boolean demo, OptionType optionType);

    Option create(Asset asset,
                  Long bidStartTime,
                  Long tradeStartTime,
                  Long tradeEndTime,
                  Boolean demo,
                  Currency currency,
                  OptionConfigHolder optionConfigHolder,
                  OptionType optionType,
                  //BidAmountType bidAmountType,
                  OptionCreator optionCreator) throws GOptionsException;

    Option read(Long id);

    boolean delete(Option entity);

    void update(Option entity) throws GOptionsException;

    List<Option> getAllOptions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    OptionConfigHolder getCurrencyConfigHolder(Currency currency);

    List<Option> getOpenOptions(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    List<Option> getOpenOptions(Integer pageNumber, Currency currency) throws GOptionsException;

    List<Option> getOpenOptions(Integer pageNumber, Currency currency,
                                OptionType optionType, Map<String, String[]> params) throws GOptionsException;

    List<OpenOptionHolder> getOpenOptionsMap(OptionType optionType) throws GOptionsException;

    Option cancelOption(Long id) throws GOptionsException;

}
