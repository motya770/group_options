package com.goptions.bp.controller;


import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.option.OpenOptionHolder;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.service.IOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/options")
public class OptionController {

    @Autowired
    private IOptionService optionService;

    @RequestMapping(value = "/get-open-options")
    public List<OpenOptionHolder> getOpenOptions(
            //@RequestParam BidAmountType bidAmountType
            @RequestParam OptionType optionType
    ) throws GOptionsException{

        long start = System.currentTimeMillis();
        List<OpenOptionHolder> openOptions = optionService.getOpenOptionsMap(optionType);

        System.out.println("openOptions: " + (System.currentTimeMillis() - start));
        return openOptions;
    }

    @RequestMapping(value = "/get-option", produces = MediaType.APPLICATION_JSON_VALUE)
    public Option getOption(@RequestParam(required = true) Long optionId) {
        Option option = optionService.read(optionId);
        return option;
    }
}
