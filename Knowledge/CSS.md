### 1.说说你对盒子模型的理解?

#### 组成部分
盒子模型由以下几部分组成：
1. content（内容）：元素的实际内容，比如文本、图片、子元素。由 width 和 height 决定。
2. padding（内边距）：内容和边框之间的空间，背景色会延伸到 padding 区域。
3. border（边框）：包裹在内容和内边距外部的边框。
4. margin（外边距）：元素与外部其他元素之间的间距，背景色不会延伸到 margin。

#### 分类
分为：
1. 标准盒子模型（W3C 标准）
   1. width / height 只包含 content，不包含 padding 和 border。
   2. 元素总宽度 = content + padding + border + margin。

2. IE 盒子模型（怪异模式）
   1. width / height 包含 content + padding + border。
   2. 元素总宽度 = width + margin。
3. 可以通过 box-sizing 控制：
   ```javaScript
   div {
    box-sizing: content-box; /* 默认，标准盒子模型 */
    box-sizing: border-box;  /* IE盒子模型 */
    box-sizing: inherit 
    // 指定 box-sizing 属性的值，应该从父元素继承
    }
   ```

#### 实际运用场景
1. 布局计算
    - 在布局时，使用 border-box 更方便，不用再手动加 padding 和 border。  
2. 响应式布局
    - 用 border-box 避免 padding 导致盒子超出父容器，方便百分比宽度计算。  
3. margin 塌陷
   - 两个块级元素上下相邻时，margin 会合并，导致间距比预期小。
   - 解决方式：给父元素加 padding 或 overflow: hidden。

### 2. css选择器有哪些？优先级？哪些属性可以继承？

#### 常见选择器分类

1. 基础选择器
    - 通配符选择器：* {}
    - 标签选择器：div {}
    - 类选择器：.box {}
    - ID 选择器：#app {}
    - 属性选择器：input[type="text"] {}

2. 组合选择器
    - 后代选择器：div p {}
    - 子选择器：div > p {}
    - 相邻兄弟选择器：div + p {}
    - 通用兄弟选择器：div ~ p {}

3. 伪类选择器
    用来选择处于特定状态元素的选择器，描述元素的状态或位置，可以同时使用多个
    - 动态伪类（用户交互）：:hover、:active、:focus
    - 结构伪类（元素位置）：:first-child、 :last-child、:nth-child(n)
    - 状态伪类：:checked、:disabled
    - 否定伪类：:not()

4. 伪元素选择器
    创建和样式化元素的特定部分或插入内容。最多两个
    - ::before（元素之前插入）、::after（元素之后插入）、::first-line（首行）、 ::first-letter（首字母）、::selection（选中文本）、::placeholder（占位符）

5. 组合符
    - 并集选择器：h1, h2 {}
    - 交集选择器：div.box {}

#### 优先级
- 通常：内联 > ID选择器 > 类、伪类、属性选择器 > 标签、伪元素选择器 >   后代、子代、兄弟选择器 > 通配符选择器
  
- 计算规则：
👉 权重值可记作四元组 (a, b, c, d)：
    a: 是否内联样式（有则为 1）
    b: ID 选择器个数
    c: 类 / 属性 / 伪类选择器个数
    d: 标签 / 伪元素选择器个数

-  规则覆盖
    - 权重高的覆盖低的。
    - 权重相同时，后写的覆盖前写的（就近原则）。
    - !important 优先级最高，但一般不推荐频繁使用。  

#### 哪些属性可以继承？
1. 可继承（主要是 文字相关属性）
   1. 字体系列：font、font-family、font-size、font-style、font-weight
   2. 文本相关：color、line-height、text-align、visibility、cursor
   3. 列表属性：list-style  
   4. 表格布局属性：
    ``` javaScript
    caption-side：定位表格标题位置
    border-collapse：合并表格边框
    border-spacing：设置相邻单元格的边框间的距离
    empty-cells：单元格的边框的出现与消失
    table-layout：表格的宽度由什么决定
    ```
    5. a 标签的字体颜色、h1-h6标签字体的大小不能被继承
   
