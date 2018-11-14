function clearLog () {
    $("#test").val("");
    $("#message-body").empty();
    console.clear();
}

function scrollToBottom() {
    var element = $("#message-body")[0];

    element.scrollTop = element.scrollHeight;
}

$(function () {
    $("#test")
        .dbKeyDown(function (event) {
            Logger.warn("双按：" + event.which);
        })
        .on("keydown", function (event) {
            Logger.info("键值：" + event.which);
        });

    autoScroll($("#message-body")[0]);
});