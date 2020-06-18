<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <h1>Accounts List</h1>

        <div class="col-sm-9 main">
            <jsp:include page="filter.jsp"/>
            <div><a href="/admin/account/new-entity">Create</a></div>
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>E-mail(Login)</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Balance</th>
                    <th>Date Created</th>
                    <th>Type</th>
                </tr>

                <c:forEach var="account" items="${accountList}">
                    <tr>
                        <td><a href="/admin/account/show?id=${account.id}"> ${account.id}</a></td>
                        <td>${account.login}</td>

                        <td>${account.fistName}</td>
                        <td>${account.lastName}</td>
                        <td>${account.balance}</td>

                        <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(account.dateCreated)"
                                var="dateCreated"/>
                        <td>${dateCreated}</td>

                        <td>${account.accountType}</td>
                    </tr>
                </c:forEach>
            </table>
                ${paging}
        </div>
        <div>
        </div>
    </jsp:body>
</t:adminpage>