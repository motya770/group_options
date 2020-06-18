<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page import="com.goptions.bp.model.option.OptionStatus" %>
<%@ page import="com.goptions.bp.model.asset.AssetType" %>

<div class="filters">
  <form id="filterForm" action="${pageContext.request.getAttribute('javax.servlet.forward.request_uri')}" method="POST">
    <div class="row">
      <div class="row margin-10">
        <div>
          <label for="assetType">Type</label>
          <select class="filter-select" name="assetType">
            <option value=""></option>
            <c:forEach items="<%=AssetType.values()%>" var="assetType">
              <c:choose>
                <c:when test="${param.assetType == assetType}">
                  <option value="${assetType}" selected>${assetType}</option>
                </c:when>
                <c:otherwise>
                  <option value="${assetType}">${assetType}</option>
                </c:otherwise>
              </c:choose>
            </c:forEach>
          </select>
        </div>
      </div>
      <div class="row margin-10">
        <div class="col-md-2">
          <input type="button" value="Clear" class="btn btn-default" onclick="Filters.clearForm();">
          <input type="submit" value="Filter" class="btn btn-default">
        </div>
      </div>
    </div>
  </form>
</div>
