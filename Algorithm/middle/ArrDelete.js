// 请补全JavaScript代码，该函数接受两个参数分别为数组、索引值，要求在不改变原数组的情况下返回删除了索引项的新数组。
const _delete = (array, index) => {
    // 使用 filter 过滤掉指定索引的元素
    return array.filter((_, i) => i !== index);

    // 或者使用 slice 拼接两段数组：
    // return [...array.slice(0, index), ...array.slice(index + 1)];
};
// 解释
// filter 方法
//     遍历原数组，每一项通过回调函数返回 true 的元素会保留。
//     (_, i) => i !== index 表示除了要删除的索引项，其他都保留。
// slice 方法
//     array.slice(0, index) 取删除项前面的元素。
//     array.slice(index + 1) 取删除项后面的元素。
//     用展开运算符 ...拼接成新数组，原数组不变。
// 这两种方法都不会修改原数组，符合题目要求。