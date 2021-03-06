<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<table class="table table-striped">
    <tr>
        <th>Id</th>
        <th>Option</th>
        <th>Asset</th>
        <th>Account</th>
        <th>Direction</th>
        <th>Invested amount</th>
        <th>Returned amount</th>
        <th>Position status</th>
        <th>Position outcome</th>
        <th>Open Time</th>
        <th>Close Time</th>
        <th>Open Price</th>
        <th>Close Price</th>
        <th>Action</th>
    </tr>
    <c:forEach var="position" items="${positionList}">
        <tr>
            <td><a href="/admin/position/show?id=${position.id}">${position.id}</a></td>
            <td><a href="/admin/option/show?id=${position.option.id}">${position.option.id}</a></td>
            <td><a href="/admin/asset/show?id=${position.option.asset.id}">${position.option.asset.name}</a></td>
            <td><a href="/admin/account/show?id=${position.account.id}">${position.account.login}</a></td>

            <td>${position.positionDirection}</td>

            <td>${position.investedAmount}</td>

            <td>${position.returnedAmount}</td>

            <td>${position.positionStatus}</td>

            <td>${position.positionOutcome}</td>

            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(position.openTime)" var="openTime"/>
            <td>${openTime}</td>

            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(position.closeTime)" var="closeTime"/>
            <td>${closeTime}</td>

            <td>${position.openPrice}</td>

            <td>${position.closePrice}</td>

            <td>
                <a href="/admin/position/cancel-position?id=${position.id}&redirect=/admin/account/show?id=${position.account.id}">
                    Cancel Position </a></td>

        </tr>
    </c:forEach>
</table>