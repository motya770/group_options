$(function(){
    Loader.loadSupport();
    Loader.loadAnalytics();
});
var Loader = {
    loadSupport: function(){
        setTimeout(function(){
            $_Tawk_API = {};
            $_Tawk_LoadStart = new Date();

            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/552053a2c6e86b1d6e93e20a/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        }, 4000);
    },
    loadAnalytics: function(){
        setTimeout(function(){
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-20128558-4', 'auto');
            ga('send', 'pageview');
        }, 4000);
    }
}

