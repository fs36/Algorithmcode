1. JS 的数据类型
2. 基础数据类型（存放到栈（大小固定且较小），放值，比较：值是否相等）：string、number、Boolean、Bigint、Symbol、Null、Undefined
3. 引用数据类型（存放到堆（大小不固定可能会很大），放地址，比较内存地址是否相等）：object、array、function
4. 如何判断JS的数据类型
5. typeof：可以用来确定一个值的基本数据类型,返回一个表示数据类型的字符串。
  一般用于判断基本数据类型，但是不能判断null（会返回object），array、object会返回obeject，function会返回function
  typeof 422 // "number"
1.  instanceof：用于检查对象是否属于某个类的实例(自定义类的实例)。
  1. 不能判断对象 [] instanceof object // true，判断对象用value typeof ==='object' && value !== null 
  2. 不能判断基本类型
  3. 跨 iframe / 跨环境 失效
  4. 可以判断数组、日期、正则、错误、类实例
class Student{}
const s = new Student
s instanceof Student; // true
1. object.prototype.toString.call()：用于获取更详细的数据类型信息
  Object.prototype.toString.call({ key: "value"}); // "[object Object]"
  Object.prototype.toString.call(function(){});// "[object Function]"
1. Array.isArray()：用于检查一个对象是否为数组
2. == 和 === 的区别
3. == 先进行类型隐式转换再判断值是否相等
  1. 转换情况：
    1. 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
    2. 简单类型与引用类型比较，调用对象的 valueOf() 方法获取其原始类型的值，再比较
    3. 两个都为引用类型，则比较它们是否指向同一个对象
    4. null 和 undefined 相等
    5. 存在 NaN 则返回 false
4. === 不进行类型转换，直接判断 值+类型 是否相等;
5. 使用情景：
  1. 推荐使用 === 
  2. 只有在明确需要类型转换时，才用 == 
    1. 比如，判断一个值是否为 null 或 undefined：if (value == null) // 等价于 value === null || value === undefined
6. 问题：当a=？的时候if(a==1 && a==2 && a==3) console.log("hello")成立
  1. 解题原理：
    - == 会触发类型转换
    - 对象转原始类型时，优先调用 [Symbol.toPrimitive] → valueOf → toString
    - 通过重写这些方法，就能控制比较时返回的值，让 a 在不同的比较里变成不同的数。
let a = {
  i: 1,
  valueOf: function(){
      return this.i++
  }
};

if (a == 1 && a == 2 && a == 3) {
  console.log("hello"); // ✅ 输出 hello
}
10. 谈谈this
1. 定义：this是函数运行时的上下文对象，总指向调用它的对象
[图片]
11. 什么是闭包？有什么作用
1. 闭包 = 函数 + 它能访问的外部变量环境
2. 闭包是指引用了另一个函数作用域中变量的函数,通常是在在嵌套函数中实现的。
3. 作用：能访问外部函数的变量。当外部函数执行结束后，内部函数仍然可以引用这些变量。
4. 注意：使用完闭包之后，要手动清空引用fn = null，否则容易引起内存泄露
12. 深拷贝和浅拷贝的区别？
1. 浅拷贝：
  1. 只拷贝对象的第一层属性，如果属性的值是对象，只拷贝引用地址。不会开辟新的内存空间，共享内存空间。
  2. 修改新对象里的引用属性，会影响原对象。
  3. 常见的浅拷贝方式
    1. Object.assign({},obj)
    2. {...obj}展开运算符
    3. Array.prototype.slice/concat()
2. 深拷贝：
  1. 复制对象的所有层级数据，包括嵌套对象的内容，生成一个完全独立的新对象。
  2. 修改新对象不会影响原对象。
  3. 常见的深拷贝方式
    1. JSON.parse(JSON.stringify(obj))，会丢失函数、undefined、Date、RegExp
    2. 递归遍历复制
    3. 第三方库（如 Lodash，_.cloneDeep）
