package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.ITimeFrameDao;
import com.goptions.bp.model.option.creator.TimeFrame;
import org.springframework.stereotype.Repository;


/**
 * Created by matvei on 6/12/15.
 */
@Repository
public class TimeFrameDao extends EntityDao<TimeFrame> implements ITimeFrameDao {
    public TimeFrameDao() {
       super(TimeFrame.class);
    }
}

