<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <script type="text/javascript">
            $(function () {
                var hostToUse = $("#streamer_host").text(); //"http://localhost:9090";
                var lsClient = new LightstreamerClient(hostToUse, "GSTREAMER");
                lsClient.connect();

                var stocksGrid = new StaticGrid("quotes", true);
                stocksGrid.setAutoCleanBehavior(true, false);
                stocksGrid.addListener({
                    onVisualUpdate: function (key, info) {
                        if (info == null) {
                            //cleaning
                            return;
                        }
                        console.log(key + " " + info);
                        var cold = (key.substring(4) % 2 == 1) ? "#eeeeee" : "#ddddee";
                        info.setAttribute("yellow", cold, "backgroundColor");

                    }
                });

                var stockSubscription = new Subscription("MERGE", stocksGrid.extractItemList(), stocksGrid.extractFieldList());
                stockSubscription.addListener(stocksGrid);
                stockSubscription.setDataAdapter("QUOTE_ADAPTER");
                stockSubscription.setRequestedSnapshot("yes");

                lsClient.subscribe(stockSubscription);

            });
        </script>

        <h1>Live Quotes</h1>

        <div id="streamer_host">${streamerHost}</div>

        <div class="col-sm-9 main">
            <table class="table table-striped">
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Time</th>
                </tr>
                <c:forEach var="asset" items="${assetList}">
                    <tr>
                        <td><a href="/admin/asset/show?id=${asset.id}">${asset.name}</a></td>
                        <td>
                            <div data-source="lightstreamer" data-grid="quotes" data-item="asset|${asset.externalId}"
                                 data-field="value"></div>
                        </td>
                        <td>
                            <div data-source="lightstreamer" data-grid="quotes" data-item="asset|${asset.externalId}"
                                 data-field="timestamp"></div>
                        </td>
                        <!--<td><div data-source="lightstreamer" data-grid="quotes" data-item="asset|${asset.externalId}" data-field="timestampMillis"></div></td>-->
                    </tr>
                </c:forEach>
            </table>
        </div>
        <div>
        </div>
    </jsp:body>
</t:adminpage>