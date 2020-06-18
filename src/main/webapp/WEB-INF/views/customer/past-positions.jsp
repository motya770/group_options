<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <script>
            $(function () {
                Customer.loadTradeHistory();
            });
        </script>

        <div class="customer-container" style="height: 100%;">

            <jsp:include page="/WEB-INF/views/customer/customer-menu.jsp"></jsp:include>

            <jsp:include page="/WEB-INF/views/customer/paging.jsp"></jsp:include>

            <div class="customer-table">
                <div class="positions-history-container">
                    <table class="positions-history-template">
                        <tr class="position-history">
                            <td class="position-id"></td>
                            <td class="asset-name"></td>
                            <td class="open-time"></td>
                            <td class="close-time"></td>
                            <td class="open-price"></td>
                            <td class="close-price"></td>
                            <td class="status"></td>
                            <td class="invested-amount"></td>
                            <td class="returned-amount"></td>
                            <td class="position-outcome"></td>
                        </tr>
                    </table>
                    <div class="">
                        <table class="positions-history table table-striped">
                            <tr>
                                <th><s:message code="platform.history.positionId"/></th>
                                <th><s:message code="platform.history.asset"/></th>
                                <th><s:message code="platform.history.openTime"/></th>
                                <th><s:message code="platform.history.closeTime"/></th>
                                <th><s:message code="platform.history.openPrice"/></th>
                                <th><s:message code="platform.history.closePrice"/></th>
                                <th><s:message code="platform.history.status"/></th>
                                <th><s:message code="platform.history.investedAmount"/></th>
                                <th><s:message code="platform.history.returnedAmount"/></th>
                                <th><s:message code="platform.history.outcome"/></th>
                            </tr>
                        </table>

                            ${paging}

                    </div>
                </div>
            </div>
        </div>

        </div>
    </jsp:body>
</t:sitepage>