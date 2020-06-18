package com.goptions.bp.controller;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.messaging.producer.QuotesSimulator;
import com.goptions.bp.service.IAssetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.xml.ws.RequestWrapper;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Handles requests for the application home page.
 */
@Controller
public class PagesController {

    private static final Logger logger = LoggerFactory.getLogger(PagesController.class);

    /**
     * Simply selects the home view to render by returning its name.
     */
    @Autowired
    private IAssetService assetService;

    @Autowired
    private QuotesSimulator tickSimulator;

    @RequestMapping(value = "/angular", method = RequestMethod.GET)
    public String angular(){
        return "angular";
    }

    @RequestMapping(value = "/platform", method = RequestMethod.GET)
    public String platform(Locale locale, Model model) {
        logger.info("1 home! The client locale is {}.", locale);

        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

        String formattedDate = dateFormat.format(date);

        model.addAttribute("serverTime", formattedDate);

        return "platform";
    }

    @RequestMapping(value = "/lean", method = RequestMethod.GET)
    public String lean() {
        return "lean";
    }

    @RequestMapping(value = "/about", method = RequestMethod.GET)
    public String about() {
        return "about";
    }

    @RequestMapping(value = "/customer", method = RequestMethod.GET)
    public String customer() throws GOptionsException {
        return "/customer/customer";
    }

    @RequestMapping(value = "/technical-analysis", method = RequestMethod.GET)
    public String technicalAnalyses() {
        return "technical-analysis";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    /*
    @RequestMapping(value = "/positions-history", method = RequestMethod.GET)
    public String positionsHistory() {
        return "customer/positions-history";
    }*/

    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String registration() {
        return "registration";
    }

    @RequestMapping(value = "/index2")
    public String testIndex2() {
        return "trade/index-2";
    }

    @RequestMapping(value = "/index1")
    public String testIndex1() {
        return "trade/index-1";
    }

    @RequestMapping(value = "/index-test")
    public String testTest() {
        return "index-test";
    }

}
