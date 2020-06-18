package com.goptions.bp.core.manager.impl.scheduler;

import com.goptions.bp.core.manager.scheduler.ISchedulerManager;
import com.goptions.bp.model.entity.IEntity;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Date;
import java.util.Map;

/**
 * Created by matvei on 1/28/15.
 */
@Service
public class SchedulerManager implements ISchedulerManager {

    public static final String F_ENTITY_ID = "entityId";

    private static final Logger logger = LoggerFactory.getLogger(SchedulerManager.class);

    private Scheduler scheduler;

    @Autowired
    private SchedulerFactoryBean quartzScheduler;

    private TransactionTemplate transactionTemplate;

    private HibernateTransactionManager transactionManager;

    @Autowired
    @Qualifier(value = "transactionManager")
    public void setTransactionManager(HibernateTransactionManager transactionManager){
        this.transactionManager = transactionManager;
        transactionTemplate = new TransactionTemplate(transactionManager);
    }

    @PostConstruct
    private void init() throws SchedulerException {
        scheduler = quartzScheduler.getScheduler();
    }

    @Override
    public void start() {
        try {
            scheduler.start();
        }catch (SchedulerException e){
            logger.error("error ", e);
        }
    }

    @PreDestroy
    private void destroy() throws SchedulerException {
        scheduler.shutdown();
    }

    @Override
    @Transactional(value = "transactionManager")
    public void createImmediateEntityJob(Class jobClass, IEntity entity) {
        createImmediateEntityJob(jobClass, entity, null);
    }

    @Override
    @Transactional(value = "transactionManager")
    public void createImmediateEntityJob(Class jobClass, IEntity entity, Map params) {
        // define the job and tie it to our HelloJob class
        JobDetail job = createJob(jobClass, entity, params);
        // Trigger the job to run at startAt time
        Trigger trigger = createTrigger(jobClass, null, entity);

        schedule(job, trigger);
    }

    @Override
    public void deleteEntityJob(Class jobClass, IEntity entity) {
        try {
            String jobName = getStandardJobName(jobClass, entity);
            JobKey jobKey = new JobKey(jobName);
            scheduler.deleteJob(jobKey);
        } catch (Exception e) {
            logger.error("Can't remove job ", e);
        }
    }

    @Override
    @Transactional(value = "transactionManager")
    public void createEntityJob(Class jobClass, Date startAt, IEntity entity) {
        // define the job and tie it to our HelloJob class
        JobDetail job = createJob(jobClass, entity, null);
        // Trigger the job to run at startAt time
        Trigger trigger = createTrigger(jobClass, startAt, entity);

        schedule(job, trigger);
    }

    @Override
    public void schedule(JobDetail job, Trigger trigger) {
        //synchronized (scheduler) {
            transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                @Override
                protected void doInTransactionWithoutResult(TransactionStatus status) {
                    try {
                        scheduler.scheduleJob(job, trigger);
                    } catch (Exception e) {
                        logger.error("Can't scheduler job ", e);
                    }
                }
            });
        //}
    }

    private String getStandardJobName(Class jobClass, IEntity entity) {
        String name = "JOB_" + jobClass.getSimpleName() + "_" + entity.getId();
        return name;
    }

    private JobDetail createJob(Class jobClass, IEntity entity, Map params) {
        String jobName = null;
        if (entity != null) {
            jobName = getStandardJobName(jobClass, entity);
        } else {
            jobName = "JOB_" + jobClass.getSimpleName() + "_" + Math.random() + "_" + Math.random();
        }
        JobDetail job = JobBuilder.newJob(jobClass)
                .withIdentity(jobName)
                .build();
        if (entity != null) {
            job.getJobDataMap().put("entityId", entity.getId());
        }
        //adding objects to the job
        if (params != null) {
            params.forEach((key, value) -> {
                job.getJobDataMap().put((String) key, value);
            });
        }
        return job;
    }

    private Trigger createTrigger(Class jobClass, Date startAt, IEntity entity) {
        //TODO solve name bug!
        Trigger trigger = null;
        String triggerName = null;
        if (entity != null) {
            triggerName = "TRIGGER_" + jobClass.getSimpleName() + "_" + entity.getId();
        } else {
            triggerName = "TRIGGER_" + jobClass.getSimpleName() + "_" + Math.random() + "_" + Math.random();
        }

        TriggerBuilder builder = TriggerBuilder.newTrigger()
                .withIdentity(triggerName);

        if (startAt != null) {
            builder.startAt(startAt);
        } else {
            builder.startNow();
        }

        builder.withSchedule(
                SimpleScheduleBuilder.simpleSchedule()
                        .withMisfireHandlingInstructionNextWithRemainingCount());

        trigger = builder.build();

        return trigger;
    }
}
