# JS基础相关问题
<font color="red">红色：应该回答出来</font>
<br>
<font color="yellow">黄色：不知道的内容</font>

   ### 1. 说说JavaScript中的数据类型？区别？
   #### 数据类型分类
   - 基本数据类型：String number（有NaN、infinity特殊值，注意边界） Boolean null（空值） undefined（有声明未赋值） BigInt（表示任意大小的整数） <font color="red">Symbol（表示唯一标识符）</font>
     - 存放在栈；<font color="yellow">赋值是按值传递，修改不会影响原值。</font>
   - 引用数据类型：targetect function <font color="red">Array；正则对象-RegExp，日期对象-Date、Map、Set等对象类型</font>
     - 存放在堆；<font color="yellow">赋值是按引用传递，修改会影响原对象。</font>
     - 
#### 数据类型判别：
   - typeof 判断基本数据类型，但是不能判断 null <font color="yellow">通过二进制判断</font>
     - 不能将targetect、Array和Null区分，都返回targetect
   - Array.isArray() 识别数组类型
   - instanceof 判断引用数据类型<font color="yellow">检测当前实例是否属于这个类的（原型链）</font>
   - <font color="yellow">targetect.prototype.toString.call() 精准判断数据类型； 返回当前实例所属类信息</font>
#### 类型转换
1. 显式转换：
   - Number():
     - 如果不可以被解析为数值、不是单个数值的对象、undefined都返回 NaN
     - 空字符串、false、null转为0
   - String()
   - Boolean()
   - <font color="yellow">parseInt()
     - 逐个解析字符，遇到不能转换的字符就停下来返回已解析成功的内容
   - BigInt()</font>
2. 隐式转换：
   1. 自动转为布尔值：undefined、null、false、+0、-0、NaN、""，除了上面几种会被转化成false，其他都换被转化成true
   2. 自动转为字符串：常发生在+运算中，一旦存在字符串，则会进行字符串拼接操作
   3. <font color="yellow">自动转为数值：除了+有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值
   4. == 会进行隐式转换之后再来判断值是否相等</font>

### 2. avscript数组的常用方法有哪些？

#### 2.1 增删改类（影响原数组）
- push() / pop()：末尾添加/删除
- unshift() / shift()：开头添加/删除
- <font color="red">splice(start, deleteCount, ...items)：可删除、插入、替换；三个参数：开始位置、0（要删除的元素数量）、插入的元素。返回空数组</font>

#### 2.2 访问/拼接类（返回新数组，不修改原数组）

- <font color="red">concat()：合并数组
- slice(start, end)：截取数组，不包含end</font>
- join(separator)：数组转字符串

#### <font color="red">2.3 查找类（不修改原数组）</font> 作用：数据查询

- indexOf() 第一次出现/ lastIndexOf()最后一次出现：查找元素下标，没找到返回-1
- includes(value)：是否包含某个元素，返回true或false
- find(callback)：返回第一个满足条件的元素
- findIndex(callback)：返回第一个满足条件的下标

#### <font color="red">2.4 遍历类（不修改原数组）</font> 作用：表格展示、数据筛选

- forEach(item, index, array)：遍历元素（无返回值）有array则修改原数组
- map(callback)：返回新数组（映射）
- filter(callback)：筛选元素,返回满足条件的元素数组
- some(callback)：是否有任意元素满足条件，返回true/false
- every(callback)：是否所有元素满足条件,返回true/false

#### <font color="red">2.5 归并/计算类（不修改原数组）</font> 作用：购物车等数据计算

- reduce(callback, initialValue)：累计-计算
- reduceRight(callback, initialValue)：从右向左累计

#### 2.6 排序/反转（修改原数组）

- sort(compareFn)：排序（默认按字符串 Unicode 顺序）
- reverse()：反转数组
#### 2.7 ES6+ 新增（不修改原数组）作用：处理复杂的嵌套数据

