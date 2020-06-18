package com.goptions.bp.core.manager.impl;

import com.goptions.bp.core.manager.IQuoteManager;
import com.goptions.bp.core.manager.cache.IQuoteCache;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.IQuotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Created by matvei on 2/16/15.
 */
@Component
public class QuoteManager implements IQuoteManager {

    //@Autowired
    //private ISchedulerManager schedulerManager;

    @Autowired
    private IQuotesService quotesService;

    @Qualifier(value = "taskExecutor")
    @Autowired
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

    @Autowired
    private IAssetService assetService;

    @Autowired
    private IQuoteCache quoteCache;

    @Override
    public void createCreateQuoteJob(String assetExternalId, BigDecimal price, Long time) {

        quoteCache.addQuote(assetExternalId, price, time);
        QuoteCreator quoteCreator = new QuoteCreator(assetExternalId, price, time);
        threadPoolTaskExecutor.execute(quoteCreator);
    }

    public class QuoteCreator implements Runnable {

        private String assetExternalId;
        private BigDecimal value;
        private Long time;

        public QuoteCreator(String assetExternalId, BigDecimal value, Long time) {
            this.assetExternalId = assetExternalId;
            this.value = value;
            this.time = time;
        }

        @Override
        public void run() {
            QuoteManager.this.quotesService.create(assetExternalId, value, time);
        }
    }
}
