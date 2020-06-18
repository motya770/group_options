<%@page pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><spring:message code="platform.title" text="default text"/></title>

    <link rel="stylesheet" href="/resources/lib/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="/resources/lib/bootstrap/css/bootstrap-select.css">
    <link rel="stylesheet" href="/resources/css/main/style.css"/>
    <link rel="stylesheet" href="/resources/css/main.css"/>

    <script src="/resources/js/trade/jquery.js"></script>
    <script src="/resources/lib/bootstrap/js/bootstrap.min.js"></script>

    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <script src="/resources/js/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="/resources/js/hightstock/highstock.js"></script>
    <!--
    <script src="/resources/js/hightstock/modules/exporting.js"></script>
    -->
    <script src="/resources/js/lightstreamer.js" type="text/javascript"></script>
    <script src="/resources/js/require.js" type="text/javascript"></script>

    <script src="/resources/js/plat/bidder.js" type="text/javascript"></script>
    <script src="/resources/js/plat/graph.js" type="text/javascript"></script>
    <script src="/resources/js/plat/options.js" type="text/javascript"></script>
    <script src="/resources/js/plat/positions.js" type="text/javascript"></script>
    <script src="/resources/js/plat/streamer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/timer.js" type="text/javascript"></script>
    <script src="/resources/js/plat/accounts.js" type="text/javascript"></script>
    <script src="/resources/js/main.js" type="text/javascript"></script>
    <script src="/resources/js/plat/customer.js" type="text/javascript"></script>
</head>

<body>

