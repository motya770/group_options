<%@ taglib prefix="s" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="/resources/js/trade/jquery.js"></script>
    <script src="/resources/js/trade/intelInput/intlTelInput.min.js"  type="text/javascript"></script>
    <link rel="stylesheet" href="/resources/css/trade/intlTelInput.css" />
    <script>
        $(function(){
            var options = {defaultCountry: "auto",
                autoFormat: true,
                geoIpLookup: function(callback) {
                    $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        callback(countryCode);
                    });
                },
                utilsScript: "/resources/js/trade/intelInput/utils.js" // just for formatting/placeholders etc
            };
            $(".phone").intlTelInput(options);
        });
    </script>
</head>
<body>
    <h1>Test</h1>

    <input class="phone" name="phone" type="tel">

</body>
</html>