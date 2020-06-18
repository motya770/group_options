<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>


<html ng-app>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
</head>
<body>
<div>
    <label>Name:</label>
    <input type="text" ng-model="yourName" placeholder="Enter a name here">
    <hr>
    <h1>Hello {{yourName}}!</h1>
</div>
</body>
</html>