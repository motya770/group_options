package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IPositionDao;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.position.Position;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by matvei on 12/14/14.
 */
@Repository
public class PositionDao extends EntityDao<Position> implements IPositionDao {

    public PositionDao() {
        super(Position.class);
    }

    @Override
    public BigDecimal getAccountPl(Account account) {
        String sql = "select sum(returnedAmount - investedAmount)\n" +
                "from position\n" +
                "where account_id = " + account.getId();
        List<?> result = sessionFactory.getCurrentSession().createSQLQuery(sql).list();
        //Attention this cast is legal for MySQL
        BigDecimal accountPl = (BigDecimal) result.get(0);
        return accountPl;
    }
}
