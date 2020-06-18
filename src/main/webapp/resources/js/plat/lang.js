var Lang = {
    showDropdown:function(that){
        $("#lang-drop").show();
    },
    hideDropdown:function(that){
        $("#lang-drop").hide();
    },
    setLocale: function(locale){
        var langName = $("#" + locale).text();
        $("#lang-drop #" + locale).remove();
        $("#polyglotLanguageSwitcher .current").attr("id", locale);
        $("#polyglotLanguageSwitcher .current").text(langName);
    },
    init: function(that){
        $("#lang-drop a").bind('click', function(){
           var fa  = window.location.href.split("?");
           var sa = fa[0].split("#");
            window.location.href = sa[0]  + "?lang=" + $(this).attr("id");
        });
    }
}