<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.account.AccountType" %>
<%@ page import="com.goptions.bp.model.currency.Currency" %>


<t:adminpage>
    <jsp:body>

        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Edit Account</h3>
                </div>
                <form action="/admin/account/update" method="POST">
                    <input name="id" type="hidden" value="${account.id}"/>

                    <div>
                        <label for="firstName">First Name</label>
                        <input name="firstName" id="firstName" type="text" value="${account.fistName}"/>
                    </div>
                    <div>
                        <label for="lastName">Last Name</label>
                        <input name="lastName" id="lastName" type="text" value="${account.lastName}"/>
                    </div>
                    <div>
                        <label for="balance">Balance</label>
                        <input name="balance" id="balance" type="text" value="${account.balance}"/>
                    </div>

                    <div>
                        <label for="type">Account type</label>

                        <select name="type">
                            <c:forEach items="<%= AccountType.values() %>" var="type">
                                <c:choose>
                                    <c:when test="${account.accountType == type}">
                                        <option value="${type}" selected>${type}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${type}">${type}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <label for="currency">Currency</label>
                        <select name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <c:choose>
                                    <c:when test="${currency == account.currency}">
                                        <option value="${account.currency}" selected>${account.currency}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${currency}">${currency}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <input type="submit" value="Update" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>
