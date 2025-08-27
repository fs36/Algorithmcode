// Object.freeze 的作用
// 冻结对象：让对象不可被扩展、修改、删除属性。
// 冻结后的对象特性：
// 不能新增属性
// 不能删除已有属性
// 不能修改已有属性的值
// 不能重新配置属性（比如改 writable / enumerable 等）
// 原型也不能被修改(Object.setPrototypeOf 失败)。
// 冻结是 浅冻结：只冻结第一层属性，如果属性值是对象，还能被修改。

// 思路：
function _objectFreeze(obj) {
    if (typeof obj !== "object" || obj === null) {
        throw new TypeError("Object.freeze can only be called on objects");
    }

    // 遍历对象自身属性
    Object.getOwnPropertyNames(obj).forEach(key => {
        // 使用 Object.defineProperty 把所有属性的 writable = false、configurable = false。
        //defineProperty() 方法会返回被定义属性的对象。用来重新定义对象 obj 的某个属性的特性。
        Object.defineProperty(obj, key, {
            value: obj[key],
            writable: false,// 不能修改值
            configurable: false,// 不能删除属性，不能重新配置属性
        });

    });

    // 禁止扩展新属性
    Object.preventExtensions(obj);
    // 返回这个冻结的对象。
    return obj;
}