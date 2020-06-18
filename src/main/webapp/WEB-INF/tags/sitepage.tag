<%@tag description="Overall Page template" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@attribute name="header" fragment="true" %>
<%@attribute name="footer" fragment="true" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <meta name='yandex-verification' content='6e81158bc460c2ea'/>

    <link rel="icon" href="/resources/images/trade/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/resources/images/trade/favicon.ico" type="image/x-icon"/>

    <title><s:message code="platform.title" text="default text"/></title>

    <link rel="stylesheet" href="/resources/css/main.css"/>
    <link rel="stylesheet" href="/resources/lib/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/resources/lib/bootstrap/css/bootstrap-select.css">
    <link rel="stylesheet" href="/resources/css/main/style.css"/>
    <link rel="stylesheet" href="/resources/css/polyglot-language-switcher.css"/>


    <script src="/resources/js/plat/protection.js" type="text/javascript"></script>

    <script src="/resources/js/trade/jquery.js"></script>
    <script src="/resources/js/trade/intelInput/intlTelInput.min.js"  type="text/javascript"></script>
    <script src="/resources/lib/bootstrap/js/bootstrap.min.js"></script>


    <script src="/resources/js/hightstock/highstock.js"></script>
    <script src="/resources/js/hightstock/theme.js"></script>

    <!--
    <script src="/resources/js/hightstock/modules/exporting.js"></script>
    -->
    <script src="/resources/js/lightstreamer.js" type="text/javascript"></script>
    <script src="/resources/js/require.js" type="text/javascript"></script>

    <script src="/resources/js/plat/validation.js" type="text/javascript"></script>
    <script src="/resources/js/plat/notifications.js" type="text/javascript"></script>
    <script src="/resources/js/plat/bidder.js" type="text/javascript"></script>
    <script src="/resources/js/plat/graph.js" type="text/javascript"></script>
    <script src="/resources/js/plat/options.js" type="text/javascript"></script>
    <script src="/resources/js/plat/positions.js" type="text/javascript"></script>
    <script src="/resources/js/plat/streamer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/timer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/accounts.js" type="text/javascript"></script>
    <script src="/resources/js/main.js" type="text/javascript"></script>
    <script src="/resources/js/plat/customer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/settings.js" type="text/javascript"></script>
    <script src="/resources/js/plat/loader.js" type="text/javascript"></script>
    <script src="/resources/js/plat/lang.js" type="text/javascript"></script>



    <jsp:include page="/WEB-INF/views/main/analitics.jsp"></jsp:include>
<body>
<script>
    function goDepositPage() {
        window.location.href = "/customer/wallet-page";
    }
</script>

<div id="polyglotLanguageSwitcher" onmouseout="Lang.hideDropdown(this);return false;" onmouseover="Lang.showDropdown(this);return false;">
    <a id="en" class="current" href="#"  >English</a>
    <ul id="lang-drop" class="dropdown">
        <li><a id="en" href="#">English</a></li>
        <li><a id="ru" href="#">Русский</a></li>
        <!--
        <li><a id="fr" href="#">Français</a></li>
        <li><a id="de" href="#">Deutsch</a></li>
        <li><a id="it" href="#">Italiano</a></li>
        <li><a id="es" href="#">Español</a></li>
        -->
    </ul>
</div>


<div class="container tro">
    <div class="row header pull-left">

        <!--
        <a href="/">
            <div class="logo pull-left">
                <s:message code="platform.company.name" text="default text" /> <span> <s:message code="platform.company.title" text="default text" /></span>
            </div>
        </a>-->

        <jsp:include page="/WEB-INF/views/main/menu.jsp"></jsp:include>
    </div>



    <!--
  <div class="row header pull-left">
      <a href="/">
          <div class="logo pull-left">
              <s:message code="platform.company.name" text="default text" /> <span> <s:message code="platform.company.title" text="default text" /></span>
          </div>
      </a>

      <ul class="inline pull-right menu">
          <li><a href="/"> <s:message code="platform.menu.index" text="default text" /></a></li>
          <li><a href="/"> <s:message code="platform.menu.trade" text="default text" /></a></li>
          <li><a href="/"><s:message code="platform.menu.learn" text="default text" /></a></li>
          <li class="profile"><a href="/"> <i></i> <s:message code="platform.menu.profile" text="default text" /></a></li>
      </ul>
  </div>
  -->

    <div class="modal hide" id="errorContainer">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3>You have a message!</h3>
        </div>
        <div class="modal-body">
            <p>One fine body…</p>
        </div>
        <div class="modal-footer">
            <a href="#" class="btn" onclick="Notifications.hideContainer(); return false;">Close</a>
        </div>
    </div>

    <jsp:doBody/>

    <jsp:include page="/WEB-INF/views/main/footer.jsp"></jsp:include>

</div>

<script src="/resources/js/main/main.js"></script>

</body>
</html>