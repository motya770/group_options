package com.goptions.bp.model.asset;

import com.goptions.bp.model.entity.BaseEntity;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity(name = "asset")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Asset extends BaseEntity implements Comparable<Asset> {

    public static final String F_ASSET_TYPE = "assetType";
    public static final String F_NAME = "name";
    public static final String F_ACTIVE = "active";
    public static final String F_EXTERNAL_ID = "externalId";

    @Column
    private String name;

    @Column
    private String externalId;

    @Column
    private String feedId;

    @Column
    @Enumerated(EnumType.STRING)
    private AssetType assetType;

    @Column(columnDefinition = "boolean default true")
    private boolean active;

    @Column(nullable = false)
    private Integer pipSize;

    public String getFeedId() {
        return feedId;
    }

    public void setFeedId(String feedId) {
        this.feedId = feedId;
    }

    public Integer getPipSize() {
        return pipSize;
    }

    public void setPipSize(Integer pipSize) {
        this.pipSize = pipSize;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AssetType getAssetType() {
        return assetType;
    }

    public void setAssetType(AssetType assetType) {
        this.assetType = assetType;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    @Override
    public int compareTo(Asset o) {
        return this.getName().compareTo(o.getName());
        //return this.getId().compareTo(o.getId());
    }

    //TODO brainfuck
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 31).
                append(this.getName()).
                toHashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Asset))
            return false;
        if (obj == this)
            return true;

        Asset rhs = (Asset) obj;
        return new EqualsBuilder().
                append(this.getName(), rhs.getName()).
                isEquals();
    }

}