- Array.from()：将类数组/可迭代对象转数组
- Array.of()：创建数组
- <font color="yellow" >flat(depth) / flatMap(callback)：扁平化数组</font>
  
### 3. Javascript字符串的常用方法有哪些？
JavaScript 中字符串（String）是 不可变的（immutable），**所以所有字符串方法都 不会修改原字符串，而是返回一个新的字符串或结果。**

#### 访问 & 长度 （基本访问）
- `str.length`：字符串长度  
- `str.charAt(index)`：返回指定位置的字符  
- `str.charCodeAt(index)`：返回指定位置字符的 Unicode 编码  
- `str.at(index)`：支持负索引，返回对应字符（ES2022）  

#### 搜索类（常用于 校验 URL、文件名、输入格式）
- `str.indexOf(substr, fromIndex)`：返回子串首次出现位置  
- `str.lastIndexOf(substr)`：返回子串最后出现位置  
- `str.includes(substr)`：判断是否包含子串（返回 `true/false`）  
- `str.startsWith(substr)`：是否以某子串开头  
- `str.endsWith(substr)`：是否以某子串结尾  
- `str.match(regexp)`：返回正则匹配结果  
- `str.search(regexp)`：返回匹配的位置  

#### 截取 & 提取（常用于截取文件后缀、提取子串。）
- `str.slice(start, end)`：截取子串（支持负数）  
- `str.substring(start, end)`：截取子串（不支持负数）  
- `str.substr(start, length)`：从起始位置取指定长度（⚠️ 已废弃，不推荐）  

#### 替换 & 拆分（常用于 数据清洗、模板替换。）
- `str.replace(substr/regexp, newStr)`：替换匹配到的内容  
- `str.replaceAll(substr/regexp, newStr)`：替换所有匹配项（ES2021）  
- `str.split(separator, limit)`：分割字符串为数组  

#### 大小写 & 去空格（常用于 表单输入校验）
- `str.toUpperCase()`：转大写  
- `str.toLowerCase()`：转小写  
- `str.trim()`：去掉首尾空格  
- `str.trimStart()` / `str.trimEnd()`：去掉首部/尾部空格  

#### 重复 & 填充（常用于 格式化数字、生成固定长度的 ID。）
- `str.repeat(n)`：重复字符串  
- `str.padStart(targetLength, padStr)`：开头填充到指定长度  
- `str.padEnd(targetLength, padStr)`：结尾填充到指定长度  

#### 模板 & 原始字符串
- `String.raw`：返回模板字符串的原始内容（不会转义 `\n` 等）  

### 4. == 和 ===区别，分别在什么情况使用？
#### 区别
1. == 先进行类型隐式转换再判断值是否相等
   <font color="yellow">- 转换情况：
     - 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
     - 简单类型与引用类型比较，调用对象的 valueOf() 方法获取其原始类型的值，再比较
     - 两个都为引用类型，则比较它们是否指向同一个对象
     - null 和 undefined 相等
     - 存在 NaN 则返回 false</font>

2. === 不进行类型转换，直接判断 **值+类型** 是否相等;
   - undefined 和 null 与自身严格相等

#### <font color="yellow">使用情况</font>
- 推荐优先使用 ===（严格相等） 
  - 避免类型转换带来的意外结果。
  - 代码更可读，更安全。

- 只有在明确需要类型转换时，才用 ==
  - 比如，判断一个值是否为 null 或 undefined：
  ```javascript
  if (value == null) {
  // 等价于 value === null || value === undefined
  }
  ```

### 5. <font color="yellow">深拷贝浅拷贝的区别？如何实现一个深拷贝？</font>
对于基本类型来说，浅拷贝和深拷贝是一样的，都是拷贝值
#### 浅拷贝
- 定义：只复制对象的第一层属性，如果属性是引用类型（对象/数组），只会复制引用地址。不会开辟新的内存空间，共享内存空间。
- 结果：修改新对象里的引用属性，会影响原对象。
- 存在浅拷贝的现象有：
  - targetect.assign(target,targetect)【拷贝对象的可枚举属性到目标对象target，返回一个浅拷贝对象。】；
  - Array.prototype.slice(), Array.prototype.concat()，Array.from()；
  - 使用拓展运算符实现的复制
  
