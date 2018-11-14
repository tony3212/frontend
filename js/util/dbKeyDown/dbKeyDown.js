
/**
 * 扩展jQuery,以支持双键操作(连续按同一个键)
 * depends: [jQuery]
 * @param callback 回调函数
 * @param wait 在多长时间内按双键起作用
 * @returns {jQuery}
 */
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
};