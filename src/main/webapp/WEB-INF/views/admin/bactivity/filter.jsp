<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page import="com.goptions.bp.model.option.OptionStatus" %>
<%@ page import="com.goptions.bp.model.account.AccountType" %>
<%@ page import="com.goptions.bp.model.bactivity.BActivityType" %>

<div class="filters">
    <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
        <div class="row">
            <div class="row margin-10">
                <div class="col-md-2">
                    <div>
                        <label for="dateCreatedFrom">Date Created From</label>
                        <input class="filter-input" name="dateCreatedFrom" id="dateCreatedFrom" type="text" value="${param.dateCreatedFrom}"/>
                    </div>
                    <div>
                        <label for="dateCreatedTo">Date Created To</label>
                        <input class="filter-input" name="dateCreatedTo" id="dateCreatedTo" type="text" value="${param.dateCreatedTo}"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div>
                        <label for="activityType">Activity Type</label>
                        <select class="filter-select" name="activityType">
                            <option value=""></option>
                            <c:forEach items="<%=BActivityType.values()%>" var="activityType">
                                <c:choose>
                                    <c:when test="${param.activityType == activityType}">
                                        <option value="${activityType}" selected>${activityType}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${activityType}">${activityType}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row col-md-2 margin-10">
                <input type="button" value="Clear" class="btn btn-default" onclick="Filters.clearForm();">
                <input type="submit" value="Filter" class="btn btn-default">
            </div>
        </div>
    </form>
</div>

<script>
 Filters.initBActivityFilters();
</script>