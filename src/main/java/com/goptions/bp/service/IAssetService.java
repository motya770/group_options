package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;

import java.util.List;
import java.util.Map;

public interface IAssetService {

    Asset readByExternalId(String externalId);

    List<Asset> findAssetsByName(String name);

    List<Asset> findAssetsByExternalId(String externalId);

    Asset read(Long id);

    void create(Asset asset);

    void delete(Asset asset);

    void update(Asset asset);

    List<Asset> listAll(Map<String, String[]> params) throws GOptionsException;

    List<Asset> listAll() throws GOptionsException;

    List<Asset> listAllActive();

}
