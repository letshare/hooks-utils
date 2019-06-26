## useWindowSize

一个真正常见的需求是获取浏览器当前窗口的尺寸。这个hook返回包含宽高的对象。如果在服务器端执行(没有window对象)，则宽度和高度的值将未定义。

## 使用
```javascript
import { useState, useEffect } from 'react';
// Usage
function App() {
    const size = useWindowSize();

    return (
        <div>
            {size.width}px / {size.height}px
        </div>
    );
}
```