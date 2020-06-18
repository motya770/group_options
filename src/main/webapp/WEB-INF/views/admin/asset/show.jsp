<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Show Asset</h3>
                </div>
                <div>
                    <div>Id ${asset.id}</div>
                    <div>Name ${asset.name}</div>
                    <div>Pip Size ${asset.pipSize}</div>
                    <div>External Id ${asset.externalId}</div>
                    <div>Feed Id ${asset.feedId}</div>
                    <div>Asset Type ${asset.assetType}</div>
                    <div>Active ${asset.active}</div>
                </div>
                <a href="/admin/asset/delete?id=${asset.id}" class="btn btn-default">Delete</a>
                <a href="/admin/asset/edit?id=${asset.id}" class="btn btn-default">Edit</a>
            </div>
        </div>
    </jsp:body>
</t:adminpage>