#### 深拷贝
- 定义：不仅复制第一层，还会递归复制对象里的对象，彻底分离原对象和新对象。
- 结果：修改新对象不会影响原对象。（因为深拷贝开辟了一个新的栈）
- 常见的深拷贝方式：
  - _.cloneDeep();
  - jQuery.extend();
    - 合并对象，支持深拷贝（默认浅拷贝，第一个参数为true支持深拷贝）
  - JSON.stringfy();
    - 有局限性，不能拷贝 function、Symbol、undefined
    - 不能正确处理 Date、RegExp、循环引用
  - 手写循环递归
  
  ### 6. 说说你对闭包的理解？闭包使用场景 
  - 闭包定义：可以访问外部函数定义域中的变量，即使外部函数已经执行完毕。
- 特点：
  - 能访问外部函数的变量。
  - 外部函数执行结束后，内部函数仍然可以引用这些变量。
  - 内部函数对外层变量形成“私有作用域”，不会污染全局作用域。
- 本质：是通过作用域链实现的 
- 使用场景：数据私有化/模块化；柯里化函数（复用参数）
- 注意：避免循环引用导致**内存泄漏**，循环中生成闭包需注意变量作用域，使用完要释放内存。
  
  ### 7. 说说你对作用域链的理解
- 作用域分类：
  - 全局作用域：任何不在函数中或是大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问
  - 函数作用域：如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问
  - 块级作用域：在大括号中使用let和const声明的变量存在于块级作用域中。在大括号之外不能访问这些变量

 - 作用域链定义：JS官方用来查找变量的机制，当访问一个变量的时候，JS 引擎会从**当前作用域**开始查找，如果找不到就沿着**父级作用域链向上查找**，直到全局作用域。

- 特点：
  - 每个执行上下文都会有一个作用域链。
  - 内部函数可以访问外部函数的变量。
  - 当变量在当前作用域找不到时，沿作用域链逐级向上查找。
- 实际运用：变量查找、闭包、变量提升

### <font color="yellow">8. JavaScript原型，原型链 ? 有什么特点？</font>
- **原型（对象属性共享机制）**：Object.prototype
  - 作用：实现对象之间属性和方法的共享，节省内存。
- **原型链（查找机制）**：当访问对象的属性或方法时，如果对象本身没有，则会沿着 Prototype 链向上查找，直到找到 Object.prototype，再找不到返回 undefined。
  - 特点：实现了JS的继承机制

- 特点总结：
  - 共享性：方法放在原型上，所有实例共享。
  - 继承性：对象可以访问原型链上的属性。
  - 动态性：原型对象可以随时修改，实例会立即反映。
  - 链式查找：查找属性/方法时沿原型链向上搜索，直到 Object.prototype。

- 应用场景：
  - 节省内存：方法放在原型上，多个实例共享
  - 继承实现
  - 动态扩展实例方法
- 构造函数、原型和实例之间的关系 
  - 通过new 来创建实例对象
  - 构造函数每个对象的__proto__都是指向它的构造函数的原型对象prototype的
`person1.__proto__ === Person.prototype`
    - 使用 Object.getPrototypeOf可以获得原型
  - 每个函数拥有prototype属性，指向原型对象。同时，原型对象有一个自有属性constructor，这个属性指向该函数

