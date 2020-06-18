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
                $('#bidStartTime').datetimepicker({format: 'd/m/Y H:i'});
                //$('#bidEndTime').datetimepicker({format:'d/m/Y H:i'});
                $('#tradeStartTime').datetimepicker({format: 'd/m/Y H:i'});
                $('#tradeEndTime').datetimepicker({format: 'd/m/Y H:i'});
            });
        </script>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Create Option</h3>
                </div>

                <form action="/admin/option/create" method="POST">
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
                                <option value="${asset.id}">${asset.name}</option>
                            </c:forEach>
                        </select>
                    </div>

                    <div class="hidden">
                        <label for="currency">Currency</label>
                        <select name="currency">
                            <c:forEach items="<%=Currency.values()%>" var="currency">
                                <option value="${currency}">${currency}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div>
                        <label for="optionType">Option Type</label>
                        <select name="optionType">
                            <c:forEach items="<%=OptionType.values()%>" var="optionType">
                                <option value="${optionType}">${optionType}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div>
                        <label for="demo">Demo</label>
                        <input type="checkbox" name="demo" id="name"/>
                    </div>

                    <jsp:include page="options-configuration.jsp"/>

                    <div>
                        <input type="submit" value="Create" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>