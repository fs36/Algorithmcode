// 请补全JavaScript代码，要求以Boolean的形式返回参数数组是否为斐波那契数列。
const _isFibonacci = array => {
    if (array.length < 3 || array[0] !== 0 || array[1] !== 1) return false;
    for(let i = 2; i < array.length; i++) {
        if(array[i] !== array[i - 1] + array[i - 2]) {
            return false;
        }
    }
    return true;
}