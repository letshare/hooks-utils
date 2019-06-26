import { useState, useEffect } from 'react';

function useKeyPress(targetKey) {
    // 用来储存持续追踪是否有键被按下
    const [keyPressed, setKeyPressed] = useState(false);
  
    // 如果按下的键值是我们的目标值，将其设置为true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
  
    // 如果松开的键值是我们的目标值，将其设置为false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
  
    // 添加事件监听
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // 在cleanup中清除回调
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // 空数组意味着只有在mount和unmout的时候才会运行

    return keyPressed;
}