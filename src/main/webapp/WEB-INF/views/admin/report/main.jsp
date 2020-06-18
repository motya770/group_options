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
                    <h3 class="panel-title">Report</h3>
                </div>
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <th>Position</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    <c:forEach var="activity" items="${pl.get('bursaActivities')}">
                        <tr>
                            <td>${activity.id}</td>
                            <td><a target="_blank" href="/admin/position/show?id=${activity.entityId}" > ${activity.entityId} </a> </td>
                            <td>${activity.amount}</td>

                            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(activity.dateCreated)"
                                    var="dateCreated"/>
                            <td>${dateCreated}</td>
                        </tr>
                    </c:forEach>
                </table>
                <div class="col-sm-9">
                   <div>Bank Account PL:  ${pl.get("accountPl")}<div>
                   <div>Bursa Percent : ${pl.get("bursaPl")}</div>
                   <div><b>General PL:</b> ${pl.get("generalPl")}</div>
                </div>
            <div>
        </div>
    </jsp:body>
</t:adminpage>

