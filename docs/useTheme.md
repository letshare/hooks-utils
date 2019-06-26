## useTheme

这个hook帮助你简单使用CSS变量动态的改变你的app的表现。
你只需要简单的在你文档的根元素传递一个，你想用来更新并且hook更新的每一个变量包含键值对的CSS变量。

这在你无法使用行内样式（没有伪类支持）以及在你们的主题样式里有太多方式排列（例如一个可以让用户定制他们的外观形象的app应用）的情况下很有用。

值得注意的是，许多css-in-js的库支持动态的样式，但是尝试一下仅仅使用CSS变量和一个React hook来完成会是非常有趣的。

下面的例子非常简单，但是你可以想象一下主题对象是被存储在state中或者从接口获取的。

## 使用
```javascript
import { useLayoutEffect } from 'react';
import './styles.scss'; 
// -> https://codesandbox.io/s/15mko9187// Usage
const theme = {
  'button-padding': '16px',
  'button-font-size': '14px',
  'button-border-radius': '4px',
  'button-border': 'none',
  'button-color': '#FFF',
  'button-background': '#6772e5',
  'button-hover-border': 'none',
  'button-hover-color': '#FFF'
};
function App() {
  useTheme(theme);

  return (
    <div>
      <button className="button">Button</button>
    </div>
  );
}
```