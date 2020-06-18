
$(function(){
    var options = {defaultCountry: "auto",
        geoIpLookup: function(callback) {
            $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "/resources/js/trade/intelInput/utils.js" // just for formatting/placeholders etc
    };
    $(".registration-page .demo-container .phone-visual").intlTelInput(options);
    $(".registration-page .register-container .phone-visual").intlTelInput(options);
});

var RegPage = {
        showDemo: function () {
            $(".registration-page .demo-container").removeClass("hidden");
            $(".registration-page .login-container").addClass("hidden");
            $(".registration-page .register-container").addClass("hidden");
        },
        showReg: function () {
            $(".registration-page .demo-container").addClass("hidden");
            $(".registration-page .login-container").addClass("hidden");
            $(".registration-page .register-container").removeClass("hidden");
        },
        validateAccount: function (container) {
            Validator.hideValidators(container);

            var email = $(container + " .login").val();

            var valid = true;
            if (!Validator.validateEmail(email)) {
                Validator.emailNotValid(container);
                valid = false;
            }

            var phone = $(container + " .phone").val();
            if (!Validator.validatePhone(phone)) {
                Validator.phoneNotValid(container);
                valid = false;
            }

            var pwd = $(container + " .pwd").val();
            if (!Validator.validatePassword(pwd)) {
                Validator.pwdNotValid(container);
                valid = false;
            }


            var currency = $(container + " .currency-group .active").text();
            if (!Validator.validateCurrency(currency)) {
                Validator.currencyNotValid(container);
            }

            if (!valid) {
                return false;
            }

            return true;
        },
        openRealAccount: function () {

            var containerClass = ".register-container";
            $(containerClass + " .phone").val($(containerClass + " .phone-visual").intlTelInput("getNumber"));

            if (!RegPage.validateAccount(containerClass)) {
                return false;
            }

            //showing message
            var action = $('#real-form').attr("action");
            var params = $('#real-form').serialize();

            var currency = $(containerClass + " .currency-group .active").text();
            params = "currency=" + currency + "&" + params;

            $.post(action, params, function (data) {
                if (data.error) {
                    Notifications.error(data.message)
                    return;
                }
                var login = data.login;
                var message = "The trading account with login " + login + " created, check your email!";

                Notifications.error(message);
                RegPage.clearFields();

            });
        },
        clearFields: function () {
            $(".login").val("");
            $(".pwd").val("");
            $(".phone").val("");
        },
        openDemoAccount: function () {
            var containerClass = ".demo-container";
            $(containerClass + " .phone").val($(containerClass + " .phone-visual").intlTelInput("getNumber"));

            if (!RegPage.validateAccount(containerClass)) {
                return false;
            }

            //$("#hidden").val($("#phone").intlTelInput("getNumber"));

            //showing message
            var action = $('#demo-form').attr("action");
            var params = $('#demo-form').serialize();

            var currency = $(containerClass + " .currency-group .active").text();
            params = "currency=" + currency + "&" + params;

            $.post(action, params, function (data) {
                if (data.error) {
                    Notifications.error(data.message)
                    return;
                }

                window.location.href = data.redirect;
            });
        },
        chooseCurrency: function (that) {
            $(".currency-group .active").each(function () {
                $(this).removeClass("active");
            });

            $(that).addClass("active");
        }
    }