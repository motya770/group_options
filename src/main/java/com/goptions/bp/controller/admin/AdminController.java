package com.goptions.bp.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by matvei on 12/15/14.
 */
@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    @RequestMapping(value = "/index")
    public String index() {
        return "admin/index";
    }

}
