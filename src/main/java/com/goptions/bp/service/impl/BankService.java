package com.goptions.bp.service.impl;

import com.goptions.bp.dao.IBankDao;
import com.goptions.bp.service.IBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Created by matvei on 8/3/15.
 */
@Service
public class BankService implements IBankService {

    @Autowired
    private IBankDao bankDao;

    @Override
    public void addMoney(BigDecimal amount){

    }

    @Override
    public void removeMoney(BigDecimal amount){

    }
}
