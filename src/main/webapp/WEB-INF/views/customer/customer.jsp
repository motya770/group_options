<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <div class="customer-container" style="height: 100%;">
            <jsp:include page="/WEB-INF/views/customer/customer-menu.jsp"></jsp:include>
        </div>
    </jsp:body>
</t:sitepage>