package com.goptions.bp.dao;

import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.position.Position;

import java.math.BigDecimal;

/**
 * Created by matvei on 12/14/14.
 */
public interface IPositionDao extends IEntityDao<Position> {

    BigDecimal getAccountPl(Account account);
}
