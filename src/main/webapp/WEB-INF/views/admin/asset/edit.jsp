<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.goptions.bp.model.asset.AssetType" %>

<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Edit Asset</h3>
                </div>
                <form action="/admin/asset/update" method="POST">
                    <input name="id" type="hidden" value="${asset.id}"/>

                    <div>
                        <label for="name">Name</label>
                        <input name="name" id="name" type="text" value="${asset.name}"/>
                    </div>
                    <div>
                        <label for="pipSize">Pip Size</label>
                        <input name="pipSize" id="pipSize" type="number" value="${asset.pipSize}"/>
                    </div>
                    <div>
                        <label for="externalId">External Id</label>
                        <input name="externalId" id="externalId" type="text" value="${asset.externalId}"/>
                    </div>
                    <div>
                        <label for="feedId">Feed Id</label>
                        <input name="feedId" id="feedId" type="text" value="${asset.feedId}"/>
                    </div>
                    <div>
                        <label for="type">Asset type</label>
                        <select name="type">
                            <c:forEach items="<%= AssetType.values() %>" var="type">
                                <c:choose>
                                    <c:when test="${asset.assetType == type}">
                                        <option value="${type}" selected>${type}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${type}">${type}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </select>
                    </div>
                    <div>
                        <label for="active">Active</label>
                        <select name="active">
                            <c:choose>
                                <c:when test="${asset.active == true}">
                                    <option value="true" selected>true</option>
                                    <option value="false">false</option>
                                </c:when>
                                <c:otherwise>
                                    <option value="true">true</option>
                                    <option value="false" selected>false</option>
                                </c:otherwise>
                            </c:choose>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Update" class="btn btn-default">
                    </div>
                </form>
            </div>
        </div>
    </jsp:body>
</t:adminpage>


