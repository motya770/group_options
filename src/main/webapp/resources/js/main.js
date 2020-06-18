$(function () {
    Settings.getSettings();
});

var Main = {
    initAll: function(){
        Streamer.init();
        Accounts.getCurrentAccount();

        if (isPlatformPage()) {
            Graph.init();
            Options.loadOptions();
            Bidder.init();
        }
    }
}

function isPlatformPage() {
    if ($(".platfrom-page").length > 0) {
        return true;
    }
    return false;
}





