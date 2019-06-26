import { useState } from 'react';

function useLocalStorage(key, initialValue) {
    // State to store our value
    // 将初始状态传给useState，这样逻辑只会执行一次
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // 通过key值从localstorage中获取值
            const item = window.localStorage.getItem(key);
            // 如果没有返回初始值则解析储存的json
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // 如果报错了依旧返回初始值
            console.log(error);
            return initialValue;
        }
    });

    // 返回useState的setter函数的包装版本，该函数将新的值保存到localstorage中
    const setValue = value => {
        try {
            // 允许值是一个函数，这样我们就有了和useState一样的api
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // 保存state
            setStoredValue(valueToStore);
            // 保存到localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // 更高级实现的处理将会处理错误的情况
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
