import { useRef, useEffect, useCallback } from "react";

function useDebounce(callback, delay) {
  // 创建一个 ref 用来存储定时器 id
  const timer = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      // 如果之前有定时器，清除
      if (timer.current) clearTimeout(timer.current);

      // 创建新的定时器
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // 组件卸载时清理定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // 返回防抖后的函数
  return debouncedFn;
}

export default useDebounce;