## ES6基础部分
### 1. 说说var、let、const之间的区别
#### var
- 作用域：函数作用域（function scope）。
  - 在函数内var声明，该变量是局部的；在函数内不使用var，该变量是全局的
    ```javaScript
    var a = 20
    function change(){
    a = 30
    }
    change()
    console.log(a) // 30 
    ```
- 变量提升：声明会被提升到作用域顶部，初始化不会提升。
- 重复声明：允许重复声明。后值覆盖前值
- 全局污染：在全局作用域下声明的 var 会挂到 window 上（浏览器环境），Node是global。

#### let
- 作用域：块级作用域（block scope，{} 内有效）。
  - 只要块级作用域内存在let命令，这个区域就不再受外部影响
    ```javaScript
    a = 123
    if (true) {
        a = 'abc' // ReferenceError
        let a;
    }
    ```
- 变量提升：有提升，但存在 暂时性死区（TDZ），在声明前访问会报错。
  - 暂时性死区：使用let声明变量前，该变量都不可用
- 重复声明：不允许在同一作用域内重复声明。
- 全局污染：不会挂到 window。

#### const
- 作用域：块级作用域。
- 变量提升：同 let，有 TDZ。
- 重复声明：不允许重复声明。
- 是否可变：声明时必须赋值，不能再指向新的引用，但对象/数组内部属性仍然可以修改。
  - const实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动（指针不可变，但内部值可变。）

#### 区别
- 作用域：var → 函数作用域；let/const → 块级作用域。
- 变量提升：var 提升且初始化为 undefined；let/const 提升但存在 TDZ。
- 重复声明：var 可以重复；let/const 在相同作用域下不行。
- 修改：let 可重新赋值；const 不能重新赋值，但对象/数组内容可改。
- 最佳实践：优先 const，需要重新赋值用 let，避免使用 var。

#### 使用场景
1. 优先使用 const
   - 表示不会被重新赋值，代码更安全、更清晰。
   - 比如配置项、函数引用、模块依赖。

2. 需要重新赋值时用 let
   - 如循环迭代变量、状态更新

3. 尽量避免使用var

### 2.ES6中数组新增了哪些扩展?
#### 扩展运算符
- 作用：把一个 可迭代对象（数组、字符串、Set、Map 等） 展开成单个元素。
- 实际应用：数组合并/克隆（浅拷贝）、展开字符串、转换类数组对象、函数参数传递等

#### 新的创建方式
1. Array.from() 把类数组或可迭代对象转换为真正的数组。
2. Array.of()用参数创建数组
   1. 没有参数的时候，返回一个空数组
   2. 当参数只有一个的时候，实际上是指定数组的长度
   3. 参数个数不少于 2 个时，Array()才会返回由参数组成的新数组

#### 新的实例方法

1. 查找元素
    - find(callback)：返回第一个符合条件的元素。
    - findIndex(callback)：返回第一个符合条件元素的索引，否不符合返回-1。
      - callback参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组
    - includes(value, fromIndex=0)（ES7）：是否包含某值。
    ```javaScript
    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
    ```
2. 遍历
   1. keys()：返回索引的迭代器。
   2. values()：返回值的迭代器。
   3. entries()：返回 [index, value] 的迭代器。
   4. keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
    ```javaScript
    for (let index of ['a', 'b'].keys()) {
    console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
    console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
    ```

3. 填充
   1. fill(value, start=0, end=this.length)：用固定值填充数组。
   ``` javaScript
   ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']
   ```
   2. copyWithin(target, start=0, end=this.length)：数组内部复制。
   ``` javaScript
   [1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
    // [4, 5, 3, 4, 5] 
   ```

4. 数据扁平化
   - flat()，flatMap()；将数组扁平化处理，返回一个新数组，对原数据没有影响
   - flat()默认只会“拉平”一层，flat(level)多层
   ```javaScript
   // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
    [2, 3, 4].flatMap((x) => [x, x * 2])
    // [2, 4, 3, 6, 4, 8]
   ```
5. 判断数组：Array.isArray()

### 3. 你是怎么理解ES6中 Promise的？使用场景？
Promise是一种异步编程解决方案，解决回调地狱（多层嵌套）的问题，
  
#### 状态
1. promise对象仅有三种状态
  - pedding（等待中）
  - fulfilled（已完成）
  - rejected（已失败）
2. 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
3. 状态一旦从 pending → fulfilled/rejected 就不可再改变（**不可逆**）。
   1. 保证结果的确定性(结果一致)、避免重复回调(如果状态能变多次，会导致链条上的回调被重复触发)

#### 基本方法

- then(onFulfilled, onRejected)：处理成功/失败结果。
- catch(onRejected)：处理失败。
- finally(callback)：无论成功失败都会执行。

#### 静态方法

- Promise.resolve()：快速创建一个已完成的 Promise。
- Promise.reject()：快速创建一个已拒绝的 Promise。
- Promise.all()：等待所有 Promise 成功，否则立即失败。
- Promise.race()：返回最先完成的 Promise（无论成功失败）。
- Promise.allSettled()（ES2020）：等待所有完成，返回每个结果。
- Promise.any()（ES2021）：只要有一个成功就返回，否则失败。

#### 作用
1. 解决回调地狱
   - 链式操作减低了编码难度
   - 代码可读性明显增强
2. 链式调用与错误传递
   - Promise 可以链式调用，返回值会自动包装成新的 Promise。
   - 一旦出错，错误会沿链条传递到最近的 catch。

#### 实际应用场景
1. 封装异步请求
2. 并发任务控制 Promise.all（常用于多个异步请求需要同时完成的场景）
3. 任务竞速Promise.race（常用于超时控制，比如请求超时后走备用接口。）
4. 资源降级（Promise.any）
5. 批量任务执行（Promise.allSettled）
6. async/await

### 4. ES6可选链操作符
  1. 可选链操作符使用`?. `来表示，用来安全地访问对象属性或调用函数，避免在访问嵌套对象或数组时引发错误，减少冗余的空值检查代码。**遇到某个部分是null或undefined，返回undefined，在访问嵌套属性时更加安全，提供更加简洁和易于维护的代码。**
  2. 使用对象：访问对象属性、调用函数、访问数组元素
  3. 防止访问空值时出错、函数的安全调用、简化代码