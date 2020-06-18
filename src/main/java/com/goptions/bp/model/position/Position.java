package com.goptions.bp.model.position;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.option.Option;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity(name = "position")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Position extends BaseEntity {

    public static final String F_POSITION_STATUS = "positionStatus";
    public static final String F_ACCOUNT_ID = "account.id";
    public static final String F_OPEN_TIME = "openTime";
    public static final String F_CLOSE_TIME = "closeTime";
    public static final String F_OPTION_ID = "option.id";
    public static final String F_POSITION_OUTCOME = "positionOutcome";

    @ManyToOne
    private Option option;

    //TODO fix this
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Account account;
    private BigDecimal investedAmount;
    private BigDecimal returnedAmount;

    @Column(precision = 12, scale = 5)
    private BigDecimal openPrice;

    @Column(precision = 12, scale = 5)
    private BigDecimal closePrice;

    @Enumerated(EnumType.STRING)
    private PositionDirection positionDirection;

    @Enumerated(EnumType.STRING)
    private PositionStatus positionStatus;

    @Enumerated(EnumType.STRING)
    private PositionOutcome positionOutcome;

    private Long openTime;
    private Long closeTime;

    @Transient
    private BigDecimal currentPrice;

    @Transient
    private Long currentTime;

    @Transient
    private BigDecimal currentReturnAmount;

    public Long getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(Long currentTime) {
        this.currentTime = currentTime;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getCurrentReturnAmount() {
        return currentReturnAmount;
    }

    public void setCurrentReturnAmount(BigDecimal currentReturnAmount) {
        this.currentReturnAmount = currentReturnAmount;
    }

    public PositionDirection getPositionDirection() {
        return positionDirection;
    }

    public void setPositionDirection(PositionDirection positionDirection) {
        this.positionDirection = positionDirection;
    }

    public BigDecimal getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(BigDecimal openPrice) {
        this.openPrice = openPrice;
    }

    public BigDecimal getClosePrice() {
        return closePrice;
    }

    public void setClosePrice(BigDecimal closePrice) {
        this.closePrice = closePrice;
    }

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public BigDecimal getInvestedAmount() {
        return investedAmount;
    }

    public void setInvestedAmount(BigDecimal investedAmount) {
        this.investedAmount = investedAmount;
    }

    public BigDecimal getReturnedAmount() {
        return returnedAmount;
    }

    public void setReturnedAmount(BigDecimal returnedAmount) {
        this.returnedAmount = returnedAmount;
    }

    public PositionStatus getPositionStatus() {
        return positionStatus;
    }

    public void setPositionStatus(PositionStatus positionStatus) {
        this.positionStatus = positionStatus;
    }

    public PositionOutcome getPositionOutcome() {
        return positionOutcome;
    }

    public void setPositionOutcome(PositionOutcome positionOutcome) {
        this.positionOutcome = positionOutcome;
    }

    public Long getOpenTime() {
        return openTime;
    }

    public void setOpenTime(Long openTime) {
        this.openTime = openTime;
    }

    public Long getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Long closeTime) {
        this.closeTime = closeTime;
    }
}
