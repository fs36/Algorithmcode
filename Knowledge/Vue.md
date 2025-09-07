## 1. 说说你对vue的理解?
定义：Vue是一个JS框架，可以简化Web开发
### 核心特性
#### 1.数据驱动（MVVM）
- M（Model）：数据模型，负责业务逻辑和数据管理（API 请求、状态数据）。
- V（View）：视图层，负责 UI 展示（HTML、模板）。
- VM（ViewModel）：视图模型，负责连接 View 和 Model，实现数据双向绑定。**View 和 Model 的同步由 ViewModel 自动完成**
- 核心是通过 ViewModel 实现 **数据双向绑定**，让数据变化自动更新视图，用户操作也能自动更新数据。
相比传统 MVC，MVVM 省去了手动操作 DOM，直接操作数据，大幅提高了开发效率和代码可维护性。
#### 2. 组件化
- Vue 强调 UI 组件化，把页面拆分为可复用的独立模块（如按钮、表单、列表）。
- 组件之间通过 **props 传值 / emit 事件 / 状态管理** 通信。
- 实现 **低耦合 + 高复用** 。调试方便（组件之间相互独立，能够快速定位问题所在），可维护性高
#### 3. 响应式系统
- Vue 的最大特点：**响应式数据绑定**。
- Vue2 用 Object.defineProperty 劫持数据getter/setter，实现依赖收集。
- Vue3 用 Proxy 实现，性能更好，支持深层次劫持、动态属性。
- 数据变化自动更新，不用操作DOM、
#### 4. 虚拟 DOM & Diff 算法
- Vue 通过 Virtual DOM 来提高更新性能。
- 当数据变化时，Vue 会先更新虚拟 DOM，再与上一次快照进行 Diff 算法对比，只更新必要的真实 DOM 节点。
- 避免了直接操作真实 DOM 的高性能消耗。

## 2. 说说你对双向绑定的理解?
- 双向绑定（Two-Way Data Binding） 指的是 **数据模型**（Model） 和 **视图**（View） 之间的自动同步机制。（数据变化后更新视图，视图变化后更新数据）
- Vue中的双向绑定实现：v-model
  - 底层原理：
    - Vue2：OBject.defineProprety；对data里面的属性进行劫持，通过发布订阅模式（Observer + Watcher） 实现数据和视图的更新
    - Vue3：Proxy；通过 Proxy 拦截对对象的读写操作；性能更好，能监听数组和对象新增/删除等操作。
- 使用场景：表单交互、富文本编辑器、动态UI组件（开关按钮）
- 优点：减少了手动DOM操作，提高开发效率，代码更加直观
- 缺点：大型应用里面可能会造成数据流混乱（数据来源不清晰）
## 3. 说说你对SPA（单页应用）的理解?
- 定义：SPA指的是整个网站/应用只有一个 HTML 页面，所有的内容交互、页面切换都通过 **JavaScript 动态更新视图** 来完成。
- 页面初始化时会加载必要的 HTML、CSS、JS，之后用户的操作（如切换路由）不会再请求整个页面，而是 **局部刷新、数据异步加载**。
- 直白点：**只刷新局部，不刷新整个页面**。

### 特征
1. 前后端分离
   1. 前端视图渲染
   2. 后端提供接口数据
2. 前端路由控制
   1. 利用 history API 或 hash 实现路由切换；
   2. URL 变化时，不刷新页面，而是前端 JS 控制不同组件的渲染。
3. 用户体验更好
   1. 切换快、交互流畅，接近原生应用体验。

### 优点
1. 用户体验好：页面切换快，交互流畅，不用频繁刷新整个页面
2. 前后端分离，开发效率高
3. 代码复用性高：组件化开发，维护方便

### 缺点
1. 首屏加载慢：一次性加载大量JS/CSS
2. SEO不友好：
3. 浏览器回退/前进逻辑复杂：必须依赖前端路由来管理历史记录，否则容易出现问题。

### 应用场景：
- 后台管理系统（数据交互多，刷新少）
- 在线文档编辑器（如 Notion、石墨文档）
- Web 应用类产品（如 Gmail、Google Drive、Twitter Web 版）

