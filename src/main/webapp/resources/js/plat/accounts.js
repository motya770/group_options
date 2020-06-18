var Accounts = {
    _accountId : null,
    loggedIn: function(){
        if(Accounts._accountId == null){
            return false;
        }
        return true;
    },
    getCurrentAccount: function () {
        $.post("/accounts/get-current", function (data) {
            if (data.error) {
                Notifications.error(data.message);
                return;
            }
            // if not empty
            if (data.account != null && data.account == "empty") {
                $(".account-container .login-form").removeClass("hidden");
                $(".account-container .account-info").addClass("hidden");
            } else {
                $(".account-container .login-form").addClass("hidden");
                $(".account-container .account-info").removeClass("hidden");

                var login = data.login;
                var balance = data.balance;
                var accountId = data.id;

                Accounts._accountId = accountId;

                $(".account-container .account-id").text(accountId);
                $(".account-container .account-login .login").text(login);
                $(".account-container .account-balance .balance").text(balance);

                $(".account-container .account-balance .balance").attr("data-item", "account|" + accountId);

                Streamer.subscribeUpdateAccounts();

                Positions.loadOpenPositions();
            }
        });
    }
}