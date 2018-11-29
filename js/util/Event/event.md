### change事件
1. 在文本框中输入、粘贴不会立马触发change事件，要在失焦后才会触发，要输入一次触发一次请用input事件
2. 直接通过赋值的形式不会触发change事件


### input事件
1. 在文本框中输入、粘贴都会触发input事件，radio与checkbox也会

### mouseleave 与 mouseout的区别
mouseleave不冒泡，mouseout冒泡