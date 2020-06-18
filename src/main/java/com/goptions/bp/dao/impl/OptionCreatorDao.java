package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IOptionCreatorDao;
import com.goptions.bp.model.option.creator.OptionCreator;
import org.springframework.stereotype.Repository;

/**
 * Created by matvei on 3/7/15.
 */
@Repository
public class OptionCreatorDao extends EntityDao<OptionCreator> implements IOptionCreatorDao {

    public OptionCreatorDao() {
        super(OptionCreator.class);
    }
}
