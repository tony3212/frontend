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