### 优化缺点：
1. 首屏优化：
   1. 路由懒加载、按需加载资源；
   2. 服务端渲染（SSR，如 Nuxt.js、Next.js）：将组件或页面通过服务器生成html，再返回给浏览器
   3. 预渲染（Prerender）。

2. SEO 优化：
   1. SSR 或静态生成（URL静态化）；
      1. 静态生成：通过程序将动态页面抓取并保存为静态页面，这样的页面的实际存在于服务器的硬盘中；
      2. 通过WEB服务器的 URL Rewrite的方式，它的原理是通过web服务器内部模块按一定规则将外部的URL请求转化为内部的文件地址，一句话来说就是把外部请求的静态地址转化为实际的动态页面地址，而静态页面实际是不存在的。
   2. 使用 meta 标签 + sitemap 提升搜索引擎收录。
![alt text](image-3.png)
总结：SPA 是前端通过**路由和组件化**来模拟多页面效果的单页应用，优势是体验好，缺点是首屏慢和 SEO 难，需要结合 SSR/预渲染优化。

## 4. Vue中的v-show和v-if怎么理解？
两者都能控制元素是否在页面显示，语法一样，表达式为true显示；为false隐藏。

### 区别
#### 原理
1. v-show（CSS切换）
   1. 原理：通过** CSS display **属性 控制显示/隐藏。
   2. 当 false 时，并不会移除 DOM 元素，而是添加** display: none**;。
   3. 特点：DOM 始终存在，只是隐藏了。

2. v-if（会触发生命周期）
   1. 原理：通过 **条件渲染** 控制 DOM 的创建和销毁。
   2. 当 false 时，DOM 元素会 **直接被移除**，再次为 true 时会**重新创建**。
   3. 特点：DOM 是否存在取决于条件表达式。
   4. v-if由false变为true的时候，触发组件的beforeCreate、create、beforeMount、mounted钩子，由true变为false的时候触发组件的beforeDestory、destoryed方法

#### 性能
- v-show：**初始渲染开销较大**（因为无论条件真假，DOM 都会渲染一次），但切换开销小（只是改 CSS）。

- v-if：初始渲染开销小（不满足条件就不渲染），但**切换开销大**（频繁创建和销毁 DOM）。

### 应用场景
- v-show：需要 **频繁切换** 显示/隐藏的场景，比如 Tab 切换、下拉菜单展开/收起。

- v-if：**条件很少改变** 的场景，比如根据权限显示某个按钮，或页面只渲染一次的模块。

**频繁切换用 v-show，条件渲染用 v-if**

## 5. Vue实例挂载的过程中发生了什么?（不是很理解）
1. 初始化参数（_init）
   1. 合并用户传入的 options（el（元素，Vue要挂载的DOM节点）、data、methods、components...）和全局配置。
   2. 初始化生命周期、事件、渲染函数等。

2. 数据响应化（observe）
   1. 对 data 进行 **数据劫持**（Vue2 用 Object.defineProperty，Vue3 用 Proxy）。
   2. 建立 getter / setter，为后续依赖收集和更新视图做准备。

3. 编译模板（compile）
   1. 如果传入的是 template(`el:'#app'`)，Vue 会编译成 渲染函数 render function。
   2. 如果没有 template，会从 el 对应的 DOM 中提取内容再编译。
   3. 编译分三步：parse → optimize → generate，最终生成 render 函数。

4. 挂载（$mount）
   1. 执行 `vm.$mount(el)`，将实例挂载到指定的 DOM 节点。
   2. 内部调用 mountComponent，核心流程：
      1. 创建 Watcher，触发 render。
      2. render 执行时，访问 data → 触发 getter → 依赖收集。
      3. render 生成虚拟 DOM（VNode）。
      4. 通过 patch 将 VNode 转换为真实 DOM，并替换 el。

5. 响应式更新
   1. 当 data 改变时，setter 触发依赖更新，通知 Watcher。
   2. Watcher 重新执行 render → 生成新的 VNode。
   3. Diff 算法比对新旧 VNode，按需更新真实 DOM。

