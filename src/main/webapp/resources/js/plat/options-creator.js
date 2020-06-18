$(function () {
    var firstCounterClass = "frame-counter-0";
    OptionCreator.initGeneratorInputs();
    OptionCreator.initInputes(firstCounterClass);
    OptionCreator.bindAutocomplete();
});

var OptionCreator = {
    removeFrames: function(that){
        $(".frames-list .assets-frame").remove();
    },
    initGeneratorInputs: function(){
        $('.from-generate').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
        $('.to-generate').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
    },
    initInputes: function(counterClass){
        $("." + counterClass + ' .bid-start').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
        $("." + counterClass + ' .trade-start').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
        $("." + counterClass + ' .trade-end').datetimepicker({
            datepicker: false,
            format: 'H:i'
        });
    },
    removeAssetItem: function(that){
        $(that).remove();
    },
    createOptionCreator: function(){
        var showDialog = false;
        var message = "";

        var creatorName = $(".option-creator .name").val();
        if (creatorName == null || creatorName == "") {
            showDialog = true;
            message = "You should give name to the creator!";
        }

        var assetIds = new Array();
        $(".assets-list .asset-item").each(function () {
            assetIds.push($(".asset-item-id", this).text().trim());
        });

        if (assetIds.length == 0) {
            showDialog = true;
            message = "You should add at least one asset!";
        }

        var dates = new Array();
        $(".frames-list .dates-container .creator-triple-date").each(function () {
            var bidStart = $(".bid-start", this).val();
            var tradeStart = $(".trade-start", this).val();
            var tradeEnd = $(".trade-end", this).val();

            var timeFrame = new Object();
            timeFrame.bidStart = bidStart;
            timeFrame.tradeStart = tradeStart;
            timeFrame.tradeEnd = tradeEnd;

            dates.push(timeFrame);
        });

        if(dates.length == 0){
            showDialog = true;
            message = "You should add at least one time frame!";
        }

        var currency = $(".option-creator .currency").val();
        if(currency == null){
            showDialog = true;
            message = "You should choose currency!";
        }

        var optionType =  $(".option-creator .optionType").val();
        if(optionType==null){
            showDialog = true;
            message = "You should Option Type!";
        }

        var useWeek = $(".option-creator .useWeek").prop("checked");

        console.log("useWeek: " + useWeek);

        if (showDialog) {
            $(".message p").text(message);
            $(".message").dialog();
            return;
        }

        var demo = $(".option-creator .demo").prop("checked");

        var assets = assetIds;//.serializeArray();
        var dateFrames = dates;//.serializeArray();

        var optionCreatorId =   $(".option-creator .option-creator-id").text();

        var url = null;
        if(optionCreatorId == ""){
            url = "/admin/option-creator/create";
        }else{
            url = "/admin/option-creator/update?id=" + optionCreatorId;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({ name: creatorName, optionType: optionType, assets: assets, timeFrames: dates, currency: currency, demo: demo, useWeek: useWeek}),
            contentType: 'application/json',
            success: function(data) {
                //TODO add error handling
                window.location.href =  "/admin/option-creator/show?id=" + data.id;
            }
        });
    },
    addDatesRow: function(that){
        var datesRow = $(".dates-container .creator-triple-date").first().clone();

        $('.bid-start', datesRow).datetimepicker({format: 'd/m/Y H:i'});
        $('.trade-start', datesRow).datetimepicker({format: 'd/m/Y H:i'});
        $('.trade-end', datesRow).datetimepicker({format: 'd/m/Y H:i'});

        $(".dates-container").append(datesRow);
    },
    addFrame: function(){
        var frame =  $(".generate-frames .assets-frame-template .assets-frame").clone();
        var framesCount = $(".assets-frame").size();

        var counterClass = "frame-counter-" + framesCount;

        $(frame).addClass(counterClass);
        $(".frames-list").append(frame);

        OptionCreator.initInputes(counterClass);

        return frame;
    },
    removeFrame: function(that){
        $(that).closest(".assets-frame").remove();
    },
    removeDatesRow: function(that){
        $(that).parent(".creator-triple-date").remove();
    },
    generateFrames: function(that){
        var from = $(".generate-frames .from-generate").val();
        var to =  $(".generate-frames .to-generate").val();
        var bidInterval =  $(".generate-frames .bid-interval").val();
        var tradeInterval =  $(".generate-frames .trade-interval").val();

        console.log(from + " " + to + " " + bidInterval + " " + tradeInterval);

        var fromArray = from.split(":");
        var fromSeconds = parseInt(fromArray[0]) * 60 * 60 + parseInt(fromArray[1])  * 60;

        var toArray = to.split(":");
        var toSeconds = parseInt(toArray[0]) * 60 * 60 + parseInt(toArray[1]) * 60;
        var currentSeconds = fromSeconds;

        //OptionCreator._framesLoop(currentSeconds, bidInterval, tradeInterval, toSeconds);

        while(true){
            var frameValues = OptionCreator.addMinutes(currentSeconds, bidInterval, tradeInterval);
            currentSeconds = frameValues.frameEndSeconds;

            if(toSeconds <= currentSeconds){
                break;
            }
            OptionCreator.addGeneratedFrame(frameValues);
        }

    },
    _framesLoop: function(currentSeconds, bidInterval, tradeInterval, toSeconds){
        var frameValues = OptionCreator.addMinutes(currentSeconds, bidInterval, tradeInterval);
        currentSeconds = frameValues.frameEndSeconds;
        if(toSeconds <= currentSeconds){
            return;
        }else{
            OptionCreator.addGeneratedFrame(frameValues);
            setTimeout(function(){
                OptionCreator._framesLoop(currentSeconds, bidInterval, tradeInterval, toSeconds);
            }, 1);
        }
    },
    chunk: function(array, process, context){
        setTimeout(function(){
            var item = array.shift();
            process.call(context, item);

            if (array.length > 0){
                setTimeout(arguments.callee, 100);
            }
        }, 100);
    },
    addGeneratedFrame: function(frameValues){
        var frame = OptionCreator.addFrame();
        $(".bid-start", frame).val(frameValues.bidStartFormatted);
        $(".trade-start", frame).val(frameValues.tradeStartFormatted);
        $(".trade-end", frame).val(frameValues.tradeEndFormatted);
    },
    addMinutes: function(currentSeconds, bidInterval, tradeInterval){
        var bidStartSeconds = currentSeconds;
        var tradeStartSeconds = bidStartSeconds + bidInterval * 60;
        var tradeEndSeconds = tradeStartSeconds + tradeInterval * 60;

        var timeFrame = new Object();
        timeFrame.bidStartFormatted = Timer.getFormattedTimer(bidStartSeconds, true);
        timeFrame.tradeStartFormatted = Timer.getFormattedTimer(tradeStartSeconds, true);
        timeFrame.tradeEndFormatted = Timer.getFormattedTimer(tradeEndSeconds, true);

        timeFrame.frameEndSeconds = tradeStartSeconds;

        return timeFrame;
    },
    bindAutocomplete: function(){
        $(".assets-autocomplete").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/admin/asset/find-by-name",
                    dataType: "json",
                    data: {
                        name: request.term
                    },
                    success: function (data) {

                        var ui = new Array(data.length);
                        for (var i in data) {
                            var value = data[i].name;
                            var label = data[i].name;
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
                    var assetItem = $(".assets-container .asset-template .asset-item").clone();
                    $(".asset-item-name", assetItem).text(ui.item.label);
                    $(".asset-item-id", assetItem).text(ui.item.id);

                    console.log("cs: " + $(this).closest(".assets-container").length);
                    console.log("ac: " + $(this).closest(".assets-container").find(".assets-list").length);

                    $(this).closest(".assets-container").find(".assets-list").append(assetItem);
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