package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IBActivityDao;
import com.goptions.bp.model.bactivity.BActivity;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by matvei on 3/10/15.
 */
@Repository
public class BActivityDao extends EntityDao<BActivity> implements IBActivityDao {

    public BActivityDao() {
        super(BActivity.class);
    }


    @Override
    public BigDecimal getBursaProfit() {

        String sql  =   "select sum(bactivity.amount)\n" +
                "from bactivity\n" +
                "where bactivity.activityType = 'BURSA_PERCENT'";

        List<?> result = sessionFactory.getCurrentSession().createSQLQuery(sql).list();
        //Attention this cast is legal for MySQL
        BigDecimal accountPl = (BigDecimal) result.get(0);
        return accountPl;
    }
}
