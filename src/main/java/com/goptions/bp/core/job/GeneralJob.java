package com.goptions.bp.core.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * Created by matvei on 1/28/15.
 */
public abstract class GeneralJob implements Job {

    private ApplicationContext applicationContext;

    public ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        applicationContext = WebApplicationContextUtils.getWebApplicationContext(
                ContextLoaderListener.getCurrentWebApplicationContext().getServletContext());
    }
}
