package com.goptions.bp.service.impl;

import com.goptions.bp.core.manager.cache.IQuoteCache;
import com.goptions.bp.dao.IQuoteDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.service.IAssetService;
import com.goptions.bp.service.IQuotesService;
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

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 1/3/15.
 */
@Service
@Transactional(value = "transactionManager")
public class QuotesService implements IQuotesService {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    //private static final int QUOTE_PAGE_SIZE = 100;

    private static final long ONE_HOUR_MILLIS = 60 *  60 * 1000;

    public static final long HALF_OF_HOUR_MILLIS1 = 30 * 60 * 1000;

    @Autowired
    private IQuoteDao quoteDao;

    @Autowired
    private IAssetService assetService;

    @Autowired
    private IQuoteCache quoteCache;

    @Override
    public void deleteOldQuotes() {
        //TODO add sheduler
        quoteDao.deleteOlderThan(System.currentTimeMillis() - ONE_HOUR_MILLIS);
    }

    @Override
    public void create(Quote quote) {
        quoteDao.save(quote);
    }

    @Transactional(value = "transactionManager", rollbackFor = Exception.class)
    @Override
    public void create(String assetExternalId, BigDecimal value, Long time) {
        Quote quote = new Quote();
        Asset asset = assetService.readByExternalId(assetExternalId);
        if (asset == null) {
            log.error("Can't find asset: {}", assetExternalId);
            return;
        }
        quote.setAsset(asset);
        quote.setTime(time);
        quote.setAssetExternalId(asset.getExternalId());

        Integer pipSize = asset.getPipSize();
        BigDecimal price = value.setScale(pipSize, BigDecimal.ROUND_DOWN);

        /*
        if("EUR/USD".equals(assetExternalId)){
            System.out.println("EU price: " + price + " " + time);
        }*/

        quote.setValue(price);
        create(quote);
        quoteDao.flush();
    }


    @Override
    public Quote getLastQuote(String assetExternalId) throws GOptionsException {
        if (StringUtils.isEmpty(assetExternalId)) {
            throw new GOptionsException("Asset External Id can't be empty!");
        }
        /*
        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, assetExternalId));
        criteria.addOrder(Order.desc(Quote.F_TIME));
        return quoteDao.findOne(criteria);
        */
        Asset fakeAsset = new Asset();
        fakeAsset.setExternalId(assetExternalId);
        return quoteCache.findLastQuote(fakeAsset);
    }

    @Override
    public List<Quote> getPagedQuotes(int pageNumber, Map<String, String[]> params) throws GOptionsException{
        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        criteria.add(Restrictions.lt(Quote.F_TIME, System.currentTimeMillis()));
        buildAdminQuoteCriteria(criteria, params);
        criteria.addOrder(Order.desc(Quote.F_TIME));
        return quoteDao.list(criteria, pageNumber);
    }

    private void buildAdminQuoteCriteria(DetachedCriteria criteria, Map<String, String[]> params)
            throws GOptionsException {

        if (params == null) {
            return;
        }

        try {
            String[] assetExternalIdArr = params.get(Quote.F_ASSET_EXTERNAL_ID);
            if (assetExternalIdArr != null && !StringUtils.isEmpty(assetExternalIdArr[0])) {
                criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, assetExternalIdArr[0]));
            }

