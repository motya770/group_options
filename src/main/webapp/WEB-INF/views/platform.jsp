<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <div class="left-sidebar pull-left">
            <div class="row">
                <div class="platfrom-page"></div>
                <div class="table-header-blue">
                    <span class="pull-left">
                        <s:message code="platform.options.title" text="default text"/>
                        <!--
                        <s:message code="platform.options.assetType" text="default text" />
                        -->
                    </span>

                    <select class="selectpicker option-type-picker" onchange="Options.optionTypeChanged(this);">
                        <option value="ORIGINAL">Original</option>
                        <option value="SHORT_TERM">Short Term</option>
                        <option value="LONG_TERM">Long Term</option>
                        <option value="LADDER">Ladder</option>
                    </select>
                    <!--
                    <select class="selectpicker">
                        <option><s:message code="platform.options.stocks" text="default text" /></option>
                        <option><s:message code="platform.options.forex" text="default text" /></option>
                        <option><s:message code="platform.options.commodities" text="default text" /></option>
                        <option><s:message code="platform.options.indexes" text="default text" /></option>
                    </select>
                    -->
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
                        <tr class="options-closed">
                            <td class="asset-name">EUR/USD</td>
                            <td class="explanation" colspan="6"><s:message code="platform.options.optionClosed" text="default text"/></td>
                        </tr>
                        <tr class="options-simulated">
                            <td class="asset-name">EUR/USD</td>
                            <td class="explanation" colspan="6"><s:message code="platform.options.optionSimulated" text="default text"/></td>
                        </tr>
                        <tr class="options-created">
                            <td class="option-id hidden"></td>
                            <td class="asset-name">EUR/USD</td>
                            <td class="explanation" colspan="6">Option created</td>
                            <td class="hidden"><div class="option-status" data-source="lightstreamer" data-grid="options" data-field="optionStatus"></div></td>
                        </tr>
                        <tr class="option" onclick="Options.selectOption(this); return false;">
                            <td class="option-id hidden"></td>
                            <td class="asset-name"></td>
                            <td class="asset-external-id hidden"></td>
                            <td><div data-source="lightstreamer" data-grid="quotes" data-field="value" class="asset-price"></div></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="quotes" data-field="timestampMillis" class="asset-quote-price">Quote Time</div></td>
                            <td class="percent"></td>
                            <td class="open-time hidden"></td>
                            <td class="trade-time hidden"></td>
                            <td class="close-time hidden"></td>
                            <td class="short-expiration hidden">60 sec.</td>
                            <td class="trade-time-countdown">00:00:00</td>
                            <td class="close-time-countdown">00:00:00</td>
                            <td class="option-type hidden"></td>
                            <td class="pip-size hidden"></td>
                            <td class="hidden"><div class="option-status" data-source="lightstreamer" data-grid="options"  data-field="optionStatus"></div></td>
                        </tr>
                    </table>

                    <table class="options-list table-striped table-bordered statistic">
                        <thead class="options-header">
                        <tr>
                            <th class="hidden"></th>
                            <th class="asset-name"><s:message code="platform.options.asset" text="default text"/></th>
                            <th class="hidden"></th>
                            <th><s:message code="platform.options.price" text="default text"/></th>
                            <th class="hidden">Quote Time</th>
                            <th class="inf percent"><s:message code="platform.options.high" text="default text"/></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden short-expiration-header"><s:message code="platform.options.shortExpiration" text="default text"/></th>
                            <th class="trade-timer-header"><s:message code="platform.options.trade" text="default text"/></th>
                            <th class="close-timer-header"><s:message code="platform.options.close" text="default text"/></th>
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
                        <s:message code="platform.bidder.question" text="default text"/>
                    </div>
                    <div class="bidder-buttons">
                        <a onclick="Bidder.selectDirection(this); return false;"
                           class="bidder-button bid-high button green arrow" data-direction="HIGH"
                           href="#"><span><s:message code="platform.bidder.highButton" text="default text"/></span></a>

                        <div class="price"><s:message code="platform.bidder.price" text="default text"/><span
                                class="bidder-asset-price"></span></div>
                        <a onclick="Bidder.selectDirection(this); return false;"
                           class="bidder-button bid-low button red arrow arrow-bottom" data-direction="LOW"
                           href="#"><span><s:message code="platform.bidder.lowButton" text="default text"/></span></a>
                    </div>
                    <div class="bidder-asset-quote-time hidden"></div>
                    <div class="btn-group size">
                        <!--
                        <button class="btn">-</button>
                        -->
                        <input type="text" class="btn bidder-amount" style="width: 100%;" onkeydown="Validator.allowOnlyNumbers(event);"/>
                        <!--
                        <button class="btn">+</button>
                        -->
                    </div>
                    <a class="button black bidder-buy" href="#"
                       onclick="Positions.openPosition(this); return false;"><s:message code="platform.bidder.buy"
                                                                                        text="default text"/></a>
                    <div class="bidder-return return">
                        <div><s:message code="platform.bidder.return" text="default text"/></div>
                        <div class="high-return">
                            <s:message code="platform.bidder.inHigh" text="default text"/>
                            <s:message code="platform.bidder.inTheMoney" text="default text"/>
                            <span class="amount"></span> <span class="percent"></span>
                        </div>
                        <div class="loose-return">
                            <s:message code="platform.bidder.outOfTheMoney" text="default text"/> 0.00 $
                        </div>
                    </div>
                </div>
                <div class="pull-right clearfix graph-block">
                    <div class="graph-header">
                        <div class="technical-analysis">
                            <a class="pull-left" href="/technical-analysis"><s:message
                                    code="platform.graph.technicalAnalysis" text="default text"/></a>
                        </div>
                        <span class="asset-name"></span>
                        <span class="asset-external-id hidden"></span>
                        <!--
                        <span class="date pull-right">Mar 26 2015    11:06:19</span>
                        -->
                    </div>
                    <div class="graph-caption"></div>
                    <div id="graph-container"></div>
                </div>

                <div class="row">
                    <a class="after-graph pull-right" href="/customer/past-page"><s:message code="platform.history.link" text="default text"/></a>
                </div>

                <div class="open-positions-container">
                    <table class="open-position-template hidden">
                        <tr class="open-position" onclick="Positions.selectPosition(this);return false;">
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="id" class="position-id"></div></td>
                            <td class="option-type hidden">optionType</td>
                            <td class="asset-name">assetName</td>
                            <td class="asset-external-id hidden">assetExternald</td>
                            <td class="bid-start-time hidden">bidStartTime</td>
                            <td class="open-time hidden">openTime</td>
                            <td class="trade-time hidden">tradeTime</td>
                            <td class="close-time hidden">closeTime</td>
                            <td class="close-time-countdown">00:00:00</td>
                            <td class="open-price">openPrice</td>
                            <td class="current-price-filtered"></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="currentPrice" class="current-price"></div></td>
                            <td><div data-source="lightstreamer" data-grid="positions" data-field="closePrice" class="close-price"></div></td>
                            <td class="position-direction"></td>
                            <td class="invested-amount">investedAmount</td>
                            <td class="current-return-amount-filtered"></td>
                            <td class="result"></td>
                            <td class="profit-percent hidden"></td>
                            <td class="pip-size hidden"></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="returnedAmount" class="returned-amount"></div></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="positionOutcome" class="position-outcome"></div></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="positionStatus" class="position-status"></div></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="currentReturnAmount" class="current-return-amount"></div></td>
                            <td class="hidden"><div data-source="lightstreamer" data-grid="positions" data-field="currentTime" class="current-time"></div></td>
                        </tr>
                    </table>
                    <table class="open-positions table-striped big-table table-bordered statistic">
                        <thead>
                        <tr>
                            <th><s:message code="platform.positions.asset" text="default text"/></th>
                            <th class="hidden">optionType</th>
                            <th class="hidden">openTime</th>
                            <th class="hidden">closeTime</th>
                            <th><s:message code="platform.positions.close" text="default text"/></th>
                            <th><s:message code="platform.positions.openPrice" text="default text"/></th>
                            <th><s:message code="platform.positions.currentPrice" text="default text"/></th>
                            <th><s:message code="platform.positions.closePrice" text="default text"/></th>
                            <th><s:message code="platform.positions.direction" text="default text"/></th>
                            <th><s:message code="platform.positions.invested" text="default text"/></th>
                            <th><s:message code="platform.positions.currentReturn" text="default text"/></th>
                            <th><s:message code="platform.positions.outcome" text="default text"/></th>
                            <th class="hidden">positionStatus</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>

            <table class="position-quotes-template hidden">
                <tr class="position-quotes-row">
                    <td><div data-source="lightstreamer" data-grid="position_quotes" data-field="value" class="position-price">Price</div></td>
                    <td><div data-source="lightstreamer" data-grid="position_quotes" data-field="timestampMillis" class="position-time">Time</div></td>
                </tr>
            </table>

            <table class="position-quotes-container hidden">

            </table>

            <div class="translations hidden">
                <div class="optionAvailable"><s:message code="platform.options.optionAvailable"
                                                        text="default text"/></div>
            </div>
        </div>
    </jsp:body>
</t:sitepage>

