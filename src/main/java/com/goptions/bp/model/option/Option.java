package com.goptions.bp.model.option;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.option.creator.OptionCreator;
import com.goptions.bp.model.position.Position;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.List;

@Entity(name = "options")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Option extends BaseEntity {

    public static final String F_OPTION_STATUS = "optionStatus";
    public static final String F_BID_START_TIME = "bidStartTime";
    public static final String F_TRADE_START_TIME = "tradeStartTime";
    public static final String F_TRADE_END_TIME = "tradeEndTime";
    public static final String F_DEMO = "demo";
    public static final String F_ASSET_ID = "asset.id";
    public static final String F_CURRENCY = "currency";
    public static final String F_OPTION_CREATOR_ID = "optionCreator.id";
    //public static final String F_BID_AMOUNT_TYPE = "bidAmountType";
    public static final String F_OPTION_TYPE = "optionType";

    @ManyToOne
    private Asset asset;

    @OneToMany(mappedBy = "option")
    @JsonIgnore
    private List<Position> positions;

    private Long bidStartTime;
    //private Long bidEndTime;
    private Long tradeStartTime;
    private Long tradeEndTime;

    @Enumerated(EnumType.STRING)
    private OptionStatus optionStatus;

    //TODO check this
    //@Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Currency currency;

    //TODO check nullable
    @Column(columnDefinition = "boolean default false")
    private Boolean demo;

    @Embedded
    private OptionConfiguration optionConfiguration;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private OptionCreator optionCreator;

    @Enumerated(EnumType.STRING)
    private OptionType optionType;

    public OptionType getOptionType() {
        return optionType;
    }

    public void setOptionType(OptionType optionType) {
        this.optionType = optionType;
    }

    /*@Enumerated(EnumType.STRING)
    private BidAmountType bidAmountType;

    public BidAmountType getBidAmountType() {
        return bidAmountType;
    }

    public void setBidAmountType(BidAmountType bidAmountType) {
        this.bidAmountType = bidAmountType;
    }*/

    public OptionCreator getOptionCreator() {
        return optionCreator;
    }

    public void setOptionCreator(OptionCreator optionCreator) {
        this.optionCreator = optionCreator;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Boolean getDemo() {
        return demo;
    }

    public void setDemo(Boolean demo) {
        this.demo = demo;
    }

    public OptionConfiguration getOptionConfiguration() {
        return optionConfiguration;
    }

    public void setOptionConfiguration(OptionConfiguration optionConfiguration) {
        this.optionConfiguration = optionConfiguration;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public OptionStatus getOptionStatus() {
        return optionStatus;
    }

    public void setOptionStatus(OptionStatus optionStatus) {
        this.optionStatus = optionStatus;
    }

    public Long getBidStartTime() {
        return bidStartTime;
    }

    public void setBidStartTime(Long bidStartTime) {
        this.bidStartTime = bidStartTime;
    }

    public Long getTradeStartTime() {
        return tradeStartTime;
    }

    public void setTradeStartTime(Long tradeStartTime) {
        this.tradeStartTime = tradeStartTime;
    }

    public Long getTradeEndTime() {
        return tradeEndTime;
    }

    public void setTradeEndTime(Long tradeEndTime) {
        this.tradeEndTime = tradeEndTime;
    }
}
