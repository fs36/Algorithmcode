24. Vue2 和Vue3 的区别
1. 响应式的区别
  1. Vue2
    1. 使用Object.defineProperty来实现响应式，通过遍历每个属性，递归defineProperty实现数据劫持
    2. 有限制：不能检测属性的增加和删除，无法直接处理数组索引和长度的变化。
  2. Vue3
    1. 使用Proxy来实现响应式，能够拦截对象的任何属性的读取和写入操作。
  3. 两者对数组进行数据劫持的区别——Vue2无法监听数组索引和长度的变化
    1. Vue2对数组进行数据劫持的逻辑：重写方法+打补丁，是重写数组的7个方法（push、pop、splice、shift、unshift、sort、reverse）
    2. 不能监听数组下标的原因：没有使用Object.defineProperty，因为当数组长度增加的话性能消耗大，会导致框架的性能不稳定，所有提供了set方法来操作数组，保证框架的性能稳定，
2. 组合式API
  1. Vue2使用选项式API（data、methods等）进行组件的逻辑组织，Vue3使用组合式API（ref、reactive、computed等）
3. Vue3 提供更好的TS支持
4. 静态元素提升
  1. Vue2中，模版中的所有元素在每次重新渲染的时候都会创建新的虚拟节点，包括静态元素
  2. Vue3引入静态元素提升的概念，在编译模版的时候，Vue3会检测出静态内容并将其提升，意味着内容在初次渲染的时候创建了一次，后续渲染过程中，静态内容会被重用，减少了渲染开销并提升了性能
5. 虚拟节点静态标记
  1. Vue2 在更新组件的时候，会进行比较全面的虚拟DOM比较，会导致性能开销
  2. Vue3 引入了Patch Flag，在编译时标记虚拟节点的动态部分，在组件更新时，只关注被标记的部分，而不是整个组件树，提升了性能
6. 生命周期变化
7. 打包体积优化
  1. Vue3 使用Tree-shaking机制，允许去除未使用的代码部分，打包体积减少。
25. Vue3为什么要用Proxy替换Object.defineProperty
目的：提供更好的响应性和提高性能
1. Object.defineProperty只能对已经存在的属性进行劫持，无法拦截新增和删除的属性。当添加和删除属性的时候，需要使用特定的方法（set、delete）来通知Vue响应式系统进行更新，限制了开发的复杂性
2. Object.defineProperty的劫持是基于属性级别的，也就是说每个属性都需要被劫持。对于大规模的对象或者数组来说，会导致性能下降。因为每个属性都需要添加劫持逻辑，会增加内存消耗和初始化时间
3. Proxy可以对整个对象进行拦截和代理，提供了更强大和灵活的拦截能力，可以拦截对象的读取、赋值、删除等操作，能拦截新增和删除属性的操作，更方便地实现了响应式系统
4. Proxy解决Object.defineProperty的限制问题。无需在每个属性上进行劫持，消除了属性级别的劫持开销，提高了性能
26. Proxy 的底层原理
1. Proxy 是 ES6 引入的一个 元编程（Meta-Programming）特性，它允许你创建一个对象的“代理”，在访问或操作原对象时，可以通过 拦截器（handler） 定制行为。
2. 语法示例
// 示例
const target = { name: "Alice" };
const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`访问属性: ${prop}`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(`修改属性: ${prop} -> ${value}`);
    obj[prop] = value;
    return true;
  }
});

console.log(proxy.name); // 触发 get
proxy.name = "Bob";      // 触发 set
3. 底层原理：
  Proxy 并不是普通对象，而是 一个内置对象，它内部有两个关键部分：
  1. Target（目标对象）
    - Proxy 代理的真实对象
    - 所有的读取/写入/调用最终都会映射到 target 上（除非被拦截器改变行为）
  2. Handler（拦截器）
    - 定义一组 trap（捕获器）
    - Trap 可以拦截操作，例如：
      - get：读取属性
      - set：写入属性
      - has：in 操作
      - deleteProperty：delete 操作
      - apply：函数调用
      - construct：构造函数调用
4. 工作流程：
  1. 接收到对象访问请求
  2. 检查对象是不是 Proxy，是查找handler里面对应的trap，定义了trap调用定义的，没有就访问默认的
  3. 返回结果
