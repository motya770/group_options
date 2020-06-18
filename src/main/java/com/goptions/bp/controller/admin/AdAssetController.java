package com.goptions.bp.controller.admin;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.asset.AssetType;
import com.goptions.bp.service.IAssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
@Controller
@RequestMapping(value = "/admin/asset")
public class AdAssetController {

    @Autowired
    private IAssetService assetService;

    @RequestMapping(value = "/find-by-external-id")
    @ResponseBody
    public List<Asset> findAssetByExternalId(@RequestParam String externalId) throws GOptionsException {
        List<Asset> assets = assetService.findAssetsByExternalId(externalId);
        return assets;
    }

    @RequestMapping(value = "/find-by-name")
    @ResponseBody
    public List<Asset> findAssetByName(@RequestParam(value = "name", required = true) String name) throws GOptionsException {
        List<Asset> assets = assetService.findAssetsByName(name);
        return assets;
    }

    @RequestMapping(value = "/create")
    public String create(@RequestParam(value = "name", required = true) String name, @RequestParam(value = "type", required = true) String type,
                         @RequestParam(value = "externalId", required = true) String externalId,
                         @RequestParam Integer pipSize,
                         Model model) throws GOptionsException {
        Asset asset = new Asset();

        AssetType assetType = validateAsset(name, type, externalId, pipSize);

        asset.setName(name);
        asset.setAssetType(assetType);
        asset.setExternalId(externalId);
        asset.setPipSize(pipSize);

        assetService.create(asset);
        System.out.println("AdAssetController.create " + asset.getId());
        model.addAttribute(asset);

        return "admin/asset/show";
    }

    private AssetType validateAsset(String name, String type, String externalId, Integer pipSize) throws GOptionsException {
        if (StringUtils.isEmpty(name)) {
            throw new GOptionsException("Name can't be empty");
        }
        if (StringUtils.isEmpty(type)) {
            throw new GOptionsException("Type can't be empty");
        }
        if (StringUtils.isEmpty(externalId)) {
            throw new GOptionsException("ExternalId can't be empty");
        }
        AssetType assetType = AssetType.valueOf(type.toUpperCase());
        if (assetType == null) {
            throw new GOptionsException("Can't parse asset type.");
        }

        if(pipSize==null){
            throw new GOptionsException("PipSize can't be empty.");
        }
        return assetType;
    }


    @RequestMapping(value = "/new-entity")
    public String newEntity() {
        return "admin/asset/new-entity";
    }

    @RequestMapping(value = "/list")
    public String list(HttpServletRequest request, Model model) throws GOptionsException{

        Map<String, String[]> params = request.getParameterMap();

        List<Asset> assets = assetService.listAll(params);
        model.addAttribute(assets);

        /*

        List<Asset> assetList =  assetService.listAll();
        for(Asset a: assetList){
            if(a.getExternalId().contains(" ") || a.getExternalId().contains("/")) {
                a.setExternalId(a.getName().replace(" ", "_").replace("/", "_"));
                assetService.update(a);
            }
        }*/

        return "admin/asset/list";
    }

    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        Asset asset = assetService.read(id);
        model.addAttribute(asset);
        return "admin/asset/show";
    }

    @RequestMapping(value = "/update")
    public String update(@RequestParam(value = "id", required = true) Long id,
                         @RequestParam(value = "name", required = true) String name,
                         @RequestParam(value = "type", required = true) String type,
                         @RequestParam(value = "externalId", required = true) String externalId,
                         @RequestParam(value = "active", required = true) boolean active,
                         @RequestParam Integer pipSize,
                         Model model) throws GOptionsException {

        Asset asset = assetService.read(id);
        if (asset != null) {
            AssetType assetType = validateAsset(name, type, externalId, pipSize);

            asset.setName(name);
            asset.setAssetType(assetType);
            asset.setExternalId(externalId);
            asset.setActive(active);
            asset.setPipSize(pipSize);

            assetService.update(asset);
        }
        model.addAttribute(asset);
        return "admin/asset/show";
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(required = true) Long id) {
        Asset asset = assetService.read(id);
        if (asset != null) {
            assetService.delete(asset);
        }
        return "redirect:" + "/admin/asset/list";
    }


    @RequestMapping(value = "/edit")
    public String edit(@RequestParam(required = true) Long id, Model model) {
        Asset asset = assetService.read(id);
        model.addAttribute(asset);
        return "admin/asset/edit";
    }
}
