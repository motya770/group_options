<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
        <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Show Option Creator</h3>
        </div>
        <div>
            <div>
                Id <span>${optionCreator.id}</span>
            </div>
            <div>
               Name <span>${optionCreator.name}</span>
            </div>
            <div>
                Option Type <span>${optionCreator.optionType}</span>
            </div>
            <div>
                Currency <span>${optionCreator.currency}</span>
            </div>
            <div>
                Demo <span>${optionCreator.demo}</span>
            </div>
            <div>
                Use week <span>${optionCreator.useWeek}</span>
            </div>
            <div>
                Assets <span>
                            <c:forEach var="asset" items="${optionCreator.assets}">
                                   ${asset.name},
                            </c:forEach>
                       </span>
            </div>
            <div>
                Time Frames
                <div>
                    <c:forEach var="frame" items="${optionCreator.timeFrames}">
                        <div>
                            ${frame.bidStart} ,
                            ${frame.tradeStart},
                            ${frame.tradeEnd}
                        </div>
                    </c:forEach>
                <div>
            </div>

            <div>
                <a href="/admin/option-creator/delete?id=${optionCreator.id}" class="btn btn-default">Delete</a>
                <a href="/admin/option-creator/edit?id=${optionCreator.id}" class="btn btn-default">Edit</a>
                <a href="/admin/option-creator/generate-options?id=${optionCreator.id}" class="btn btn-default">Generate Options</a>
                <a href="/admin/option-creator/cancel-generated-options?id=${optionCreator.id}" class="btn btn-default">Cancel Generated Options</a>
            </div>
        </div>
    </jsp:body>
</t:adminpage>

