<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:adminpage>
    <jsp:body>
        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Create Asset</h3>
                </div>
                <div>
                    <form action="/admin/asset/create">
                        <div>Name <input name="name"/></div>
                        <div>
                            <label for="pipSize">Pip Size</label>
                            <input name="pipSize" id="pipSize" type="number"/>
                        </div>
                        <div>External Id <input name="externalId"/></div>
                        <div>Asset Type <input name="type"/></div>
                        <div>Feed Id <input name="feedId"/></div>


                        <input type="submit" value="Create" class="btn btn-default"/>
                    </form>
                </div>
            </div>
        </div>
    </jsp:body>
</t:adminpage>

