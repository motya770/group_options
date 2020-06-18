<%@ page import="com.goptions.bp.model.currency.Currency" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page import="com.goptions.bp.model.position.PositionOutcome" %>
<%@ page import="com.goptions.bp.model.position.PositionStatus" %>

<div class="filters">
  <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
    <div class="row margin-10">
      <div class="col-md-3">
        <div>
          <label for="openTimeFrom">Open Time From</label>
          <input class="filter-input" name="openTimeFrom" id="openTimeFrom" type="text" value="${param.openTimeFrom}"/>
        </div>
        <div>
          <label for="openTimeTo">Open Time To</label>
          <input class="filter-input" name="openTimeTo" id="openTimeTo" type="text" value="${param.openTimeTo}"/>
        </div>
      </div>
      <div class="col-md-3">
        <div>
          <label for="closeTimeFrom">Close Time From</label>
          <input class="filter-input" name="closeTimeFrom" id="closeTimeFrom" type="text" value="${param.closeTimeFrom}"/>
        </div>
        <div>
          <label for="closeTimeTo">Close Time To</label>
          <input class="filter-input" name="closeTimeTo" id="closeTimeTo" type="text" value="${param.closeTimeTo}"/>
        </div>
      </div>
      <div class="col-md-3">
        <div>
          <label for="accountId">Account</label>
          <input class="filter-input" name="accountAuto" id="accountAuto" type="text" value="${param.accountAuto}"/>
          <input class="filter-input" name="account.id" id="accountId" type="text" value="${param.get('account.id')}" />
        </div>
      </div>
      <div class="col-md-3">
        <div>
          <label for="positionOutcome">Position Outcome</label>
          <select class="filter-select" name="positionOutcome">
            <option value=""></option>
            <c:forEach items="<%=PositionOutcome.values()%>" var="positionOutcome">
              <c:choose>
                <c:when test="${param.positionOutcome == positionOutcome}">
                  <option value="${positionOutcome}" selected>${positionOutcome}</option>
                </c:when>
                <c:otherwise>
                  <option value="${positionOutcome}">${positionOutcome}</option>
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
        <div>
          <label for="positionStatus">Position Status</label>
          <select class="filter-select" name="positionStatus">
            <option value=""></option>
            <c:forEach items="<%=PositionStatus.values()%>" var="positionStatus">
              <c:choose>
                <c:when test="${param.positionStatus == positionStatus}">
                  <option value="${positionStatus}" selected>${positionStatus}</option>
                </c:when>
                <c:otherwise>
                  <option value="${positionStatus}">${positionStatus}</option>
                </c:otherwise>
              </c:choose>
            </c:forEach>
          </select>
        </div>
      </div>
      
    </div>
    <div class="row col-md-3 margin-10">
      <input type="button" value="Clear" class="btn btn-default" onclick="Filters.clearForm();">
      <input type="submit" value="Filter" class="btn btn-default">
    </div>
  </form>
</div>

<script>
  Filters.initPositionsFilters();
</script>