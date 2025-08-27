Array.prototype._map = function (Fn) {    
    if (typeof Fn !== "function") {
        throw new TypeError(Fn + " is not a function");
    }
    let newArr = []
    // 遍历数组。
    for (let i = 0; i < this.length; i++) {
        // 每一项执行回调函数 callback(item, index, array)。map要求回调函数必须有三个参数。
        // 收集回调返回值到一个新数组。
        newArr.push(Fn(this[i], i, this))
    }
    // 返回这个新数组。
    return newArr
}