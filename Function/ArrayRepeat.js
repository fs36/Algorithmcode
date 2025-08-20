/**请补全JavaScript代码，要求去除数组参数中的重复数字项并返回该数组。
注意：
1. 数组参数仅包含数字
示例
输入：_deleteRepeat([-1, 1, 2, 2])
输出：[-1, 1, 2] */
const arr = [-1, 1, 2, 2];
function _deleteRepeat(arr) {
    // return [...new Set(arr)];
    // return Array.from(new Set(arr));
    let newArr = [];
    arr.forEach(item => {
        if (newArr.indexOf(item)=== -1) newArr.push(item);
    });
    return newArr;
    
}
const result = _deleteRepeat(arr);
console.log(result); // 输出：[-1, 1, 2]