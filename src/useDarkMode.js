import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useDarkMode() {
    // 使用我们useLocalStorage hook即使在页面刷新后也能保存状态
    const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');
  
    // 查看用户是否已经为黑暗模式设置了一个浏览器或系统偏好
    // usePrefersDarkMode hook 组合了 useMedia hook （查看接下来的代码）
    const prefersDarkMode = usePrefersDarkMode();
  
    // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
    // 这允许用户在我们的网站上覆盖掉系统级别的设置
    const enabled =
      typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;
  
    // 改变黑暗模式
    useEffect(
        () => {
            const className = 'dark-mode';
            const element = window.document.body;
            if (enabled) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },
        [enabled] // 只要当enabled改变时调用该方法
    );
  
    // 返回enabled的状态和设置方法
    return [enabled, setEnabledState];
}

// 组合useMedia hook去检测黑暗模式的偏好
// useMedia被设计成可以支持多种媒体查询并且返回数值
// 感谢hook的组合，我们可以把这一块的复杂性隐藏起来
// useMedia的方法在接下来的文章中
function usePrefersDarkMode() {
    return useMedia(['(prefers-color-scheme: dark)'], [true], false);
}

export default useDarkMode;