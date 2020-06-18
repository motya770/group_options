package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IAssetDao;
import com.goptions.bp.model.asset.Asset;
import org.springframework.stereotype.Repository;

@Repository
public class AssetDao extends EntityDao<Asset> implements IAssetDao {

    public AssetDao() {
        super(Asset.class);
    }
}
