package com.goptions.bp.controller;


import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.currency.CurrencySetting;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.OptionStatus;
import com.goptions.bp.model.position.Position;
import com.goptions.bp.model.position.PositionDirection;
import com.goptions.bp.model.quotes.Quote;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(value = "/positions", method = {RequestMethod.POST})
public class PositionController {

    @Autowired
    private IPositionService positionService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IOptionService optionService;

    @Autowired
    private IQuotesService quotesService;

    @Autowired
    private ICurrencySettingService currencySettingService;

    /*
    @RequestMapping(value = "/get-all-positions")
    public List<Position> getAllOpenPositions() throws GOptionsException{
        List<Position> positions = positionService.getAllOptionOpenPositions();
        return positions;
    }
    */

    @RequestMapping(value = "/open-position")
    public Position openPosition(@RequestParam(required = true) Long optionId,
                                 @RequestParam(required = true) BigDecimal investedAmount,
                                 @RequestParam(required = true) BigDecimal openPrice,
                                 @RequestParam(required = true) Long openTime,
                                 @RequestParam(required = true) PositionDirection direction,
                                 @RequestParam(required = true) Long accountId) throws GOptionsException {

        long start = System.currentTimeMillis();

        //TODO add open position functionality
        Option option = optionService.read(optionId);

        System.out.println("t1 " + (start - System.currentTimeMillis()));

        if (option == null) {
            throw new GOptionsException("Option not found: " + optionId);
        }
        if (option.getOptionStatus() != OptionStatus.OPENED) {
            throw new GOptionsException("Can't bid on non open option " + option.getOptionStatus());
        }

        AccountDetails currentAccount = accountService.getCurrentAccount();


        if (!accountId.equals(currentAccount.getAccount().getId())) {
            throw new GOptionsException("Current account and account don't match: " + accountId);
        }

        Currency currency = currentAccount.getAccount().getCurrency();
        CurrencySetting currencySetting = currencySettingService.find(currency);
        if (currencySetting == null) {
            throw new GOptionsException("CurrencySettings not found for account " + currentAccount.getAccount().getId() + " and currency " + currency);
        }

        //less
        if (investedAmount.compareTo(currencySetting.getMinBid()) == -1) {
            throw new GOptionsException("Minimal bid amount is " + currencySetting.getMinBid());
        }

        if (investedAmount.compareTo(currencySetting.getMaxBid()) == 1) {
            throw new GOptionsException("Maximum bid amount is " + currencySetting.getMaxBid());
        }

        System.out.println("t2 " + (start - System.currentTimeMillis()));


        Quote quote = quotesService.getQuoteByTimeAndPrice(option.getAsset().getExternalId(), openTime, openPrice);
        if (quote == null) {
            throw new GOptionsException("Exact quote is absent or can't be found!");
        }

        if (direction == null) {
            throw new GOptionsException("Can't open position without direction!");
        }

        System.out.println("t3 " + (start - System.currentTimeMillis()));


        Position position = new Position();
        position.setOption(option);
        position.setInvestedAmount(investedAmount);
        position.setOpenPrice(openPrice);
        position.setOpenTime(openTime);
        position.setPositionDirection(direction);
        position.setAccount(currentAccount.getAccount());

        position = positionService.openPosition(position, quote);

        System.out.println("t4 " + (start - System.currentTimeMillis()));

        return position;
    }

    @RequestMapping(value = "/get-open-positions")
    public List<Position> getOpenPositions() {
        List<Position> positions = positionService.getOpenPositions();
        return positions;
    }
}
