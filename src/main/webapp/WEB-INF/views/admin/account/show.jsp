<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <script>
            $(function () {
                var accountId = parseInt($(".account-id").text());
                $.get("/admin/position/account/get-open", {accountId: accountId}, function (data) {
                    $(".open-positions").html(data);
                });

                $.get("/admin/position/account/get-history", {accountId: accountId}, function (data) {
                    $(".history-positions").html(data);
                });


                $.get("/admin/bactivity/account/get-account-activities", {accountId: accountId}, function (data) {
                    $(".balance-activities").html(data);
                });

            });
        </script>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Show Account</h3>
                </div>
                <div>
                    <div>Id <span class="account-id">${account.id}</span></div>
                    <div>First Name ${account.fistName}</div>
                    <div>Last Name ${account.lastName}</div>
                    <div>Account Type ${account.accountType}</div>
                    <div>Balance ${account.balance}</div>
                    <div>Currency ${account.currency}</div>
                </div>
                <a href="/admin/account/delete?id=${account.id}" class="btn btn-default">Delete</a>
                <a href="/admin/account/edit?id=${account.id}" class="btn btn-default">Edit</a>
            </div>
            <div class="open-positions">

            </div>

            <div class="history-positions">

            </div>

            <div class="balance-activities">

            </div>
        </div>
    </jsp:body>
</t:adminpage>

