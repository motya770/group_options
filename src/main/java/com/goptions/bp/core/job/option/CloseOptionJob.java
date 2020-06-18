package com.goptions.bp.core.job.option;

import com.goptions.bp.core.job.GeneralJob;
import com.goptions.bp.core.manager.impl.scheduler.SchedulerManager;
import com.goptions.bp.core.manager.job.ICoreOptionJobExecutor;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by matvei on 1/28/15.
 */
public class CloseOptionJob extends GeneralJob {

    private static final Logger logger = LoggerFactory.getLogger(OpenOptionJob.class);

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            super.execute(context);

            JobDetail jobDetail = context.getJobDetail();
            JobDataMap jobDataMap = jobDetail.getJobDataMap();
            Long entityId = jobDataMap.getLong(SchedulerManager.F_ENTITY_ID);

            ICoreOptionJobExecutor coreOptionJobManager = getApplicationContext().getBean(ICoreOptionJobExecutor.class);
            coreOptionJobManager.closeOptionExecute(entityId);

        } catch (Exception e) {
            logger.error("{}", e);
            e.printStackTrace();
            throw new JobExecutionException("Exception in CloseOptionJob ", e);
        }
    }
}

