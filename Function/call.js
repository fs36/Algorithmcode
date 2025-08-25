Function.prototype._call = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('myCall must be called on a function');
    }

    // 处理 context，如果是 null/undefined 默认绑定到 window (非严格模式)
    context = (typeof context === 'object' ? context : window)

    // 临时挂载函数
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;

    // 执行函数
    const result = context[fnSymbol](...args);

    // 删除临时属性
    delete context[fnSymbol];

    return result;
};

