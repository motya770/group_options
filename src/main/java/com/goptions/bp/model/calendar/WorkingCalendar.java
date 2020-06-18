package com.goptions.bp.model.calendar;

import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by matvei on 6/15/15.
 */
@Entity(name = "working_calendar")
public class WorkingCalendar extends BaseEntity {

    private String name;

    @OneToMany
    private List<Asset> assets;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }
}
