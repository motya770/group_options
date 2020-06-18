package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.IQuotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 1/13/15.
 */
@Controller
@RequestMapping(value = "/admin/quote")
public class AdQuoteController {

    @Autowired
    private IQuotesService quotesService;

    @Autowired
    private IAssetService assetService;

    @Resource(name="generalSettings")
    private Map<String, String> generalSettings;

    @RequestMapping(value = "/list")
    public String list(Model model) throws GOptionsException{
        List<Asset> assets = assetService.listAll();
        model.addAttribute(assets);
        model.addAttribute("streamerHost", generalSettings.get("STREAMER_HOST"));
        return "admin/quote/list";
    }

    @RequestMapping(value = "/history")
    public String history(@RequestParam(required = false) Integer pageNumber,
                          HttpServletRequest request,
                          Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }
        Map<String, String[]> params = request.getParameterMap();
        List<Quote> quotes = quotesService.getPagedQuotes(pageNumber, params);
        model.addAttribute(quotes);
        model.addAttribute(pageNumber);
        return "admin/quote/history";
    }
}
