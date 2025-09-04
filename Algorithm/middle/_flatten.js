// 请补全JavaScript代码，要求将数组参数中的多维数组扩展为一维数组并返回该数组。
// 注意: 1. 数组参数中仅包含数组类型和数字类型
// 输入描述: [1, [2, [3, [4]]]]
// 输出描述：[1, 2, 3, 4]
let result = [];
const _flatten = arr => { 
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            _flatten(arr[i]);
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}