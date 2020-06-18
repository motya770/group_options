<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
        <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Show Currency Setting</h3>
        </div>
        <div>
            <div>
                Id <span>${currencySetting.id}</span>
            </div>
            <div>
                Currency <span>${currencySetting.currency}</span>
            </div>
            <div>
                Min bid <span>${currencySetting.minBid}</span>
            </div>
            <div>
                Max bid <span>${currencySetting.maxBid}</span>
            </div>
            <div>
                Min deposit <span>${currencySetting.minDeposit}</span>
            </div>
            <div>
                Max deposit <span>${currencySetting.maxDeposit}</span>
            </div>

            <a href="/admin/currency/delete?id=${currencySetting.id}" class="btn btn-default">Delete</a>
            <a href="/admin/currency/edit?id=${currencySetting.id}" class="btn btn-default">Edit</a>
        </div>
    </jsp:body>
</t:adminpage>

