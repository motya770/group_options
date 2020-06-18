package com.goptions.bp.controller.customer;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.bactivity.BActivity;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.service.IBActivityService;
import com.goptions.bp.service.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by matvei on 3/10/15.
 */
@RestController
@RequestMapping(value = "/customer", method = {RequestMethod.POST})
public class CustomerController {

    @Autowired
    private IBActivityService activityService;

    @Autowired
    private IPositionService positionService;

    @RequestMapping(value = "/get-past-positions")
    public List<Position> getPastPositions(@RequestParam(required = false) Integer pageNumber) {
        if (pageNumber == null) {
            pageNumber = 1;
        }
        List<Position> positions = positionService.getHistoryPositions(pageNumber);
        return positions;
    }

    @RequestMapping(value = "/get-unfinished-positions")
    public List<Position> getUnfinishedPositions() {
        List<Position> positions = positionService.getUnfinishedPositions();
        return positions;
    }

    //canceled and rejected positions
    @RequestMapping(value = "/get-failed-positions")
    public List<Position> getFailedPositions(@RequestParam(required = false) Integer pageNumber) throws GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }
        return positionService.getFailedPositions(pageNumber);
    }

    @RequestMapping(value = "/get-balance-activity")
    public List<BActivity> getBalanceActivity(@RequestParam(required = false) Integer pageNumber) throws GOptionsException {
        if (pageNumber == null) {
            pageNumber = 1;
        }
        List<BActivity> activities = activityService.getAccountActivities(pageNumber);
        return activities;
    }
}
