<%@ page import="com.goptions.bp.model.account.AccountType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Create Account</h3>
                </div>
                <div>
                    <form action="/admin/account/create">
                        <div>First Name <input name="firstName"/></div>
                        <div>Last Name <input name="lastName"/></div>
                        <div>Balance <input name="balance"/></div>
                        <div>
                            Account Type
                            <select name="type">
                                <c:forEach items="<%= AccountType.values() %>" var="type">
                                    <option value="${type}">${type}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <input type="submit" value="Create" class="btn btn-default"/>
                    </form>
                </div>
            </div>
        </div>
    </jsp:body>
</t:adminpage>

