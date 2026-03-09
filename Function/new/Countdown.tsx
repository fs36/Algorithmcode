import React, { useState, useEffect } from 'react';

// 倒计时组件 初始时间和结束回调函数
function Countdown({ initialTime, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // 如果倒计时结束，直接返回
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 清除定时器，防止内存泄漏
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  useEffect(() => {
    // 当倒计时结束时，调用 onFinish 回调
    if (timeLeft <= 0) {
      onFinish && onFinish();
    }
  }, [timeLeft, onFinish]);

  return (
    <div>
      <h2>倒计时: {timeLeft}秒</h2>
    </div>
  );
}

export default Countdown;