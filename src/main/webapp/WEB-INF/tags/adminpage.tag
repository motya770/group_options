<%@tag description="Overall Page template" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@attribute name="header" fragment="true" %>
<%@attribute name="footer" fragment="true" %>

<html>
<head>
    <title>Admin</title>
    <meta name="_csrf" content="${_csrf.token}"/>
    <!-- default header name is X-CSRF-TOKEN -->
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <script src="/resources/js/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="/resources/js/jquery-ui.min.js" type="text/javascript"></script>
    <script src="/resources/js/jquery.datetimepicker.js" type="text/javascript"></script>
    <script src="/resources/js/bootstrap.min.js" type="text/javascript"></script>

    <script src="/resources/js/lightstreamer.js" type="text/javascript"></script>
    <script src="/resources/js/require.js" type="text/javascript"></script>

    <script src="/resources/js/plat/timer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/filters.js" type="text/javascript"></script>
    <!--
  <script src="/resources/js/csrf.js" type="text/javascript" ></script>
-->

    <link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/jquery.datetimepicker.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.structure.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.theme.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/admin/admin.css">

</head>
<body>

<jsp:include page="/WEB-INF/views/admin/paging.jsp"></jsp:include>

<h1><a href="/admin/index">Admin</a></h1>

<div class="col-sm-3 col-md-2 sidebar">
    Menu
    <ul class="nav nav-sidebar">
        <!--
        <li>
            <a href="/admin/report/get-pl">Report</a>
        </li>
        -->
        <li>
            <a href="/admin/asset/list">Assets</a>
        </li>
        <li>
            <a href="/admin/currency/list">Currency Settings</a>
        </li>

        <!--
        <li>
            <a href="/admin/option-creator/list">Option Creators</a></li>
        <li>
        -->
        <li>
            <a href="/admin/option/list">Options</a></li>
        <li>
            <a href="/admin/option/open">Open Options</a>
        </li>
        <li>
            <a href="/admin/position/list">Positions</a>
        </li>
        <li>
            <a href="/admin/position/open">Open Positions</a>
        </li>
        <li>
            <a href="/admin/position/get-unfinished-positions">Unfinished Positions</a>
        </li>
        <li>
            <a href="/admin/position/history">Positions History</a>
        </li>
        <li>
            <a href="/admin/quote/list">Live Quotes</a>
        </li>
        <li>
            <a href="/admin/quote/history">Quotes History</a>
        </li>
        <li>
            <a href="/admin/account/list">Accounts</a>
        </li>
        <li>
            <a href="/admin/bactivity/list">Balance Activity</a>
        </li>
        <!--
        <li>
            <a href="/admin/user/list">Users</a>
        </li>
        -->
    </ul>
</div>

<div id="pageheader">
    <jsp:invoke fragment="header"/>
</div>
<div id="body">
    <jsp:doBody/>
</div>
<div id="pagefooter">
    <jsp:invoke fragment="footer"/>
</div>
</body>
</html>