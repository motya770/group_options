package com.goptions.bp.core.manager;

import com.goptions.bp.model.option.Option;

/**
 * Created by matvei on 1/26/15.
 */
public interface IOptionManager {

    Option createOption(Option option);

    void createOpenOptionJob(Option option);

    void createStartTradeOptionJob(Option option);

    void createCloseOptionJob(Option option);
}
