<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <h1>Options List</h1>
        <div class="col-sm-9">
            <jsp:include page="filter.jsp"></jsp:include>
            <div><a href="/admin/option/new-entity">Create</a></div>
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Asset</th>
                    <th>Option Status</th>
                    <th>Bid Start Time</th>
                    <!--<th>Bid End Time</th>-->
                    <th>Trade Start Time</th>
                    <th>Trade End Time</th>
                    <th>Demo</th>
                    <th>Currency</th>
                    <th>Option Type</th>
                    <th>Opt. Creator</th>
                </tr>
                <c:forEach items="${optionList}" var="option">
                    <tr>
                        <td>
                            <a href="/admin/option/show?id=${option.id}">${option.id}</a>
                        </td>
                        <td>
                                ${option.asset.name}
                        </td>
                        <td>
                                ${option.optionStatus}
                        </td>
                        <td>
                            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.bidStartTime)"
                                    var="bidStartTime"/>
                                ${bidStartTime}
                        </td>
                        <td>
                            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.tradeStartTime)"
                                    var="tradeStartTime"/>
                                ${tradeStartTime}
                        </td>
                        <td>
                            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(option.tradeEndTime)"
                                    var="tradeEndTime"/>
                                ${tradeEndTime}
                        </td>
                        <td>
                            <c:choose>
                                <c:when test="${option.demo}">Yes</c:when>
                                <c:otherwise>No</c:otherwise>
                            </c:choose>
                        </td>
                        <td>${option.currency}</td>
                        <td>${option.optionType}</td>
                        <td>
                            <c:if test="${option.optionCreator != null}">
                                <a href="/admin/option-creator/show?id=${option.optionCreator.id}">
                                 ${option.optionCreator.name}
                                </a>
                            </c:if>
                        </td>
                    </tr>
                </c:forEach>
            </table>
                ${paging}
        </div>
    </jsp:body>
</t:adminpage>