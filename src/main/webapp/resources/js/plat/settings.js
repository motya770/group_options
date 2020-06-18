var Settings = {
    _minBid: null,
    _maxBid: null,
    _recommendedBid: null,
    _minDeposit: null,
    _maxDeposit: null,
    getIndexSettings: function(){
        Lang.init();
        $.post("/settings/get-settings", function (data) {
            if (data.error) {
                Notifications.error(data.message);
                return;
            }

            Lang.setLocale(data.locale);
        });
    },
    getSettings: function () {
        Lang.init();
        $.post("/settings/get-settings", function (data) {
            if (data.error) {
                Notifications.error(data.message);
                return;
            }

            Streamer.streamerHost = data.streamerHost;
            var currencySettings = data.currencySettings;

            Settings._minBid = currencySettings.minBid;
            Settings._maxBid = currencySettings.maxBid;
            //Settings._recommendedBid = $(".bid-amount-picker option:selected" ).attr("data-value"); // currencySettings.recommendedBid;
            Settings._minDeposit = currencySettings.minDeposit;
            Settings._maxDeposit = currencySettings.maxDeposit;

            //$(".bidder .bidder-amount").val(Settings._recommendedBid);

            $(".options-list thead .recommended-bid").text(Settings._recommendedBid);

            Lang.setLocale(data.locale);

            Main.initAll();
        });
    }
}