<div class="container tro">
    <div class="row header pull-left">
        <a href="/">
            <div class="logo pull-left">
                <spring:message code="platform.company.name" text="default text"/> <span> <spring:message
                    code="platform.company.title" text="default text"/></span>
            </div>
        </a>

        <ul class="inline pull-right menu">
            <li><a href="/"> <spring:message code="platform.menu.index" text="default text"/></a></li>
            <li><a href="/"> <spring:message code="platform.menu.trade" text="default text"/></a></li>
            <li><a href="/"><spring:message code="platform.menu.learn" text="default text"/></a></li>
            <li class="profile"><a href="/"> <i></i> <spring:message code="platform.menu.profile" text="default text"/></a>
            </li>
        </ul>

        <div class="account-container">
            <div class="login-form hidden">
                <form action="/login" method="post">
                    <span>
                        <label for="username"><spring:message code="platform.login.login" text="default text"/></label>
                        <input type="text" name="username"/>
                    </span>
                    <span>
                        <label for="password"><spring:message code="platform.login.password"
                                                              text="default text"/></label>
                        <input type="text" name="password"/>
                    </span>
                    <input type="submit" value="Login">
                    <a href="/registration"><spring:message code="platform.login.register" text="default text"/></a>
                </form>
            </div>

            <div class="account-info hidden">
                <div class="account-id hidden">

                </div>
                <div class="account-login">
                    <spring:message code="platform.login.login" text="default text"/> <span class="login"></span>
                </div>
                <div class="account-balance">
                    <spring:message code="platform.login.balance" text="default text"/>
                    <span class="balance" data-source="lightstreamer" data-grid="accounts" data-field="balance"></span>
                </div>
                <form class="logout-form" action="/logout" method="post">
                    <input type="submit" value="Logout">
                </form>
            </div>
        </div>
    </div>

    <div class="left-sidebar pull-left">
        <div class="row">
            <div class="table-header-blue">
                <span class="pull-left"> <spring:message code="platform.options.assetType" text="default text"/></span>
                <select class="selectpicker">
                    <option><spring:message code="platform.options.stocks" text="default text"/></option>
                    <option><spring:message code="platform.options.forex" text="default text"/></option>
                    <option><spring:message code="platform.options.commodities" text="default text"/></option>
                    <option><spring:message code="platform.options.indexes" text="default text"/></option>
                </select>

                <div class="pull-right settings-wrapper">
                    <!--
                    <i class="settings pull-left"></i>
                    <i class="dropdown-settings pull-left">
                        <div class="dropdown-settings-open"></div>
                    </i>
                    -->
                </div>
            </div>

            <div class="options">
                <table class="option-template-container">
                    <tr class="option" onclick="Options.selectOption(this); return false;">
                        <td class="option-id hidden"></td>
                        <td class="hidden">
                            <div data-source="lightstreamer" data-grid="new_positions" data-field="entityId"
                                 class="new-positions-option-id"></div>
                            <div data-source="lightstreamer" data-grid="new_positions" data-field="id"
                                 class="new-positions-position-id"></div>
                            <div data-source="lightstreamer" data-grid="new_positions" data-field="investedAmount"
                                 class="new-positions-invested-amount"></div>
                            <div data-source="lightstreamer" data-grid="new_positions" data-field="openPrice"
                                 class="new-positions-open-price"></div>
                            <div data-source="lightstreamer" data-grid="new_positions" data-field="positionDirection"
                                 class="new-positions-direction"></div>
                        </td>
                        <td class="asset-name"></td>
                        <td class="asset-external-id hidden"></td>
                        <!--<div data-source="lightstreamer" data-grid="quotes" data-item="asset|${asset.externalId}" data-field="timestamp"></div></td>-->
                        <td>
                            <div data-source="lightstreamer" data-grid="quotes" data-field="value"
                                 class="asset-price"></div>
                        </td>
                        <td class="hidden">
                            <div data-source="lightstreamer" data-grid="quotes" data-field="timestampMillis"
                                 class="asset-quote-price">Quote Time
                            </div>
                        </td>
                        <td class="high-percent"></td>
                        <td class="low-percent"></td>
                        <td class="bursa-percent hidden"></td>
                        <td class="open-time hidden"></td>
                        <td class="trade-time hidden"></td>
                        <td class="close-time hidden"></td>
                        <td class="trade-time-countdown">00:00:00</td>
                        <td class="close-time-countdown">00:00:00</td>
                        <td>
                            <div class="bids-sum" data-source="lightstreamer" data-grid="options"
                                 data-field="jackpot"></div>
                        </td>
                        <td class="hidden">
                            <div class="option-status" data-source="lightstreamer" data-grid="options"
                                 data-field="optionStatus"></div>
                        </td>
                    </tr>
                </table>

                <table class="options-list table-striped table-bordered statistic">
                    <thead>
                    <tr>
                        <th class="hidden"></th>
                        <th class="asset-name"><spring:message code="platform.options.asset" text="default text"/></th>
                        <th class="hidden"></th>
                        <th><spring:message code="platform.options.price" text="default text"/></th>
                        <th class="hidden">Quote Time</th>
                        <th class="inf high-percent"><spring:message code="platform.options.high"
                                                                     text="default text"/><i class="information">
                            <div class="popup-info">
                                <spring:message code="platform.options.highWarning" text="default text"/>
                            </div>
                        </i>
                        </th>
                        <th class="inf low-percent"><spring:message code="platform.options.low" text="default text"/><i
                                class="information">
                            <div class="popup-info">
                                <spring:message code="platform.options.lowWarning" text="default text"/>
                            </div>
                        </i></th>
                        <th class="hidden"></th>
                        <th class="hidden"></th>
                        <th class="hidden"></th>
                        <th class="hidden"></th>
                        <th><spring:message code="platform.options.trade" text="default text"/></th>
                        <th><spring:message code="platform.options.close" text="default text"/></th>
                        <th><spring:message code="platform.options.bank" text="default text"/></th>
                        <th class="hidden"></th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="content pull-left">
        <div class="row content-two-column">
            <div class="bidder pull-left button-block">
                <div class="bidder-asset"></div>
                <div class="bidder-question hidden">
                    <spring:message code="platform.bidder.question" text="default text"/>
                </div>

                <div class="bidder-buttons">
                    <a onclick="Bidder.selectDirection(this); return false;"
                       class="bidder-button bid-high button green arrow" data-direction="HIGH"
                       href="#"><span><spring:message code="platform.bidder.highButton" text="default text"/></span></a>

                    <div class="price"><spring:message code="platform.bidder.price" text="default text"/><span
                            class="bidder-asset-price"></span></div>
                    <a onclick="Bidder.selectDirection(this); return false;"
                       class="bidder-button bid-low button red arrow arrow-bottom" data-direction="LOW"
                       href="#"><span><spring:message code="platform.bidder.lowButton" text="default text"/></span></a>
                </div>

                <div class="bidder-asset-quote-time hidden"></div>

                <div class="btn-group size">
                    <button class="btn">-</button>
                    <input type="text" value="100" class="btn bidder-amount"></input>
                    <button class="btn">+</button>
                </div>

                <a class="button black bidder-buy" href="#"
                   onclick="Positions.openPosition(this); return false;"><spring:message code="platform.bidder.buy"
                                                                                         text="default text"/></a>

                <div class="bidder-return return">
                    <div><spring:message code="platform.bidder.return" text="default text"/></div>
                    <!--
                    <div>$0.00 (83%)In the money</div>
                    <div>$0.00 (0%)Out of the money</div>
                    -->
                    <div class="high-return">
                        <spring:message code="platform.bidder.inHigh" text="default text"/>
                        <span class="amount"></span> <span class="percent"></span>
                        <spring:message code="platform.bidder.inTheMoney" text="default text"/>
                    </div>
                    <div class="low-return">
                        <spring:message code="platform.bidder.inLow" text="default text"/>
                        <span class="amount"></span> <span class="percent"></span>
                        <spring:message code="platform.bidder.inTheMoney" text="default text"/>
                    </div>
                    <div class="loose-return">
                        <spring:message code="platform.bidder.outOfTheMoney" text="default text"/> 0.00 $
                    </div>
                </div>
            </div>
            <div class="pull-right clearfix graph-block">
                <div class="graph-header">
                    <div class="technical-analysis">
                        <a class="pull-left" href="#"><spring:message code="platform.graph.technicalAnalysis"
                                                                      text="default text"/></a>
                    </div>
                    <span class="asset-name"></span>
                    <span class="date pull-right">Mar 26 2015    11:06:19</span>
                </div>
                <div class="graph-caption"></div>
                <div id="graph-container"></div>
            </div>
            <div class="row">
                <a class="after-graph pull-right" href="/positions-history"><spring:message code="platform.history.link"
                                                                                            text="default text"/></a>
            </div>

            <div class="open-positions-container">
                <table class="open-position-template hidden">
                    <tr class="open-position">
                        <td class="asset-name">assetName</td>
                        <td class="open-time hidden">openTime</td>
                        <td class="close-time hidden">closeTime</td>
                        <td class="close-time-countdown">00:00:00</td>
                        <td class="open-price">openPrice</td>
                        <td class="current-price"></td>
                        <td>
                            <div data-source="lightstreamer" data-grid="positions" data-field="closePrice"
                                 class="close-price"></div>
                        </td>
                        <td class="position-direction"></td>
                        <td class="invested-amount">investedAmount</td>
                        <td class="current-return-amount">currentReturnAmount</td>
                        <td class="result"></td>
                        <td class="hidden">
                            <div data-source="lightstreamer" data-grid="positions" data-field="returnedAmount"
                                 class="returned-amount"></div>
                        </td>
                        <td class="hidden">
                            <div data-source="lightstreamer" data-grid="positions" data-field="positionOutcome"
                                 class="position-outcome"></div>
                        </td>
                    </tr>
                </table>

                <table class="open-positions table-striped big-table table-bordered statistic">
                    <thead>
                    <tr>
                        <th><spring:message code="platform.positions.asset" text="default text"/></th>
                        <th class="hidden">openTime</th>
                        <th class="hidden">closeTime</th>
                        <th><spring:message code="platform.positions.close" text="default text"/></th>
                        <th><spring:message code="platform.positions.openPrice" text="default text"/></th>
                        <th><spring:message code="platform.positions.currentPrice" text="default text"/></th>
                        <th><spring:message code="platform.positions.closePrice" text="default text"/></th>
                        <th><spring:message code="platform.positions.direction" text="default text"/></th>
                        <th><spring:message code="platform.positions.invested" text="default text"/></th>
                        <th><spring:message code="platform.positions.currentReturn" text="default text"/></th>
                        <th><spring:message code="platform.positions.outcome" text="default text"/></th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="row footer pull-left">
        <div class="row footer-top">
            <a href="/">
                <div class="logo pull-left">
                    <spring:message code="platform.company.name" text="default text"/> <span><spring:message
                        code="platform.company.title" text="default text"/></span>
                </div>
            </a>

            <div class="copyright pull-right">
                <span>© 2014-2015</span> <spring:message code="platform.company.law" text="default text"/>
            </div>
        </div>
        <div class="row footer-bottom">
            <ul class="inline social">
                <li><a class="facebook" href="/"></a></li>
                <li><a class="twitter" href="/"></a></li>
                <li><a class="in" href="/"></a></li>
                <li><a class="google" href="/"></a></li>
                <li><a class="wk" href="/"></a></li>
            </ul>
        </div>
    </div>
</div>
<script src="/resources/js/main/main.js"></script>
</body>

</html>
