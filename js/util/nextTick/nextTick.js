/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

export const nextTick = (function () {
    var callbacks = []
    var pending = false
    var timerFunc
    function nextTickHandler () {
        pending = false
        var copies = callbacks.slice(0)
        callbacks = []
        for (var i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    const inBrowser =
        typeof window !== 'undefined' &&
        Object.prototype.toString.call(window) !== '[object Object]';
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    const isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA)
    const iosVersionMatch = isIos && UA.match(/os ([\d_]+)/)
    const iosVersion = iosVersionMatch && iosVersionMatch[1].split('_')

    // detecting iOS UIWebView by indexedDB
    const hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB

    /* istanbul ignore if */
    if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
        var counter = 1
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(counter)
        observer.observe(textNode, {
            characterData: true
        })
        timerFunc = function () {
            counter = (counter + 1) % 2
            textNode.data = counter
        }
    } else {
        // webpack attempts to inject a shim for setImmediate
        // if it is used as a global, so we have to work around that to
        // avoid bundling unnecessary code.
        const context = inBrowser
            ? window
            : typeof global !== 'undefined' ? global : {}
        timerFunc = context.setImmediate || setTimeout
    }
    return function (cb, ctx) {
        var func = ctx
            ? function () { cb.call(ctx) }
            : cb
        callbacks.push(func)
        if (pending) return
        pending = true
        timerFunc(nextTickHandler, 0)
    }
})()