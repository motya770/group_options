<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:adminpage>
    <jsp:body>
        <h1>Option Creators List</h1>
        <div><a href="/admin/option-creator/new-entity">Create</a></div>

        <div class="col-sm-9">
            <table class="table table-striped">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Currency</th>
                    <th>Demo</th>
                    <th>Assets</th>
                </tr>

                <c:forEach items="${optionCreatorList}" var="optionCreator">
                    <tr>
                        <td><a href="/admin/option-creator/show?id=${optionCreator.id}"> ${optionCreator.id}</a></td>
                        <td>${optionCreator.name}</td>
                        <td>${optionCreator.currency}</td>
                        <td>${optionCreator.demo}</td>
                        <td>
                            <c:forEach items="${optionCreator.assets}" var = "asset">
                                ${asset.name},
                            </c:forEach>
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </jsp:body>
</t:adminpage>