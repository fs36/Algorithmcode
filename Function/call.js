Function.prototype._call = function (context, ...args) {
    // 处理 context，如果是 null/undefined 默认绑定到 window (非严格模式)
    context = (typeof context === 'object' ? context : window)

    const fnSymbol = Symbol();//创建唯一的键，避免属性名冲突
    context[fnSymbol] = this; // 临时挂载函数

    // 执行函数
    const result = context[fnSymbol](...args);

    // 删除临时属性
    delete context[fnSymbol];

    return result;
};

