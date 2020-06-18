package com.goptions.bp.controller;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.service.IQuotesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by matvei on 1/23/15.
 */
@RestController
@RequestMapping(value = "/graph")
public class GraphController {

    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

    @Autowired
    private IQuotesService quotesService;

    /*
    @RequestMapping(value = "/get-asset-quotes")
    public List<Quote> getLastQuotes(@RequestParam(required = true) String assetExternalId,
                                     @RequestParam(required = true) Long openTime,
                                     @RequestParam(required = true) Long closeTime) throws GOptionsException {
        List<Quote> quotes = quotesService.getRangeQuotes(assetExternalId, openTime, closeTime);
        return quotes;
    }*/

    @RequestMapping(value = "/get-quotes")
    public List<Quote> getRangeQuotes(@RequestParam(required = true) String assetExternalId,
                                      @RequestParam(required = true) Long openTime,
                                      @RequestParam(required = true) Long closeTime
    ) throws GOptionsException {

        long start = System.currentTimeMillis();
        List<Quote> quotes = quotesService.getRangeQuotes(assetExternalId, openTime, closeTime);
        logger.info("time: " + (System.currentTimeMillis() - start) + " size: " + quotes.size());
        return quotes;
    }

}
