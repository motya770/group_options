package com.goptions.bp.core.job.quote;

import com.goptions.bp.core.job.GeneralJob;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.service.IQuotesService;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;

/**
 * Created by matvei on 2/16/15.
 */
//TODO remove this unused code
public class CreateQuoteJob extends GeneralJob {

    private static final Logger logger = LoggerFactory.getLogger(CreateQuoteJob.class);

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            super.execute(context);
            JobDetail jobDetail = context.getJobDetail();
            JobDataMap jobDataMap = jobDetail.getJobDataMap();

            BigDecimal value = BigDecimal.valueOf(Double.parseDouble(jobDataMap.getString(Quote.F_VALUE)));
            String assetExternalId = jobDataMap.getString(Quote.F_ASSET_EXTERNAL_ID);
            Long time = Long.parseLong(jobDataMap.getString(Quote.F_TIME));

            IQuotesService quotesService = getApplicationContext().getBean(IQuotesService.class);
            quotesService.create(assetExternalId, value, time);
        } catch (Exception e) {
            logger.error("{}", e);
            throw new JobExecutionException("Exception in CreateQuoteJob ", e);
        }
    }
}
