var Timer = {
    TIMER_TYPE_ENUM: {
        POSITION: 0,
        OPTION: 1,
        GRAPH: 2
    },
    tradeCountField: ".trade-time-countdown",
    closeCountFiled: ".close-time-countdown",
    setOptionTime: function (openTime, tradeTime, closeTime, now, option) {
        var trade = "";
        var close = "";
        if (now >= openTime && now >= closeTime && now >= tradeTime) {
            trade = "0:00";
            close = "0:00";
        } else if (now >= openTime && now < tradeTime && now < closeTime) {
            trade = Timer.getFormattedTimer(((tradeTime - now) / 1000));
            close = Timer.getFormattedTimer(((closeTime - now) / 1000));
        } else if (now > openTime && now >= tradeTime && now < closeTime) {
            trade = "0:00";
            close = Timer.getFormattedTimer(((closeTime - now) / 1000));
        }
        $(Timer.tradeCountField, option).text(trade);
        $(Timer.closeCountFiled, option).text(close);
    },
    entityCountDown: function (option, seconds, field) {
        var formattedTime = Timer.getFormattedTimer(seconds);
        $(field, option).text(formattedTime);
    },
    getFormattedTimer: function (seconds, noNeedSeconds) {
        seconds = Math.round(seconds);
        var minutes = Math.floor(seconds / 60);
        var tailSeconds = seconds - (minutes * 60);
        var formatted = "";
        if (minutes > 59) {
            var hours = Math.floor(minutes / 60);
            var tailMinutes = minutes - (hours * 60);
            formatted = Timer._addZero(hours) + ":" + Timer._addZero(tailMinutes);
            if(!noNeedSeconds){
               formatted  =  formatted +  ":" + Timer._addZero(tailSeconds);
            }
        } else {
            formatted = "00" + ":" + Timer._addZero(minutes);
            if (!noNeedSeconds){
               formatted = formatted + ":" + Timer._addZero(tailSeconds);
            }
        }

        return formatted;
    },
    positionsCountDown: function (position, seconds, field) {

    },
    graphCountDown: function (graph, seconds) {

    },
    getFormattedDate: function (d) {

        var month = Timer._addZero(d.getMonth() + 1);
        var date = Timer._addZero(d.getDate());
        var hours = Timer._addZero(d.getHours());
        var minutes = Timer._addZero(d.getMinutes());

        var str = date + "/" + month + "/" + d.getFullYear()
            + " " + hours + ":" + minutes;

        return str;
    },
    _addZero: function (value) {
        if (value < 10) {
            return ( "0" + value);
        } else {
            return ("" + value);
        }
    },
    nextOptionsTimer: function(tradeStartTime){
        var now = (new Date()).getTime();
        var endMillis = tradeStartTime;
        var millis = endMillis - now;

        if (millis <= 0) {
            console.log("endMillis " + endMillis + " can't be less than now " + now);
            Options.showNextOptions(tradeStartTime);
            return;
        }

        // just in case to be sure
        var timer = setTimeout(callback, millis + 2500);

        function callback(){
            Options.showNextOptions(tradeStartTime);
        }

        return timer;
    },
    countDown: function (startMillis, endMillis, timerType, entity, field) {
        var seconds = Math.floor((endMillis - startMillis) / 1000);
        if (seconds <= 0) {
            console.log("endMillis " + endMillis + " can't be less than startMillis " + startMillis);
        }

        var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

        function timer() {
            seconds = seconds - 1;

            //console.log(seconds);

            if (timerType == Timer.TIMER_TYPE_ENUM.POSITION) {

                Positions._positionTimers.push(counter);
                Timer.entityCountDown(entity, seconds, field);

            } else if (timerType == Timer.TIMER_TYPE_ENUM.OPTION) {

                var optionId = $(".option-id", entity).text();
                Options._optionTimers[optionId + field]= counter;
                Timer.entityCountDown(entity, seconds, field);

            } else if (timerType == Timer.TIMER_TYPE_ENUM.GRAPH) {

                Timer.graphCountDown(entity, seconds);

            } else {
                console.error("This timer type is not supported: " + timerType);
            }

            if (seconds <= 0) {
                clearInterval(counter);
                //counter ended, do something here
                return;
            }

            //Do code for showing the number of seconds here
        }

    }
}