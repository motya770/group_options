package com.goptions.bp.model.option.creator;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.option.OptionType;

import javax.persistence.*;
import java.util.List;

/**
 * Created by matvei on 3/7/15.
 */
@Entity(name = "option_creator")
public class OptionCreator extends BaseEntity {

    @Column(unique = true)
    private String name;

    @Column(nullable = false)
    private boolean isDemo;

    @Column
    private boolean useWeek;

    //TODO check this
    //@Column(nullable = false)
    private Currency currency;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="option_creator_asset"
            , joinColumns={@JoinColumn(referencedColumnName="ID")}
            , inverseJoinColumns={@JoinColumn(referencedColumnName="ID")})
    private List<Asset> assets;

    @OneToMany
    private List<TimeFrame> timeFrames;

    @Enumerated(EnumType.STRING)
    private OptionType optionType;

    public OptionType getOptionType() {
        return optionType;
    }

    public void setOptionType(OptionType optionType) {
        this.optionType = optionType;
    }

    public boolean isUseWeek() {
        return useWeek;
    }

    public void setUseWeek(boolean useWeek) {
        this.useWeek = useWeek;
    }

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }

    public List<TimeFrame> getTimeFrames() {
        return timeFrames;
    }

    public void setTimeFrames(List<TimeFrame> timeFrames) {
        this.timeFrames = timeFrames;
    }

    public boolean isDemo() {
        return isDemo;
    }

    public void setDemo(boolean isDemo) {
        this.isDemo = isDemo;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
