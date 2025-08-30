// 要求在Number对象的原型对象上添加"_isPrime"函数，该函数判断调用的对象是否为一个质数，是则返回true，否则返回false。
Number.prototype._isPrime = function () {
    const num = this.valueOf(); // 获取调用对象的原始数值
    if (num < 2) return false;  // 小于2不是质数
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false; // 能整除则不是质数
    }
    return true;
}
