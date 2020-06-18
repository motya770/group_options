package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IOptionDao;
import com.goptions.bp.model.asset.Asset;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionType;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by matvei on 12/15/14.
 */
@Repository
public class OptionDao extends EntityDao<Option> implements IOptionDao {

    public OptionDao() {
        super(Option.class);
    }

    @Override
    public Option findSameOption(Asset asset, Long bidStartTime, Long tradeStartTime,
                                 Long tradeEndTime, Boolean demo, OptionType optionType){

        //Option findSameOption(Asset asset, Long bidStartTime, Long tradeStartTime, Long tradeEndTime, Boolean demo, BidAmountType bidAmountType);

        String sql = "select * from options where asset_id = " + asset.getId() +
                " and bidStartTime = " + bidStartTime +
                " and tradeStartTime = " + tradeStartTime +
                " and tradeEndTime = " + tradeEndTime +
                " and demo = " + demo +
                " and optionType = '" + optionType.name() + "'" +
                " and optionStatus != 'CANCELED' "  +
                " limit 1";
        List<Option> result =  sessionFactory.getCurrentSession().createSQLQuery(sql).addEntity(Option.class).list();
        if(result.size()==0){
            return null;
        }
        return result.get(0);
    }
}
