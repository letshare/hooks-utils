## usePrevious

一个经常会出现的问题是，当使用hook的时候我们如何获取props和state之前的值。

在React的class组件内我们有componentDidUpdate方法用来参数的形式来接收之前的props和state，或者你客户更新一个实例变量（this.previous = value）并在稍后引用它以获得之前的值。

所以我们如何能在没有生命周期方法或者实例存储值的函数组件中做到这一点呢？Hook来救火。我们可以创造一个定制的hook，使用useRef hook在内部存储之前的值。查看下面的例子和行内注释。

## 使用
```javascript
import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
    const [count, setCount] = useState(0);

    // 获取更新前的值 (在上一次render中传进hook)
    const prevCount = usePrevious(count);

    // 同时展示当前值和更新前值
    return (
        <div>
            <h1>Now: {count}, before: {prevCount}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```