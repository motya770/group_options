<%@ page import="com.goptions.bp.model.currency.Currency" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <script src="/resources/js/plat/options-creator.js"></script>

        <div class="col-sm-7">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Option Creator Editor</h3>
                </div>
                <div class="option-creator">

                    <div class="hidden option-creator-id">${optionCreator.id}</div>

                    <label for="name">Name</label>
                    <input class="name" type="text" name="name" value="${optionCreator.name}"/>

                    <div>
                        <label for="optionType">Option Type</label>
                        <select class="optionType" name="optionType">
                            <c:forEach items="<%=OptionType.values()%>" var="optionType">
                                <c:choose>
                                    <c:when test="${optionType == optionCreator.optionType}">
                                        <option value="${optionCreator.optionType}" selected>${optionCreator.optionType}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${optionType}">${optionType}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div class="hidden">
                        <label for="currency">Currency</label>
                        <select class="currency" name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <c:choose>
                                    <c:when test="${currency == optionCreator.currency}">
                                        <option value="${optionCreator.currency}" selected>${optionCreator.currency}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${currency}">${currency}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <label for="demo">Demo</label>
                        <c:choose>
                            <c:when test="${optionCreator.demo == true}">
                                <input type="checkbox" name="demo" class="demo" checked/>
                            </c:when>
                            <c:otherwise>
                                <input type="checkbox" name="demo" class="demo"/>
                            </c:otherwise>
                        </c:choose>
                    </div>

                    <div>
                        <label for="useWeek">Use Week</label>
                        <c:choose>
                            <c:when test="${optionCreator.useWeek == true}">
                                <input type="checkbox" name="useWeek" class="useWeek" checked/>
                            </c:when>
                            <c:otherwise>
                                <input type="checkbox" name="useWeek" class="useWeek"/>
                            </c:otherwise>
                        </c:choose>
                    </div>

                    <div class="assets-container">
                        <div class="ui-widget">
                            <label for="assets-autocomplete">Choose asset: </label>
                            <input class="assets-autocomplete" name="assets-autocomplete">
                        </div>

                        <div class="asset-template hidden">
                                <span class="asset-item" onclick="OptionCreator.removeAssetItem(this); return false;">
                                    <span class="asset-item-id"></span>
                                    <span class="asset-item-name"></span>
                                    <span class="asset-item-remove ui-icon ui-icon-closethick"></span>
                                </span>
                        </div>

                        <div class="assets-list">
                              <c:forEach var="asset" items="${optionCreator.assets}">
                                    <span class="asset-item" onclick="OptionCreator.removeAssetItem(this); return false;">
                                        <span class="asset-item-id">${asset.id}</span>
                                        <span class="asset-item-name">${asset.name}</span>
                                        <span class="asset-item-remove ui-icon ui-icon-closethick"></span>
                                    </span>
                              </c:forEach>
                        </div>
                    </div>

                    <div class="generate-frames panel">
                        <div><b>Generate Frames</b></div>
                        <div>Hours (from, to):
                            <input class="from-generate" />
                            <input class="to-generate"   />
                        </div>
                        <div>Interval (bid interval):
                            <input class="bid-interval" type="number">
                            (trade interval)
                            <input class="trade-interval" type="number">
                        </div>
                        <div>
                            <input type="button" class="generate" onclick="OptionCreator.generateFrames(this); return false;" value="Generate frames" />
                            <input type="button" class="" onclick="OptionCreator.removeFrames(this); return false;" value="Remove frames" />
                        </div>
                        <div class="assets-frame-template hidden">
                            <div class="assets-frame frame-counter-0">
                                <div class="dates-container">
                                    <div class="creator-triple-date">
                                        <input class="bid-start"/>
                                        <input class="trade-start"/>
                                        <input class="trade-end"/>
                                    </div>
                                </div>

                                <div classs="frame-controls">
                                    <div class="add-date-row ui-icon ui-icon-pencil"
                                         onclick="OptionCreator.addFrame(this); return false;"></div>
                                    <div class="remove-date-row ui-icon ui-icon-closethick"
                                         onclick="OptionCreator.removeFrame(this); return false;"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="frames-list">
                        <c:set var="counter" value="0"/>
                        <c:forEach var="frame" items="${optionCreator.timeFrames}">
                            <div class="assets-frame frame-counter-${counter}">
                                <div class="dates-container">
                                    <div class="creator-triple-date">
                                        <input class="bid-start" value="${frame.bidStart}"/>
                                        <input class="trade-start" value="${frame.tradeStart}"/>
                                        <input class="trade-end" value="${frame.tradeEnd}"/>
                                    </div>
                                </div>

                                <div classs="frame-controls">
                                    <div class="add-date-row ui-icon ui-icon-pencil"
                                         onclick="OptionCreator.addFrame(this); return false;"></div>
                                    <div class="remove-date-row ui-icon ui-icon-closethick"
                                         onclick="OptionCreator.removeFrame(this); return false;"></div>
                                </div>
                            </div>
                            <c:set var="counter" value="${counter + 1}"/>
                        </c:forEach>
                    </div>

                    <input type="button" class="create-option-creator" onclick="OptionCreator.createOptionCreator(); return false;"
                           value="Save Option Creator"/>
                </div>
            </div>
        </div>

        <div class="message" title="Message">
            <p></p>
        </div>

    </jsp:body>
</t:adminpage>