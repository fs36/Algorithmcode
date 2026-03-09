import { useRef, useEffect, useCallback } from "react";

function useThrottle(callback, delay) {
  const lastTime = useRef(0);
  const timer = useRef(null);

  const throttleFn = useCallback(
    (...args) => {
      const now = Date.now();
      // 距离下一次执行还剩多少时间
      const remaining = delay - (now - lastTime.current);

      // 立即执行
      if (remaining <= 0) {
        if (timer.current) {
          // 清理可能存在的定时器
          clearTimeout(timer.current);
          timer.current = null;
        }
        lastTime.current = now;
        callback(...args);
      }
      // 未到时间，设置定时器
      else if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
          lastTime.current = now;
          callback(...args);
        }, remaining);
      }
    },
    [callback, delay]
  );

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // 返回节流后的函数
  return throttleFn;
}

export default useThrottle;