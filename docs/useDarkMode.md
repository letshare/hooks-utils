## useDarkMode

这个hook包含了，当你需要在你的网站添加一个黑暗模式的所有状态逻辑。

它利用localStorage去记住用户选择的模式、默认浏览器或者系统级别设置使用prefers-color-schema媒体查询和管理.dark-mode的类名去在body上应用你自己的样式。

将state中的状态同步到localStorage中使用的是useLocalStoragehook。检测用户的黑暗模式偏好使用的useMeidahook。

这两个hook都是我们在其他案例中创建的，但是这里我们将它们组合起来，使用相当少的行数创建一个非常有用的hook。

## 使用
```javascript
function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <Content />
    </div>
  );
}
```