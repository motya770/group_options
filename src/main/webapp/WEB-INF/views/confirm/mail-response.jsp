<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <script>

            var QueryString = function () {
                // This function is anonymous, is executed immediately and
                // the return value is assigned to QueryString!
                var query_string = {};
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                        query_string[pair[0]] = pair[1];
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [ query_string[pair[0]], pair[1] ];
                        query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                        query_string[pair[0]].push(pair[1]);
                    }
                }
                return query_string;
            } ();

            $(function(){
                var resp = QueryString.response;

                var url = "";
                var callback = null;

                var guid =  QueryString.guid;
                var message = "";
                if(resp == "confirm"){

                    url = "/accounts/confirm-registration?guid=";
                    message = "Account confirmed.";
                    callback = function(data){
                        if (data.error) {
                            Notifications.error(data.message)
                            return;
                        }

                        $(".account-results").removeClass("hidden");

                        $(".account-results .result-message").text(message);
                        $(".account-results .account-login").text(data.login);
                    };

                }else if(resp == "cancel"){

                    message = "Account canceled.";
                    url = "/accounts/cancel-registration?guid=";
                    callback = function(data){
                        if (data.error) {
                            Notifications.error(data.message)
                            return;
                        }

                        $(".account-results").removeClass("hidden");

                        $(".account-results .result-message").text(message);
                        $(".account-results .account-login").text(data.login);
                        //window.location.href = "/logout";
                    };
                }

                url += guid;

                $.post(url, {}, callback);
            });
        </script>
        <div class="customer-container" style="height: 100%;">
            <div class="left-sidebar pull-left">
                <div class="row">
                     <div class="account-results hidden">
                         <div class="result-message"></div>
                         <div>Login:
                             <span class="account-login"></span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    </jsp:body>
</t:sitepage>