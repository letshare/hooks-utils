import { useState, useEffect } from 'react';

function useMedia(queries, values, defaultValue) {
    // 一个包含了是否匹配每一个媒体查询的数组
    const mediaQueryLists = queries.map(q => window.matchMedia(q));
  
    // 根据匹配的媒体查询取值的方法
    const getValue = () => {
        // 获取第一个匹配的媒体查询的下标
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        // 返回相对应的值或者默认值
        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };
  
    // 匹配值的state和setter
    const [value, setValue] = useState(getValue);
  
    useEffect(
        () => {
            // 回调方法
            // 注意：通过在useEffect外定义getValue ...
            // ... 我们可以确定它又从hook的参数传入的最新的值（在这个hook的回调第一次在mount的时候被创建）
            const handler = () => setValue(getValue);
            // 为上面每一个媒体查询设置一个监听作为一个回调
            mediaQueryLists.forEach(mql => mql.addListener(handler));
            // 在cleanup中清除监听
            return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
        },
        [] // 空数组保证了effect只会在mount和unmount时运行
    );
  
    return value;
}

export default useMedia;