3. 应用场景
  1. 浅拷贝：
    1. 性能好；
    2. 只关注第一层数据，不在乎深层数据；
    3. 数据不会长期使用，即使后面原始值被修改也不影响
  2. 深拷贝：
    1. 数据隔离；
    2. 需要复制复杂的嵌套对象；
    3. 可能出现不可预期的修改风险；
    4. 需要跨环境/线程传递
13. Promise 是什么？
1. 定义：Promise 是 JavaScript 中用于处理异步操作的对象，它解决了传统回调函数嵌套（“回调地狱”）的问题，让异步代码的逻辑更清晰、更易维护。
2. Promise 代表一个尚未完成但最终会完成的异步操作，它有三种状态：
  1. pending（等待中）：初始状态，操作尚未完成。
  2. fulfilled（已成功）：异步操作完成，且有返回结果。
  3. rejected（已失败）：异步操作出错，且有错误信息。
状态一旦从 pending 变为 fulfilled 或 rejected，就不可逆（无法再改变）。
3. 使用：通过 new Promise() 创建实例，接收一个执行器函数（executor），该函数有两个参数：
  - resolve：当异步操作成功时调用，将状态改为 fulfilled，并传递结果。
  - reject：当异步操作失败时调用，将状态改为 rejected，并传递错误。
4. 处理结果：Promise 实例通过 .then() 处理成功结果，.catch() 处理错误，.finally() 处理无论成功 / 失败都要执行的逻辑（如清理操作）。这些方法返回新的 Promise，因此可以链式调用，解决回调嵌套问题。
14. async/await 是什么？
1. 定义：基于 Promise 实现，让异步代码的写法更接近同步代码，可读性和可维护性更强。
2. 基本语法
  1. async 关键字
    - 用于修饰函数（函数声明、表达式、箭头函数等），表示该函数返回一个 Promise 对象。
    - 函数内部的返回值会被自动包装成 Promise.resolve(返回值)；如果抛出错误，会被包装成 Promise.reject(错误)。
// 示例：async 函数返回 Promise
async function fn() {
  return "成功结果"; // 等价于 return Promise.resolve("成功结果")
}

fn().then(result => console.log(result)); // 输出：成功结果
  2. await 关键字
    - 只能在 async 函数内部使用，用于等待一个 Promise 完成。
    - 当 await 后面跟一个 Promise 时，会暂停当前 async 函数的执行，直到该 Promise 状态变为 fulfilled（成功）或 rejected（失败）。
    - 如果 Promise 成功，await 会返回其结果；如果失败，会抛出错误（可被 try/catch 捕获）。
3. 使用方法：
  1. 定义 async 函数
  2. 在 async 函数中用 await 等待异步结果
  3. 用try/catch捕获错误
15. Promise all/allSettle/any/race的区别
  1. Promise.all：
    1. 作用：全部执行成功之后，进入then逻辑，返回所有任务的结果，只要有一个任务失败，进入catch逻辑
    2. 使用场景：并发请求多个任务且不容许失败（例如：首页多板块渲染数据请求）
  2. Promise.allSettle
    1. 作用：全部执行完成（无论是否成功）之后，进入then逻辑，返回所有任务的结果，不会进入catch逻辑
    2. 使用场景：并发请求多个任务且允许失败（例如：前端埋点日志上传）
  3. Promise.any
    1. 作用：首个任务执行成功之后，进入then逻辑，返回该任务的结果，若全部任务失败，进入catch逻辑
    2. 使用场景：一个任务完成即可继续，不关心其他失败任务（例如：寻找有效的CDN、抢票）
  4. Promise.race
    1. 作用：首个任务执行完成之后触发，如果成功：进入then逻辑，返回该任务的结果；如果失败：进入catch逻辑
    2. 使用场景：获取最快返回的结果，不关心其他任务（例如：请求超时控制）Promise.race 适合做 “超时控制” 和 “谁先完成用谁” 的场景。