### 总结
1. new Vue → 初始化配置、数据响应化。
2. 编译模板 → 把 {{ msg }} 编译成 render 函数。
3. 执行挂载 → render 生成虚拟 DOM → patch 成真实 DOM。
4. 数据变化 → setter 触发更新 → Diff → 更新真实 DOM。

### 6. 说说你对Vue生命周期的理解? 
#### 生命周期
![alt text](image-5.png)
activated keep-alive缓存的组件激活时
deactivated keep-alive缓存的组件停用时

#### 阶段
1. 创建阶段（Creation）（set up）
   1. beforeCreate：实例初始化，还没有 data 和 methods。
   2. created：数据观测完成，可以访问 data 和 methods，但还没有挂载 DOM。

2. 挂载阶段（Mounting）
   1. beforeMount：编译模板完成，尚未把虚拟 DOM 挂载到页面。
   2. mounted：DOM 挂载完成，页面可见。

3. 更新阶段（Updating）
   1. beforeUpdate：数据更新时触发，DOM 还没更新。
   2. updated：数据更新并重新渲染 DOM 后触发。

4. 销毁阶段（Unmounting）
   1. beforeDestroy：实例销毁前触发，还能访问实例。
   2. destroyed：实例销毁后触发，事件解绑、子组件销毁。

#### 实际应用
1. Created、set up：初始化数据、发起Ajax请求获取后端数据
2. mounted/onMounted：初始化DOM节点，初始化第三方插件（echarts）
3. beforeUpdate & updated：监听数据变化前后，做调试或者debug
4. beforeDestroy/beforeUnmount & destroyed/onUnmount：解绑事件、清理定时器、清理资源，避免内存泄露

## 7. 为什么Vue中的v-if和v-for不建议一起用?
当v-if和v-for一起用的时候，会出现对每一项都进行v-if判断是否渲染，如果数组很大或者判断条件复杂对**性能消耗很大**，同时**逻辑会不清晰**，v-if对每一条循环项生效，而不是对整个列表生效

避免在同一个元素上面同时使用v-if和v-for
解决方式：
1. 在**外层包裹v-if**
2. 在**计算属性里面过滤数据**，避免每次循环都要进行v-if判断

## 8. SPA（单页应用）首屏加载速度慢怎么解决？
- 原因：SPA **一次性加载 大量 JS/CSS 文件**，浏览器必须下载、解析、执行 JS，才能渲染 DOM，**浏览器加载和渲染页面需要较长时间**，导致白屏或页面渲染延迟。
  
### 常见原因：
1. 资源体积大：JS/CSS文件大，网络加载速度慢
2. 渲染依赖JS：如果 JS 执行慢或阻塞渲染，白屏时间增加
3. 首次请求数据多：如果接口响应慢，页面渲染被延迟

### 解决方案：
1. 路由懒加载（按需加载组件）
   1. 首次加载只下载首页 JS，其余页面 JS 在路由访问时再加载。
2. 代码分割/Webpack按需加载：将业务逻辑拆分成多个 chunk，减少首屏 JS 体积。
``` javaScript
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```
3. 服务端渲染（SSR）
   1. 原理：先在服务器生成 HTML，浏览器直接渲染页面。（Vue2->Nuxt.js Vue3->Nuxt3/vite +SSR）
   2. 优点：首屏渲染快，SEO更友好
4. 预渲染/静态生成
   1. 对首页或固定页面做 预渲染 HTML，用户访问直接拿到静态 HTML。
   2. 常用插件：prerender-spa-plugin
   3. 适合内容静态或首屏固定的页面。

5. 资源优化
   1. 压缩 JS/CSS（Terser、CSSnano）
   2. 图片懒加载或 WebP 格式
   3. 使用 CDN 加速资源加载
6. 首屏数据优化
   1. 尽量减少首屏API请求数量
   2. 使用缓存（localStorage / sessionStorage）或服务端渲染数据

## 9. 为什么data属性是一个函数而不是一个对象？
在vue组件里面data必须是一个函数，在根实例（new vue）里面data可以是对象，因为全局只有一个根示例，不会出现数据共享

