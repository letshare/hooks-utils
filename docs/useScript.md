## useScript

使用这个hook可以让你非常简单的动态加载外部scr的ipt并且知道它什么时候加载完毕。

当你需要依赖一个第三方库，并且想要按需加载而不是在每一个页面的头部请求时，这个hook非常有用。

在下面的例子中我们直到脚本加载完成前才会调用我们在script中声明的方法。

如果你有兴趣了解一下这个高级组件时如何实现的，你可以看一下source of react-script-loader-hoc。我个人觉得它比这个hook的可读性更高。另一个优势是因为它更容易调用一个hook去加载多个不同的script，而不像这个高阶组件的实现方式，我们使用添加多个src的字符串来支持这个功能。

## 使用
```javascript
import { useState, useEffect } from 'react';
// Usage
function App() {
  const [loaded, error] = useScript(
    'https://pm28k14qlj.codesandbox.io/test-external-script.js'
  );

  return (
    <div>
      <div>
        Script loaded: <b>{loaded.toString()}</b>
      </div>
      {loaded && !error && (
        <div>
          Script function call response: <b>{TEST_SCRIPT.start()}</b>
        </div>
      )}
    </div>
  );
}
```