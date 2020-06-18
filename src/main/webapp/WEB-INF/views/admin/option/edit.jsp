<%@ page import="com.goptions.bp.model.currency.Currency" %>
<%@ page import="com.goptions.bp.model.option.OptionType" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<t:adminpage>
    <jsp:body>
        <script>
            $(function () {
                var bidStartTime = new Date(${option.bidStartTime});
                var bidStartTimeValue = getFormattedDate(bidStartTime);

                var tradeStartTime = new Date(${option.tradeStartTime});
                var tradeStartTimeValue = getFormattedDate(tradeStartTime);

                var tradeEndTime = new Date(${option.tradeEndTime});
                var tradeEndTimeValue = getFormattedDate(tradeEndTime);

                $('#bidStartTime').datetimepicker({format: 'd/m/Y H:i', value: bidStartTimeValue});
                //$('#bidEndTime').datetimepicker({format:'d/m/Y H:i',  value: bidEndTimeValue});
                $('#tradeStartTime').datetimepicker({format: 'd/m/Y H:i', value: tradeStartTimeValue});
                $('#tradeEndTime').datetimepicker({format: 'd/m/Y H:i', value: tradeEndTimeValue});
            });
            function getFormattedDate(d) {
                var str = "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                        + " " + d.getHours() + ":" + d.getMinutes();
                return str;
            }
        </script>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Edit Option</h3>
                </div>
                <form action="/admin/option/update" method="POST">
                    <input name="id" type="hidden" value="${option.id}"/>

                    <div>
                        <label for="bidStartTime">Bid Start Time</label>
                        <input name="bidStartTime" id="bidStartTime" type="text"/>
                    </div>
                    <div>
                        <label for="tradeStartTime">Trade Start Time</label>
                        <input name="tradeStartTime" id="tradeStartTime" type="text"/>
                    </div>
                    <div>
                        <label for="tradeEndTime">Trade End Time</label>
                        <input name="tradeEndTime" id="tradeEndTime" type="text"/>
                    </div>
                    <div>
                        <label for="assetId">Asset</label>
                        <select name="assetId">
                            <c:forEach items="${assetList}" var="asset">
                                <c:choose>
                                    <c:when test="${option.asset.id == asset.id}">
                                        <option value="${asset.id}" selected>${asset.name}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${asset.id}">${asset.name}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div class="hidden">
                        <label for="currency">Currency</label>
                        <select name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <c:choose>
                                    <c:when test="${currency == option.currency}">
                                        <option value="${option.currency}" selected>${option.currency}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${currency}">${currency}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <label for="optionType">Option Type</label>
                        <select name="optionType">
                            <c:forEach items="<%=OptionType.values()%>" var="optionType">
                                <c:choose>
                                    <c:when test="${optionType == option.optionType}">
                                        <option value="${option.optionType}" selected>${option.optionType}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${optionType}">${optionType}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>

                        <jsp:include page="options-configuration.jsp"/>

                        <input type="submit" value="Update" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>