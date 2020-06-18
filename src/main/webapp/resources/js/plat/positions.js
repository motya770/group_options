var Positions = {
    _positionTimers: new Array(),
    _clearPositionTimers: function () {
        for (var i in Positions._positionTimers) {
            var timer = Positions._positionTimers[i];
            clearInterval(timer);
        }
    },
    selectPosition: function (that) {
        Graph.loadPositionGraph(that);
    },
    /*
     setOpenCurrentPrice:  function(assetId, currentPrice){
     $(".open-positions .open-position.asset-external-id-" + assetId).each(function(){
     var positionStatus = $(".position-status", this).text();
     if(positionStatus == "IN_TRADE"  || positionStatus == "OPENED") {
     $(".current-price", this).text(currentPrice);
     }
     });
     },*/
    initPositionsCountDown: function () {
        Positions._clearPositionTimers();
        //TODO think about local time problems!!!
        Positions.getOpenPositions().each(function () {
            Positions.startPositionCountDown(this);
        });
    },
    startPositionCountDown: function (position) {
        var openTime = parseInt($(".open-time", position).text().trim());
        var closeTime  = parseInt($(".close-time", position).text().trim());
        var optionType =  $(".option-type", position).text().trim();

        if(optionType == "SHORT_TERM"){
            closeTime = openTime + 60000;
        }

        var now = (new Date()).getTime();

        // so timer shouldn't be started here...
        if (now >= openTime && now < closeTime) {
            Timer.countDown(now, closeTime, Timer.TIMER_TYPE_ENUM.POSITION, position, Timer.closeCountFiled);
        }
    },
    getOpenPositions: function () {
        return $(".open-positions-container .open-positions .open-position");
    },
    updatePriceProfit: function(assetExternalId, currentPrice){
        //console.log("pq4 " + assetExternalId);
        $(".open-positions-container .open-positions .open-position.asset-external-id-" + assetExternalId).each(
            function(){

                var aeid = $(".asset-external-id", this).text();

                //console.log("pq5 " + aeid);
                var positionStatus = $(".position-status", this).text();
                if(positionStatus == "CLOSED" || positionStatus == "REJECTED" || positionStatus == "CANCELED") {
                    return;
                }

                $(".current-price-filtered", this).text(currentPrice);

                var openPrice = parseFloat($(".open-price", this).text());
                var direction = $(".position-direction", this).text();

                var investedAmount = parseFloat($(".invested-amount", this).text());
                var percent =  parseFloat($(".profit-percent", this).text());
                var winAmount = investedAmount + investedAmount * 0.01 * percent;

                //console.log("pq6 " + aeid);

                var currReturnAmount = 0.0;
                if(direction=="HIGH"){
                    if(openPrice < currentPrice){
                         currReturnAmount = winAmount;
                    }else if (openPrice > currentPrice){
                         //TODO add loose percent
                    }else if (openPrice == currentPrice){
                         currReturnAmount = investedAmount;
                    }
                }else if(direction=="LOW"){
                    if(openPrice < currentPrice){

                    }else if (openPrice > currentPrice){
                        currReturnAmount = winAmount;
                    }else if(openPrice == currentPrice){
                        currReturnAmount = investedAmount;
                    }
                }

                //console.log("pq7 " + aeid);
                $(".current-return-amount-filtered", this).text(currReturnAmount);
                //console.log("pq8 " + aeid + " " + currentPrice + " " + currReturnAmount);
                if(isNaN(currReturnAmount)){
                    //console.log("crm: " + currReturnAmount);
                }
            }
        );
    },
    loadOpenPositions: function () {

        if(!Accounts.loggedIn()){
            return;
        }

        $(".open-positions-container .open-positions tbody tr").remove();
        $(".position-quotes-container .position-quotes-row").remove();

        //TODO think about adding account as parameter
        $.post('/positions/get-open-positions', function (data) {
            if (data.error) {
                Notifications.error(data.message)
                return;
            }
            for (var i in data) {
                var positionTemplate = $(".open-positions-container .open-position-template .open-position").clone();

                var openTime = data[i].openTime;
                var openPrice = data[i].openPrice;
                var investedAmount = data[i].investedAmount;
                var currentReturnAmount = 0; //TODO calculate...
                var returnedAmount = 0;
                var positionOutcome = "";
                var optionCloseTime = data[i].option.tradeEndTime;
                var assetName = data[i].option.asset.name;
                var assetExternalId = data[i].option.asset.externalId;
                var positionId = data[i].id;
                var positionDirection = data[i].positionDirection;
                var optionId = data[i].option.id;
                var status = data[i].positionStatus;
                //console.log("ps: " + status);
                var tradeTime = data[i].option.tradeStartTime;
                var bidStartTime = data[i].option.bidStartTime;
                var profitPercent = data[i].option.optionConfiguration.profitPercent;
                var optionType = data[i].option.optionType;
                var pipSize = data[i].option.asset.pipSize;

                $(positionTemplate).addClass("position-id-" + positionId);

                $(".asset-name", positionTemplate).text(assetName);
                $(".option-type", positionTemplate).text(optionType);
                $(".asset-external-id", positionTemplate).text(assetExternalId);
                $(".open-time", positionTemplate).text(openTime);
                $(".trade-time", positionTemplate).text(tradeTime);
                $(".close-time", positionTemplate).text(optionCloseTime);
                $(".open-price", positionTemplate).text(openPrice);
                $(".close-price", positionTemplate).text("");
                $(".invested-amount", positionTemplate).text(investedAmount);
                $(".pip-size", positionTemplate).text(pipSize);

                $(".current-return-amount", positionTemplate).text(currentReturnAmount);
                $(".current-return-amount-filtered", positionTemplate).text(currentReturnAmount);

                $(".position-direction", positionTemplate).text(positionDirection);
                $(".position-status", positionTemplate).text(status);
                $(".bid-start-time", positionTemplate).text(bidStartTime);
                $(".profit-percent", positionTemplate).text(profitPercent);

                $(positionTemplate).addClass("asset-external-id-" + assetExternalId);
                $(positionTemplate).addClass("option-id-" + optionId);

                $(".close-price", positionTemplate).attr("data-item", "position|" + positionId);
                $(".returned-amount", positionTemplate).attr("data-item", "position|" + positionId);
                $(".current-return-amount", positionTemplate).attr("data-item", "position|" + positionId);
                $(".current-time", positionTemplate).attr("data-item", "position|" + positionId);
                $(".position-outcome", positionTemplate).attr("data-item", "position|" + positionId);
                $(".position-status", positionTemplate).attr("data-item", "position|" + positionId);
                $(".current-price", positionTemplate).attr("data-item", "position|" + positionId);
                $(".position-id", positionTemplate).attr("data-item", "position|" + positionId);

                $(positionTemplate).appendTo(".open-positions-container .open-positions tbody");

                Positions._addPositionQuote(assetExternalId);
            }

            if($(".position-quotes-container .position-quotes-row").size()>0){
                Streamer.subscribePositionQuotes();
            }

            if ($(".open-positions-container .open-positions .open-position").size() > 0) {
                Positions.initPositionsCountDown();
                Streamer.subscribeUpdatePositions();
            }
        });
    },
    _addPositionQuote: function(assetExternalId){
        if (!$(".position-quotes-container .position-quotes-row").hasClass("asset-external-id-" + assetExternalId)) {
            var posQuotesRow = $(".position-quotes-template .position-quotes-row").clone();
            $(posQuotesRow).addClass("asset-external-id-" + assetExternalId);
            $(".position-price", posQuotesRow).attr("data-item", "asset|" + assetExternalId);
            $(".position-time", posQuotesRow).attr("data-item", "asset|" + assetExternalId);
            $(".position-quotes-container").append(posQuotesRow);
        }
    },
    showPastPositions: function () {
        // $(".past-positions-page").modal();
        $(".modal").modal();
    },
    openPosition: function (bidderButton) {
        var investedAmount = $(".bidder .bidder-amount").val();

        if (investedAmount == null || isNaN(investedAmount)) {
            Notifications.error("Please, correct amount direction!");
            return false;
        }

        if (investedAmount < Settings._minBid) {
            Notifications.error("Minimum bid amount is " + Settings._minBid + "!");
            return false;
        }

        if (investedAmount > Settings._maxBid) {
            Notifications.error("Maximum bid amount is " + Settings._maxBid + "!");
            return false;
        }

        var option = Options.getSelectedOption();
        var optionId = $(".option-id", option).text().trim();
        var openPrice = $(".asset-price", option).text().trim();
        var openTime = $(".bidder .bidder-asset-quote-time").text().trim(); //(new Date()).getTime();
        var direction = $(".bidder .button-selected").attr("data-direction");

        if (!direction) {
            Notifications.error("Please, choose direction!");
            return false;
        }

        direction = direction.toUpperCase();

        var accountId = $(".account-container .account-id").text().trim();

        /* Long optionId, BigDecimal investedAmount,
         BigDecimal openPrice, Long openTime, PositionDirection direction,
         Long accountId */
        $.post("/positions/open-position",
            {
                optionId: optionId,
                investedAmount: investedAmount, openPrice: openPrice,
                openTime: openTime, direction: direction,
                accountId: accountId
            },
            function (data) {
                var positionId = data.id;
                if (data.error) {
                    Notifications.error(data.message)
                    return;
                }
                if (!positionId) {
                    Notifications.error("You should login!");
                    return;
                }
                var openTime = data.openTime;
                var openPrice = data.openPrice;
                var investedAmount = data.investedAmount;
                var currentReturnAmount = 0;
                var positionOutcome = "";
                var returnedAmount = 0;
                var assetName = data.option.asset.name;
                var assetExternalId = data.option.asset.externalId;
                var positionDirection = data.positionDirection;
                var optionCloseTime = data.option.tradeEndTime;
                var tradeTime = data.option.tradeStartTime;
                var bidStartTime = data.option.bidStartTime;
                var profitPercent = data.option.optionConfiguration.profitPercent;
                var optionType = data.option.optionType;
                var pipSize = data.option.asset.pipSize;

                var position = $(".open-position-template .open-position").clone();

                $(position).addClass("position-id-" + positionId);
                $(position).addClass("asset-external-id-" + assetExternalId);

                $(".option-type", position).text(optionType);
                $(".asset-name", position).text(assetName);
                $(".asset-external-id", position).text(assetExternalId);
                $(".open-time", position).text(openTime);
                $(".trade-time", position).text(tradeTime);
                $(".open-price", position).text(openPrice);
                $(".invested-amount", position).text(investedAmount);
                $(".close-time", position).text(optionCloseTime);
                $(".bid-start-time", position).text(bidStartTime);
                $(".profit-percent", position).text(profitPercent);
                $(".pip-size", position).text(pipSize);

                //TODO calculate current return amount
                $(".current-return-amount", position).text(currentReturnAmount);
                $(".current-return-amount-filtered", position).text(currentReturnAmount);
                $(".position-direction", position).text(positionDirection);

                var itemId = "position|" + positionId;
                $(".close-price", position).attr("data-item", itemId);
                $(".returned-amount", position).attr("data-item", itemId);
                $(".position-outcome", position).attr("data-item", itemId);
                $(".current-return-amount", position).attr("data-item", itemId);
                $(".current-time", position).attr("data-item", itemId);
                $(".position-status", position).attr("data-item", itemId);
                $(".current-price", position).attr("data-item", itemId);
                $(".position-id", position).attr("data-item", itemId);

                //TODO make js code like this more consistent
                $(position).addClass("option-id-" + optionId);

                //$(".returned-amount", position).text(returnedAmount);
                //$(".position-outcome", position).text(positionOutcome);

                $(".open-positions-container .open-positions tbody").prepend(position);


                Graph._addNewPositionFlag(openTime);
                Positions.initPositionsCountDown();
                //Positions.startPositionCountDown(position);
                Streamer.addPositionToSubscription(position);

                Positions._addPositionQuote(assetExternalId);
                Streamer.subscribePositionQuotes();

                Graph.loadPositionGraph(position);
            });
    }
}
