## useEventListener

如果你发现自己使用useEffect添加了许多事件监听，那你可能需要考虑将这些逻辑封装成一个通用的hook。

在下面的使用窍门里，我们创建了一个叫useEventListener的hook，这个hook会检查addEventListener是否被支持、添加事件监听并且在cleanup钩子中清空监听。

## 使用
```javascript
import { useRef, useEffect, useCallback } from 'react';

// 使用
function App(){
  // 用来储存鼠标位置的State
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // 利用useCallback来处理回调
  // ... 这里依赖将不会发生改变
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // 更新坐标
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  // 使用自定义的hook添加事件
  useEventListener('mousemove', handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

```
