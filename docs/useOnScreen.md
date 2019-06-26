## useOnScreen

这个hook允许你轻易的检测一个元素是否在屏幕上可见，以及指定有多少元素应该被显示在屏幕上。

当用户滚动到某个特定区域，非常适合懒加载图片或者触发动画。

> react-intersection-observer - 一个更加健壮和可配置的实现。
## 使用
```javascript
import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
    // 用来储存我们想要检测是否在屏幕中的元素
    const ref = useRef();
    // 调用hook并传入ref和root margin
    // 在这种情况下，只有当元素多大于300px的元素才会在屏幕上显示
    const onScreen = useOnScreen(ref, '-300px');

    return (
        <div>
            <div style={{ height: '100vh' }}>
            <h1>Scroll down to next section 👇</h1>
            </div>
            <div
            ref={ref}
            style={{
                height: '100vh',
                backgroundColor: onScreen ? '#23cebd' : '#efefef'
            }}
            >
            {onScreen ? (
                <div>
                <h1>Hey I'm on the screen</h1>
                <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
                </div>
            ) : (
                <h1>Scroll down 300px from the top of this section 👇</h1>
            )}
            </div>
        </div>
    );
}
```