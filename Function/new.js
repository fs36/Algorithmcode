const _new = function () {
    // 创建一个新对象
    const obj = {}
    // 获取函数参数
    const fn = [...arguments].shift()
    // 将新对象的原型对象和函数参数的原型连接起来
    obj.__proto__ = fn.prototype
    // 将新对象作为函数的this指向，并执行函数
    const result = fn.apply(obj, arguments)
    // 如果构造器返回的不是对象，那么就返回第一个新对象
    return result instanceof Object ? result : obj
}