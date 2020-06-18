package com.goptions.bp.model.currency;

import com.goptions.bp.model.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;

/**
 * Created by matvei on 5/31/15.
 */

@Entity(name = "currency_setting")
public class CurrencySetting extends BaseEntity {

    public static final String F_CURRENCY = "currency";

    @Column(unique = true)
    private Currency currency;

    private BigDecimal minBid;
    private BigDecimal maxBid;
    //private BigDecimal recommendedBid;
    private BigDecimal minDeposit;
    private BigDecimal maxDeposit;

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public BigDecimal getMinBid() {
        return minBid;
    }

    public void setMinBid(BigDecimal minBid) {
        this.minBid = minBid;
    }

    public BigDecimal getMaxBid() {
        return maxBid;
    }

    public void setMaxBid(BigDecimal maxBid) {
        this.maxBid = maxBid;
    }

    /*
    public BigDecimal getRecommendedBid() {
        return recommendedBid;
    }

    public void setRecommendedBid(BigDecimal recommendedBid) {
        this.recommendedBid = recommendedBid;
    }*/

    public BigDecimal getMaxDeposit() {
        return maxDeposit;
    }

    public void setMaxDeposit(BigDecimal maxDeposit) {
        this.maxDeposit = maxDeposit;
    }

    public BigDecimal getMinDeposit() {
        return minDeposit;
    }

    public void setMinDeposit(BigDecimal minDeposit) {
        this.minDeposit = minDeposit;
    }
}