- 函数（包括原生构造函数）的原型对象为Function.prototype;
`Function.prototype.__proto__ === Object.prototype`
- `Object.prototype.__proto__ === null`
![JavaScript Prototype Chain](https://segmentfault.com/img/remote/1460000042725377)
![alt text](image-1.png)

### <font color="yellow">9. Javascript如何实现继承？</font>
- 继承的概念：子类可以继承父类的属性和方法，同时也可以重新定义父类的某些属性，并重写或覆盖某些属性和方法
- 实现方式：
  - 原型链继承
    - 子对象可以访问父对象的方法和属性
    - 缺点：实例共享引用类型属性，1个改都会改；属性初始化不灵活，需要调用构造函数否则容易undefined
  - 构造函数继承（借助call）
    - 优点：每个实例属性独立，父类自己定义的方法子类无法继承
    - 缺点：方法不能复用，需要在构造函数中定义，浪费内存
  - 组合继承：属性独立，方法共享
  - ES6 class继承：语法简洁，清晰
    ```javascript
    class Parent {
      constructor(name) {
        this.name = name;
      }
      greet() {
        console.log(`Hello, my name is ${this.name}`);
      }
    }

    class Child extends Parent {
      constructor(name, age) {
        super(name); // 调用父类构造函数
        this.age = age;
      }
      introduce() {
        console.log(`I am ${this.name}, and I am ${this.age} years old.`);
      }
    }

    // 示例
    const child = new Child("Alice", 10);
    child.greet(); // 输出: Hello, my name is Alice
    child.introduce(); // 输出: I am Alice, and I am 10 years old.
    ```
### <font color="yellow">10. 谈谈this对象的理解？</font>
- 定义：this 关键字是**函数运行时自动生成**的一个内部对象，只能在函数内部使用，总**指向调用它的对象**
- this在函数执行过程中，this一旦被确定了（this的指向在**函数调用**时确定的），就**不可以再更改**
  
#### 绑定规则
1. 默认绑定：普通函数直接调用时，非严格模式下指向 window（浏览器）或 global（Node），严格模式下为 undefined。

2. 隐式绑定：作为对象方法调用时，this 指向调用该方法的对象。

3. 显式绑定：通过 call、apply、bind 可以手动指定 this。

4. new 绑定：通过构造函数调用时，this 指向新创建的实例对象。
   - new过程遇到return一个对象，此时this指向为返回的对象
   ```javaScript 
   function fn()  
   {  
    this.user = 'xxx';  
    return {};  
   }
   var a = new fn();  
   console.log(a.user); //undefined
   ```
  - 如果返回一个简单类型的时候(例如：返回1)，则this指向实例对象
  - 注意的是null虽然也是对象，但是此时new仍然指向实例对象

5. 箭头函数：没有自己的 this，继承自外层作用域。  
6. 优先级：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

### 11. typeof 与 instanceof 区别
#### typeof
- 作用：返回一个字符串，表示操作数的类型。
- 可识别的类型：number、string、boolean、undefined、object、bigint、symbol、function、
- 特点：适合用来判断 **基本数据类型**和变量。
  ```javaScriptif
      (typeof a != 'undefined'){
      //变量存在
    }
  ```
- 局限：
  - typeof null === "object"（历史遗留 Bug）
  - 无法区分数组和对象（都返回 "object"）

#### instanceof(返回布尔值)
- 作用：检测某个对象的**原型链**上，是否能找到构造函数的 prototype。
- 语法：`obj instanceof Constructor`
- 特点：适合用来判断 引用类型（数组、对象、函数、类实例）。
- 局限：
  - 不能判断原始值（例如1123，但是new Number(123)可以判断）
  - 跨 iframe / 跨 realm 可能失效（因为构造函数不同）

#### 其他判断数据类型的方式
1. Object.prototype.toString.call()
- 最准确的类型判断方式，返回 "[object Type]"。
- 可区分所有内置对象（包括 null、Array、RegExp、Date、Map、Set）。
- 局限：写法稍繁琐。
- Object.prototype.toString 不加 call 时，只能检测当前对象，而且可能被重写；加上 call 后可以把任意值作为 this，返回其内部类型标签，是最稳妥的类型判断方法。

2. Array.isArray()
  - ES5 新增，专门判断是否为数组。
  - 推荐使用，语义清晰，跨 iframe 也能正常工作。

### 12.说说new操作符具体干了什么？
- 作用：new操作符用于创建一个给定构造函数的实例对象
- 它做了两件事：
  - 把 **构造函数和原型链** 关联起来。
  - 把 **构造函数里的逻辑** 应用到新对象上。

- 流程：
  - 1. 创建一个空对象`let newObj = {}`
  - 2. 绑定原型:将这个新对象的原型（__proto__）指向构造函数的 prototype。`newObj.__proto__ = Foo.prototype;`
  - 3. 执行构造函数：将构建函数中的this绑定到新建的对象newObj上`let result = Foo.call(newObj);`
  - 4. 返回结果
    - 如果构造函数显式返回一个对象（引用类型），则返回该对象。
    - 否则返回新创建的对象 newObj。

### 13. bind、call、apply 区别？如何实现一个bind?
- 作用：改变函数运行时的this指向
#### call
- 语法：`fn.call(thisArg, arg1, arg2, ...）`
- 作用：立即调用函数，this 指向 thisArg，参数按顺序传递。
#### apply
- 语法：`fn.apply(thisArg, [argsArray])`
- 作用：立即调用函数，this 指向 thisArg，参数以 **数组**形式传递。
#### bind
- 语法：`fn.bind(thisArg, arg1, arg2, ...)`
- 作用：不会立即执行，而是返回一个新的函数，新函数调用时 this 永远指向 thisArg，并可进行参数预置。
#### 区别
- 三者都可以改变函数的this对象指向
- 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window
- 三者都可以传参，但是**apply是数组，而call是参数列表**，且apply和call是一次性传入参数，而bind可以分为多次传入
- bind 是**返回绑定this之后的函数**，apply 、call 则是立即执行
- bind 是永久改变this指向，call和apply是临时改变一次

### <font color="yellow">14. ajax原理是什么？如何实现？</font>
- 定义：AJAX（Asynchronous JavaScript and XML） 是一种在 **不刷新整个页面** 的情况下，与服务器进行数据交换并更新部分页面内容的技术。
- 原理：通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面
- 关键特性：
  - 异步请求，不阻塞页面。
  - 提升用户体验（如搜索建议、局部刷新）。
  - 跨域需要配合 CORS 或代理解决。
#### 实现过程
1. **创建XMLHttpRequest对象**`const xhr = new XMLHttpRequest();`
2. **与服务器建立连接**:通过 XMLHttpRequest 对象的 open() 方法与服务器建立连接`xhr.open(method, url, [async][, user][, password])`
   1. 参数说明：
      1. method：表示当前的请求方式，常见的有GET、POST
      2. url：服务端地址
      3. async：布尔值，表示是否异步执行操作，默认为true
      4. user: 可选的用户名用于认证用途；默认为`null
      5. password: 可选的密码用于认证用途，默认为`null
3. **给服务端发数据**：通过 XMLHttpRequest 对象的 send() 方法，将客户端页面的数据发送给服务端`xhr.send([body])`
   1. body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null
4. **绑定onreadystatechange事件**:`onreadystatechange` 事件用于监听服务器端的通信状态，主要监听的属性为`XMLHttpRequest.readyState`
   1. AJAX 的核心就是 XHR 状态机：
0-初始化 → 1-建立连接（已open()） → 2-收到响应头(已send()) → 3-加载响应体(正在接收数据) → 4-完成。
我们通常在 readyState === 4 且 status 成功时拿到最终数据。

- 实现一个ajax
```javaScript
//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}

// 使用方式
ajax({
    type: 'post',
    dataType: 'json',
    data: {},
    url: 'https://xxxx',
    success: function(text,xml){//请求成功后的回调函数
        console.log(text)
    },
    fail: function(status){////请求失败后的回调函数
        console.log(status)
    }
})
```
- 应用场景
  - 搜索联想（输入框提示）。
  - 表单提交（无刷新保存）。
  - 局部刷新（分页、加载更多）。
  - 后台数据拉取（监控、仪表盘）

### 15.说说你对事件循环的理解
1. JavaScript 是单线程的
   1. 主线程一次只能执行一个任务，避免了多线程的锁和资源抢占问题。
   2. 但这也带来一个问题：如何处理异步 I/O、定时器、DOM 事件？

2. 事件循环的调度过程
   1. 执行栈（同步任务）先执行完；
   2. 检查 微任务队列（如 Promise.then、MutationObserver、queueMicrotask），依次执行直到清空；
   3. 取出一个 宏任务（如 setTimeout、setInterval、setImmediate、MessageChannel、I/O），放到执行栈执行；
   4. 重复步骤 2、3 → 形成循环。

3. 微任务 vs 宏任务
   1. 微任务：优先级高，事件循环每一轮都会在宏任务前清空微任务队列。
   2. 宏任务：来自宿主环境（浏览器 / Node.js），比如定时器、事件回调。

#### <font color="yellow">async和await</font>
- async/await 是 Promise 的语法糖，让异步代码写起来像同步代码。
- async 函数始终返回一个 Promise；await 会暂停函数执行，把后续代码放入微任务队列，在 Promise resolve/reject 后继续。
- 相比 .then()，async/await 可读性更高，支持 try...catch 做同步风格的错误处理。
- 实际开发中，可以结合 Promise.all 做并发，提高性能。
##### 概念
1. async 函数
   1. 用 async 声明的函数一定返回一个 Promise。
   2. 如果函数内部返回非 Promise 值，会被 Promise.resolve() 包装。
2. await 表达式
   1. await 用于等待一个 Promise 结果。
   2. 会暂停 async 函数的执行，把后续代码放入 微任务队列，等 Promise 完成后再继续。
   3. await 只能在 async 函数中使用

### 16. Javascript本地存储的方式有哪些？区别及应用场景？
cookie、localStorage、sessionStorage、indexedDB、Cache Storage
#### cookie
- 特点
  - 主要用于 状态管理（会话标识、登录信息）。
  - 大小限制约 4KB，会随请求头自动携带到服务器。
- 常用属性：
  - Expires 用于设置 Cookie 的过期时间。`Expires=Wed, 21 Oct 2015 07:28:00 GMT`
  - Max-Age 用于设置在 Cookie 失效之前需要经过的秒数（优先级比Expires高）`Max-Age=604800`
  - Domain 指定了 Cookie 可以送达的主机名
  - Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部`Path=/docs   # /docs/Web/ 下的资源会带 Cookie 首部`
  - 标记为 Secure 的 Cookie 只应通过被HTTPS协议加密过的请求发送给服务端
- 关于cookie的使用如下：
  - `document.cookie = '名字=值';`
  - 关于cookie的修改，首先要确定**domain和path属性都是相同**的才可以，其中有一个不同得时候都会创建出一个新的cookie。
  ``` javaScript
  Set-Cookie:name=aa; domain=aa.net; path=/  # 服务端设
  document.cookie =name=bb; domain=aa.net; path=/  # 客户端设置
  ```
  - 删除：给cookie设置过期事件

#### localStorage
- 特点：
  - 永久存储（除非手动清理或浏览器清空缓存）。
  - 存储的信息在同一域中是共享的，存储内容多的话会消耗内存空间，会导致页面变卡
  - 大小约 5~10MB，同源策略限制。
- 缺点：
  - 无法像Cookie一样设置过期时间
  - 只能存入字符串，无法直接存对象
- 使用：
  - 设置`localStorage.setItem('username','cfangxu');`
  - 获取`localStorage.getItem('username')`
  - 获取键名`localStorage.key(0) //获取第一个键名`
  - 删除`localStorage.removeItem('username')`
  - 一次性清除所有存储`localStorage.clear() `

#### sessionStorage
- 会话级存储，页面关闭即清除。
- 其他特性与 localStorage 一致（大小、API）。

#### indexedDB
- 浏览器内置的 非关系型数据库，可存储大量结构化数据。
- 支持事务、索引、查询，比 localStorage 更强大。
- 优点：
  - 储存量理论上没有上限
  - 所有操作都是异步的，相比 LocalStorage 同步操作性能更高，尤其是数据量较大时
  - 原生支持储存JS的对象
  - 是个正经的数据库，意味着数据库能干的事它都能干
- 缺点：
  - 操作非常繁琐,本身有一定门槛

#### Cache Storage (Service Worker)
- PWA 常用，用于缓存请求和响应。
- 常用于 离线应用 和 前端资源缓存。

#### 区别：
关于cookie、sessionStorage、localStorage三者的区别主要如下：

- 存储大小： cookie数据大小不能超过4k，sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

- 有效时间：
  - localStorage  存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； 
  - sessionStorage  数据在当前浏览器窗口关闭后自动删除；
  - cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

- 数据与服务器之间的交互方式， 
  - cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端； 增加网络开销
  - sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存，性能更优

- 安全性
  - Cookie 可能被劫持（XSS 攻击），敏感信息应搭配 HttpOnly + Secure
  - localStorage/sessionStorage 也可被脚本读取，适合存储非敏感数据。

- 异步性
  - localStorage/sessionStorage 是 同步 API，大数据操作会阻塞主线程。
  - IndexedDB 是 异步 API，不会阻塞。

#### 实际应用场景

1. Cookie
   1. 用于 **会话管理**（如存放 sessionId、JWT）。
   2. 不适合存放大数据。

2. localStorage
   1. 存储持久化数据：用户偏好设置、主题、上次浏览位置。
   2. 适合长期保留的数据。

3. sessionStorage
   1. 存储临时数据：表单填写进度、页面间传参（在同一标签页内）。
   2. 页面关闭后清除。

4. IndexedDB
   1. 大型数据存储：离线应用、缓存数据表、存储二进制文件。
   2. 典型案例：离线笔记应用、音乐/视频缓存。

5. Cache Storage
   1. 用于 PWA 离线缓存，存储静态资源（HTML、JS、CSS、图片）。
   2. 结合 Service Worker 实现离线访问。

### 17. 说说 Javascript 数字精度丢失的问题，如何解决？
- JavaScript 的数字采用 IEEE 754 双精度浮点数存储，最多只能精确表示 15-16 位十进制数字。
- JS Number.MAX_SAFE_INTEGER = 2^53 - 1，超过这个值就可能丢失精度。
- 精度丢失的原因是**二进制无法精确表示大部分十进制小数**，比如 0.1 + 0.2 !== 0.3。

- 实际开发问题：
  - 金额运算：0.1 元、0.2 元的加减。
  - 大整数处理：订单号、用户 ID（可能超过 2^53）。
  - 前端和后端数据交互时可能出现“金额错乱”或“大整数 ID 不准确”的 bug。

- 解决方式：
  - 转换为整数计算（以“分”为单位）：把小数转成整数再运算，再除以倍数。
  - 使用第三方库：decimal.js、bignumber.js、math.js
  - 处理大整数：使用 BigInt（ES2020） 来处理超过 2^53 的整数。（**注意Bigint不能和Number混用**）

 ### 18. web常见的攻击方式有哪些？如何防御？
 #### XSS（跨站脚本攻击）
 - 原理：攻击者将恶意脚本（JS/HTML）注入到网页，用户浏览时执行。
 - 攻击目标：盗取存储在客户端的cookie或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互
 - 危害：盗取 Cookie、伪造请求、劫持会话、挂马。
 - 防御：
   - 对用户输入内容做 **转义 / 过滤**（HTML、JS、CSS、URL）。
     - 转义：把用户输入的特殊字符（如 <, >, ", '）转成安全的 HTML 实体，避免被浏览器解析成脚本。
     - 过滤：直接剔除危险的标签或属性，例如 <script>、onerror、javascript:。
   - 使用 Content-Security-Policy (CSP:内容安全策略，通过 HTTP 响应头或 <meta> 标签告诉浏览器：哪些资源（JS、CSS、图片等）允许加载、执行。) 限制可执行脚本来源。
   ``` javaScript
   Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com
   //表示：只允许加载本站和 cdn.example.com 的 JS，不允许执行内联脚本。
   ```
    
   - 对敏感信息（如 Cookie）设置 HttpOnly(表示 这个 Cookie 不能被 JS 访问)，防止被 JS 读取。

#### CSRF（跨站请求伪造）
- 原理：利用用户已登录的身份，诱导其在不知情情况下发起恶意请求。(冒充用户对被攻击的网站执行某项操作)
- 危害：伪造转账、改密码、发帖等操作。
- 防御：
  - 关键请求必须验证 Referer / Origin。
    - Referer：表示当前请求来自哪个页面。
    - Origin：表示请求的协议 + 域名 + 端口，更严格。
- 阻止不明外域的访问
  - 同源检测
  - Samesite Cookie(用来控制跨站请求时是否带上 Cookie);`Set-Cookie: key=value; SameSite=Strict。`
    - 取值：Strict：完全禁止跨站请求携带 Cookie。
    - Lax：GET 请求允许，POST/PUT 等禁止（默认）
    - None：允许，但必须同时 Secure（HTTPS）
提交时要求附加本域才能获取的信息
  - 在请求中加入 CSRF Token(服务端随机生成一个 不可预测的 Token，放到页面或 Cookie 里。每次请求都必须带上，服务器验证是否匹配。) 并进行校验。
  - 双重Cookie验证

#### SQL 注入
- 原理：攻击者在输入中注入 SQL 语句，修改数据库查询逻辑。
- 危害：泄露、篡改、删除数据库。
- 防御：
  - 参数化查询 / 预编译语句，不要拼接 SQL。
  - 严格限制数据库权限。
  - 对输入内容进行 类型校验（如 ID 必须为数字）。

#### 点击劫持（Clickjacking）
- 原理：攻击者用一个透明 iframe 嵌套受害网站，引诱用户点击。
- 危害：误点“转账/授权/删除”。
- 防御：
  - 在响应头中加入：`X-Frame-Options: DENY   # 禁止页面被嵌套`
    - `X-Frame-Options`控制页面是否允许被 <iframe> 嵌套。取值:DENY：完全禁止；SAMEORIGIN：同源页面可以嵌套。
  - 或使用 `frame-ancestors 'none'`（CSP 中）。

#### 中间人攻击（MITM）
- 原理：攻击者拦截并篡改客户端和服务器之间的数据。
- 危害：窃听、篡改内容、伪造身份。
- 防御：
  - 全站使用 HTTPS，避免明文传输。
  - 开启 HSTS（强制使用 HTTPS）：
`Strict-Transport-Security: max-age=31536000; includeSubDomains #表示 1 年内必须使用 HTTPS，所有子域名也适用。`

#### DDoS（分布式拒绝服务攻击）
- 原理：大量请求耗尽服务器资源。
- 危害：服务器宕机，服务不可用。
- 防御：
  - 限流、熔断、验证码、CDN。
  - 服务端做 IP 黑名单 / WAF（Web 应用防火墙）。

#### 实际应用（前端落地措施）

1. 表单输入处理
  - 永远不要相信用户输入，做严格校验。
  - 富文本（如 Markdown 编辑器）要用 白名单过滤库（如 DOMPurify）。

2. 接口请求安全
   1. 给所有敏感操作加上 CSRF Token。
   2. 请求必须使用 HTTPS。

3. 前端配置安全响应头
   1. CSP 限制脚本加载来源。
   2. X-Frame-Options: DENY 防止点击劫持。
   3. Strict-Transport-Security 强制 HTTPS。

4. 敏感信息保护
   1. Cookie 设置 HttpOnly + Secure。
   2. 不在 LocalStorage 保存 Token（容易被 XSS 窃取）。

**前端防御的核心是 输入校验 + 输出转义 + 安全头配置 + Cookie 策略，而服务端要配合做 权限控制、限流、防火墙**