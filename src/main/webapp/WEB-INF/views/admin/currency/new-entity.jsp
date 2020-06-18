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
                    <h3 class="panel-title">Create Currency Setting</h3>
                </div>

                <form action="/admin/currency/create" method="POST">

                    <div>
                        <label for="currency">Currency</label>
                        <select name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <option value="${currency}">${currency}</option>
                            </c:forEach>
                        </select>
                    </div>

                    <div>
                        <label for="minBid">Min bid</label>
                        <input name="minBid" id="minBid" type="number"/>
                    </div>

                    <div>
                        <label for="maxBid">Max bid</label>
                        <input name="maxBid" id="maxBid" type="number"/>
                    </div>

                    <div>
                        <label for="recommendedBid">Recommended bid</label>
                        <input name="recommendedBid" id="recommendedBid" type="number"/>
                    </div>

                    <div>
                        <label for="minDeposit">Min deposit</label>
                        <input name="minDeposit" id="minDeposit" type="number"/>
                    </div>

                    <div>
                        <label for="maxDeposit">Max deposit</label>
                        <input name="maxDeposit" id="maxDeposit" type="number"/>
                    </div>


                    <div>
                        <input type="submit" value="Create" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>