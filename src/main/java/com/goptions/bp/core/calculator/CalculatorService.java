package com.goptions.bp.core.calculator;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.position.PositionDirection;
import com.goptions.bp.model.position.PositionOutcome;
import com.goptions.bp.model.position.PositionStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Created by matvei on 9/13/15.
 */
@Service
public class CalculatorService implements ICalculatorService {

    @Override
    public void calculateOutcome(Option option, Position position) throws GOptionsException{
        PositionDirection direction = position.getPositionDirection();
        BigDecimal openPrice = position.getOpenPrice();
        BigDecimal closePrice = position.getClosePrice();

        //TODO think about more elegant solution
        if (direction == PositionDirection.HIGH) {
            if (openPrice.doubleValue() < closePrice.doubleValue()) {
                calculateWin(option, position);
            } else if (openPrice.doubleValue() > closePrice.doubleValue()) {
                calculateLoose(option, position);
            } else if (openPrice.doubleValue() == closePrice.doubleValue()) {
                calculateTie(position);
            }
        } else if (direction == PositionDirection.LOW) {
            if (openPrice.doubleValue() > closePrice.doubleValue()) {
                calculateWin(option, position);
            } else if (openPrice.doubleValue() < closePrice.doubleValue()) {
                calculateLoose(option, position);
            } else if (openPrice.doubleValue() == closePrice.doubleValue()) {
                calculateTie(position);
            }
        } else {
            throw new GOptionsException("This direction is not supported: " + direction);
        }

        position.setPositionStatus(PositionStatus.CLOSED);
    }

    private void calculateWin(Option option, Position position) {

        position.setPositionOutcome(PositionOutcome.WIN);
        BigDecimal profit =
                position.getInvestedAmount().multiply(new BigDecimal("0.01")).
                        multiply(option.getOptionConfiguration().getProfitPercent());

        BigDecimal returnAmount = position.getInvestedAmount().add(profit);
        returnAmount = returnAmount.setScale(2, BigDecimal.ROUND_HALF_UP);
        position.setReturnedAmount(returnAmount);
    }

    private void calculateLoose(Option option, Position position) {
        position.setPositionOutcome(PositionOutcome.LOSE);
        BigDecimal returnAmount = getInsuredLoss(position.getInvestedAmount(), option.getOptionConfiguration().getLossInsurance());
        returnAmount = returnAmount.setScale(2, BigDecimal.ROUND_HALF_UP);
        position.setReturnedAmount(returnAmount);
    }

    private BigDecimal getInsuredLoss(BigDecimal value, BigDecimal percent) {
        value = value.divide(new BigDecimal("100"), BigDecimal.ROUND_DOWN).multiply(percent);
        value = value.setScale(2, BigDecimal.ROUND_HALF_UP);
        return value;
    }

    private BigDecimal minusPercent(BigDecimal value, BigDecimal percent) {
        BigDecimal percentValue = value.divide(new BigDecimal("100"), BigDecimal.ROUND_DOWN).multiply(percent);
        value = value.subtract(percentValue);
        value = value.setScale(2, BigDecimal.ROUND_HALF_UP);
        return value;
    }

    private void calculateTie(Position position) {
        position.setPositionOutcome(PositionOutcome.TIE);
        position.setReturnedAmount(position.getInvestedAmount());
    }
}
