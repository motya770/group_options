<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <h1>Assets List</h1>
        <div class="col-sm-9 main">
            <jsp:include page="filter.jsp"/>
            <div><a href="/admin/asset/new-entity">Create</a></div>
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Pip Size</th>
                    <th>External Id</th>
                    <th>Feed Id</th>
                    <th>Type</th>
                    <th>Active</th>
                </tr>
                <c:forEach var="asset" items="${assetList}">
                    <tr>
                        <td><a href="/admin/asset/show?id=${asset.id}"> ${asset.id}</a></td>
                        <td>${asset.name}</td>
                        <td>${asset.pipSize}</td>
                        <td>${asset.externalId}</td>
                        <td>${asset.feedId}</td>
                        <td>${asset.assetType}</td>
                        <td>${asset.active}</td>
                    </tr>
                </c:forEach>
            </table>

            <!--
                ${paging}
            -->
        </div>
        <div>
        </div>
    </jsp:body>
</t:adminpage>