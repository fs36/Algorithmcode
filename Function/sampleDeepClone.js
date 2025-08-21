/**请补全JavaScript代码，要求实现对象参数的深拷贝并返回拷贝之后的新对象。
注意：
1. 参数对象和参数对象的每个数据项的数据类型范围仅在数组、普通对象（{}）、基本数据类型中]
2. 无需考虑循环引用问题 */
const _sampleDeepClone = target => {
    // return JSON.parse(JSON.stringify(target));

    // 基本类型直接返回
    if (target === null || typeof target !== 'object') {
        return target;
    }

    // 数组处理
    if (Array.isArray(target)) {
        const newArr = [];
        for (let i = 0; i < target.length; i++) {
            newArr[i] = _sampleDeepClone(target[i]); // 递归拷贝每个元素
        }
        return newArr;
    }

    // 普通对象处理
    const newObj = {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            newObj[key] = _sampleDeepClone(target[key]); // 递归拷贝每个属性
        }
    }
    return newObj;
};

// const _sampleDeepClone = target => {
//     if (typeof target === 'object' && target !== null) {
//         const cloneTarget = Array.isArray(target) ? [] : {}
//         for (prop in target) {
//             if (target.hasOwnProperty(prop)) {
//                 cloneTarget[prop] = _sampleDeepClone(target[prop])
//             }
//         }
//         return cloneTarget
//     } else {
//         return target
//     }
// }
