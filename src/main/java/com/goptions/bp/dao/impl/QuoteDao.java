package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IQuoteDao;
import com.goptions.bp.model.quotes.Quote;
import org.springframework.stereotype.Repository;

/**
 * Created by matvei on 1/4/15.
 */
@Repository
public class QuoteDao extends EntityDao<Quote> implements IQuoteDao {

    @Override
    public void deleteOlderThan(long timestamp) {
        String hql = "delete from quote where time <= :timestamp";
        sessionFactory.getCurrentSession().createQuery(hql).setString("timestamp", timestamp+"").executeUpdate();
    }

    public QuoteDao() {
        super(Quote.class);
    }
}
