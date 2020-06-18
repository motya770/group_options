package com.goptions.bp.model.bank;

import com.goptions.bp.model.entity.BaseEntity;

import javax.persistence.Entity;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by matvei on 8/3/15.
 */
@Entity(name = "bank")
public class Bank extends BaseEntity implements Serializable {

    private BigDecimal amount;

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}

