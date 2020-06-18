package com.goptions.bp.model.quotes;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.entity.BaseEntity;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity(name = "quote")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Quote extends BaseEntity {

    public static final String F_TIME = "time";
    public static final String F_VALUE = "value";
    public static final String F_ASSET_EXTERNAL_ID = "assetExternalId";

    @ManyToOne
    private Asset asset;
    //TODO added assetExternalId for optimization purposes (e.t. indexes in database)
    private String assetExternalId;

    @Column(precision = 12, scale = 5)
    private BigDecimal value;
    private Long time;

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public String getAssetExternalId() {
        return assetExternalId;
    }

    public void setAssetExternalId(String assetExternalId) {
        this.assetExternalId = assetExternalId;
    }
}
