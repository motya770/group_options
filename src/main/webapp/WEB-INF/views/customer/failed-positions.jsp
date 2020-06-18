<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <script>
            $(function () {
                Customer.loadFailedPositions();
            });
        </script>
        <div class="customer-container" style="height: 100%;">

            <jsp:include page="/WEB-INF/views/customer/customer-menu.jsp"></jsp:include>

            <jsp:include page="/WEB-INF/views/customer/paging.jsp"></jsp:include>

            <div class="customer-table">
                <table class="failed-position-template">
                    <tr class="failed-position">
                        <td class="position-id"></td>
                        <td class="asset"></td>
                        <td class="open-time"></td>
                        <td class="open-price"></td>
                        <td class="invested-amount"></td>
                        <td class="returned-amount"></td>
                        <td class="position-status"></td>
                    </tr>
                </table>

                <div class="failed">
                    <table class="failed-positions-container table table-bordered table-hover">
                        <tr class="failed-position">
                            <th><s:message code="customer.failed.id"/></th>
                            <th><s:message code="customer.failed.asset"/></th>
                            <th><s:message code="customer.failed.openTime"/></th>
                            <th><s:message code="customer.failed.openPrice"/></th>
                            <th><s:message code="customer.failed.investedAmount"/></th>
                            <th><s:message code="customer.failed.returnedAmount"/></th>
                            <th><s:message code="customer.failed.positionStatus"/></th>
                        </tr>
                    </table>
                        ${paging}
                </div>
            </div>

        </div>
    </jsp:body>
</t:sitepage>
