/**请补全JavaScript代码，要求以键/值对的对象形式返回参数数组。要求如下：
1. 键名的数据类型为Symbol
2. 键值为当前数组项
3. Symbol的描述为当前数组项
4. 返回普通对象 */

const _symbolKey = array => {
    const obj = {};
    for (let item of array) {
        const key = Symbol(item); // 1. Symbol描述为当前数组项
        obj[key] = item;          // 2. 键值为当前数组项
    }
    return obj; // 3. 返回普通对象
};
