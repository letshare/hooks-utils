## useLocalStorage

将state中的数据同步到localstorage，以便页面刷新的时候保存状态。
使用方法和useState类似，我们只要传入一个localstorage的值，以便在页面加载时默认使用该值，而不是指定的初始值。

> use-persisted-state - 一个更高级的实现，可以在不同tab和浏览器窗口之间同步。

## 使用
```javascript
import { useState } from 'react';
// Usage
function App() {
  // 与useState相似，但是第一个参数是localstorage中的key值
  const [name, setName] = useLocalStorage('name', 'Bob');

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}
```