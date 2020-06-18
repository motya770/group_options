package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.quotes.Quote;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 1/3/15.
 */
public interface IQuotesService {

    //allowed deviation in milliseconds
    public static final long ALLOWED_DEVIATION = 15_000;

    void deleteOldQuotes();

    void create(Quote quote);

    void create(String assetExternalId, BigDecimal value, Long time);

    List<Quote> getPagedQuotes(int pageNumber, Map<String, String[]> params) throws GOptionsException;

    Quote getLastQuote(String assetExternalId) throws GOptionsException;

    //List<Quote> getLastQuotes(String assetExternalId, Long openTime, Long closeTime) throws GOptionsException;

    List<Quote> getRangeQuotes(String assetExternalId, Long start, Long end) throws GOptionsException;

    Quote getQuoteByTimeAndPrice(String assetExternalId, Long timestamp, BigDecimal price) throws GOptionsException;

    Quote getQuoteByTime(Asset asset, Long timestamp) throws GOptionsException;

    //Quote getLastAssetQuote(Asset asset) throws GOptionsException;
}
