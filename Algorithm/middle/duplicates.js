// 描述:找出数组 arr 中重复出现过的元素（不用考虑返回顺序）
// 输入描述：[1, 2, 4, 4, 3, 3, 1, 5, 3]
// 输出描述：[1, 3, 4]
function duplicates(arr) {
    let map = new Map();
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1);
            // 第2次出现时加入结果数组
            if (map.get(arr[i]) === 2) {
                result.push(arr[i]);
            }
        } else {
            map.set(arr[i], 1);
        }
    }
    return result;
}