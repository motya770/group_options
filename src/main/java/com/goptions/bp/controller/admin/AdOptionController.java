package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionConfigHolder;
import com.goptions.bp.model.option.OptionConfiguration;
import com.goptions.bp.model.option.OptionType;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.IOptionService;
import com.goptions.bp.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
@Controller
@RequestMapping(value = "/admin/option")
public class AdOptionController {

    @Autowired
    private IOptionService optionService;

    @Autowired
    private IAssetService assetService;


    @RequestMapping(value = "/create")
    public String create(@RequestParam(value = "assetId") Long assetId,
                         @RequestParam(value = "bidStartTime") String bidStartTime,
                         @RequestParam(value = "tradeStartTime") String tradeStartTime,
                         @RequestParam(value = "tradeEndTime") String tradeEndTime,
                         @RequestParam(value = "demo", required = false) String demo,
                         @RequestParam Currency currency,
                         @RequestParam(required = false) BigDecimal profitPercent,
                         @RequestParam(required = false) BigDecimal lossInsurance,
                         @RequestParam(required = false) BigDecimal maxLimitation,
                         @RequestParam(required = false) BigDecimal minLimitation,
                         @RequestParam(required = true) OptionType optionType,
                         Model model) throws GOptionsException, ParseException {

        Asset asset = new Asset();
        asset.setId(assetId);
        OptionConfigHolder optionConfigHolder = optionService.getCurrencyConfigHolder(currency);

        updateOptionConfiguration(optionConfigHolder.getOptionConfiguration(), profitPercent,
                lossInsurance, maxLimitation, minLimitation);

        DateFormat formatter = new SimpleDateFormat(DateUtils.FULL_DATE_FORMAT);

        Boolean isDemo = Boolean.FALSE;
        if ("on".equals(demo)) {
            isDemo = Boolean.TRUE;
        }

        long bidStart = formatter.parse(bidStartTime).getTime();

        //checking just in create function
        if (bidStart < System.currentTimeMillis()) {
            throw new GOptionsException("Bid start can't be less than now.");
        }

        Option option = optionService.create(asset,
                bidStart,
                formatter.parse(tradeStartTime).getTime(),
                formatter.parse(tradeEndTime).getTime(), isDemo,
                currency,
                optionConfigHolder, optionType, null);//the is no option creator in this case of creation.

        List<Asset> assets = assetService.listAllActive();
        model.addAttribute(option);
        model.addAttribute(assets);
        return "redirect:/admin/option/show?id=" + option.getId();
    }

    private void updateOptionConfiguration(OptionConfiguration configuration,
                                           BigDecimal profitPercent,
                                           BigDecimal lossInsurance,
                                           BigDecimal maxLimitation,
                                           BigDecimal minLimitation) {
        if (profitPercent != null) {
            configuration.setProfitPercent(profitPercent);
        }
        if (lossInsurance != null) {
            configuration.setLossInsurance(lossInsurance);
        }
        if (maxLimitation != null) {
            configuration.setMaxLimitation(maxLimitation);
        }

        if (minLimitation != null) {
            configuration.setMinLimitation(minLimitation);
        }
    }

    @RequestMapping(value = "/cancel")
    public String cancelPosition(@RequestParam(value = "id") Long id,
                                 Model model) throws GOptionsException, ParseException {
        Option option = optionService.cancelOption(id);
        model.addAttribute(option);
        return "admin/option/show";
    }


    @RequestMapping(value = "/new-entity")
    public String newEntity(Model model) {
        List<Asset> assets = assetService.listAllActive();
        model.addAttribute(assets);
        boolean editingMode = false;
        model.addAttribute(editingMode);
        return "admin/option/new-entity";
    }


    @RequestMapping(value = "/edit")
    public String edit(@RequestParam(required = true) Long id, Model model) {
        List<Asset> assets = assetService.listAllActive();
        Option option = optionService.read(id);
        model.addAttribute(assets);
        model.addAttribute(option);
        return "admin/option/edit";
    }

    @RequestMapping(value = "/list")
    public String list(@RequestParam(required = false) Integer pageNumber, HttpServletRequest request, Model model) throws
            GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();
        List<Option> options = optionService.getAllOptions(pageNumber, params);
        model.addAttribute(options);
        return "admin/option/list";
    }

    @RequestMapping(value = "/open")
    public String open(@RequestParam(required = false) Integer pageNumber,
                       HttpServletRequest request,
                       Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();
        List<Option> options = optionService.getOpenOptions(pageNumber, params);
        model.addAttribute(options);
        return "admin/option/list";
    }


    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        Option option = optionService.read(id);
        model.addAttribute(option);
        return "admin/option/show";
    }


    @RequestMapping(value = "/update")
    public String update(@RequestParam(value = "id") Long id, @RequestParam(value = "assetId") Long assetId,
                         @RequestParam(value = "bidStartTime") String bidStartTime,
                         @RequestParam(value = "tradeStartTime") String tradeStartTime,
                         @RequestParam(value = "tradeEndTime") String tradeEndTime,
                         @RequestParam Currency currency,
                         @RequestParam(required = false) BigDecimal profitPercent,
                         @RequestParam(required = false) BigDecimal lossInsurance,
                         @RequestParam(required = false) BigDecimal maxLimitation,
                         @RequestParam(required = false) BigDecimal minLimitation,

                         Model model) throws ParseException, GOptionsException {

        Asset asset = new Asset();
        asset.setId(assetId);

        DateFormat formatter = new SimpleDateFormat(DateUtils.FULL_DATE_FORMAT);

        Option option = optionService.read(id);
        option.setAsset(asset);
        option.setBidStartTime(formatter.parse(bidStartTime).getTime());
        option.setTradeStartTime(formatter.parse(tradeStartTime).getTime());
        option.setTradeEndTime(formatter.parse(tradeEndTime).getTime());
        option.setCurrency(currency);

        OptionConfiguration configuration = option.getOptionConfiguration();
        updateOptionConfiguration(configuration, profitPercent, lossInsurance, maxLimitation, minLimitation);

        optionService.update(option);
        model.addAttribute(option);
        return "admin/option/show";
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(required = true) Long id) {
        Option option = new Option();
        option.setId(id);
        optionService.delete(option);
        return "redirect:" + "/admin/option/list";
    }
}
