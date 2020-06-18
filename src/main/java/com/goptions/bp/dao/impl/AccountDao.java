package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IAccountDao;
import com.goptions.bp.model.account.Account;
import org.springframework.stereotype.Repository;

/**
 * Created by matvei on 12/24/14.
 */
@Repository
public class AccountDao extends EntityDao<Account> implements IAccountDao {
    public AccountDao() {
        super(Account.class);
    }
}
