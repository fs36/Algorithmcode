// 手撕快速排序
// 给数组nums【5，2，3，1】，请将数组升序排列：【1，2，3，5】
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var quickSort = function(arr) {
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
    return [...quickSort(left), pivot, ...quickSort(right)];
};
const arr = [5, 2, 3, 1];
console.log(quickSort(arr)); // 输出: [1, 2, 3, 5]