<%@ page import="com.goptions.bp.model.currency.Currency" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.account.AccountType" %>

<div class="filters">
  <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
    <div class="row margin-10">
      <div class="col-md-3">
        <div>
          <label for="dateCreatedFrom">Created From</label>
          <input class="filter-input" name="dateCreatedFrom" id="dateCreatedFrom" type="text" value="${param.dateCreatedFrom}"/>
        </div>
        <div>
          <label for="dateCreatedTo">Created To</label>
          <input class="filter-input" name="dateCreatedTo" id="dateCreatedTo" type="text" value="${param.dateCreatedTo}"/>
        </div>
      </div>
      <div class="col-md-3">
        <div class="margin-10">
          <label for="fullName">Full Name</label>
          <input class="filter-input" name="fullName" id="fullName" type="text" value="${param.fullName}"/>
        </div>
        <!--
        <div class="margin-10">
          <label for="accountType">Account Type</label>
          <select class="filter-select" name="accountType">
            <option value=""></option>
            <c:forEach items="<%=AccountType.values()%>" var="accountType">
              <c:choose>
                <c:when test="${param.accountType == accountType}">
                  <option value="${accountType}" selected>${accountType}</option>
                </c:when>
                <c:otherwise>
                  <option value="${accountType}">${accountType}</option>
                </c:otherwise>
              </c:choose>
            </c:forEach>
          </select>
        </div>
        -->
      </div>
    </div>
    <div class="row col-md-3 margin-10">
      <input type="button" value="Clear" class="btn btn-default" onclick="Filters.clearForm();">
      <input type="submit" value="Filter" class="btn btn-default">
    </div>
  </form>
</div>

<script>
    Filters.initAccountFilters();
</script>