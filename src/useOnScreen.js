import { useState, useEffect } from 'react';

function useOnScreen(ref, rootMargin = '0px') {
    // 储存元素是否可见的状态
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // 当observer回调触发是更新状态
          setIntersecting(entry.isIntersecting);
        },
        {
          rootMargin
        }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    }, []); // 空数组确保只会在mount和unmount执行
  
    return isIntersecting;
}

export default useOnScreen;