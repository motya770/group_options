package com.goptions.bp.model.option.creator;

import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.option.OptionType;

import java.time.DayOfWeek;
import java.util.List;

/**
 * Created by matvei on 6/10/15.
 */
public class FramesContainer {

    private String name;
    private Long[] assets;
    private List<TimeFrame> timeFrames;
    private Boolean useWeek;
    private List<DayOfWeek> dayOfWeeks;
    private Currency currency;
    private Boolean demo;
    private OptionType optionType;

    public OptionType getOptionType() {
        return optionType;
    }

    public void setOptionType(OptionType optionType) {
        this.optionType = optionType;
    }

    public FramesContainer() {

    }

    public Boolean getUseWeek() {
        return useWeek;
    }

    public void setUseWeek(Boolean useWeek) {
        this.useWeek = useWeek;
    }

    public List<DayOfWeek> getDayOfWeeks() {
        return dayOfWeeks;
    }

    public void setDayOfWeeks(List<DayOfWeek> dayOfWeeks) {
        this.dayOfWeeks = dayOfWeeks;
    }

    public Boolean getDemo() {
        return demo;
    }

    public void setDemo(Boolean demo) {
        this.demo = demo;
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

    public Long[] getAssets() {
        return assets;
    }

    public void setAssets(Long[] assets) {
        this.assets = assets;
    }

    public List<TimeFrame> getTimeFrames() {
        return timeFrames;
    }

    public void setTimeFrames(List<TimeFrame> timeFrames) {
        this.timeFrames = timeFrames;
    }
}
