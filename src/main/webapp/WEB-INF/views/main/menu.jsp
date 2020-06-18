<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<script>
    String.prototype.contains = function (it) {
        return this.indexOf(it) != -1;
    };

    $(function () {
        var url = window.location.href;
        if (url.contains("/platform")) {
            $(".platform-page").addClass("active");
        } else if (url.contains("/customer")) {
            $(".customer-page").addClass("active");
        } else if (url.contains("/about")) {
            $(".about-page").addClass("active");
        } else {
            $(".main-page").addClass("active");
        }
    });
</script>

<div class="account-container">
    <jsp:include page="/WEB-INF/views/main/loginForm.jsp"></jsp:include>
    <div class="account-info hidden">
        <div class="account-id hidden"></div>
        <div class="account-login">
            <s:message code="platform.login.login" text="default text"/>
            <span class="login"></span>
        </div>
        <div class="account-balance">
            <s:message code="platform.login.balance" text="default text"/>
            <span class="balance" data-source="lightstreamer" data-grid="accounts" data-field="balance"></span>
        </div>
        <form class="logout-form" action="/logout" method="post">
            <s:message code="platform.login.logout" text="default text" var="logoutCaption"/>
            <input type="submit" value="${logoutCaption}" class="btn btn-success">
            <s:message code="platform.login.deposit" text="default text" var="depositCaption"/>
            <input type="button" onclick="goDepositPage(); return false;" value="${depositCaption}"
                   class="btn btn-info">
        </form>
    </div>
</div>

<div class="logo-container">
    <a href="/"><img src="/resources/images/main/mainLogo2.png" style="max-width: 167px; margin-top: -32px;"></a>
</div>

<div class="menuheader">
    <nav class="navbar navbar-default navbar-static-top tm_navbar" role="navigation">
        <ul class="nav sf-menu">
            <li class="main-page"><a href="/"> <s:message code="platform.menu.index" text="default text"/></a></li>
            <li class="platform-page"><a href="/platform"> <s:message code="platform.menu.trade"
                                                                      text="default text"/></a></li>
            <!-- <li><a href="/lean"><s:message code="platform.menu.learn" text="default text" /></a></li>-->
            <li class="customer-page"><a href="/customer/past-page"> <i></i> <s:message code="platform.menu.profile"
                                                                              text="default text"/></a></li>
            <li class="about-page"><a href="/about"> <i></i> <s:message code="platform.menu.about" text="default text"/></a>
            </li>
        </ul>
    </nav>
</div>