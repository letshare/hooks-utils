## useAnimation

这个hook允许你通过一个缓动函数去平滑的动画任意值（linear elastic）。

在例子中，我们调用useAnimation hook三次去让三个不同的小球在不同的间隔时间完成动画。作为额外的一点，我们也展示了如何组合hook是非常简单的。

我们的useAnimation hook不实际使用useState或者useEffect本身，而是使用useAnimationTimer hook将其包裹起来。将计时器相关逻辑从hook中抽离出来，让我们的代码可读性更高并且可以在其他环节使用计时器逻辑。

## 使用
```javascript
import { useState, useEffect } from 'react';
// Usage
function App() {
  // 在不同的启动延迟去多次调用hook以获得不同的动画值
  const animation1 = useAnimation('elastic', 600, 0);
  const animation2 = useAnimation('elastic', 600, 150);
  const animation3 = useAnimation('elastic', 600, 300);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Ball
        innerStyle={{
          marginTop: animation1 * 200 - 100
        }}
      />

      <Ball
        innerStyle={{
          marginTop: animation2 * 200 - 100
        }}
      />

      <Ball
        innerStyle={{
          marginTop: animation3 * 200 - 100
        }}
      />
    </div>
  );
}
  
const Ball = ({ innerStyle }) => (
  <div
    style={{
      width: 100,
      height: 100,
      marginRight: '40px',
      borderRadius: '50px',
      backgroundColor: '#4dd5fa',
      ...innerStyle
    }}
  />);
```
