package com.goptions.bp.core.manager.impl;

import com.goptions.bp.core.job.option.CloseOptionJob;
import com.goptions.bp.core.job.option.OpenOptionJob;
import com.goptions.bp.core.job.option.StartOptionTradeJob;
import com.goptions.bp.core.manager.IOptionManager;
import com.goptions.bp.core.manager.scheduler.ISchedulerManager;
import com.goptions.bp.dao.IOptionDao;
import com.goptions.bp.model.option.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class OptionManager implements IOptionManager {

    @Autowired
    private IOptionDao optionDao;

    @Autowired
    private ISchedulerManager schedulerManager;

    @Override
    public Option createOption(Option option) {
        optionDao.save(option);
        createOpenOptionJob(option);
        return option;
    }

    @Override
    public void createOpenOptionJob(Option option) {
        schedulerManager.createEntityJob(OpenOptionJob.class, new Date(option.getBidStartTime()), option);
    }

    @Override
    public void createStartTradeOptionJob(Option option) {
        schedulerManager.createEntityJob(StartOptionTradeJob.class, new Date(option.getTradeStartTime()), option);
    }

    @Override
    public void createCloseOptionJob(Option option) {
        schedulerManager.createEntityJob(CloseOptionJob.class, new Date(option.getTradeEndTime()), option);
    }
}
