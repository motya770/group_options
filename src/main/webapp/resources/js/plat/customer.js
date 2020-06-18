$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}

var Customer = {
    _addPageParameter: function (url) {
        var pageNumber = $.urlParam('pageNumber');
        if (pageNumber != null && pageNumber != "") {
            url += "?pageNumber=" + pageNumber;
        }
        return url;
    },
    _hideAll: function () {
        $(".closed").addClass("hidden");
        $(".failed").addClass("hidden");
        $(".bactivity").addClass("hidden");
    },
    loadTradeHistory: function () {

        var url = '/customer/get-past-positions';
        url = Customer._addPageParameter(url);

        // http://localhost:8080/customer/past-page?pageNumber=2
        $.post(url, function (data) {
            if (data.error) {
                Notifications.error(data.message);
                return;
            }

            for (var i in data) {
                var pastPositionTemplate = $(".positions-history-container .positions-history-template .position-history").clone();
                // return;

                var assetName = data[i].option.asset.name;
                if (!assetName) {
                    Notifications.error("You should login!");
                    return;
                }

                var positionId = data[i].id;
                var openTime = Timer.getFormattedDate(new Date(data[i].openTime));
                var closeTime = data[i].closeTime;
                var openPrice = data[i].openPrice;
                var closePrice = data[i].closePrice;
                var investedAmount = data[i].investedAmount;
                var returnedAmount = data[i].returnedAmount;
                var positionOutcome = data[i].positionOutcome;
                var positionStatus = data[i].positionStatus;

                $(".position-id", pastPositionTemplate).text(positionId);
                $(".asset-name", pastPositionTemplate).text(assetName);
                $(".open-time", pastPositionTemplate).text(openTime);
                if (closeTime != null) {
                    closeTime = Timer.getFormattedDate(new Date(data[i].closeTime));
                    $(".close-time", pastPositionTemplate).text(closeTime);
                }
                $(".open-price", pastPositionTemplate).text(openPrice);
                if (positionStatus != null) {
                    $(".status", pastPositionTemplate).text(positionStatus);
                }
                if (closePrice != null) {
                    $(".close-price", pastPositionTemplate).text(closePrice);
                }

                $(".invested-amount", pastPositionTemplate).text(investedAmount);
                if (returnedAmount != null) {
                    $(".returned-amount", pastPositionTemplate).text(returnedAmount);
                }
                if (positionOutcome != null) {
                    $(".position-outcome", pastPositionTemplate).text(positionOutcome);
                }

                $(pastPositionTemplate).appendTo(".positions-history-container .positions-history");

            }
        });
    },
    loadFailedPositions: function () {

        var url = "/customer/get-failed-positions";
        url = Customer._addPageParameter(url);

        $.post(url, {}, function (data) {
            for (var i in data) {

                var position = $(".failed-position-template .failed-position").clone();
                var posObject = data[i];

                if (posObject.openTime != null) {
                    var openTime = Timer.getFormattedDate(new Date(posObject.openTime));
                    $(".open-time", position).text(openTime);
                }

                $(".position-id", position).text(posObject.id);
                $(".asset", position).text(posObject.option.asset.name);
                $(".open-price", position).text(posObject.openPrice);
                if (posObject.investedAmount != null) {
                    $(".invested-amount", position).text(posObject.investedAmount);
                }
                if (posObject.returnedAmount != null) {
                    $(".returned-amount", position).text(posObject.returnedAmount);
                }
                $(".position-status", position).text(posObject.positionStatus);
                $(".failed-positions-container").append(position);
            }
        });
    },
    loadUnfinishedPositions: function () {

        var url = "/customer/get-unfinished-positions";
        url = Customer._addPageParameter(url);

        $.post(url, {}, function (data) {
            for (var i in data) {

                var position = $(".failed-position-template .failed-position").clone();
                var posObject = data[i];

                if (posObject.openTime != null) {
                    var openTime = Timer.getFormattedDate(new Date(posObject.openTime));
                    $(".open-time", position).text(openTime);
                }

                $(".position-id", position).text(posObject.id);
                $(".open-price", position).text(posObject.openPrice);

m
                if(posObject.option.tradeStartTime!=null){
                    var tradeStart = Timer.getFormattedDate(new Date(posObject.option.tradeStartTime));
                    $(".trade-start", position).text(tradeStart);
                }

                if(posObject.option.tradeEndTime!=null){
                    var tradeEnd = Timer.getFormattedDate(new Date(posObject.option.tradeEndTime));
                    $(".trade-end", position).text(tradeEnd);
                }

                if (posObject.investedAmount != null) {
                    $(".invested-amount", position).text(posObject.investedAmount);
                }
                if (posObject.returnedAmount != null) {
                    $(".returned-amount", position).text(posObject.returnedAmount);
                }
                $(".position-status", position).text(posObject.positionStatus);

                $(".asset", position).text(posObject.option.asset.name);

                $(".failed-positions-container").append(position);
            }
        });
    },
    loadBalanceActivity: function () {

        $(".balance-activities-container .balance-activity").remove();

        var url = "/customer/get-balance-activity";
        url = Customer._addPageParameter(url);

        $.post(url, {}, function (data) {
            for (var i in data) {

                var activity = $(".balance-activity-template .balance-activity").clone();
                var baObject = data[i];

                $(".activity-id", activity).text(baObject.id);

                if (baObject.dateCreated) {
                    var dateCreated = Timer.getFormattedDate(new Date(baObject.dateCreated));
                    $(".date-created", activity).text(dateCreated);
                }

                $(".activity-type", activity).text(baObject.activityType);
                $(".amount", activity).text(baObject.amount);
                if (baObject.comment != null) {
                    $(".comment", activity).text(baObject.comment);
                }
                $(".entity-id", activity).text(baObject.entityId);

                $(".balance-activities-container").append(activity);
            }
        });
    }
}