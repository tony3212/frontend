function clearLog () {
    $("#test").val("");
    $("#message-body").empty();
    console.clear();
}


$(function () {
    $("#test")
        .dbKeyDown(function (event) {
            Logger.warn("双按：" + event.which);
        });

    autoScroll($("#message-body")[0]);
});