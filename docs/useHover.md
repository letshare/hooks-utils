## useHover

监测一个鼠标是否移动到某个元素上。这个hook返回一个ref和一个布尔值，改值表示当前具有该ref的元素是否被hover。

因此只需要将返回的ref添加到你想要监听hover状态的任何元素。

## 使用
```javascript
import { useRef, useState, useEffect } from 'react';
// Usage
function App() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      {isHovered ? '😁' : '☹️'}
    </div>
  );
}
```