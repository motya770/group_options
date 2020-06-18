package com.goptions.bp.model.bactivity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.entity.BaseEntity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by matvei on 3/10/15.
 */
@Entity(name = "bactivity")
public class BActivity extends BaseEntity {

    public static final String F_ACCOUNT_ID = "account.id";
    public static final String F_ACTIVITY_TYPE = "activityType";

    @Column(nullable = false)
    private BActivityType activityType;

    @Column(nullable = false)
    private BigDecimal amount;

    //private String entityName;

    private String comment;

    @Column(nullable = false)
    private Long entityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Account account;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public BActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(BActivityType activityType) {
        this.activityType = activityType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    /*
    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }*/

    public Long getEntityId() {
        return entityId;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }
}
