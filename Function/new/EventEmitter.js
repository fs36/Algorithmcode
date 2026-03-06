/**
 * 题目：

实现一个发布订阅模式的订阅管理器，包含以下功能：

on(event, listener)：用于订阅事件 event，当事件触发时执行 listener。
emit(event, data)：用于触发事件 event，并传递数据 data 给所有订阅了该事件的监听器。
off(event, listener)：用于取消订阅某个事件的监听器。
once(event, listener)：用于订阅一个只能触发一次的事件，触发一次后自动取消订阅。
 */
class EventEmitter {
  // 构造函数 创建对象时自动执行一次
  constructor() {
    this.events = {}; // 存储事件和对应的订阅者 error
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener); // error: push，可能一个事件有多个listener
  }

  // 触发事件
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }

  // 取消订阅某个事件
  off(event, listener) {
    if (!this.events[event]) return; // error: 没有该事件的订阅者
    this.events[event] = this.events[event].filter(fn => fn !== listener); //error: filter返回一个新数组，不能直接修改原数组
  }

  // 只执行一次的订阅
  once(event, listener) {
    const onceWrapper = (data) => { // error：data参数，传递给listener
      listener(data);
      this.off(event, onceWrapper); // 执行完后自动移除监听
    };

    this.on(event, onceWrapper); // error：使用on方法订阅事件，传入包装函数onceWrapper，而不是直接传入listener，这样才能在触发事件时正确调用listener，并且在执行完后自动取消订阅。
  }
}

// 示例使用
const emitter = new EventEmitter();

// 订阅事件
function onFoo(data) {
  console.log('onFoo received:', data);
}
emitter.on('foo', onFoo);

// 触发事件
emitter.emit('foo', { message: 'Hello World' });

// 取消订阅
emitter.off('foo', onFoo);

// 触发事件，已经取消订阅，监听器不会被触发
emitter.emit('foo', { message: 'This will not be logged' });

// 只执行一次的订阅
emitter.once('foo', (data) => {
  console.log('once received:', data);
});
emitter.emit('foo', { message: 'This will log once' });
emitter.emit('foo', { message: 'This will not log' });