27. nextTick
  1. 作用：在 下次 DOM 更新循环结束之后执行延迟回调。在数据更新并且DOM渲染完成之后拿到最新的DOM状态
  2. Vue3和Vue2的nextTick区别
    1. Vue2
      1. 全局 API：Vue.nextTick(cb)
      2. 实例方法：this.$nextTick(cb)
    2. Vue3
      1. 从Vue包中导入的函数：import { nextTick } from 'vue'
      2. 支持 await，可用 Promise 写法：await nextTick()
  3. nextTick的原理
    1. Vue的更新机制
      1. 修改data或state的时候，Vue不会立即更新DOM，而是先把这个更新任务放进一个更新队列，等到本轮事件循环结束，统一批量的更新DOM
      2. 目的：避免频繁修改DOM（性能消耗大）；保证数据变化的顺序性
    2. nextTick的实现原理
      1. 调用this.$nextTick(callback)时，会讲callback函数存储在一个队列中，以便稍后执行
      2. 检查当前是否在DOM更新周期
        1. 是，会将callback函数推到专门用于在更新周期结束后执行的队列中
        2. 不是，用Promise或者MutationObserver来创建一个微任务，确保callback会在下一次DOM更新周期之前执行
      3. 确保nextTick（callback）会在DOM更新完成之后执行
28. Vue3 中ref和reactive的区别
两者都是Vue3响应式的API
ref 和 reactive 的使用区别
暂时无法在飞书文档外展示此内容
29. ref=“组件名”的作用
1. 作用：在 JavaScript 中直接访问 DOM 元素或子组件实例
2. Vue2 
  1. 用法：在模板中绑定到一个 DOM 元素（获取DOM元素）或组件（获取子组件实例，调用组件内容的methods或data）上，绑定后，就可以在组件的实例中通过：this.$refs.xxx访问它
3. Vue3
  1. 用法：ref()定义一个响应式引用，ref必须在组件挂载后才能访问到，通过 const xxx = ref(null) + xxx.value 获取
30. keep-alive（组件缓存机制）
1. 定义：是 Vue 提供的一个内置组件，用于缓存被包裹的组件实例，从而避免重复创建和销毁。
2. 出现的原因：Vue 在组件切换的时候会销毁、新建、重新执行生命周期，导致数据状态丢失、初始化开销大
3. 缓存逻辑
  当组件第一次被渲染：
    1. Vue 创建组件实例；
    2. 将实例缓存到 cache 中；（map）
    3. 当该组件再次被显示时，不重新创建，而是直接从缓存中取出；
    4. 隐藏时只是切换 vnode.el.style.display = none，不会销毁。
4. 生命周期变化：会出现 activated（被重新显示时触发，即从缓存取出），deactivated（被隐藏时，即进入缓存）
5. 优点：提升切换性能、保留组件状态、提升交互体验
6. 使用时机：频繁切换的页面或组件（Tab 切换、列表详情页返回）、不希望数据重置的页面（表单填写）
7. 不建议使用：体积大、数据动态的页面；会频繁变化或依赖实时数据的页面。
31. Vuex 和 Pinia 的区别
1. 状态定义
  - state（数据源）
  - mutations（同步更新状态）
  - actions（异步，pinia没有mutations，可以在actions同步或异步更新状态）
  - getters（计算属性）
  - modules（模块化管理，pinia没有）
  1. vuex：单一全局 Store，通过模块分割
  2. pinia：多个store
2. TS 支持
  1. Vuex 要手动去声明类型
  2. pinia：直接支持，开箱即用
3. 模块化方式
  1. Vuex 嵌套模块
// 嵌套结构，可能复杂
const store = createStore({
  modules: {
    user: {
      namespaced: true,
      state: () => ({ name: '' }),
      mutations: { /* ... */ }
    },
    cart: {
      namespaced: true,
      state: () => ({ items: [] }),
      mutations: { /* ... */ }
    }
  }
})
  2. Pinia 扁平化设计，每个store都是独立的
// 每个 store 都是独立的
const useUserStore = defineStore('user', {
  state: () => ({ name: '' })
})

const useCartStore = defineStore('cart', {
  state: () => ({ items: [] })
})
从 Vuex 迁移到 Pinia 的优势
1. 更少的样板代码
2. 更好的 TypeScript 体验
3. 更直观的 API
4. 更好的组合式 API 集成
5. 更小的包体积