### 为什么组件中要使用函数data？
1. **组件是可以复用的**
   1. 每个组件可能会被多次创建，如果data是一个对象
   2. 所有的组件示例都会**共享同一个data**，修改一个示例的数据会导致所有示例里面的数据都会被修改
2. **函数返回对象可以保证每个实例有独立的状态**
   1. 当 data 是函数时，每个组件实例执行 data() 返回一个 独立对象：

总结：组件中的 data 必须是函数，确保每个实例有 **独立的响应式状态**，避免多实例共享同一个对象导致状态污染。

## 10. Vue中给对象添加新属性界面不刷新? 
### 问题描述
``` javaScript
data() {
  return {
    user: { name: 'Tom' }
  }
}
// 如果你在方法里这样修改对象：

this.user.age = 18
// 问题：界面不会更新，{{ user.age }} 不会显示。
```
### 原理分析
1. Vue2的响应式原理的局限性
   1. Vue2 使用 `Object.defineProperty` 来劫持对象的 **已有属性** 的 getter/setter。
   2. 限制：Vue2 只能监控对象创建时存在的属性，**新增属性不被劫持**

### 解决方案
1. Vue.set / this.$set
   ``` javaScript
   this.$set(this.user, 'age', 18)
    // 或
    Vue.set(this.user, 'age', 18)
   ```
2. Vue3不会出现这个问题了

## 11. Vue组件间通信方式都有哪些?
父子通信、跨级通信、全局通信
### 父子通信
#### 父传子
#### props
1. 子组件设置props属性，定义接收父组件传过来的参数
``` javaScript
//子组件 Children.vue
 props:{  
       // 字符串形式  
     name:String // 接收的类型参数  
     // 对象形式  
     age:{    
         type:Number, // 接收的类型为数值  
         defaule:18,  // 默认值为18  
        require:true // age属性必须传递  
     }  
 }  
```
2. 父组件在使用子组件标签中通过字面量来传递值
``` javaScript
//父组件 Father.vue
 <Children name="jack" age=18 />  
```
#### ref
在父组件中**通过 ref 获取 子组件实例**，从而可以**直接访问子组件的数据或方法**。
Vue3
``` javaScript
<!-- Parent.vue -->
<template>
  <Child ref="childComp"/>
  <button @click="callChild">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const childComp = ref(null)
const callChild = () => {
  childComp.value.sayHello()
}
</script>

<!-- Child.vue -->
<script setup>
const sayHello = () => {
  console.log('Hello from child')
}
defineExpose({ sayHello })   // 必须显式暴露，父组件才能调用
</script>

```
Vue2
``` javaScript
<!-- Parent.vue -->
<template>
  <Child ref="childComp"/>
  <button @click="callChild">调用子组件方法</button>
</template>

<script>
import Child from './Child.vue'
export default {
  components: { Child },
  methods: {
    callChild() {
      this.$refs.childComp.sayHello()
    }
  }
}
</script>

<!-- Child.vue -->
<script>
export default {
  methods: {
    sayHello() {
      console.log('Hello from child')
    }
  }
}
</script>

```
#### 子传父（$emit/emit(vue3)）
1. 子组件通过$emit触发自定义事件，$emit第二个参数为传递的数值 `this.$emit('add', good)  `
2. 父组件绑定监听器获取到子组件传递过来的参数 `<Children @add="cartAdd($event)" />  `

### 跨级通信（provide/inject）
1. 在祖先组件定义provide属性，返回传递的值`provide: { user: this.user }`
2. 在后代组件通过inject接收组件传递过来的值 `inject: ['user']`

### 全局通信（Vuex和pinia）
#### Vuex
- `state`用来存放共享变量的地方
- `getter`，可以增加一个getter派生状态，(相当于store中的计算属性），用来获得共享变量的值
- `mutations`用来存放修改state的方法。
- `actions`也是用来存放修改state的方法，不过action是在mutations的基础上进行。常用来做一些异步操作
![alt text](image-6.png)

## 12.Vue中的$nextTick有什么作用？
