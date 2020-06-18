package com.goptions.bp.model.option;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
public class OptionConfiguration {

    private BigDecimal profitPercent;
    private BigDecimal lossInsurance;
    private BigDecimal minLimitation;
    private BigDecimal maxLimitation;

    public BigDecimal getMinLimitation() {
        return minLimitation;
    }

    public void setMinLimitation(BigDecimal minLimitation) {
        this.minLimitation = minLimitation;
    }

    public BigDecimal getMaxLimitation() {
        return maxLimitation;
    }

    public void setMaxLimitation(BigDecimal maxLimitation) {
        this.maxLimitation = maxLimitation;
    }

    public BigDecimal getLossInsurance() {
        return lossInsurance;
    }

    public void setLossInsurance(BigDecimal lossInsurance) {
        this.lossInsurance = lossInsurance;
    }

    public BigDecimal getProfitPercent() {
        return profitPercent;
    }

    public void setProfitPercent(BigDecimal bursaPercent) {
        this.profitPercent = bursaPercent;
    }
}
