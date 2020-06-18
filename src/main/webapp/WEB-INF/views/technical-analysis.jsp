<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <div class="left-sidebar pull-left" style="height: 100%;">
            <h2><s:message code="technical.title" text="default text" /></h2>
            <!-- TradingView Widget BEGIN -->
            <script type="text/javascript" src="https://d33t3vvu2t2yu5.cloudfront.net/tv.js"></script>
            <script type="text/javascript">
                new TradingView.widget({
                    "width": 998,
                    "height": 610,
                    "symbol": "${param.assetExternalId}",
                    "interval": "D",
                    "timezone": "exchange",
                    "theme": "White",
                    "style": "1",
                    "toolbar_bg": "#f1f3f6",
                    "withdateranges": true,
                    "hide_side_toolbar": false,
                    "allow_symbol_change": true,
                    "hideideas": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650"
                });
            </script>
            <!-- TradingView Widget END -->
        </div>
    </jsp:body>
</t:sitepage>