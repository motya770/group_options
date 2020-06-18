<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<t:adminpage>
  <jsp:body>
    <div class="col-sm-4">
    <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Show Position</h3>
    </div>
    <div>
      <div>
        Id <span>${position.id}</span>
      </div>
      <div>
        Position Status <span>${position.positionStatus}</span>
      </div>
      <div>
        <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(position.openTime)" var="openTime"/>
        Open Time <span>${openTime}</span>
      </div>
      <div>
        <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(position.closeTime)"
                var="closeTime"/>
        Closes Time <span>${closeTime}</span>
      </div>
      <div>
        Option <a href="/admin/option/show?id=${position.option.id}">${position.option.id}</a>
      </div>
    </div>
  </jsp:body>
</t:adminpage>

