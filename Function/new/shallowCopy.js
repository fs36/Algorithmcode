//浅拷贝
//原生方法实现
const obj = { a: 1, b: { c: 2 } };
const copy1 = Object.assign({}, obj);
const copy2 = { ...obj };
//手写实现
function shallowCopy(value) {
// 1. 基本数据类型（字符串、数字、布尔值）直接返回
  if (value === null || value === undefined || typeof value !== 'object') {
    return value;
  }

  // 2. 处理数组
  if (Array.isArray(value)) {
    return value.slice(); // 使用 slice 返回新数组，拷贝浅层元素
  }
  // 3. 处理对象
  if (typeof value === 'object') {
    const newObj = {};
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        newObj[key] = value[key]; // 只是拷贝引用类型的引用
      }
    }
    return newObj;
  }
   // 4. 处理 Map
  if (value instanceof Map) {
    const newMap = new Map();
    value.forEach((val, key) => {
      newMap.set(key, val); // 拷贝 Map 中的键值对
    });
    return newMap;
  }

  // 5. 处理 Set
  if (value instanceof Set) {
    return new Set(value); // 使用 Set 构造函数拷贝 Set
  }

  // 6. 处理 Date
  if (value instanceof Date) {
    return new Date(value); // 拷贝日期对象
  }
}
//测试输出
console.log(shallowCopy(obj));