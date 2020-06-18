<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page import="com.goptions.bp.model.option.OptionStatus" %>

<div class="filters">
  <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
     <div class="row">
      <div class="row margin-10">
        <div class="col-md-2">
          <div>
            <label for="bidStartTimeFrom">Bid Starts From</label>
            <input class="filter-input" name="bidStartTimeFrom" id="bidStartTimeFrom" type="text" value="${param.bidStartTimeFrom}"/>
          </div>
          <div>
            <label for="bidStartTimeTo">Bid Starts To</label>
            <input class="filter-input" name="bidStartTimeTo" id="bidStartTimeTo" type="text" value="${param.bidStartTimeTo}"/>
          </div>
        </div>
        <div class="col-md-2">
          <div>
            <label for="tradeStartTimeFrom">Trade Start From</label>
            <input class="filter-input" name="tradeStartTimeFrom" id="tradeStartTimeFrom" type="text" value="${param.tradeStartTimeFrom}"/>
          </div>
          <div>
            <label for="tradeStartTimeTo">Trade Start To</label>
            <input class="filter-input" name="tradeStartTimeTo" id="tradeStartTimeTo" type="text" value="${param.tradeStartTimeTo}"/>
          </div>
        </div>
        <div class="col-md-2">
          <div>
            <label for="tradeEndTimeFrom">Trade End From</label>
            <input class="filter-input" name="tradeEndTimeFrom" id="tradeEndTimeFrom" type="text" value="${param.tradeEndTimeFrom}"/>
          </div>
          <div>
            <label for="tradeEndTimeTo">Trade End To</label>
            <input class="filter-input" name="tradeEndTimeTo" id="tradeEndTimeTo" type="text" value="${param.tradeEndTimeTo}"/>
          </div>
        </div>
        <div class="col-md-2">
          <div>
            <label for="optionStatus">Option Status</label>
            <select class="filter-select" name="optionStatus">
              <option value=""></option>
              <c:forEach items="<%=OptionStatus.values()%>" var="optionStatus">
                <c:choose>
                  <c:when test="${param.optionStatus == optionStatus}">
                    <option value="${optionStatus}" selected>${optionStatus}</option>
                  </c:when>
                  <c:otherwise>
                    <option value="${optionStatus}">${optionStatus}</option>
                  </c:otherwise>
                </c:choose>
              </c:forEach>
            </select>
          </div>
          <div>
            <label for="optionType">Option Type</label>
            <select class="filter-select" name="optionType">
              <option value=""></option>
              <c:forEach items="<%=OptionType.values()%>" var="optionType">
                <c:choose>
                  <c:when test="${param.optionType == optionType}">
                    <option value="${optionType}" selected>${optionType}</option>
                  </c:when>
                  <c:otherwise>
                    <option value="${optionType}">${optionType}</option>
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
  Filters.initOptionsFilters();
</script>