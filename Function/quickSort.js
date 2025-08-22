/**请补全JavaScript代码，要求将数组参数中的数字从小到大进行排序并返回该数组。
注意：
1. 数组元素仅包含数字
2. 请优先使用快速排序方法
输入描述：
_quickSort([0,-1,1,-2,2])
输出描述：
[-2,-1,0,1,2] */
const _quickSort = arr => {
    if (arr.length <= 1) return arr; // 递归终止条件：空数组或单元素数组

    // 选择基准值，这里选中间位置
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    // 小于基准的元素
    const left = [];
    // 大于基准的元素
    const right = [];

    // 遍历数组，分区
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // 跳过基准值
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // 递归排序左右两部分，并合并结果
    return [..._quickSort(left), pivot, ..._quickSort(right)];
}
const arr = [0, -1, 1, -2, 2];
console.log(_quickSort(arr)); // 输出: [-2, -1, 0, 1, 2]