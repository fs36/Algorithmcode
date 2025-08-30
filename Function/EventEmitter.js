/**完成"EventEmitter"类实现发布订阅模式。
注意：
1. 同一名称事件可能有多个不同的执行函数
2. 通过"on"函数添加事件
3. 通过"emit"函数触发事件 */
class EventEmitter {
    constructor() {
        this.events = {}; // 用于存储事件及其对应的回调函数
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []; // 如果事件不存在，则创建一个新的数组
        }
        this.events[eventName].push(callback); // 将回调函数添加到事件对应的数组中
    }
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(...args); // 触发事件时，调用所有注册的回调函数，并传递参数
            });
        }
    }
}