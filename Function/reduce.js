// reduce 会遍历数组，并把 上一次回调的返回值(accumulator) 作为参数传入下一次。
Array.prototype._reduce = function (Fn, initialValue) {
    if(typeof Fn !== "function") {
        throw new TypeError(Fn + " is not a function");
    }
    let hasInitialValue = arguments.length > 1; // 是否提供了 initialValue
    let accumulator = hasInitialValue ? initialValue : this[0]; // 初始化 accumulator
    // 如果提供了 initialValue，第一次循环时 accumulator = initialValue，否则 accumulator = arr[0]，循环从第二个元素开始。
    let startIndex = hasInitialValue ? 0 : 1; // 循环起始索引,有初始值，accumulator 就是初始值，从索引0开始；没有初始值，accumulator 就是数组第一个元素a[0]，从索引1开始遍历叠加。
    for (let i = startIndex; i < this.length; i++) {
        // 回调函数的参数：accumulator（上一次的返回值）、currentValue（当前元素）、currentIndex（索引）、array（原数组）
        accumulator = Fn(accumulator, this[i], i, this); // 每次循环，调用回调函数，并更新 accumulator
    }
    return accumulator; // 返回最终的 accumulator
 }