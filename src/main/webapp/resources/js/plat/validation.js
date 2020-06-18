var Validator = {
    validateEmail: function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },
    validatePhone: function (phone) {
        if (!phone) {
            return false;
        }

        if (phone.length < 6) {
            return false;
        }

        return true;
    },
    validatePassword: function (pwd) {
        if (!pwd) {
            return false;
        }

        if (pwd.length < 8) {
            return false;
        }

        return true;
    },
    validateCurrency: function (curr) {
        if (!curr) {
            return false;
        }

        if (curr.length < 3) {
            return false;
        }
        return true;
    },
    emailNotValid: function (container) {
        $(container + " .login-validator").removeClass("hidden");
    },
    phoneNotValid: function (container) {
        $(container + " .phone-validator").removeClass("hidden");
    },
    pwdNotValid: function (container) {
        $(container + " .pwd-validator").removeClass("hidden");
    },
    currencyNotValid: function (container) {
        $(container + " .currency-validator").removeClass("hidden");
    },
    hideValidators: function (container) {
        $(container + " .login-validator").addClass("hidden");
        $(container + " .pwd-validator").addClass("hidden");
        $(container + " .phone-validator").addClass("hidden");
    },
    allowOnlyNumbers: function (e) {
        // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }

        var charValue = String.fromCharCode(e.keyCode)
            , valid = /^[0-9]+$/.test(charValue);

        if (!valid) {
            e.preventDefault();
        }
    }
}