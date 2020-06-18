package com.goptions.bp.controller.admin;

import com.goptions.bp.service.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by matvei on 8/4/15.
 */

@Controller
@RequestMapping(value = "/admin/report")
public class AdReportController {

    @Autowired
    private IReportService reportService;

    @RequestMapping(value = "/get-pl")
    public String getPl(Model model){

        Map<String, Object> pl = reportService.getPl();
        model.addAttribute("pl", pl);

        return "admin/report/main";
    }
}