2. 不可继承（大部分 布局、盒子模型相关属性）
   1. 尺寸：width、height
   2. 盒模型：margin、padding、border
   3. 背景：background
   4. 定位：position、top/right/bottom/left、z-index
   5. 浮动：float、clear
   
#### 实际应用场景

1. 优先级冲突排查
    - 样式不起作用时，大多是选择器优先级问题。
    - 可以通过调整选择器粒度、样式顺序或使用 !important 临时解决。

2. 继承特性
    - 常用在 全局样式设置，比如：
    ```javaScript
    body {
    font-family: Arial, sans-serif;
    color: #333;
    }
    ```
    - 👉 子元素会继承这些字体和文字颜色。

3. 性能优化
   - 选择器越具体，匹配消耗越大。生产环境里推荐 类选择器 > 标签选择器 > 复杂嵌套。 

### 3. 元素水平垂直居中的方法有哪些？如果元素不定宽高呢？

### 元素水平垂直居中的方式：

1. 利用定位+margin:auto

2. 利用定位+margin:负值(定宽高)
3. 利用定位+transform（不定宽高）
4. table布局
5. flex布局
6. grid布局

```
position + transform(-50%, -50%)
flex (align-items + justify-content)
grid (place-items: center)；
```

##### 内联元素居中布局
1. 水平居中
    - 行内元素可设置：text-align: center
    - flex布局设置父元素：display: flex; justify-content: center

2. 垂直居中
   - 单行文本父元素确认高度：height === line-height
   - 多行文本父元素确认高度：disaply: table-cell; vertical-align: middle
   块级元素居中布局

3. 水平居中
    - 定宽: margin: 0 auto
    - 绝对定位+left:50%+margin:负自身一半
  
4. 垂直居中
   - position: absolute设置left、top、margin-left、margin-top(定高)
   - display: table-cell
   transform: translate(x, y)
   - flex(不定高，不定宽)
   - grid(不定高，不定宽)，兼容性相对比较差

### 4. 说说flexbox（弹性盒布局模型）,以及适用场景？
- 定义：一种新的布局方式，适合响应式布局，是单维度布局（水平或者竖直一列）
- 核心布局思想：让 容器（flex container） 内的 子元素（flex items） 按照主轴/交叉轴自动伸缩、排列和对齐。
- 适合 导航栏、按钮组、水平垂直居中、列表项均分 这些场景
- 主轴 & 交叉轴
    - 主轴（main axis）：默认是 水平方向。
    - 交叉轴（cross axis）：与主轴垂直，默认是 垂直方向。
    - flex-direction 可以改变主轴方向（row / column）。

- 伸缩性
  - 子元素可以通过 flex-grow（放大）、flex-shrink（缩小）、flex-basis（初始大小）灵活调整。
  - 比如：自适应卡片布局、响应式导航栏。

- 对齐方式丰富
    - 主轴对齐：justify-content（start、end、center、space-between、space-around、space-evenly）
    - 交叉轴对齐：align-items、align-self（start、end、center、stretch）
    - 多行对齐：align-content
- 应用场景：水平垂直居中布局、导航栏、三栏布局、自适应卡片列表。

### 5. 怎么理解回流跟重绘？什么场景下会触发？

#### 定义
- 回流（重新计算“几何信息”）：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
- 重绘（更新“皮肤”）：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制
- 区别
  - 回流必然导致重绘，但 重绘不一定导致回流。
  - 回流代价更高，因为涉及到 布局计算 + 页面重排。

#### 如何触发
1. 回流触发时机：
   - 添加或删除可见的DOM元素
   - 元素的位置发生变化
   - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
   - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
   - 页面一开始渲染的时候（这避免不了）
   - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
   - 还有一些容易被忽略的操作：获取一些特定属性的值
   ```
   offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight
   ```

2. 重绘触发的时机
   - 回流
   - 颜色的修改
   - 文本方向的修改
   - 阴影的修改   

#### 如何减少
应避免频繁回流，可以批量操作 DOM，使用 transform/opacity 做动画。