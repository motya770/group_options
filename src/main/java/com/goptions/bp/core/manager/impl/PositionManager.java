package com.goptions.bp.core.manager.impl;

import com.goptions.bp.core.job.position.CloseShortPositionJob;
import com.goptions.bp.core.job.position.OpenPositionJob;
import com.goptions.bp.core.manager.IPositionManager;
import com.goptions.bp.core.manager.scheduler.ISchedulerManager;
import com.goptions.bp.model.position.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class PositionManager implements IPositionManager {

    @Autowired
    private ISchedulerManager schedulerManager;

    @Override
    public void createOpenPositionJob(Position position) {
        schedulerManager.createImmediateEntityJob(OpenPositionJob.class, position);
        System.out.println("after creating opj " + new Date());
    }

    @Override
    public void createFutureOpenPositionJob(Position position) {
        schedulerManager.createEntityJob(OpenPositionJob.class, new Date(position.getOpenTime() + 2_000), position);
    }

    @Override
    public void createCloseShortPositionJob(Position position) {
        //TODO fix close time
        schedulerManager.createEntityJob(CloseShortPositionJob.class, new Date(position.getOpenTime() + 60_000), position);
    }
}
