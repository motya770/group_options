package com.goptions.bp.model.option.creator;

import com.goptions.bp.model.entity.BaseEntity;

import javax.persistence.Entity;

/**
 * Created by matvei on 6/10/15.
 */
@Entity(name = "time_frame")
public class TimeFrame extends BaseEntity {

    private String bidStart;
    private String tradeStart;
    private String tradeEnd;

    public TimeFrame() {

    }

    public String getBidStart() {
        return bidStart;
    }

    public void setBidStart(String bidStart) {
        this.bidStart = bidStart;
    }

    public String getTradeStart() {
        return tradeStart;
    }

    public void setTradeStart(String tradeStart) {
        this.tradeStart = tradeStart;
    }

    public String getTradeEnd() {
        return tradeEnd;
    }

    public void setTradeEnd(String tradeEnd) {
        this.tradeEnd = tradeEnd;
    }

    @Override
    public String toString() {
        return  "Frame: " + bidStart + " " + tradeStart + " " + tradeEnd;
    }
}