16. call/apply/bind 的区别
1. 共同点：改变函数内部的this指向
2. 区别：
  1. 传入参数的区别
    1. call bind 参数以列表的方式传入函数
    2. Apply 参数以数组的方式传入函数
  2. 返回结果的区别
    1. call、apply直接立即执行，返回执行结果
    2. bind 不会立即执行函数，返回一个新的函数
17. 事件冒泡和事件捕获的区别，以及如何阻止
事件冒泡(Bubbling):
- 事件从触发事件的目标元素开始,逐级向上冒泡到DOM树的根节点。
- 首先执行目标元素上的事件处理程序,然后是父元素,再再是更高层次的祖先元素。
- 事件冒泡是默认的事件传播方式。
事件捕获(Capturing):
- 事件从DOM树的根节点开始,逐级向下捕获到触发事件的目标元素。
- 首先执行根节点上的事件处理程序,然后是子元素,再是是更低层次的子孙元素。
- 事件捕获通常需要显式启用,通过 addEventListener 的第三个参数设置为 true来启用事件捕获
应用：addEventListener第三个参数：true为捕获,false为冒泡,默认false
event.stopPropagation()阻止冒泡
18. 事件委托
1. 核心思想：将事件处理程序附加到一个祖先元素上,而不是直接附加到每个子元素上,当事件在子元素上冒泡时,祖先元素捕获事件并根据事件目标来确定如何处理事件。使用 event.target 确定被点击的子元素
2. 优点：
  1. 性能优势:只绑定一次事件，节省内存和绑定时间
  2. 动态元素:新增的子元素也会被自动监听
  3. 代码简洁性:通过将事件处理逻辑集中在祖先元素上,代码更更加简洁和可维护,因为您不需要为每个子元素编写相似的事件处理代码，减少重复绑定逻辑。
  4. 处理多个事件类型:通过在祖先元素上处理多个事件类型,可以实现更多的灵活性。例如,您可以在祖先元素上处理点击事件、鼠标移动事件和键盘事件,而不必为每个事件类型创建单独的事件处理程序。
19. 数组的常见操作方式和方法
1. 增删改类（影响原数组）：
  1. push/pop 
  2. unshift/shift
  3. splice(index,deleteCount,...items)--删除、插入、替换
  4. sort()：arr.sort((a,b)=>a-b); // a-b 是升序，b-a 是降序
  5. reverse()
2. 访问/拼接类（返回新数组，不修改原数组）
  1. concat()：合并数组
  2. slice(start, end)：截取数组，不包含end
  3. join(separator)：数组转字符串
3. 遍历类（不修改原数组）
  1. forEach(item, index, array)：遍历元素（无返回值）有array则修改原数组
  2. map(callback)：返回新数组（映射）
  3. filter(callback)：筛选元素,返回满足条件的元素数组
  4. some(callback)：是否有任意元素满足条件，返回true/false
  5. every(callback)：是否所有元素满足条件,返回true/false
4. 查找类（不修改原数组）
  1. indexOf() 第一次出现，查找元素下标，没找到返回-1
  2.  lastIndexOf() 最后一次出现，查找元素下标，没找到返回-1
  3. includes(value)：是否包含某个元素，返回true或false
  4. find(callback)：返回第一个满足条件的元素
  5. findIndex(callback)：返回第一个满足条件的下标
5. ES6+新增，不修改原数组
  1. Array.isArray 判断是否是数组
  2. Array.from 将类数组/可迭代对象转数组
  3. Array.of 创建数组
20. 字符串的常见操作方式和方法
JavaScript 中字符串（String）是 不可变的（immutable），所以所有字符串方法都 不会修改原字符串，而是返回一个新的字符串或结果。
1. 访问 & 长度 （基本访问）
  - str.length：字符串长度  
  - str.charAt(index)：返回指定位置的字符  
  - str.charCodeAt(index)：返回指定位置字符的 Unicode 编码  
  - str.at(index)：支持负索引，返回对应字符（ES2022）  
