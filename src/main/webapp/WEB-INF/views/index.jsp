<%@ taglib prefix="s" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Главная</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no"/>
    <meta name="description" content="Your description">
    <meta name="keywords" content="Your keywords">
    <meta name="author" content="Your name">
    <meta name='yandex-verification' content='6e81158bc460c2ea'/>

    <link rel="icon" href="/resources/images/trade/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/resources/images/trade/favicon.ico" type="image/x-icon"/>

    <link rel="stylesheet" href="/resources/lib/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/resources/lib/bootstrap/css/bootstrap-select.css">
    <script src="/resources/lib/bootstrap/js/bootstrap.min.js"></script>

    <!--
    <link rel="stylesheet" href="/resources/css/trade/bootstrap.css">
    -->

    <link rel="stylesheet" href="/resources/css/main.css">

    <link rel="stylesheet" href="/resources/css/trade/style.css">

    <link rel="stylesheet" href="/resources/css/trade/camera.css">

    <script src="/resources/js/plat/protection.js" type="text/javascript"></script>


    <script src="/resources/js/trade/jquery.js"></script>
    <script src="/resources/js/trade/jquery-migrate-1.2.1.js"></script>


    <script src="/resources/js/trade/superfish.js"></script>
    <script src="/resources/js/trade/jquery.mobilemenu.js"></script>

    <script src="/resources/js/trade/jquery.easing.1.3.js"></script>
    <script src="/resources/js/trade/jquery.ui.totop.js"></script>

    <script src="/resources/js/trade/jquery.touchSwipe.min.js"></script>

    <!--
    <script src="/resources/js/jquery.polyglot.language.switcher.js"></script>
    -->


    <link rel="stylesheet" href="/resources/css/polyglot-language-switcher.css" />

    <!--
    <script src="/resources/js/trade/jquery.equalheights.js"></script>
    -->
    <!--
    <script src="/resources/js/trade/tm-scripts.js"></script>
    -->

    <script src='/resources/js/trade/camera.js'></script>

    <!--[if (gt IE 9)|!(IE)]><!-->
    <script src="/resources/js/trade/jquery.mobile.customized.min.js"></script>
    <!--<![endif]-->

    <script>
        $(window).load(function () {
            jQuery('.camera_wrap').camera();
        });
    </script>

    <!--[if lt IE 9]>
    <div style='text-align:center'><a
            href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode"><img
            src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0"
            height="42" width="820"
            alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."/></a>
    </div>
    <script src="/resources/js/trade/html5shiv.js"></script>
    <script src="/resources/js/trade/respond.min.js"></script>
    <![endif]-->

    <script src="/resources/js/plat/loader.js" type="text/javascript"></script>
    <script src="/resources/js/plat/settings.js" type="text/javascript"></script>
    <script src="/resources/js/plat/lang.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            Settings.getIndexSettings();
        });
    </script>

</head>

<body>

<!--==============================header=================================-->
<header id="header">
    <!--==============================row1=================================-->
    <div class="container head-container">
        <div class="row">
            <jsp:include page="main/menu.jsp"></jsp:include>
        </div>
    </div>

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

    <!--==============================slider=================================-->
    <div class="container">
        <div class="row_1">
            <div class="slider">
                <div class="camera_wrap">
                    <div data-src="/resources/images/trade/empty.png">
                        <div class="camera_caption">
                            <p><s:message key="main.first.general"></s:message></p>
                        </div>
                    </div>
                    <div data-src="/resources/images/trade/empty.png">
                        <div class="camera_caption">
                            <p><s:message key="main.first.availability"></s:message></p>
                        </div>
                    </div>
                    <div data-src="/resources/images/trade/empty.png">
                        <div class="camera_caption">
                            <p><s:message key="main.first.groupoptions"></s:message></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--==============================row2=================================-->
    <div class="row_2">
        <div class="container">
            <div class="row">
                <ul class="list1">
                    <li class="col-lg-3 col-md-3 col-sm-3 span4">
                        <div class="topicons">
                            <!--
                            <figure><img src="/resources/images/trade/page1_icon1.png" alt=""></figure>
                            -->
                            <div class="iconright">
                                <div class="headicon1">
                                    <p><s:message key="main.first.customer.title"></s:message></p>
                                    <em></em>
                                </div>
                                <div class="headicon2">
                                    <em></em>
                                </div>
                            </div>
                        </div>
                        <div class="text1">
                            <p><s:message key="main.first.customer.explanation"></s:message></p>
                            <a href="/customer" class="btn-link btn-link1"><s:message key="main.second.next"/></a>
                        </div>
                    </li>
                    <li class="col-lg-3 col-md-3 col-sm-3 span4">
                        <div class="topicons">
                            <!--
                            <figure><img src="/resources/images/trade/page1_icon3.png" alt=""></figure>
                            -->
                            <div class="iconright">
                                <div class="headicon1">
                                    <p><s:message key="main.first.learn.title"/></p>
                                    <em></em>
                                </div>
                                <div class="headicon2">
                                    <em></em>
                                </div>
                            </div>
                        </div>
                        <div class="text1">
                            <p><s:message key="main.first.learn.explanation"/></p>
                            <a href="/about" class="btn-link btn-link1"><s:message key="main.second.next"/></a>
                        </div>
                    </li>
                    <li class="col-lg-3 col-md-3 col-sm-3 span4">
                        <div class="topicons">
                            <!--
                            <figure><img src="/resources/images/trade/page1_icon2.png" alt=""></figure>
                            -->
                            <div class="iconright">
                                <div class="headicon1">
                                    <p><s:message key="main.first.trade.title"/></p>
                                    <em></em>
                                </div>
                                <div class="headicon2">
                                    <em></em>
                                </div>
                            </div>
                        </div>
                        <div class="text1">
                            <p><s:message key="main.first.trade.explanation"/></p>
                            <a href="/platform" class="btn-link btn-link1"><s:message key="main.second.next"/></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--==============================row3=================================-->
    <div class="row_3">
        <div class="">
            <p class="title1"><s:message key="main.second.title"/></p>

            <p class="title2"><s:message key="main.second.title.subtitle"/></p>
        </div>
        <div class="bgrow3"></div>
        <div class="bgrow3img"></div>
    </div>
