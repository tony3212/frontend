function autoScroll (element) {
    var observer, config;

    observer = new MutationObserver(function scrollToBottom() {
        element.scrollTop = element.scrollHeight;
    });

    config = {childList: true};
    observer.observe(element, config);
}


// First, define a helper function.
function animateScroll(someElement, duration) {
    var start = someElement.scrollTop;
    var end = someElement.scrollHeight;
    var change = end - start;
    var increment = 20;
    function easeInOut(currentTime, start, change, duration) {
        // by Robert Penner
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
    function animate(elapsedTime) {
        elapsedTime += increment;
        var position = easeInOut(elapsedTime, start, change, duration);
        someElement.scrollTop = position;
        if (elapsedTime < duration) {
            setTimeout(function() {
                animate(elapsedTime);
            }, increment)
        }
    }
    animate(0);
}

// Here's our main callback function we passed to the observer
function scrollToBottom(element) {
    var duration = 300 // Or however many milliseconds you want to scroll to last
    animateScroll(element, duration);
}