            String[] timeFromArr = params.get(Quote.F_TIME + "From");
            if (timeFromArr != null && !StringUtils.isEmpty(timeFromArr[0])) {
                long time = DateUtils.parse(timeFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Quote.F_TIME, time));
            }

            String[] timeToArr = params.get(Quote.F_TIME + "To");
            if (timeToArr != null && !StringUtils.isEmpty(timeToArr[0])) {
                long time = DateUtils.parse(timeToArr[0]).getTime();
                criteria.add(Restrictions.le(Quote.F_TIME, time));
            }

        }catch (Exception e){
            log.error("Parsing error", e);
            throw new GOptionsException("parsing error");
        }
    }

    @Override
    public List<Quote> getRangeQuotes(String assetExternalId, Long start, Long end) throws GOptionsException {
        if (StringUtils.isEmpty(assetExternalId)) {
            throw new GOptionsException("Asset External Id can't be empty!");
        }
        if (start == null) {
            throw new GOptionsException("Quote range start can't be empty!");
        }
        if (end == null) {
            throw new GOptionsException("Quote range end can't be empty!");
        }

        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, assetExternalId));

        criteria.add(Restrictions.ge(Quote.F_TIME, start));
        criteria.add(Restrictions.le(Quote.F_TIME, end + QuotesService.ALLOWED_DEVIATION));

        criteria.addOrder(Order.asc(Quote.F_TIME));
        return quoteDao.list(criteria, 5000, 0);
    }

    @Override
    public Quote getQuoteByTimeAndPrice(String assetExternalId, Long timestamp, BigDecimal price) throws GOptionsException {
        if (StringUtils.isEmpty(assetExternalId)) {
            throw new GOptionsException("Asset External Id can't be empty!");
        }
        if (timestamp == null) {
            throw new GOptionsException("Quote time can't be empty!");
        }
        if (price == null) {
            throw new GOptionsException("Quote price can't be empty");
        }

        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        //criteria.createAlias("asset", "asset");
        //criteria.add(Restrictions.eq("asset.id", assetId));
        criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, assetExternalId));
        criteria.add(Restrictions.eq(Quote.F_TIME, timestamp));
        criteria.add(Restrictions.eq(Quote.F_VALUE, price));
        //criteria.add(Restrictions.ge(Quote.F_TIME, timestamp - IQuotesService.ALLOWED_DEVIATION));
        //criteria.add(Restrictions.le(Quote.F_TIME, timestamp + IQuotesService.ALLOWED_DEVIATION));

        criteria.addOrder(Order.asc(Quote.F_TIME));
        return quoteDao.findOne(criteria);
    }

    @Override
    public Quote getQuoteByTime(Asset asset, Long timestamp) throws GOptionsException {
        if (StringUtils.isEmpty(asset)) {
            throw new GOptionsException("Asset can't be null!");
        }
        if (timestamp == null) {
            throw new GOptionsException("Quote time can't be empty!");
        }

        Quote cacheQuote = quoteCache.findLastQuote(asset);

        //long diff =  quote.getTime() - timestamp;
        long diffCache = 1;
        //long nowDiff = System.currentTimeMillis() - timestamp;

        if(cacheQuote!=null) {
            diffCache = cacheQuote.getTime() - timestamp;
        }

        //System.out.println("diffCache: " + diffCache + " nowDiff:" + nowDiff + " asset: " + asset.getExternalId());
        //System.out.println("diff: " + diff + " diffCache: " + diffCache +  " asset: " + asset.getExternalId());

        if(diffCache < 0){
            diffCache *= -1;
        }


        if(diffCache > ALLOWED_DEVIATION){
            System.out.println("DIFF is exceed: " + ALLOWED_DEVIATION + " " + asset.getExternalId() + " " + diffCache);
            return null;
        }

        return cacheQuote;
        /*
        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, asset.getExternalId()));
        criteria.add(Restrictions.ge(Quote.F_TIME, timestamp - IQuotesService.ALLOWED_DEVIATION));
        criteria.add(Restrictions.le(Quote.F_TIME, timestamp + IQuotesService.ALLOWED_DEVIATION));

        criteria.addOrder(Order.asc(Quote.F_TIME));

        List<Quote> quotes = quoteDao.list(criteria);

        System.out.println("getQuoteByTime : quote size " + quotes.size());

        if (quotes.size() == 0) {
            return null;
        }

        //finding the closes quote to the passed time
        long minDiff = Long.MAX_VALUE;
        int minDiffIndex = 0;
        for (int i = 0; i < quotes.size(); i++) {
            Quote q = quotes.get(i);
            if (q.getTime().equals(timestamp)) {
                return q;
            }

            long difference = (q.getTime() - timestamp);
            if (difference < 0) {
                difference *= -1;
            }

            if (minDiff >= difference) {
                minDiff = difference;
                minDiffIndex = i;
            }
        }
        System.out.println("MIN DIF (sec) "  + (int) (minDiff/1_000));
        return quotes.get(minDiffIndex);
        */
    }

    /*
    @Override
    public List<Quote> getLastQuotes(String assetExternalId, Long openTime, Long closeTime) throws GOptionsException {
        if (StringUtils.isEmpty(assetExternalId)) {
            throw new GOptionsException("Asset external id can't be empty");
        }

        DetachedCriteria criteria = DetachedCriteria.forClass(Quote.class);
        criteria.add(Restrictions.eq(Quote.F_ASSET_EXTERNAL_ID, assetExternalId));

        1 hour request
        criteria.add(Restrictions.ge(Quote.F_TIME, System.currentTimeMillis() - HALF_OF_HOUR_MILLIS1));

        criteria.addOrder(Order.asc(Quote.F_TIME));
        return quoteDao.list(criteria, 5000, 0);
    }*/


}