</header>
<!--==============================content=================================-->
<div id="content">
    <!--==============================row4=================================-->
    <div class="row_4">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 span8">
                    <h2><s:message key="main.second.mission"/></h2>

                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 row4col1 span4">
                            <p><s:message key="main.second.missionExplained"/></p>
                            <a href="/about" class="btn-link btn-link1"><s:message key="main.second.next"/></a>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 row4col1 span4">
                            <div class="box1">

                                <p class="title3"><s:message key="main.second.callUs"/>

                                <!--
                                <p class="title4"><s:message key="main.second.address"/></p>
                                -->

                                <p class="title4">
                                <!---
                                <s:message key="main.second.mail"/>
                                -->
                                <a href="mailto:support@unityoptions.com">support@unityoptions.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                <div class="col-lg-3 col-md-3 col-sm-3 row4col2">
                    <h2><s:message key="main.second.review.title"/></h2>
                    <ul class="list-quote2">
                        <li>
                            <blockquote class="quote-2">
                                <p>
                                    <img class="img1" src="/resources/images/trade/forquote2_1.png" alt="">
                                        <s:message key="main.second.review.explained"/>
                                    <img class="img2" src="/resources/images/trade/forquote2_2.png" alt="">
                                </p>
                            </blockquote>
                            <span><s:message key="main.second.review.reviewer"/></span>
                        </li>
                    </ul>
                </div>-->
                <div class="col-lg-3 col-md-3 col-sm-3  row4col2">
                    <h2><s:message key="main.second.services.title"/></h2>
                    <ul class="list2">
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="/platform"><s:message
                                key="main.second.services.platform"/></a>
                        </li>
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="/about"><s:message
                                key="main.second.services.learn"/></a>
                        </li>
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a
                                href="/technical-analysis"><s:message key="main.second.services.technical"/></a>
                        </li>
                        <!--
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="#"><s:message key="main.second.services.news"/></a>
                        </li>-->
                        <!--
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="/customer"><s:message
                                key="main.second.services.customer"/></a>
                        </li>-->
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="#"><s:message
                                key="main.second.services.support"/></a>
                        </li>
                        <!--
                        <li>
                            <img src="/resources/images/trade/arrow1.png" alt=""><a href="#"><s:message key="main.second.services.social"/></a>
                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--==============================row5=================================-->
    <!--
    <div class="row_5">
        <div class="container">
            <div class="row">
                <ul class="list-row5">
                    <li class="col-lg-3 col-md-3 col-sm-3 colrow5 maxheight">
                        <div class="badge_ badge">01.<em></em></div>
                        <div class="overflow">
                            <h3><a href="#">Explore Tactical<br>Allocation</a></h3>
                            <p>Praesent vestibulum aenean nonummy hendrerit mauris. Cum sociis penatibus et magnis dis parturient montes ascetur ridiculus</p>
                        </div>
                    </li>
                    <li class="col-lg-3 col-md-3 col-sm-3 colrow5 maxheight">
                        <div class="badge_ badge">02.<em></em></div>
                        <div class="overflow">
                            <h3><a href="#">Investigate<br>Dimensional<br>Funds</a></h3>
                            <p>Praesent vestibulum aenean nonummy hendrerit mauris. Cum natoque penatibus et magnis dis parturient.</p>
                        </div>
                    </li>
                    <li class="col-lg-3 col-md-3 col-sm-3 colrow5 maxheight">
                        <div class="badge_ badge">03.<em></em></div>
                        <div class="overflow">
                            <h3><a href="#">Research TD<br>Ameritrade<br>Institutional</a></h3>
                            <p>Praesent vestibulum aenean nonummy hendrerit mauris. Cum natoque penatibus et magnis dis parturient.</p>
                        </div>
                    </li>
                </ul>
                <div class="col-lg-3 col-md-3 col-sm-3 colrow5 maxheight">
                    <p class="title5">Our results:<br><span>Annual report<br>2013</span></p>
                    <a href="#" class="btn btn-primary btn1">
                        <div class="btnicon1">
                            <p>download now!</p>
                            <em></em>
                        </div>
                        <div class="btnicon2">
                            <em></em>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    -->
</div>

<!--==============================footer=================================-->
<footer>
    <div class="container">
        <jsp:include page="/WEB-INF/views/main/footer.jsp"></jsp:include>
    </div>
</footer>

</body>
</html>