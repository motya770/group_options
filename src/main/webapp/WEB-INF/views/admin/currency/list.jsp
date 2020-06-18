<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <h1>Currency Settings List</h1>

        <div><a href="/admin/currency/new-entity">Create</a></div>
        <div class="col-sm-9">
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Currency</th>
                    <th>Min bid</th>
                    <th>Max bid</th>
                    <th>Min deposit</th>
                    <th>Max deposit</th>
                </tr>
                <c:forEach items="${currencySettingList}" var="currencySetting">
                    <tr>
                        <td><a href="/admin/currency/show?id=${currencySetting.id}"> ${currencySetting.id} </a></td>
                        <td> ${currencySetting.currency} </td>
                        <td> ${currencySetting.minBid} </td>
                        <td> ${currencySetting.maxBid} </td>
                        <td> ${currencySetting.minDeposit} </td>
                        <td> ${currencySetting.maxDeposit} </td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </jsp:body>
</t:adminpage>