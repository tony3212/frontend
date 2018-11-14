### 自动滚动

#### 应用场景：
当频繁往一个容器插入内容时出现滚动条，希望自动滚动到底部时。
例如显示控件台信息

#### 源码：autoScroll.js
```javascript
function autoScroll (element) {
    var observer, config;

    observer = new MutationObserver(function scrollToBottom() {
        element.scrollTop = element.scrollHeight;
    });

    config = {childList: true};
    observer.observe(element, config);
}
```

```javascript
autoScroll(element)
```

例子：[autoScroll.html](autoScroll.html)
