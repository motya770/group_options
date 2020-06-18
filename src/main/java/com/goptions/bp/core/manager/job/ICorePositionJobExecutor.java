package com.goptions.bp.core.manager.job;

import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;

import java.math.BigDecimal;

/**
 * Created by matvei on 3/15/15.
 */
public interface ICorePositionJobExecutor {

    void openPositionExecute(Long positionId) throws Exception;

    void closeShortPositionExecute(Long positionId) throws Exception;

    void closePosition(Option option, Position position, BigDecimal closePrice, Long closeTime) throws Exception;
}
