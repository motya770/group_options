package com.goptions.bp.core.manager.job;

/**
 * Created by matvei on 3/16/15.
 */
public interface ICoreOptionJobExecutor {

    void openOptionExecute(Long optionId) throws Exception;

    void startOptionTradeExecute(Long optionId) throws Exception;

    void closeOptionExecute(Long optionId) throws Exception;

}


