package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.bactivity.BActivity;
import com.goptions.bp.service.IBActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 3/22/15.
 */
@Controller
@RequestMapping(value = "/admin/bactivity")
public class AdBActivityController {

    public static final String ACTIVITIES_LIST = "activitiesList";

    @Autowired
    private IBActivityService activityService;


    @RequestMapping(value = " /account/get-account-activities")
    public String getAccountActivities(@RequestParam Long accountId,
                                       @RequestParam(required = false) Integer pageNumber,
                                       Model model) throws GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }

        List<BActivity> activities = activityService.getAdminAccountActivities(accountId, pageNumber);
        model.addAttribute(ACTIVITIES_LIST, activities);

        return "admin/account/activities-table";
    }


    @RequestMapping(value = "/list")
    public String list(@RequestParam(required = false) Integer pageNumber,
                       HttpServletRequest request,
                       Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();

        List<BActivity> activities = activityService.getPagedBActivity(pageNumber, params);
        model.addAttribute(ACTIVITIES_LIST, activities);

        return "admin/bactivity/list";
    }
}
