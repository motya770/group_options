<%@ page import="com.goptions.bp.utils.JspHelper" %>
<%@ page import="org.springframework.util.StringUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="paging" scope="request">
    <div class="pagination">
        <ul>
            <%
                int maxPageNumber = 5;
                String pageNumberParam = request.getParameter("pageNumber");
                int currentPage = 1;
                if (!StringUtils.isEmpty(pageNumberParam)) {
                    maxPageNumber = Integer.parseInt(pageNumberParam);
                    currentPage = maxPageNumber;
                }

                String currentUrl = JspHelper.getCurrentUrl(request);

                for (int i = 1; i <= (maxPageNumber + 2); i++) {
                    if (i == currentPage) {
                        out.println("<li class='active'><a href='" + currentUrl + "?pageNumber=" + i + "'>" + i + "</a></li>");
                    } else {
                        out.println("<li><a href='" + currentUrl + "?pageNumber=" + i + "'>" + i + "</a></li>");
                    }
                }
            %>
        </ul>
    </div>
</c:set>
