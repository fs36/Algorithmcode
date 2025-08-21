/**请补全JavaScript代码，要求实现一个对象参数的浅拷贝并返回拷贝之后的新对象。
注意：
1. 参数可能包含函数、正则、日期、ES6新对象 */
const _shallowClone = target => {
    // 基本类型直接返回
    if (target === null || typeof target !== "object") return target;

    // 日期
    if (target instanceof Date) return new Date(target.getTime());

    // 正则
    if (target instanceof RegExp) return new RegExp(target.source, target.flags);

    // Map
    if (target instanceof Map) return new Map(target);

    // Set
    if (target instanceof Set) return new Set(target);

    // 函数直接返回引用
    if (typeof target === "function") return target;

    // 数组或普通对象
    const newObj = Array.isArray(target) ? [] : {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            newObj[key] = target[key]; // 浅拷贝：只拷贝引用
        }
    }
    return newObj;
};

// const _shallowClone = target => {
//     if (typeof target === 'object' && target !== null) {
//         const constructor = target.constructor
//         if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return target
//         const cloneTarget = Array.isArray(target) ? [] : {}
//         for (prop in target) {
//             if (target.hasOwnProperty(prop)) {
//                 cloneTarget[prop] = target[prop]
//             }
//         }
//         return cloneTarget
//     } else {
//         return target
//     }
// }
