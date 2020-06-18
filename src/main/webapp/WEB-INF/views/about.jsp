<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <div class="left-sidebar pull-left" style="height: 100%;">
            <h3><s:message code="about.main.title" text="default text"/></h3>
            <p><s:message code="about.main.explanation" text="default text"/></p>
            <p></p>
            <h3><s:message code="about.faq.title" text="default text"/></h3>
            <div class="accordion" id="accordion2">
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse1">
                            <s:message code="about.faq.meaning.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse1" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.meaning.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                           href="#collapse101">
                            <s:message code="about.faq.example.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse101" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.example.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                           href="#collapseOne">
                            <s:message code="about.faq.howToBid.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapseOne" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.howToBid.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                            Что за таблица с левой стороны?
                        </a>
                    </div>
                    <div id="collapseTwo" class="accordion-body collapse">
                        <div class="accordion-inner">
                            Anim pariatur cliche...
                        </div>
                    </div>
                </div>-->
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                            <s:message code="about.faq.leftSideTable.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapseThree" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.leftSideTable.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse4">
                            <s:message code="about.faq.trend.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse4" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.trend.explanation" text="default text"/>
                        </div>
                    </div>
                </div>-->
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse5">
                            <s:message code="about.faq.percents.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse5" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.percents.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse6">
                            <s:message code="about.faq.techLink.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse6" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.techLink.explanation" text="default text"/>
                        </div>
                    </div>
                </div>-->
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse61">
                            <s:message code="about.faq.howToGraph.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse61" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.howToGraph.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse7">
                            <s:message code="about.faq.percentOption.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse7" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.percentOption.explanation" text="default text"/>
                        </div>
                    </div>
                </div>-->
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse8">
                            <s:message code="about.faq.percentChange.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse8" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.percentChange.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                -->
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse8">
                            Почему процент возврата
                        </a>
                    </div>
                    <div id="collapse8" class="accordion-body collapse">
                        <div class="accordion-inner">
                            Anim pariatur cliche...
                        </div>
                    </div>
                </div>-->
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse9">
                            <s:message code="about.faq.history.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse9" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.history.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse10">
                            <s:message code="about.faq.deposit.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse10" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.deposit.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <!--
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse11">
                            <s:message code="about.faq.withdrawal.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse11" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.withdrawal.explanation" text="default text"/>
                        </div>
                    </div>
                </div>-->
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse12">
                            <s:message code="about.faq.paySystems.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse12" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.paySystems.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse13">
                            <s:message code="about.faq.learnTrade.title" text="default text"/>
                        </a>
                    </div>
                    <div id="collapse13" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <s:message code="about.faq.learnTrade.explanation" text="default text"/>
                        </div>
                    </div>
                </div>
            </div>
            <h3><s:message code="about.law.title" text="default text"/></h3>
            <p><s:message code="about.law.explanation" text="default text"/></p>
        </div>
    </jsp:body>
</t:sitepage>