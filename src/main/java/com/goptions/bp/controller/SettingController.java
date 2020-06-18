package com.goptions.bp.controller;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.IAccountService;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.ICurrencySettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by matvei on 6/5/15.
 */
@RestController
@RequestMapping(value = "/settings")
public class SettingController {

    @Autowired
    private ICurrencySettingService currencySettingService;

    @Autowired
    private IAccountService accountService;

    @Resource(name="generalSettings")
    private Map<String, String> generalSettings;

    @Autowired
    private IAssetService assetService;

    @RequestMapping(value = "/get-active-assets", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public List<Asset> getActiveAssets() throws GOptionsException {
        return assetService.listAllActive();
    }

    @RequestMapping(value = "/get-settings", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getSettings() throws GOptionsException {
        AccountDetails accountDetails = accountService.getCurrentAccount();
        Currency currency = null;
        if (accountDetails != null) {
            currency = accountDetails.getAccount().getCurrency();
            if (currency == null) {
                throw new GOptionsException("Internal exception. Every account should have currency!");
            }
        } else {
            currency = currencySettingService.getDefaultCurrency();
        }

        CurrencySetting currencySetting = currencySettingService.find(currency);
        if(currencySetting==null){
            throw new GOptionsException("Currency settings for " + currency + " not found.");
        }
        Locale locale =  LocaleContextHolder.getLocale();

        Map<String, Object> settings = new HashMap<>();
        settings.put("currencySettings", currencySetting);
        settings.put("streamerHost", generalSettings.get("STREAMER_HOST"));
        settings.put("locale", locale.getLanguage());


        return settings;
    }
}
