<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<t:sitepage>
    <jsp:body>
        <link rel="stylesheet" href="/resources/css/trade/intlTelInput.css" />
        <script src="/resources/js/plat/registration.js" ></script>

        <script src="//www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit" async defer></script>
        <script type="text/javascript">
            var CaptchaCallback = function () {
                grecaptcha.render('DemoRecaptcha', {'sitekey': '6LeIRwUTAAAAAIYGH56PGrgIZj-nyJ8As2_BiiwM'});
                grecaptcha.render('RealRecaptcha', {'sitekey': '6LeIRwUTAAAAAIYGH56PGrgIZj-nyJ8As2_BiiwM'});
            };
        </script>
        <div class="left-sidebar pull-left">
            <div class="row registration-page">

                <div class="demo-caption reg-button" onclick="RegPage.showDemo();">
                    <h4><s:message code="registration.openDemo" text=""/></h4>
                </div>
                <div class="demo-container hidden">
                    <form id="demo-form" method="POST" action="/accounts/create-demo">
                        <table>
                            <tr>
                                <td><label for="login"><s:message code="registration.email" text=""/></label></td>
                                <td><input class="login" name="login"/></td>
                                <td><span class="login-validator hidden">E-mail is not valid</span></td>
                            </tr>
                            <tr>
                                <td><label for="pwd"><s:message code="registration.password" text=""/></label></td>
                                <td><input class="pwd" name="pwd"/></td>
                                <td><span class="pwd-validator hidden">Password is not valid</span></td>
                            </tr>
                            <tr class="hidden">
                                <td><label><s:message code="registration.currency" text=""/></label></td>
                                <td>
                                    <div class="btn-group currency-group">
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn active">USD</button>
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn">EUR</button>
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn">RUB</button>
                                    </div>
                                </td>
                                <td><span class="currency-validator hidden">Currency is not valid</span></td>
                            </tr>
                            <tr>
                                <td><label for="phone"><s:message code="registration.phone" text=""/></label></td>
                                <!--<td><input class="phone" name="phone"/></td>-->
                                <td>
                                    <input class="phone-visual" type="tel">
                                    <input type="hidden" class="phone" name="phone">
                                </td>


                                <td><span class="phone-validator hidden">Phone is not valid</span></td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="button" value='<s:message code="registration.open" text=""/>' class="btn btn-primary"
                                           onclick="RegPage.openDemoAccount(); return false;"/>
                                </td>
                                <td>

                                </td>
                            </tr>
                        </table>
                        <div id="DemoRecaptcha"></div>

                    </form>
                </div>

                <div class="register-caption reg-button" onclick="RegPage.showReg();">
                    <h4><s:message code="registration.openReal" text=""/></h4>
                </div>
                <div class="register-container hidden">
                    <form id="real-form" method="POST" action="/accounts/register">
                        <table>
                            <tr>
                                <td><label for="login"><s:message code="registration.email" text=""/></label></td>
                                <td><input class="login" name="login"/></td>
                                <td><span class="login-validator hidden">E-mail is not valid</span></td>
                            </tr>
                            <tr>
                                <td><label for="pwd"><s:message code="registration.password" text=""/></label></td>
                                <td><input class="pwd" name="pwd"/></td>
                                <td><span class="pwd-validator hidden">Password is not valid</span></td>
                            </tr>
                            <tr class="hidden">
                                <td><label><s:message code="registration.currency" text=""/></label></td>
                                <td>
                                    <div class="btn-group currency-group">
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn active">USD</button>
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn">EUR</button>
                                        <button type="button" onclick="RegPage.chooseCurrency(this); return false;"
                                                class="btn">RUB</button>
                                    </div>
                                </td>
                                <td><span class="currency-validator hidden">Currency is not valid</span></td>
                            </tr>
                            <tr>
                                <td><label for="phone"><s:message code="registration.phone" text=""/></label></td>
                                <!--<td><input class="phone" name="phone"/></td>-->
                                <td>
                                    <input class="phone-visual" type="tel">
                                    <input type="hidden" class="phone" name="phone">
                                </td>
                                <td><span class="phone-validator hidden">Phone is not valid</span></td>
                            </tr>

                            <tr>
                                <td>
                                    <input type="button" value='<s:message code="registration.open" text=""/>' class="btn btn-primary"
                                           onclick="RegPage.openRealAccount(); return false;"/>
                                </td>
                            </tr>
                        </table>
                        <div id="RealRecaptcha"></div>
                    </form>
                </div>


                <!-- fun things
                <iframe src="http://ec.forexprostools.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=55&lang=1" width="636" height="467" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0"></iframe><div class="poweredBy" style="font-family: Arial, Helvetica, sans-serif;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Real Time Economic Calendar provided by <a href="http://www.investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com</a>.</span></div>

                <iframe src="http://tsw.forexprostools.com?&forex=1,2,3,5,7,9,10&commodities=8830,8836,8831,8849,8833,8862,8832&indices=169,23660,166,172,27,167,40830&stocks=23227,23146,243,267,7888,284,941155&tabs=1,2,3,4" width="317" height="467"></iframe><div class="poweredBy" style="font-family:arial,helvetica,sans-serif; direction:ltr;"><span style="font-size: 11px;color: #333333;text-decoration: none;">Technical Summary Widget Powered by <a href="http://www.investing.com/" rel="nofollow" target="_blank" style="font-size: 11px;color: #06529D; font-weight: bold;" class="underline_link">Investing.com</a></span></div>
                -->
                <!--
                                <div style="margin-top: 5px; margin-bottom: 5px;" class="g-recaptcha" data-sitekey="6LeIRwUTAAAAAIYGH56PGrgIZj-nyJ8As2_BiiwM"></div>
                -->
            </div>
        </div>
    </jsp:body>
</t:sitepage>

