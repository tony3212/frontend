function autoScroll (element) {
    var observer, config;

    observer = new MutationObserver(function scrollToBottom() {
        element.scrollTop = element.scrollHeight;
    });

    config = {childList: true};
    observer.observe(element, config);
}