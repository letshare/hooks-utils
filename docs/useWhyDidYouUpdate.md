## useWhyDidYouUpdate

这个hook让你更加容易观察到是哪一个prop的改变导致了一个组件的重新渲染。

如果一个函数运行一次的成本非常的高，并且你也知道它会因为哪些prop造成重复的渲染，你可以使用React.memo这个高阶组件来解决这个问题，在接下来有一个Counter的组件将会使用这个特性。

在这个案例中，如果你还在寻找一些看起来不必要的重新渲染，你可以使用useWhyDidYouUpdate这个hook，并且在你的控制台查看哪一个prop在这次渲染中发生了改变和它改变前后的值。

## 使用
```javascript
import { useState, useEffect, useRef } from 'react';
// 让我们装作这个<Counter>组件的重新渲染成本很高
// 我们使用React.memo将它包裹起来，但是我们仍然需要寻找性能问题 :/
// 因此我们添加useWhyDidYouUpdate并在控制台查看将会发生什么
const Counter = React.memo(props => {
  useWhyDidYouUpdate('Counter', props);
  return <div style={props.style}>{props.count}</div>;
});


function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  // 我们的控制台告诉了我们 <Counter> 的样式prop...
  // 在每一次重新渲染中的改变，即使我们只通过按钮改变了userId的状态 ...
  // 这是因为每一次重新渲染中counterStyle都被重新创建了一遍
  // 感谢我们的hook让我们发现了这个问题，并且提醒我们或许应该把这个对象移到component的外部
  const counterStyle = {
    fontSize: '3rem',
    color: 'red'
  };

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}

```