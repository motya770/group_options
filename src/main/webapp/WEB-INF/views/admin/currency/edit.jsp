<%@ page import="com.goptions.bp.model.currency.Currency" %>
<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Edit Currency Setting</h3>
                </div>

                <form action="/admin/currency/update" method="POST">

                    <div>
                        <input name="id" id="id" type="hidden" value="${currencySetting.id}"/>
                    </div>

                    <div>
                        <label for="currency">Currency</label>
                        <select name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <c:choose>
                                    <c:when test="${currency == currencySetting.currency}">
                                        <option value="${currencySetting.currency}"
                                                selected>${currencySetting.currency}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${currency}">${currency}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <label for="minBid">Min bid</label>
                        <input name="minBid" id="minBid" type="number" value="${currencySetting.minBid}"/>
                    </div>

                    <div>
                        <label for="maxBid">Max bid</label>
                        <input name="maxBid" id="maxBid" type="number" value="${currencySetting.maxBid}"/>
                    </div>

                    <div>
                        <label for="minDeposit">Min deposit</label>
                        <input name="minDeposit" id="minDeposit" type="number" value="${currencySetting.minDeposit}"/>
                    </div>

                    <div>
                        <label for="maxDeposit">Max deposit</label>
                        <input name="maxDeposit" id="maxDeposit" type="number" value="${currencySetting.maxDeposit}"/>
                    </div>

                    <div>
                        <input type="submit" value="Update" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>