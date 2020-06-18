/**
 * Created by matvei on 4/8/15.
 */
var Notifications = {
    error: function (message) {
        //$("#errorContainer").removeClass("hidden");
        $(".modal-body").text(message);
        $("#errorContainer").modal('show');
    },
    notify: function (message) {

    },
    hideContainer: function () {
        //$("#errorContainer").addClass("hidden");

        $("#errorContainer").modal('hide');
    }
}

