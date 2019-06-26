import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    // 存储去抖动后的值
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
        () => {
            // 在延迟delay之后更新去抖动后的值
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // 如果值改变了取消timeout (同样在delay改变或者unmount时生效)
            // 这就是我们通过延迟间隔内值没有被改变来达到防止值去抖动 清空timeout并且重新运行
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // 只有当搜索值或者delay值发生改变时才会重新调用
    );
  
    return debouncedValue;
}

export default useDebounce;
