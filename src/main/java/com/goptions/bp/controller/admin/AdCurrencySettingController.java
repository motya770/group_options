package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;
import com.goptions.bp.service.ICurrencySettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by matvei on 5/31/15.
 */
@Controller
@RequestMapping(value = "/admin/currency")
public class AdCurrencySettingController {

    @Autowired
    private ICurrencySettingService currencySettingService;

    @RequestMapping(value = "/create")
    public String create(
            @RequestParam Currency currency,
            @RequestParam BigDecimal minBid,
            @RequestParam BigDecimal maxBid,
            //@RequestParam BigDecimal recommendedBid,
            @RequestParam BigDecimal minDeposit,
            @RequestParam BigDecimal maxDeposit,
            Model model) throws GOptionsException {

        CurrencySetting currencySetting = currencySettingService.create(currency, minBid, maxBid, minDeposit, maxDeposit);
        model.addAttribute(currencySetting);

        return "redirect:/admin/currency/show?id=" + currencySetting.getId();
    }

    @RequestMapping(value = "/new-entity")
    public String newEntity(Model model) {
        return "admin/currency/new-entity";
    }


    @RequestMapping(value = "/edit")
    public String edit(@RequestParam(required = true) Long id, Model model) {
        CurrencySetting currencySetting = currencySettingService.read(id);
        model.addAttribute(currencySetting);
        return "admin/currency/edit";
    }

    @RequestMapping(value = "/list")
    public String list(Model model) {
        List<CurrencySetting> currencySettings = currencySettingService.listAll();
        model.addAttribute(currencySettings);
        return "admin/currency/list";
    }

    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        CurrencySetting currencySetting = currencySettingService.read(id);
        model.addAttribute(currencySetting);
        return "admin/currency/show";
    }

    @RequestMapping(value = "/update")
    public String update(
            @RequestParam(value = "id") Long id,
            @RequestParam Currency currency,
            @RequestParam BigDecimal minBid,
            @RequestParam BigDecimal maxBid,
            //@RequestParam BigDecimal recommendedBid,
            @RequestParam BigDecimal minDeposit,
            @RequestParam BigDecimal maxDeposit,
            Model model) throws GOptionsException {

        CurrencySetting currencySetting = new CurrencySetting();
        currencySetting.setId(id);
        currencySetting.setCurrency(currency);
        currencySetting.setMinBid(minBid);
        currencySetting.setMaxBid(maxBid);
        //currencySetting.setRecommendedBid(recommendedBid);
        currencySetting.setMinDeposit(minDeposit);
        currencySetting.setMaxDeposit(maxDeposit);

        currencySettingService.update(currencySetting);

        model.addAttribute(currencySetting);

        return "admin/currency/show";
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(required = true) Long id) {

        CurrencySetting currencySetting = new CurrencySetting();
        currencySetting.setId(id);
        currencySettingService.delete(currencySetting);

        return "redirect:" + "/admin/currency/list";
    }
}
