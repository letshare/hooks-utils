import { useLayoutEffect } from 'react';

function useTheme(theme) {
    useLayoutEffect(
        () => {
            // 循环这个主题对象
            for (const key in theme) {
                // 更新文档根元素的css变量
                document.documentElement.style.setProperty(`--${key}`, theme[key]);
            }
        },
        [theme] // 只要当主题对象发行改变时才会再次运行
    );
}

export default useTheme;