const _instanceof = function (target, fn) {
    //获取首个对象参数的原型对象
    let proto = Object.getPrototypeOf(target)
    // let proto = target.__proto__
    while (true) {
        //进入死循环，当两个参数的原型对象不相等时获取首个对象参数原型的原型,并且循环该步骤直到null时返回false
        if (proto === null) return false
        //当两个参数的原型对象相等时返回true
        if (proto === fn.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
    
}