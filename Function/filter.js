Array.prototype._filter = function (Fn) {
    if (typeof Fn !== "function") return
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        // filter 接收一个 回调函数 Fn，它会对数组的每一项执行。
        // 如果 Fn(item, index, array) 返回 true，该元素会被加入新数组。
        if (Fn(this[i], i, this)) {
            newArr.push(this[i])
        }
    }
    // 返回的新数组包含所有符合条件的元素。
    return newArr
}