# JS基础相关问题
<font color="red">红色：应该回答出来</font>
<br>
<font color="yellow">黄色：不知道的内容</font>
   ### 1. 说说JavaScript中的数据类型？区别？
   #### 数据类型分类
   - 基本数据类型：String number（有NaN、infinity特殊值，注意边界） Boolean null（空值） undefined（有声明未赋值） BigInt（表示任意大小的整数） <font color="red">Symbol（表示唯一标识符）</font>
     - 存放在栈；<font color="yellow">赋值是按值传递，修改不会影响原值。</font>
   - 引用数据类型：object function <font color="red">Array；正则对象-RegExp，日期对象-Date、Map、Set等对象类型</font>
     - 存放在堆；<font color="yellow">赋值是按引用传递，修改会影响原对象。</font>
     - 
#### 数据类型判别：
   - typeof 判断基本数据类型，但是不能判断 null <font color="yellow">通过二进制判断</font>
     - 不能将Object、Array和Null区分，都返回object
   - Array.isArray() 识别数组类型
   - instanceof 判断引用数据类型<font color="yellow">检测当前实例是否属于这个类的（原型链）</font>
   - <font color="yellow">Object.prototype.toString.call() 精准判断数据类型； 返回当前实例所属类信息</font>
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
   3. <font color="yellow">自动转为数值：除了+有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值</font>

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
