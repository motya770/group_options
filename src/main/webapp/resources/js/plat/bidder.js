var Bidder = {
    init: function () {
        $('.bidder-amount').on('input', function () {
            Bidder.bidderValueChanged();
        });
    },
    setBidderPrice: function (price, time) {
        $(".bidder .bidder-asset-price").text(price);
        $(".bidder .bidder-asset-quote-time").text(time);
    },
    loadBidder: function (option) {

        $(".bidder .bidder-buttons .bidder-button").removeClass("active");

        var assetName = $(".asset-name ", option).text();
        var assetExternalId = $(".asset-external-id", option).text().trim();
        var optionId = $(".option-id", option).text();

        $(".bidder").addClass("bidder-option-id-" + optionId);
        var bidderQuestion = $(".bidder .bidder-question").text();
        $(".bidder .bidder-asset").text(bidderQuestion + assetName + " ?");

        var profitPercent = parseFloat($(".percent", option).text());
        $(".bidder .bidder-amount").val(25);

        Bidder._calculateBidderAmounts(optionId, profitPercent);
    },
    bidderValueChanged: function () {

        var option = Options.getSelectedOption();
        var optionId = $(".option-id", option).text();
        var bursaPercent = parseFloat($(".percent", option).text());

        Bidder._calculateBidderAmounts(optionId, bursaPercent);
    },
    _calculateBidderAmounts: function (optionId, profitPercent) {
        if ($(".bidder").hasClass("bidder-option-id-" + optionId)) {
            var bidder = $(".bidder");
            var bidderInputValue = $(".bidder-amount", bidder).val();
            if (bidderInputValue != null && bidderInputValue != "") {
                var bidderAmount = parseInt(bidderInputValue);
                if (bidderAmount != null && !isNaN(bidderAmount)) {
                    var returnedAmount = bidderAmount + (bidderAmount * profitPercent * 0.01);
                    returnedAmount = returnedAmount.toFixed(2);

                    $(".high-return .amount",  bidder).text("$" + returnedAmount);
                    $(".high-return .percent", bidder).text("(" + profitPercent + "%)");
                }
            }
        }
    },
    selectDirection: function (directionButton) {

        $(".bidder .bidder-buttons .bidder-button").removeClass("button-selected");
        $(".bidder .bidder-buttons .bidder-button").removeClass("active");
        $(directionButton).addClass("active");
        $(directionButton).addClass("button-selected");
    }
}