2. 搜索类（常用于 校验 URL、文件名、输入格式）
  - str.indexOf(substr, fromIndex)：返回子串首次出现位置  
  - str.lastIndexOf(substr)：返回子串最后出现位置  
  - str.includes(substr)：判断是否包含子串（返回 true/false）  
  - str.startsWith(substr)：是否以某子串开头  
  - str.endsWith(substr)：是否以某子串结尾  
  - str.match(regexp)：返回正则匹配结果  
  - str.search(regexp)：返回匹配的位置  
3. 截取 & 提取（常用于截取文件后缀、提取子串。）
  - str.slice(start, end)：截取子串（支持负数）  
  - str.substring(start, end)：截取子串（不支持负数） 
4. 替换 & 拆分（常用于 数据清洗、模板替换。）
  - str.replace(substr/regexp, newStr)：替换匹配到的内容  
  - str.replaceAll(substr/regexp, newStr)：替换所有匹配项（ES2021）  
  - str.split(separator, limit)：分割字符串为数组  
5. 大小写 & 去空格（常用于 表单输入校验）
  - str.toUpperCase()：转大写  
  - str.toLowerCase()：转小写  
  - str.trim()：去掉首尾空格  
  - str.trimStart() / str.trimEnd()：去掉首部/尾部空格  
6. 重复 & 填充（常用于 格式化数字、生成固定长度的 ID。）
  - str.repeat(n)：重复字符串  
  - str.padStart(targetLength, padStr)：开头填充到指定长度  
  - str.padEnd(targetLength, padStr)：结尾填充到指定长度  
7. 模板 & 原始字符串
  - String.raw：返回模板字符串的原始内容（不会转义 \n 等）  
21. 普通函数和箭头函数的区别
[图片]
[图片]
22. 路由模式：Hash和History的区别
单页面应用（SPA）在不刷新页面的前提下，根据 URL 的变化展示不同的页面内容
特性
Hash 模式
History 模式
URL 格式
带 # 号（如 /#/home）
无 # 号（如 /home），更美观
服务器请求
# 后内容不会发送给服务器
刷新页面时会把完整 URL 发给服务器
兼容性
兼容所有浏览器（包括 IE）
仅支持 HTML5 浏览器（IE10+）
路由跳转限制
只能修改 # 后内容，路径层级有限
可自由修改 URL 路径，支持嵌套路由
部署要求
无需后端配置，直接部署即可
需后端配置（如 Nginx），将所有前端路由请求转发到index.html，否则刷新 404
server {
  listen 80;
  server_name your-domain.com;
  root /usr/share/nginx/html; # 前端打包文件目录
  index index.html;

  # 关键配置：所有请求转发到 index.html
  location / {
    try_files $uri $uri/ /index.html;
  }
}
实现原理
监听浏览器的 hashchange 事件，当 URL 中的哈希值变化时，触发事件回调，进而渲染对应的组件
- 用 history.pushState() 改变 URL 并记录历史记录，用 history.replaceState() 改变 URL 但不新增历史记录。
- 监听 popstate 事件（点击浏览器前进 / 后退按钮时触发），根据 URL 变化渲染对应组件。
代码演示
// 监听哈希变化
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1); // 去掉 #，比如得到 /home
  switch(hash) {
    case '/home':
      renderHomePage(); // 渲染首页
      break;
    case '/user':
      renderUserPage(); // 渲染用户页
      break;
    default:
      renderHomePage();
  }
});

// 手动修改哈希值（模拟路由跳转）
function goToUser() {
  window.location.hash = '/user';
}
// 模拟路由跳转（不刷新页面）
function goToHome() {
  history.pushState({ path: '/home' }, '首页', '/home');
  renderHomePage(); // 手动渲染首页
}

function goToUser() {
  history.pushState({ path: '/user' }, '用户页', '/user');
  renderUserPage(); // 手动渲染用户页
}

// 监听前进/后退按钮
window.addEventListener('popstate', (e) => {
  const path = e.state?.path || '/home';
  if (path === '/home') renderHomePage();
  else if (path === '/user') renderUserPage();
});
23. 