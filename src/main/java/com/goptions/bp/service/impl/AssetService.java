package com.goptions.bp.service.impl;

import com.goptions.bp.dao.IAssetDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.asset.AssetType;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.utils.DateUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
@Transactional(value = "transactionManager")
public class AssetService implements IAssetService {

    private static final Logger logger = LoggerFactory.getLogger(AssetService.class);

    @Autowired
    private IAssetDao assetDao;

    @Override
    public void create(Asset asset) {
        asset.setDateCreated(System.currentTimeMillis());
        assetDao.save(asset);
    }

    @Override
    public Asset readByExternalId(String externalId) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Asset.class);
        criteria.add(Restrictions.eq(Asset.F_EXTERNAL_ID, externalId));
        return assetDao.findOne(criteria);
    }

    @Override
    public List<Asset> findAssetsByName(String name) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Asset.class);
        criteria.add(Restrictions.ilike(Asset.F_NAME, "%" + name + "%"));
        criteria.add(Restrictions.eq(Asset.F_ACTIVE, Boolean.TRUE));
        criteria.addOrder(Order.asc(Asset.F_NAME));
        return assetDao.list(criteria);
    }

    @Override
    public List<Asset> findAssetsByExternalId(String externalId) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Asset.class);
        criteria.add(Restrictions.ilike(Asset.F_EXTERNAL_ID, "%" + externalId + "%"));
        criteria.addOrder(Order.asc(Asset.F_NAME));
        return assetDao.list(criteria);
    }

    @Override
    public Asset read(Long id) {
        return assetDao.read(id);
    }

    @Override
    public void update(Asset asset) {
        assetDao.update(asset);
    }

    @Override
    public List<Asset> listAll() throws GOptionsException{
        return listAll(null);
    }

    @Override
    public List<Asset> listAll(Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(Asset.class);
        buildAdminAssetCriteria(criteria, params);
        return assetDao.list(criteria);
    }

    private void buildAdminAssetCriteria(DetachedCriteria criteria, Map<String, String[]> params)
            throws GOptionsException {
        if(params == null){
            return;
        }

        try {
            String[] assetTypeArr = params.get(Asset.F_ASSET_TYPE);
            if (assetTypeArr != null && !StringUtils.isEmpty(assetTypeArr[0])) {
                criteria.add(Restrictions.eq(Asset.F_ASSET_TYPE, AssetType.valueOf(assetTypeArr[0])));
            }
        }catch (Exception e){
            logger.error("Parsing error", e);
            throw new GOptionsException("Parsing error");
        }
    }

    @Override
    public List<Asset> listAllActive() {
        DetachedCriteria criteria = DetachedCriteria.forClass(Asset.class);
        criteria.add(Restrictions.eq(Asset.F_ACTIVE, true));
        return assetDao.list(criteria);
    }

    @Override
    public void delete(Asset asset) {
        assetDao.delete(asset);
    }
}
