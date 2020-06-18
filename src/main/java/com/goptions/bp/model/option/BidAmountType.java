package com.goptions.bp.model.option;

import java.math.BigDecimal;

/**
 * Created by matvei on 7/28/15.
 */
public enum BidAmountType {
    TWENTY_FIVE(new BigDecimal(25)),
    FIFTY(new BigDecimal(50)),
    ONE_HUNDRED(new BigDecimal(100)),
    TWO_HUNDREDS(new BigDecimal(200));

    BigDecimal bidAmount;

    BidAmountType(BigDecimal bidAmount){
        this.bidAmount = bidAmount;
    }

    public BigDecimal getBidAmount(){
        return this.bidAmount;
    }
}
