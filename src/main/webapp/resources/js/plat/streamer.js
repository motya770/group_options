if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}

var Streamer = {
    streamerHost: null,
    lsClient: null,
    redColor: "red",
    greenColor: "lightgreen",
    _assetsSub: null,
    _positionsSub: null,
    _optionsSub: null,
    _positionQuotesSub: null,
    _openPositionGridCounter: 0,
    init: function () {
        if(Streamer.lsClient == null){
            var hostToUse = Streamer.streamerHost;
            Streamer.lsClient = new LightstreamerClient(hostToUse, "GSTREAMER");
            Streamer.lsClient.connect();
        }
    },
    subscribePositionQuotes: function(){
        Streamer.unsubStaticGrid("position_quotes");
        Streamer._positionQuotesSub = Streamer.subscribeStaticGrid("position_quotes", "yes");
    },
    subscribeAssets: function () {
        Streamer.unsubStaticGrid("quotes");
        Streamer._assetsSub = Streamer.subscribeStaticGrid("quotes", "yes");
    },
    unsubStaticGrid: function (gridName) {
        if (gridName == "options") {
            if (Streamer._optionsSub != null) {
                Streamer.lsClient.unsubscribe(Streamer._optionsSub);
            }
        } else if (gridName == "quotes") {
            if (Streamer._assetsSub != null) {
                Streamer.lsClient.unsubscribe(Streamer._assetsSub);
            }
        } else if (gridName == "positions") {
            if (Streamer._positionsSub != null) {
                Streamer.lsClient.unsubscribe(Streamer._positionsSub);
            }
        }else if(gridName == "position_quotes"){
            if(Streamer._positionQuotesSub != null){
                Streamer.lsClient.unsubscribe(Streamer._positionQuotesSub);
            }
        }
    },
    subscribeUpdateOptions: function () {
        Streamer.unsubStaticGrid("options");
        Streamer._optionsGrid = Streamer.subscribeStaticGrid("options", "yes");
    },
    subscribeUpdatePositions: function () {
        Streamer.unsubStaticGrid("positions");
        Streamer._positionsGrid = Streamer.subscribeStaticGrid("positions", "yes");
    },
    addPositionToSubscription: function (position) {
        //TODO consider moving part of the code to Positions.openPosition
        Streamer._openPositionGridCounter++;
        var newGirdName = "positions" + Streamer._openPositionGridCounter;

        $(".close-price", position).attr("data-grid", newGirdName);
        $(".returned-amount", position).attr("data-grid", newGirdName);
        $(".position-outcome", position).attr("data-grid", newGirdName);
        $(".current-return-amount", position).attr("data-grid", newGirdName);
        $(".current-time", position).attr("data-grid", newGirdName);
        $(".position-status", position).attr("data-grid", newGirdName);
        $(".current-price", position).attr("data-grid", newGirdName);
        $(".position-id", position).attr("data-grid", newGirdName);

        Streamer.subscribeStaticGrid(newGirdName, "no");
    },
    subscribeUpdateAccounts: function () {
        Streamer.subscribeStaticGrid("accounts", "no");
    },
    subscribeStaticGrid: function (gridName, requestSnapshot, mode) {
        var stocksGrid = new StaticGrid(gridName, true);
        stocksGrid.setAutoCleanBehavior(true, false);
        stocksGrid.addListener({
            onVisualUpdate: function (key, info) {
                if (info == null) {
                    //cleaning
                    return;
                }

                if ("quotes" == gridName) {
                    Streamer._onUpdateAssets(key, info, stocksGrid);

                } else if ("options" == gridName) {

                    Streamer._onUpdateOptions(key, info, stocksGrid);
                } else if (gridName.startsWith("positions")) {

                    Streamer._onUpdatePositions(key, info, stocksGrid);
                } else if ("accounts" == gridName) {

                    Streamer._onUpdateAccounts(key, info, stocksGrid);
                } else if ("new_positions" == gridName) {

                } else if ("position_quotes" == gridName){
                    Streamer._onUpdatePositionQuotes(key, info, stocksGrid);
                }
            }
        });

        var stockSubscription = new Subscription("MERGE", stocksGrid.extractItemList(), stocksGrid.extractFieldList());
        stockSubscription.addListener(stocksGrid);
        stockSubscription.setDataAdapter("QUOTE_ADAPTER");
        stockSubscription.setRequestedSnapshot(requestSnapshot);

        Streamer.lsClient.subscribe(stockSubscription);
        return stockSubscription;
    },
    _onUpdateAccounts: function (key, info, grid) {

    },
    _onUpdatePositionQuotes: function(key, info, stocksGrid){

        //console.log("pq1 " + key);

        var currentPrice = info.getChangedFieldValue("value");

        //console.log("pq2 " + key);

        if(currentPrice==null){
            return;
        }
        var assetExternalId = key.split("|")[1];
        //console.log(key + " " + info);
        //console.log("pq3 " + key);
        Positions.updatePriceProfit(assetExternalId, currentPrice);
    },
    _onUpdateOptions: function (key, info, grid) {

        var optionId = key.split("|")[1];

        var optionStatus = info.getChangedFieldValue("optionStatus");
        if (optionStatus != null && optionStatus != "null") {
            Options.optionStatusChanged(optionId, optionStatus);
        }
    },
    _onUpdateAssets: function (key, info, grid) {
        var currentPrice = info.getChangedFieldValue("value");
        var currentTimeMillis = info.getChangedFieldValue("timestampMillis");
        var prevPrice = grid.getValue(key, "value");

        //console.log("cp " + currentPrice + " " + " cm " + currentTimeMillis + " pp " + prevPrice);

        if (currentPrice == null && prevPrice != null && currentTimeMillis != null) {

            Streamer._addQuotePointForOption(prevPrice, currentTimeMillis, key);

        } else {
            if (currentPrice !== null) {
                var prevPrice = grid.getValue(key, "value");
                if (!prevPrice || currentPrice > prevPrice) {
                    info.setAttribute(Streamer.greenColor, null, "backgroundColor");
                } else {
                    info.setAttribute(Streamer.redColor, null, "backgroundColor");
                }

                Streamer._addQuotePointForOption(currentPrice, currentTimeMillis, key);
            }
        }
    },
    //for option update
    _addQuotePointForOption: function (price, time, key) {
        if (Options.getSelectedAssetExternalId() == Streamer.getUpdatedAssetId(key)) {
            Bidder.setBidderPrice(price, time);
            Graph.addQuoteToGraph(price, time);
        }
    },
    //for position update
    addQuotePointForPosition: function(price, time, assetId){
        if (Options.getSelectedAssetExternalId() == "" || Options.getSelectedAssetExternalId() == null) {
            if (Graph.currentAssetExternalId() == assetId) {
                Graph.addQuoteToGraph(price, time);
            }
        }
    },
    _onUpdatePositions: function (key, info, grid) {

        //console.log("position update ");
        var returnedAmount = info.getChangedFieldValue("returnedAmount");
        var positionOutcome = info.getChangedFieldValue("positionOutcome");

        var positionId = key.split("|")[1];
        var position = $(".open-positions .open-position.position-id-" + positionId);

        var currentPrice = info.getChangedFieldValue("currentPrice");

        var currentReturnAmount = info.getChangedFieldValue("currentReturnAmount");
        if (currentReturnAmount != null && currentReturnAmount != "null") {
            var positionStatus = $(".position-status", position).text();
            if (positionStatus == "OPENED" || positionStatus == "IN_TRADE") {
                $(".current-return-amount-filtered", position).text(currentReturnAmount);
            }
        }


        if (currentPrice != null && currentPrice != "null") {
            var positionStatus = $(".position-status", position).text();
            if (positionStatus == "OPENED" || positionStatus == "IN_TRADE") {
                $(".current-price-filtered", position).text(currentPrice);

                var currentTime = info.getChangedFieldValue("currentTime");
                if (currentTime != null) {
                    var assetExternalId = $(".asset-external-id", position).text();
                    Streamer.addQuotePointForPosition(currentPrice, currentTime , assetExternalId);
                }
            }
        }


        // console.log("ra " + returnedAmount + " po " + positionOutcome);

        if (returnedAmount != null && positionOutcome != null) {

            console.log(" real update");

            var result = positionOutcome + ": " + returnedAmount + " $ ";

            $(".current-price-filtered", position).text("-->");
            $(".current-return-amount-filtered", position).text("-->");

            $(".result", position).text(result);
        }

        // console.log("...");
        // console.log("..");
        // console.log(".");
    },
    getUpdatedAssetId: function (key) {
        var array = key.split("|");
        return array[1];
    }
}