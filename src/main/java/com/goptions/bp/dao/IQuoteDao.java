package com.goptions.bp.dao;

import com.goptions.bp.model.quotes.Quote;

/**
 * Created by matvei on 1/3/15.
 */
public interface IQuoteDao extends IEntityDao<Quote> {

    void deleteOlderThan(long timestamp);

}
