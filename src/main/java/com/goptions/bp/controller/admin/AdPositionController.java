package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.service.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
@Controller
@RequestMapping(value = "/admin/position")
public class AdPositionController {

    @Autowired
    private IPositionService positionService;

    @RequestMapping(value = "/account/get-open")
    public String getAccountOpenPositions(@RequestParam Long accountId,
                                          @RequestParam(required = false) Integer pageNumber,
                                          HttpServletRequest request,
                                          Model model) throws GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();

        List<Position> positions = positionService.getAdminAccountOpenPositions(accountId, pageNumber, params);
        model.addAttribute(positions);
        return "admin/account/positions-table";
    }

    @RequestMapping(value = "/account/get-history")
    public String getAccountHistoryPositions(@RequestParam Long accountId,
                                             @RequestParam(required = false) Integer pageNumber,
                                             HttpServletRequest request,
                                             Model model) throws GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();
        List<Position> positions = positionService.getAdminAccountHistoryPositions(accountId, pageNumber, params);
        model.addAttribute(positions);
        return "/admin/account/positions-table";
    }

    @RequestMapping(value = "/list")
    public String list(@RequestParam(required = false) Integer pageNumber,
                       HttpServletRequest request,
                       //ModelMap modelMap) throws GOptionsException{
                       Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params =  request.getParameterMap();
        List<Position> positions = positionService.getPositions(pageNumber, params);
        model.addAttribute(positions);
        return "admin/position/list";
    }

    @RequestMapping(value = "/open")
    public String open(@RequestParam(required = false) Integer pageNumber,
                       HttpServletRequest request,
                       Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }
        Map<String, String[]> params = request.getParameterMap();

        List<Position> positions = positionService.getAdminOpenPositions(pageNumber, params);
        model.addAttribute(positions);
        return "admin/position/list";
    }

    @RequestMapping(value = "/history")
    public String history(@RequestParam(required = false) Integer pageNumber,
                          HttpServletRequest request,
                          Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }

        Map<String, String[]> params = request.getParameterMap();
        List<Position> positions = positionService.getAdminHistoryPositions(pageNumber, params);
        model.addAttribute(positions);
        return "admin/position/list";
    }

    @RequestMapping(value = "/get-unfinished-positions")
    public String getAdminUnfinishedPositions(HttpServletRequest request, Model model)
        throws GOptionsException
    {
        Map<String, String[]> params = request.getParameterMap();
        List<Position> positions = positionService.getAdminUnfinishedPositions(params);
        model.addAttribute(positions);
        return "admin/position/list";
    }

    @RequestMapping(value = "/cancel-position")
    public String cancelPosition(@RequestParam(required = true) Long id,
                                 @RequestParam(required = true) String redirect) throws GOptionsException {
        positionService.cancelPosition(id);
        return "redirect:" + redirect;
    }


    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        Position position = positionService.read(id);
        model.addAttribute(position);
        return "admin/position/show";
    }
}
