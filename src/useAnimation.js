import { useState, useEffect } from 'react';

function useAnimation(
    easingName = 'linear',
    duration = 500,
    delay = 0) {
    // useAnimationTimer在我们给定的时间内在每一帧调用useState，尽可能的使动画更加的流畅
    const elapsed = useAnimationTimer(duration, delay);
    // 在0-1的时间范围内指定持续时间的总量
    const n = Math.min(1, elapsed / duration);
    // 根据我们指定的缓动函数返回修改后的值
    return easing[easingName](n);
}
// 一些缓动函数的地址:// https://github.com/streamich/ts-easing/blob/master/src/index.ts// 在这里硬编码或者引入依赖
const easing = {
    linear: n => n,
    elastic: n =>
        n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
    inExpo: n => Math.pow(2, 10 * (n - 1))
};

function useAnimationTimer(duration = 1000, delay = 0) {
    const [elapsed, setTime] = useState(0);

    useEffect(
        () => {
            let animationFrame, timerStop, start;

            // 在每一帧动画所要执行的函数
            function onFrame() {
                setTime(Date.now() - start);
                loop();
            }

            // 在下一个帧上调用onFrame()
            function loop() {
                animationFrame = requestAnimationFrame(onFrame);
            }

            function onStart() {
                // 设置一个timeout当持续时间超过时停止
                timerStop = setTimeout(() => {
                    cancelAnimationFrame(animationFrame);
                    setTime(Date.now() - start);
                }, duration);

                // 开始循环
                start = Date.now();
                loop();
            }

            // 在指定的延迟后执行(defaults to 0)
            const timerDelay = setTimeout(onStart, delay);

            // Clean things up
            return () => {
                clearTimeout(timerStop);
                clearTimeout(timerDelay);
                cancelAnimationFrame(animationFrame);
            };
        },
        [duration, delay] // 只有当持续时间和延迟改变时重新运行
    );

    return elapsed;
}

export default useAnimation;
