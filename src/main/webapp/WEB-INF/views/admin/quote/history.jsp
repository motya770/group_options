<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <h1>Quotes History</h1>

        <div class="col-sm-9">
            <jsp:include page="filter.jsp"/>
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Asset</th>
                    <th>Time</th>
                    <th>Value</th>
                </tr>

                <c:forEach items="${quoteList}" var="quote">
                    <tr>
                        <td>${quote.id}</td>
                        <td>${quote.asset.name}</td>
                        <td>
                            <s:eval expression="T(com.goptions.bp.utils.DateUtils).format(quote.time, true)" var="quoteTime"/>
                                ${quoteTime}
                        </td>
                        <td>${quote.value}</td>
                    </tr>
                </c:forEach>
            </table>
                ${paging}
        </div>
    </jsp:body>
</t:adminpage>
