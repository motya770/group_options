var Filters = {
    clearForm: function(){
       $(".filter-input").val(null);
        //document.getElementById("filterForm").reset();
       $(".filter-select").val(null);
    },
    initDatePickers: function(ids){
        for(var i in ids) {
            var id = ids[i];
            $('#' + id).datetimepicker({format: 'd/m/Y H:i'});
        }
    },
    initPositionPickers:function(){
        var ids = ["openTimeFrom", "openTimeTo", "closeTimeFrom", "closeTimeTo"];
        Filters.initDatePickers(ids);
    },
    initOptionPickers: function(){
        var ids = ["bidStartTimeFrom", "bidStartTimeTo",
                "tradeStartTimeFrom", "tradeStartTimeTo",
                "tradeStartTimeTo", "tradeEndTimeFrom"];
        Filters.initDatePickers(ids);
    },
    initQuotePickers: function(){
        var ids = ["timeFrom", "timeTo"];
        Filters.initDatePickers(ids);
    },
    initPositionsFilters: function(){
        Filters.initPositionPickers();
        Filters.initAccountAuto();
    },
    initOptionsFilters: function() {
        Filters.initOptionPickers();
    },
    initQuotesFilters: function() {
        Filters.initQuotePickers();
        Filters.initAssetAuto();
    },
    initAccountPickers:function(){
        var ids = ["dateCreatedFrom", "dateCreatedTo"];
        Filters.initDatePickers(ids);
    },
    initAccountFilters: function(){
        Filters.initAccountPickers();
    },
    initBActivityPickers: function(){
        var ids = ["dateCreatedFrom", "dateCreatedTo"];
        Filters.initDatePickers(ids);
    },
    initBActivityFilters: function(){
        Filters.initBActivityPickers();
    },
    initAssetAuto: function(){
        $("#assetAuto").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/admin/asset/find-by-external-id",
                    dataType: "json",
                    data: {externalId: request.term},
                    success: function (data) {
                        var ui = new Array(data.length);
                        for (var i in data) {
                            var value = data[i].externalId;
                            var label = data[i].externalId;
                            var id = data[i].externalId;

                            var item = new Object();
                            item.value = value;
                            item.label = label;
                            item.id = id;

                            ui[i] = item;
                        }
                        response(ui);
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                console.log(ui.item ?
                "Selected: " + ui.item.label + " " + ui.item.id :
                "Nothing selected, input was " + this.value);
            },
            open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    },
    initAccountAuto: function(){
        $("#accountAuto").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/admin/account/find-by-name-or-login",
                    dataType: "json",
                    data: {nameLogin: request.term},
                    success: function (data) {
                        var ui = new Array(data.length);
                        for (var i in data) {
                            var value = data[i].fullName + " " + data[i].login;
                            var label = data[i].fullName + " " + data[i].login;
                            var id = data[i].id;

                            var item = new Object();
                            item.value = value;
                            item.label = label;
                            item.id = id;

                            ui[i] = item;
                        }
                        response(ui);
                    }
                });
            },
            minLength: 2,
            select: function (event, ui) {
                console.log(ui.item ?
                "Selected: " + ui.item.label + " " + ui.item.id :
                "Nothing selected, input was " + this.value);

                if (ui.item != null) {
                    $("#accountId").val(ui.item.id);
                }
            },
            open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    }
}