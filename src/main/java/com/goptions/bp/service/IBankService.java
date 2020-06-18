package com.goptions.bp.service;

import java.math.BigDecimal;

/**
 * Created by matvei on 8/3/15.
 */
public interface IBankService {

    void addMoney(BigDecimal amount);

    void removeMoney(BigDecimal amount);

}
