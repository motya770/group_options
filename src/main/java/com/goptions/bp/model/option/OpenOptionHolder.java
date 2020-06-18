package com.goptions.bp.model.option;

import com.goptions.bp.model.asset.Asset;

import java.util.List;

/**
 * Created by matvei on 5/17/15.
 */
public class OpenOptionHolder {

    private Asset asset;
    private List<Option> options;
    private boolean simulation;

    public OpenOptionHolder(Asset asset, List<Option> options) {
        this(asset, options, false);
    }

    public OpenOptionHolder(Asset asset, List<Option> options, boolean simulation) {
        this.asset = asset;
        this.options = options;
        this.simulation = simulation;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public boolean isSimulation() {
        return simulation;
    }

    public void setSimulation(boolean simulation) {
        this.simulation = simulation;
    }

    public void addOption(Option option) {
        options.add(option);
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
