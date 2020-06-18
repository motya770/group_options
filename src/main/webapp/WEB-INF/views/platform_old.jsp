<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <div class="main-container panel panel-default container-fluid">
            <div>
                <a href="/admin/index">Admin</a>

                <P>The time on the server is ${serverTime}. </P>
            </div>
            <div class="panel-body">
                <div class="options left-main-side">
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
                                <div data-source="lightstreamer" data-grid="new_positions"
                                     data-field="positionDirection" class="new-positions-direction"></div>
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

                    <table class="options-list table table-bordered table-hover">
                        <tr>
                            <th class="hidden"></th>
                            <th class="asset-name">Asset</th>
                            <th class="hidden"></th>
                            <th>Price</th>
                            <th class="hidden">Quote Time</th>
                            <th class="high-percent">High %</th>
                            <th class="low-percent">Low %</th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th>Trade</th>
                            <th>Close</th>
                            <th>Bids Sum</th>
                            <th class="hidden"></th>
                        </tr>
                    </table>
                </div>
                <div class="right-main-side">
                    <div class="bidder col-sm-4">
                        <div class="bidder-asset">Do you want to invest?</div>
                        <div class="bidder-buttons">
                            <button type="button" class="bidder-button bid-high btn btn-lg btn-success"
                                    onclick="Bidder.selectDirection(this); return false;">High
                            </button>
                            <button type="button" class="bidder-button bid-low btn btn-lg btn-danger"
                                    onclick="Bidder.selectDirection(this); return false;">Low
                            </button>
                        </div>
                        <div class="bidder-asset-price"></div>
                        <div class="bidder-asset-quote-time hidden"></div>
                        <input class="bidder-amount"/>
                        <button type="button" class="bidder-buy btn btn-lg"
                                onclick="Positions.openPosition(this); return false;">Buy
                        </button>
                        <div class="bidder-return">
                            <div class="high-return">
                                <div class="amount"></div>
                                <div class="percent"></div>
                            </div>
                            <div class="low-return">
                                <div class="amount"></div>
                                <div class="percent"></div>
                            </div>
                            <div class="loose-return">
                                0.00 $
                            </div>
                        </div>
                    </div>

                    <div class="graph col-sm-8">
                        <div class="technical-analysis"><a href="#">Technical analysis</a></div>
                        <div class="graph-caption"></div>
                        <div id="graph-container"></div>
                    </div>
                    <div class="row">
                        <div class="open-positions-container col-sm-9">
                            <table class="open-position-template">
                                <tr class="open-position">
                                    <td class="asset-name">assetName</td>
                                    <td class="open-time hidden">openTime</td>
                                    <td class="close-time hidden">closeTime</td>
                                    <td class="close-time-countdown">00:00:00</td>
                                    <td class="open-price">openPrice</td>
                                    <td>
                                        <div data-source="lightstreamer" data-grid="positions" data-field="closePrice"
                                             class="close-price"></div>
                                    </td>
                                    <td class="position-direction"></td>
                                    <td class="invested-amount">investedAmount</td>
                                    <td class="current-return-amount">currentReturnAmount</td>
                                    <td>
                                        <div data-source="lightstreamer" data-grid="positions"
                                             data-field="returnedAmount" class="returned-amount"></div>
                                    </td>
                                    <td>
                                        <div data-source="lightstreamer" data-grid="positions"
                                             data-field="positionOutcome" class="position-outcome"></div>
                                    </td>
                                </tr>
                            </table>
                            <table class="open-positions table table-bordered table-hover">
                                <tr class="open-position-captions">
                                    <th>Asset</th>
                                    <th class="hidden">openTime</th>
                                    <th class="hidden">closeTime</th>
                                    <th>Close</th>
                                    <th>Open Price</th>
                                    <th>Close Price</th>
                                    <th>Direction</th>
                                    <th>Invested</th>
                                    <th>Current Return Amount</th>
                                    <th>Returned Amount</th>
                                    <th>Outcome</th>
                                </tr>
                            </table>
                        </div>
                        <div class="col-sm-1">
                            <a href="/positions-history">Past Positions</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </jsp:body>
</t:sitepage>