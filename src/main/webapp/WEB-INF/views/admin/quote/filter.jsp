<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="filters">
    <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
        <div class="row">
            <div class="row margin-10">
                <div class="col-md-3">
                    <div>
                        <label for="externalId">Asset (External Id)</label>
                        <input class="filter-input" name="assetExternalId" id="assetAuto" type="text" value="${param.assetExternalId}" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <label for="timeFrom">Time From</label>
                        <input class="filter-input" name="timeFrom" id="timeFrom" type="text" value="${param.timeFrom}"/>
                    </div>
                    <div>
                        <label for="timeTo">Time To</label>
                        <input class="filter-input" name="timeTo" id="timeTo" type="text" value="${param.timeTo}"/>
                    </div>
                </div>
            </div>
            <div class="row margin-10">
                <div class="col-md-3">
                    <input type="button" value="Clear" class="btn btn-default" onclick="Filters.clearForm();">
                    <input type="submit" value="Filter" class="btn btn-default">
                </div>
            </div>
        </div>
    </form>
</div>

<script>
    Filters.initQuotesFilters();
</script>