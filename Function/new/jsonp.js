// 实现步骤

// 创建唯一的回调函数名。

// 创建 <script> 标签，设置 src 为目标 URL。

// 将回调函数插入 window 对象，并定义回调函数以处理返回的数据。

// 在请求完成时清除回调函数，避免内存泄漏。

function jsonp(url, callbackName, callback) {
  // 1. 生成一个唯一的回调函数名，防止不同请求冲突
  const callbackFuncName = `${callbackName}_${Date.now()}`;// Date.now() 生成时间戳

  // 2. 将回调函数挂载到 window 对象上
  window[callbackFuncName] = function (data) {
    // 调用用户传入的回调函数处理数据
    callback(data);

    // 请求完成后清除回调函数，避免内存泄漏
    delete window[callbackFuncName];
  };

  // 3. 创建 script 标签 创建DOM元素
  const script = document.createElement('script');
  
  // 4. 设置 script 标签的 src 属性，传入回调函数的名称
  script.src = `${url}?callback=${callbackFuncName}`;
  
  // 5. 将 script 标签添加到 body 中，开始请求
  document.body.appendChild(script);

  // 6. 脚本请求完成后的回调，可以删除 script 标签（可选）
  script.onload = function () {
    document.body.removeChild(script);
  };
  // 脚本执行失败的回调
  script.onerror = function () {
    console.error('JSONP 请求失败');
    document.body.removeChild(script);5
  };
}
