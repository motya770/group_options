package com.goptions.bp.model.option.creator;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.option.OptionType;
import org.joda.time.DateTime;

/**
 * Created by matvei on 8/16/15.
 */
public class OptionMask {

    private Asset asset;
    private DateTime bidStartTime;
    private DateTime tradeStartTime;
    private DateTime tradeEndTime;
    private OptionType optionType;

    //private BidAmountType bidAmountType;

    public OptionType getOptionType() {
        return optionType;
    }

    public void setOptionType(OptionType optionType) {
        this.optionType = optionType;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public DateTime getBidStartTime() {
        return bidStartTime;
    }

    public void setBidStartTime(DateTime bidStartTime) {
        this.bidStartTime = bidStartTime;
    }

    public DateTime getTradeStartTime() {
        return tradeStartTime;
    }

    public void setTradeStartTime(DateTime tradeStartTime) {
        this.tradeStartTime = tradeStartTime;
    }

    public DateTime getTradeEndTime() {
        return tradeEndTime;
    }

    public void setTradeEndTime(DateTime tradeEndTime) {
        this.tradeEndTime = tradeEndTime;
    }

    /*
    public BidAmountType getBidAmountType() {
        return bidAmountType;
    }

    public void setBidAmountType(BidAmountType bidAmountType) {
        this.bidAmountType = bidAmountType;
    }*/
}
