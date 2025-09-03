// 请补全JavaScript代码，要求找到参数数组中出现频次最高的数据类型，并且计算出出现的次数，要求以数组的形式返回。
// 注意：
// 1. 基本数据类型之外的任何引用数据类型皆为"object"
// 2. 当多种数据类型出现频次相同时将结果拼接在返回数组中，出现次数必须在数组的最后
// 示例1
// 输入：__findMostType([0, 0, '', ''])
// 输出：['number', 'string', 2]或['string', 'number', 2]
    
const _findMostType = array => {
    let max = 0;
    let res = [];
    let map = new Map();

    // 统计各类型数量
    for (let ele of array) {
        let type = typeof ele;
        if (map.has(type)) {
            let count = map.get(type);
            count++;
            map.set(type, count);
            max = Math.max(max, count);
        } else {
            map.set(type, 1);
        }
    }

    // 计入数量最多的类型
    let keys = map.keys();
    for (let k of keys) {
        if (map.get(k) === max) {
            res.push(k);
        }
    }

    // 最大值
    res.push(max);
    return res;
}
