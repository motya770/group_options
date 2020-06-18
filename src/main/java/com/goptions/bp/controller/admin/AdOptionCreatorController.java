package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.option.creator.FramesContainer;
import com.goptions.bp.model.option.creator.OptionCreator;
import com.goptions.bp.service.IOptionCreatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.util.List;

/**
 * Created by matvei on 3/8/15.
 *
 * commented this class because
 * we can't create option from admin
 *
 */
//@Controller
//@RequestMapping(value = "/admin/option-creator")
public class AdOptionCreatorController {

    /*
    @Autowired
    private IOptionCreatorService optionCreatorService;

    @RequestMapping("/cancel-generated-options")
    public String CancelGeneratedOptions(@RequestParam(required = true) Long id) throws GOptionsException {
        optionCreatorService.cancelGeneratedOption(id);
        return  "redirect:/admin/option-creator/show?id=" + id;
    }

    @RequestMapping("/generate-options")
    public String generateOptions(@RequestParam(required = true) Long id) throws GOptionsException {
        optionCreatorService.generateOptions(id);
        return  "redirect:/admin/option-creator/show?id=" + id;
    }


    @RequestMapping(value = "/list")
    public String list(Model model) throws GOptionsException {

        List<OptionCreator> optionCreators = optionCreatorService.getAllCreators();
        model.addAttribute(optionCreators);

        return "admin/option/creator/list";
    }

    @RequestMapping(value = "/edit")
    public String edit(@RequestParam(required = true) Long id, Model model) {
        OptionCreator optionCreator = optionCreatorService.read(id);
        model.addAttribute(optionCreator);
        return "admin/option/creator/entity";
    }

    @RequestMapping(value = "/new-entity")
    public String newEntity() {
        return "admin/option/creator/entity";
    }


    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        OptionCreator creator = optionCreatorService.read(id);
        model.addAttribute(creator);
        return "admin/option/creator/show";
    }


    @RequestMapping(value = "/create")
    @ResponseBody
    public OptionCreator create(@RequestBody FramesContainer framesContainer) throws GOptionsException, ParseException {
        OptionCreator optionCreator =  optionCreatorService.create(framesContainer);
        return optionCreator;
    }

    @RequestMapping(value = "/update")
    @ResponseBody
    public OptionCreator update(@RequestParam(value = "id") Long id,
                         @RequestBody FramesContainer framesContainer) throws GOptionsException {

        OptionCreator optionCreator = optionCreatorService.update(id, framesContainer);
        return optionCreator;
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(required = true) Long id) {

        OptionCreator optionCreator = new OptionCreator();
        optionCreator.setId(id);

        optionCreatorService.delete(optionCreator);

        return "redirect:" + "/admin/option-creator/list";
    }
    */
}
