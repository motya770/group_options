package com.goptions.bp.core.manager.cache;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.quotes.Quote;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by matvei on 6/19/15.
 */
@Component
public class QuoteCache implements IQuoteCache {

    private ConcurrentHashMap<String, Quote> cache = new ConcurrentHashMap<>();

    @Override
    public void addQuote(String assetExternalId, BigDecimal price, Long time) {
        Quote quote = new Quote();
        quote.setAssetExternalId(assetExternalId);
        quote.setTime(time);
        quote.setValue(price);

        cache.put(assetExternalId, quote);
    }

    @Override
    public Quote findLastQuote(Asset asset) {
        return cache.get(asset.getExternalId());
    }
}
