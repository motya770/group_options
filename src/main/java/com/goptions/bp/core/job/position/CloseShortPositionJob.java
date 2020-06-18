package com.goptions.bp.core.job.position;

import com.goptions.bp.core.job.GeneralJob;
import com.goptions.bp.core.manager.impl.scheduler.SchedulerManager;
import com.goptions.bp.core.manager.job.ICorePositionJobExecutor;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by matvei on 9/12/15.
 */
public class CloseShortPositionJob extends GeneralJob {

    private static final Logger logger = LoggerFactory.getLogger(OpenPositionJob.class);

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        try {
            super.execute(context);
            JobDetail jobDetail = context.getJobDetail();
            JobDataMap jobDataMap = jobDetail.getJobDataMap();
            Long entityId = jobDataMap.getLong(SchedulerManager.F_ENTITY_ID);

            ICorePositionJobExecutor coreJobManger = getApplicationContext().getBean(ICorePositionJobExecutor.class);
            coreJobManger.closeShortPositionExecute(entityId);
        } catch (Exception e) {
            logger.error("{}", e);
            throw new JobExecutionException("Exception in OpenPositionJob ", e);
        }
    }
}
