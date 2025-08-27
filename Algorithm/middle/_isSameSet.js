// 要求以Boolean的形式返回两个Set对象参数是否一样，是则返回true，否则返回false。
function _isSameSet(s1, s2) {
    //判断长度
    if (s1.size !== s2.size) return false;
    
    //通过ES6[...]扩展字符将set对象的伪数组转换为数组
    // 再调用every进而判断该数组中的每一项是否存在于另一个set对象中
    //扩展符+遍历+every+has
    return [...s1]._every(item => s2.has(item));

    //循环遍历
    // for (let item of s1) {
    //     if (!s2.has(item)) return false;
    // }
    // return true;
}