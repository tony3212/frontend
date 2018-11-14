var Logger = {
    LEVEL: {
        TRACE: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    },

    level: 0,

    // 当需要打印在页面时，配置此参数（jQuery选择器，e.g.： #main）
    $logBox: "#message-body",

    log: function (level, text, style) {
        if (level < this.level) {
            return;
        }

        var styleStr = "", template;
        if ($.isPlainObject(style)) {
            $.each(style, function (key, value) {
                styleStr += key + ":" + value + ";";
            });
        }

        text = $('<div/>').text(text).html();
        template = '<li style="<%= style %>"><pre><%= content%></pre></li>';

        var $item = $(_.template(template)({style: styleStr, content: text}));
        if (this.$logBox) {
            $(this.$logBox).append($item);
        }
        window.console && window.console.log("%c" + $item.text(), $item.attr("style"));
    },

    trace: function (text) {
        this.log(this.LEVEL.TRACE, text, {color: "grey"});
    },

    info: function (text, style) {
        this.log(this.LEVEL.INFO, text, style);
    },

    warn: function (text) {
        this.log(this.LEVEL.WARN, text, {color: "red"});
    },

    error: function (text) {
        this.log(this.LEVEL.ERROR, text, {color: "red", "font-weight": "bold"});
    },

    separate: function (text) {
        var fix = "=========================================================";
        this.log(this.LEVEL.WARN, fix + (text || "") + fix, {color: "#FFEF8F"});
    },

    caption: function (text) {
        Logger.info(text, {
            "color": "blue",
            "padding": "10px 10px"
        });
    }
};

function clearLog () {
    $("#test").val("");
    $("#message-body").empty();
    console.clear();
}

function scrollToBottom() {
    var element = $("#message-body")[0];

    element.scrollTop = element.scrollHeight;
}

$.fn.dbKeyDown = function (callback, wait) {
    wait || (wait = 500);

    function getPreviousInfo(element) {
        var prevKD = $(element).data("prevKD"), prevArray;

        if (!prevKD) {
            return null;
        }
        prevArray = prevKD.split(" ");
        return {time: +prevArray[0], which: +prevArray[1]};
    }

    function setPreviousInfo(element, time, which) {
        $(element).data("prevKD", [time, which].join(" "));
    }

    $(this).on("keydown.dbkeyDown", function (event) {
        var $ele = $(this), now = new Date().getTime(), which = event.which,
            prevKD, prevTime, prevWhich;

        prevKD = getPreviousInfo($ele);
        if (!prevKD) {
            setPreviousInfo($ele, now, which);
            return;
        }

        prevTime = prevKD["time"];
        prevWhich = prevKD["which"];
        Logger.trace("now - prev: " + (now - prevTime));
        if (now - prevTime <= wait && which === prevWhich) {
            try {
                callback.apply(null, [event]);
            } catch (e) {
                console.error(e);
            }
        }
        setPreviousInfo($ele, now, which);
    });

    return this;
}


$(function () {
    $("#test")
        .dbKeyDown(function (event) {
            Logger.warn("双按：" + event.which);
        })
        .on("keydown", function (event) {
            Logger.info("键值：" + event.which);
        })
        .on("valueChange", function () {
            console.log("ValueChange")
        });

    autoScroll($("#message-body")[0]);
});