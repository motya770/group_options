package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IBankDao;
import com.goptions.bp.model.bank.Bank;
import org.springframework.stereotype.Repository;

/**
 * Created by matvei on 8/3/15.
 */
@Repository
public class BankDao  extends EntityDao<Bank> implements IBankDao {
    public BankDao(){
        super(Bank.class);
    }
}
