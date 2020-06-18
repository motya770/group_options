<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<script>
    $(function () {
        var url = window.location.href;
        if (url.contains("/customer/past-page")) {
            $(".past-page").addClass("active");
        } else if (url.contains("/customer/failed-page")) {
            $(".failed-page").addClass("active");
        } else if (url.contains("/customer/unfinished-page")) {
            $(".unfinished-page").addClass("active");
        } else if (url.contains("/customer/activity-page")) {
            $(".activity-page").addClass("active");
        } else if (url.contains("/customer/wallet-page")) {
            $(".wallet-page").addClass("active");
        } else if (url.contains("/customer/settings")) {
            $(".settings").addClass("active");
        }
    });
</script>

<div class="customer-menu">
    <ul class="nav nav-list customer-nav">
        <li class="nav-header"><s:message code="customer.menu.cabinet"/></li>
        <li class="past-page"><a href="/customer/past-page"><s:message code="customer.menu.past"/></a></li>
        <li class="failed-page"><a href="/customer/failed-page"><s:message code="customer.menu.failed"/></a></li>
        <li class="unfinished-page"><a href="/customer/unfinished-page"><s:message code="customer.menu.unfinished"/></a></li>
        <li class="activity-page"><a href="/customer/activity-page"><s:message code="customer.menu.activity"/></a></li>
        <!--
        <li class="wallet-page"><a href="/customer/wallet-page"><s:message code="customer.menu.wallet"/></a></li>
        -->
        <li class="settings"><a href="/customer/settings"><s:message code="customer.menu.settings"/></a></li>
    </ul>
</div>