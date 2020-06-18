package com.goptions.bp.core.manager.cache;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.quotes.Quote;

import java.math.BigDecimal;

/**
 * Created by matvei on 6/19/15.
 */
public interface IQuoteCache {

    void addQuote(String assetExternalId, BigDecimal price, Long time);

    Quote findLastQuote(Asset asset);
}
