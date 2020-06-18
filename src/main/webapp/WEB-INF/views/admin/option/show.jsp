<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<t:adminpage>
    <jsp:body>
        <div class="col-sm-9">
        <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Show Option</h3>
        </div>
        <div>
            <div>
                Id <span>${option.id}</span>
            </div>
            <div>
                Option Type <span>${option.optionType}</span>
            </div>
            <div>
                Option Status <span>${option.optionStatus}</span>
            </div>
            <div>
                <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.bidStartTime)" var="bidStartTime"/>
                Bid Start Time <span>${bidStartTime}</span>
            </div>
            <div>
                <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.tradeStartTime)"
                        var="tradeStartTime"/>
                Trade Start Time <span>${tradeStartTime}</span>
            </div>
            <div>
                <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.tradeEndTime)" var="tradeEndTime"/>
                Trade End Time <span>${tradeEndTime}</span>
            </div>
            <div>
                Asset ${option.asset.name}
            </div>

            <div class="option-configuration">
                <h4>Option Configuration</h4>
                <div>Bursa Percent ${option.optionConfiguration.profitPercent}</div>
                <div>Loss insurance ${option.optionConfiguration.lossInsurance}</div>
                <div>Max limitation ${option.optionConfiguration.maxLimitation}</div>
                <div>Min limitation ${option.optionConfiguration.minLimitation}</div>
                <div>
                    <a href="/admin/option/delete?id=${option.id}" class="btn btn-default">Delete</a>
                    <a href="/admin/option/edit?id=${option.id}" class="btn btn-default">Edit</a>
                    <a href="/admin/option/cancel?id=${option.id}" class="btn btn-default">Cancel</a>
                </div>
            </div>
        </div>

        <div class="col-sm-9">
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Asset</th>
                    <th>Account</th>
                    <th>Direction</th>
                    <th>Invested amount</th>
                    <th>Returned amount</th>
                    <th>Position status</th>
                    <th>Position outcome</th>
                    <th>Open Time</th>
                    <th>Close Time</th>
                    <th>Open Market</th>
                    <th>Close Market</th>
                    <th>Currency</th>
                    <th>Action</th>
                </tr>
                <c:forEach var="position" items="${option.positions}">
                    <tr>
                        <td><a href="/admin/position/show?id=${position.id}">${position.id}</a></td>
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
                        <td>${position.option.currency}</td>
                        <td><a href="/admin/position/cancel-position?id=${position.id}&redirect=${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}"> Cancel Position </a></td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </jsp:body>
</t:adminpage>

