package com.goptions.bp.core.calculator;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;

/**
 * Created by matvei on 9/13/15.
 */
public interface ICalculatorService {
    void calculateOutcome(Option option, Position position) throws GOptionsException;
}
