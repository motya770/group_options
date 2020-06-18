<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <script>
            $(function () {
                Customer.loadBalanceActivity();
            });
        </script>
        <div class="customer-container" style="height: 100%;">

            <jsp:include page="/WEB-INF/views/customer/customer-menu.jsp"></jsp:include>

            <jsp:include page="/WEB-INF/views/customer/paging.jsp"></jsp:include>

            <div class="customer-table">
                <table class="balance-activity-template">
                    <tr class="balance-activity">
                        <td class="activity-id"></td>
                        <td class="date-created"></td>
                        <td class="activity-type"></td>
                        <td class="amount"></td>
                        <td class="comment"></td>
                        <td class="entity-id"></td>
                    </tr>
                </table>

                <div class="bactivity">
                    <table class="balance-activities-container table table-bordered table-hover">
                        <tr>
                            <th><s:message code="customer.activity.id"/>
                            </td>
                            <th><s:message code="customer.activity.date"/>
                            </td>
                            <th><s:message code="customer.activity.activityType"/></th>
                            <th><s:message code="customer.activity.amount"/></th>
                            <th><s:message code="customer.activity.comment"/></th>
                            <th><s:message code="customer.activity.entityId"/></th>
                        </tr>
                    </table>
                        ${paging}
                </div>
            </div>

        </div>
    </jsp:body>
</t:sitepage>
