## useOnClickOutside

这个hook允许你监测是否在一个特定元素外点击。

在接下来的例子中，我们使用它监测在modal框以外任何元素被点击时，去关闭modal框。通过抽象这个逻辑到一个hook中，我们可以很容易将它使用在需要这种类似功能的组件中（下拉菜单、提示等）

## 使用
```javascript
import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
  // 创建一个ref，储存我们要监测外部点击的元素
  const ref = useRef();
  // modal框的逻辑
  const [isModalOpen, setModalOpen] = useState(false);
  // 调用hook，并传入ref和外部点击时要触发的函数
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>
          👋 Hey, I'm a modal. Click anywhere outside of me to close.
        </div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
}
```