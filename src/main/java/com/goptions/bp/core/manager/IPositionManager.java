package com.goptions.bp.core.manager;

import com.goptions.bp.model.position.Position;

/**
 * Created by matvei on 1/31/15.
 */
public interface IPositionManager {

    void createOpenPositionJob(Position position);

    void createCloseShortPositionJob(Position position);

    void createFutureOpenPositionJob(Position position);
}
