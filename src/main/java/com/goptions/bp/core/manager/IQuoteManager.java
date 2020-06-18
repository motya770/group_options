package com.goptions.bp.core.manager;

import java.math.BigDecimal;

/**
 * Created by matvei on 2/16/15.
 */
public interface IQuoteManager {

    void createCreateQuoteJob(String assetExternalId, BigDecimal value, Long time);
}
