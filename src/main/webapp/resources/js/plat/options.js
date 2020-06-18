var Options = {
    _openOptionsMap: {},
    _optionTimers: {},
    _nextOptions: {},
    _nextTimers: {},
    _clearOptionTimers: function () {
        for (var property in Options._optionTimers) {
            if (Options._optionTimers.hasOwnProperty(property)) {
                var timer = Options._optionTimers[property];
                clearInterval(timer);
            }
        }
    },
    _clearNextTimers: function(){
        for (var property in Options._nextTimers) {
            if (Options._nextTimers.hasOwnProperty(property)) {
                var timer = Options._nextTimers[property];
                clearTimeout(timer);
            }
        }
    },
    _clearNextOptions: function(){
        Options._nextOptions = {};
    },
    optionTypeChanged: function(that){
        //TODO change
        Options._setUpOptionsHeaders($(that).val());
        Main.initAll();
    },
    _setUpOptionsHeaders: function(optionType){
        if(optionType=="SHORT_TERM"){
            $(".options-list .options-header .trade-timer-header").addClass("hidden");
            $(".options-list .options-header .close-timer-header").addClass("hidden");
            $(".options-list .options-header .short-expiration-header").removeClass("hidden");
        }else{
            $(".options-list .options-header .trade-timer-header").removeClass("hidden");
            $(".options-list .options-header .close-timer-header").removeClass("hidden");
            $(".options-list .options-header .short-expiration-header").addClass("hidden");
        }
    },
    getSelectedOption: function () {
        var option = $(".options-list .option.option-selected");
        return option;
    },
    getSelectedAssetExternalId: function () {
        var selectedOption = Options.getSelectedOption();
        var assetExternalId = null;
        if (selectedOption != null) {
            assetExternalId = $(".asset-external-id", selectedOption).text().trim();
        }
        return assetExternalId;
    },
    makeSelected: function (option) {
        var selectedOption = Options.getSelectedOption();
        if (selectedOption != null) {
            $(selectedOption).removeClass("option-selected");
        }
        $(option).addClass("option-selected");
    },
    _clearSingleOptionTimer: function(option){
        var optionId = $(".option-id", option).text();
        var tradeTimer = Options._optionTimers[ optionId + Timer.tradeCountField];
        var closeTimer = Options._optionTimers[ optionId + Timer.closeCountFiled];

        if(tradeTimer!=null){
            clearInterval(tradeTimer);
        }

        if(closeTimer!=null){
            clearInterval(closeTimer);
        }
    },
    initSingleOptionCountDown: function(option){
        Options._clearSingleOptionTimer(option);
        Options._initTimesForOption(option, (new Date()).getTime());
    },
    _initTimesForOption: function(option, now){
        var openTime = parseInt($(".open-time", option).text().trim());
        var tradeTime = parseInt($(".trade-time", option).text().trim());
        var closeTime = parseInt($(".close-time", option).text().trim());

        if (now >= closeTime) {
            console.error("Now " + now + "  can't be greater than close time " + closeTime);
        }
        // so timer shouldn't be started here...
        if (now >= openTime && now < tradeTime && now < closeTime) {
            Timer.countDown(now, tradeTime, Timer.TIMER_TYPE_ENUM.OPTION, option, Timer.tradeCountField);
            Timer.countDown(now, closeTime, Timer.TIMER_TYPE_ENUM.OPTION, option, Timer.closeCountFiled);
        } else if (now >= openTime && now >= tradeTime && now < closeTime) {
            Timer.setOptionTime(openTime, tradeTime, closeTime, now, option);
            Timer.countDown(now, closeTime, Timer.TIMER_TYPE_ENUM.OPTION, option, Timer.closeCountFiled);
        }
        else {
            Timer.setOptionTime(openTime, tradeTime, closeTime, now, option);
        }
    },
    initOptionsCountDown: function () {
        //TODO think about local time problems!!!

        Options._clearOptionTimers();

        var now = (new Date()).getTime();
        Options.getOptions().each(function (index) {
            var option = this;
            Options._initTimesForOption(option, now);
        });
    },
    getOptions: function () {
        return $(".options-list .option");
    },
    getOptionById: function (optionId) {
        var option = $(".options-list .option.option-id-" + optionId);
        if (option.length == 0) {
            option = $(".options-list .options-created.option-id-" + optionId);
        }
        return option;
    },
    selectOption: function (option) {
        Options.makeSelected(option);
        Graph.loadGraph();
        Bidder.loadBidder(option);
    },
    selectFirstOption: function () {
        var option = $(".options-list .option").first();
        Options.selectOption(option);
    },
    _calculateCurrentReturnAmount: function (basicInvestedAmount, winningAmount, loosingAmount, bursaPercent) {
        //console.log("bia : " + basicInvestedAmount + " wa " + winningAmount + " la " + loosingAmount + " bp " + bursaPercent);
        if (winningAmount == 0) {
            return 0;
        }
        var returnedHighAmount = (basicInvestedAmount * loosingAmount) / winningAmount;

        var highAmountAfterBursaPercent = returnedHighAmount * ((100 - bursaPercent) / 100);
        return Math.round(highAmountAfterBursaPercent * 100) / 100;
    },
    _initNextOptionsTimers: function(){
        Options._clearNextTimers();

        for (var property in Options._nextOptions) {
            if (Options._nextOptions.hasOwnProperty(property)) {
                var tradeStartTime = Options._nextOptions[property].tradeStartTime;
                var timer = Timer.nextOptionsTimer(tradeStartTime);
                Options._nextTimers[tradeStartTime + ""] = timer;
            }
        }
    },
    _addNextOptionTimer: function(jsonOption){
        var tradeStartTime = jsonOption.tradeStartTime;
        Options._nextOptions[tradeStartTime] = jsonOption;
        Timer.nextOptionsTimer(tradeStartTime);
    },
    showNextOptions: function(tradeStartTime){
        console.log("show next options: " + tradeStartTime);
        Options._clearNextOptions();
        var justOptionsCreate = true;

        $(".options-list .tradeStartTime-" + tradeStartTime).each(function(){
            //console.log(this);
            var option = this;
            //if (optionStatus == "CLOSED" || optionStatus == "TRADE_STARTED") {
                //TODO fix this check now and tradeStartTime
                var assetExternalId = $(".asset-external-id", option).text();
                var closedOptionRow = $(".option-template-container .options-closed").clone();
                $(".asset-name", closedOptionRow).text($(".asset-name", option).text());
                $(option).replaceWith(closedOptionRow);
                var openOptionsList = Options._openOptionsMap[assetExternalId];

                if (openOptionsList != null && openOptionsList.length > 0) {

                    var optionJson = openOptionsList.shift();
                    Options._nextOptions["" + optionJson.tradeEndTime] = optionJson;
                    var optionTemplate = Options._loadOpenOption(optionJson);
                    $(closedOptionRow).replaceWith(optionTemplate);
                    if ($(optionTemplate).hasClass("options-created")) {

                    } else {
                        justOptionsCreate = false;
                    }
                }else if (openOptionsList!=null && openOptionsList.length == 0){
                    window.location.reload();
                }
            //}
        });

        if (justOptionsCreate){
            Streamer.subscribeUpdateOptions();
        }else{
            Streamer.subscribeUpdateOptions();
            //yes a bit tricky
            Options.getOptions().each(function(){
                var option = this;
                Options.initSingleOptionCountDown(option);
            });
            Streamer.subscribeAssets();
        }
        Options._initNextOptionsTimers();
    },
    loadOptions: function () {

        Options._clearNextOptions();

        $(".options-list tbody tr").remove();

        var optionType = $(".option-type-picker").val();
        var url = '/options/get-open-options?optionType=' + optionType;

        $.getJSON(url, function (data) {
            if (data.error) {
                Notifications.error(data.message)
                return;
            }

            for (var key in data) {

                var optionHolder = data[key];
                var assetExternalId = optionHolder.asset.externalId;
                var optionTemplate = null;

                if (optionHolder.simulation == false) {
                    var openOptions = optionHolder.options;
                    var openOptionJson = openOptions[0];

                    //TODO put init nextTimers
                    Options._nextOptions["" + openOptionJson.tradeEndTime] = openOptionJson;

                    if (optionHolder.options.length > 1) {
                        optionHolder.options.shift();
                        Options._openOptionsMap[assetExternalId] = optionHolder.options;
                    }
                    var optionTemplate = Options._loadOpenOption(openOptionJson);

                } else {
                    var assetName = optionHolder.asset.name;
                    var optionTemplate = Options._loadSimulatedOption(assetName);
                }

                $(optionTemplate).appendTo(".options-list tbody");
            }

            //TODO loading static streamer
            if ($(".options-list .option").size() > 0) {
                Options.selectFirstOption();
                Options.initOptionsCountDown();
                Options._initNextOptionsTimers();
                Streamer.subscribeAssets();
                Streamer.subscribeUpdateOptions();
            } else if ($(".options-list .options-created").size() > 0) {
                Streamer.subscribeUpdateOptions();
            }
        });
    },
    _loadSimulatedOption: function (assetName) {
        var optionTemplate = $(".option-template-container .options-simulated").clone();
        $(".asset-name", optionTemplate).text(assetName);
        return optionTemplate;
    },
    optionStatusChanged: function (optionId, optionStatus) {

        var option = Options.getOptionById(optionId);
        /*
        if (optionStatus == "CLOSED" || optionStatus == "TRADE_STARTED") {
            console.log("opStatus: " + optionStatus + " " + assetExternalId);
            var assetExternalId = $(".asset-external-id", option).text();
            var closedOptionRow = $(".option-template-container .options-closed").clone();
            $(".asset-name", closedOptionRow).text($(".asset-name", option).text());
            $(option).replaceWith(closedOptionRow);
            var openOptionsList = Options._openOptionsMap[assetExternalId];
            console.log("ool2: " + assetExternalId + " "  +  openOptionsList);
            if (openOptionsList != null && openOptionsList.length > 0) {
                var optionJson = openOptionsList.shift();
                var optionTemplate = Options._loadOpenOption(optionJson);
                console.log("ool4: " + optionTemplate);
                $(closedOptionRow).replaceWith(optionTemplate);
                if ($(optionTemplate).hasClass("options-created")) {
                    Streamer.subscribeUpdateOptions();
                } else {
                    Streamer.subscribeUpdateOptions();
                    Options.initSingleOptionCountDown(optionTemplate);
                    Streamer.subscribeAssets();
                }
            }else if (openOptionsList!=null && openOptionsList.length == 0){
                //TODO path for reloading page when there is no option;
                window.location.reload();
            }

        } else */

        if (optionStatus == "OPENED") {
            if ($(option).hasClass("options-created")) {
                var optionId = $(".option-id", option).text();
                $.getJSON('/options/get-option?optionId=' + optionId, function (data) {
                    if (data.error) {
                        Notifications.error(data.message)
                        return;
                    }
                    var optionTemplate = Options._loadOpenOption(data);

                    Options._nextOptions[optionTemplate.tradeStartTime + ""] = data;

                    $(option).replaceWith(optionTemplate);

                    var selectedOption = Options.getSelectedOption();
                    if (selectedOption == null || selectedOption.length == 0) {
                        Options.selectFirstOption();
                    }

                    Options._initNextOptionsTimers();

                    Options.initSingleOptionCountDown(optionTemplate);
                    Streamer.subscribeAssets();
                    Streamer.subscribeUpdateOptions();
                });
            }
        }
    },
    _loadOpenOption: function (openOptionJson) {

        var optionTemplate = null;
        var assetName = openOptionJson.asset.name;
        var openTime = openOptionJson.bidStartTime;
        var assetExternalId = openOptionJson.asset.externalId;
        var optionId = openOptionJson.id;
        var tradeStartTime = openOptionJson.tradeStartTime;

        //TODO check time locale
        var now = (new Date()).getTime();
        if (openTime > now) {
            optionTemplate = $(".option-template-container .options-created").clone();
            var caption = $(".translations .optionAvailable").text() + " " + Timer.getFormattedDate(new Date(openTime)) + ".";
            $(".explanation", optionTemplate).text(caption);
            //$(optionTemplate).addClass("option")
        } else {

            optionTemplate = $(".option-template-container .option").clone();

            var tradeTime = openOptionJson.tradeStartTime;
            var closeTime = openOptionJson.tradeEndTime;
            var bidsSum = openOptionJson.jackpot;
            var profitPercent = openOptionJson.optionConfiguration.profitPercent;
            var pipSize = openOptionJson.asset.pipSize;

            if(openOptionJson.optionType == "SHORT_TERM"){
                 $(".trade-time-countdown", optionTemplate).addClass("hidden");
                 $(".close-time-countdown", optionTemplate).addClass("hidden");
                 $(".short-expiration", optionTemplate).removeClass("hidden");
            }

            $(".option-type", optionTemplate).text(openOptionJson.optionType);
            $(".open-time", optionTemplate).text(openTime);
            $(".trade-time", optionTemplate).text(tradeTime);
            $(".close-time", optionTemplate).text(closeTime);
            $(".bids-sum", optionTemplate).text(bidsSum);
            $(".pip-size", optionTemplate).text(pipSize);

            $(".percent", optionTemplate).text(profitPercent);

            $(".bids-sum", optionTemplate).attr("data-item", "option|" + optionId);
            /*
            $(".current-win-amount", optionTemplate).attr("data-item", "option|" + optionId);
            $(".current-loose-amount", optionTemplate).attr("data-item", "option|" + optionId);
            */

            $(".asset-price", optionTemplate).attr("data-item", "asset|" + assetExternalId);
            $(".asset-quote-price", optionTemplate).attr("data-item", "asset|" + assetExternalId);
        }

        $(optionTemplate).addClass("tradeStartTime-" + tradeStartTime);

        $(".option-id", optionTemplate).text(optionId);

        $(".asset-external-id", optionTemplate).text(assetExternalId);
        $(optionTemplate).addClass(assetExternalId);
        $(optionTemplate).addClass("option-id-" + optionId);

        $(".asset-name", optionTemplate).text(assetName);
        $(".option-status", optionTemplate).attr("data-item", "option|" + optionId);

        return optionTemplate;
    }
}