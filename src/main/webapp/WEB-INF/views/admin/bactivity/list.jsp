<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <h1>Balance Activities List</h1>

        <div class="col-sm-9 main">

            <jsp:include page="filter.jsp"/>
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Date Created</th>
                    <th>Account</th>
                    <th>Activity Type</th>
                    <th>Amount</th>
                    <th>Entity Id</th>
                    <th>Comment</th>
                </tr>

                <c:forEach var="activity" items="${activitiesList}">
                    <tr>
                        <td>${activity.id}</td>
                        <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(activity.dateCreated)"
                                var="dateCreated"/>
                        <td>${dateCreated}</td>
                        <td><a href="/admin/account/show?id=${activity.account.id}">${activity.account.login}</td>
                        <td>${activity.activityType}</td>
                        <td>${activity.amount}</td>
                        <td>${activity.entityId}</td>
                        <td>${activity.comment}</td>
                    </tr>
                </c:forEach>
            </table>
                ${paging}
        </div>
        <div>
        </div>
    </jsp:body>
</t:adminpage>