package com.goptions.bp.core.job.quote;

import com.goptions.bp.service.IQuotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by matvei on 6/23/15.
 */

@Configuration
@EnableScheduling
@Component
public class QuoteEvictionJob {

    @Autowired
    private IQuotesService quotesService;

    @Scheduled(fixedDelay = 90 * 60 * 1000)
    public void evict(){
        quotesService.deleteOldQuotes();
    }
}
