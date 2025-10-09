const _new = function (constructor, ...args) {
    // 创建一个新对象，并将新对象的原型指向构造函数的原型
    const obj = Object.create(constructor.prototype)
    // 将新对象作为函数的this指向，并执行函数
    const result = fn.apply(obj, args)
    // 如果构造器返回的不是对象，那么就返回第一个新对象
    return result instanceof Object ? result : obj
}