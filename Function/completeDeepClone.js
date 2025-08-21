/**请补全JavaScript代码，要求实现对象参数的深拷贝并返回拷贝之后的新对象。 注意： 1. 需要考虑函数、正则、日期、ES6新对象 2. 需要考虑循环引用问题 */

const _completeDeepClone = (target, map = new Map()) => {
    // 1. 基本类型或 null 直接返回
    if (target === null || typeof target !== 'object') return target;

    // 2. 处理特殊对象
    let constructor = target.constructor;
    if(/^(Date|RegExp)$/i.test(constructor.name)) return new constructor(target); // 处理 Date 和 RegExp
    if (target instanceof Function) return target; // 函数直接返回引用
    if (target instanceof Map) return new Map(Array.from(target.entries()).map(([k, v]) => [_completeDeepClone(k, map), _completeDeepClone(v, map)]));
    if (target instanceof Set) return new Set(Array.from(target).map(item => _completeDeepClone(item, map)));

    // 3. 循环引用检查
    if (map.has(target)) return map.get(target);

    // 4. 创建新对象或数组
    const cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget); // 先存入 map，解决循环引用

    // 5. 遍历属性递归深拷贝
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            cloneTarget[key] = _completeDeepClone(target[key], map);
        }
    }

    return cloneTarget;
};

