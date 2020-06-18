<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="login-form">
    <script>
        function goRegPage() {
            window.location.href = "/registration";
        }
    </script>
    <form id="formLogin" action="/login" method="post">
        <table>
            <tr>
                <td><label for="username"><s:message code="platform.login.login" text="default text"/></label></td>
                <td><input type="text" name="username" style="margin-bottom: 0px;" /></td>
            </tr>
            <tr>
                <td><label for="password"><s:message code="platform.login.password" text="default text"/></label></td>
                <td><input type="text" name="password"  style="margin-bottom: 0px;" /></td>
            </tr>
            <tr>
                <td>
                    <input type="submit" value="<s:message code="platform.login.enter" text="default text" />"
                           class="btn btn-success"/>
                </td>
                <td>
                    <input type="button" onclick="goRegPage(); return false;"
                           value="<s:message code="platform.login.register" text="default text" />"
                           class="btn btn-info"/>

                    <!--<a href="/registration" class="btn btn-info"><s:message code="platform.login.register" text="default text" /></a>-->
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td class="login-error">
                    <c:if test="${not empty SPRING_SECURITY_LAST_EXCEPTION}">
                        <s:message code="platform.login.error" text="default text"/>
                        <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
                    </c:if>
                </td>
            </tr>
        </table>
    </form>


</div>