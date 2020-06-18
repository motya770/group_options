package com.goptions.bp.core.manager.scheduler;

import com.goptions.bp.model.entity.IEntity;
import org.quartz.JobDetail;
import org.quartz.Trigger;

import java.util.Date;
import java.util.Map;

/**
 * Created by matvei on 1/28/15.
 */
public interface ISchedulerManager {

    void start();

    void schedule(JobDetail job, Trigger trigger);

    void createEntityJob(Class jobClass, Date startAt, IEntity entity);

    void createImmediateEntityJob(Class jobClass, IEntity entity);

    void createImmediateEntityJob(Class jobClass, IEntity entity, Map params);

    void deleteEntityJob(Class jobClass, IEntity entity);
}
