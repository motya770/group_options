package com.goptions.bp.dao;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionType;

/**
 * Created by matvei on 12/15/14.
 */
public interface IOptionDao extends IEntityDao<Option> {

    Option findSameOption(Asset asset, Long bidStartTime, Long tradeStartTime, Long tradeEndTime, Boolean demo, OptionType optionType);
}
