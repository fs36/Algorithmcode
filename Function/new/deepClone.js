//深拷贝
//json方法实现,有局限：函数会丢失，日期对象变成字符串，正则对象变成空对象，循环引用会报错
const obj2 = { a: 1, b: { c: 2 }, d: new Date() };
const copy3 = JSON.parse(JSON.stringify(obj2));
console.log(copy3);

// 手写实现
function deepClone(obj, map = new WeakMap()) {
  // 如果是基本类型，直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用：使用 WeakMap 来缓存已经拷贝的对象
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理 Date 类型
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理 RegExp 类型
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 处理 Set 类型
  if (obj instanceof Set) {
    const cloneSet = new Set();
    map.set(obj, cloneSet); // 缓存 Set
    obj.forEach(value => {
      cloneSet.add(deepClone(value, map)); // 深拷贝 Set 中的每个元素
    });
    return cloneSet;
  }

  // 处理 Map 类型
  if (obj instanceof Map) {
    const cloneMap = new Map();
    map.set(obj, cloneMap); // 缓存 Map
    obj.forEach((value, key) => {
      cloneMap.set(key, deepClone(value, map)); // 深拷贝 Map 中的每个元素
    });
    return cloneMap;
  }

  // 处理普通对象或数组
  const cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj); // 缓存对象或数组

  Object.keys(obj).forEach(key => {
    cloneObj[key] = deepClone(obj[key], map); // 递归深拷贝每个属性
  });

  return cloneObj;
}

// 示例
const obj = {
  num: 1,
  str: 'hello',
  arr: [1, 2, 3],
  date: new Date(),
  reg: /abc/,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  circular: null,
};

obj.circular = obj; // 循环引用

const clonedObj = deepClone(obj);

console.log(clonedObj);
console.log(clonedObj.circular === clonedObj); // true，循环引用被正确处理
console.log(clonedObj.date instanceof Date); // true，Date 类型正确拷贝
console.log(clonedObj.map instanceof Map); // true，Map 类型正确拷贝
console.log(clonedObj.set instanceof Set); // true，Set 类型正确拷贝

// 为什么使用 WeakMap ？

// 避免循环引用：WeakMap 在深拷贝时用于存储已经拷贝过的对象，可以避免重复拷贝，也能处理循环引用的问题。

// 防止内存泄漏：WeakMap 的弱引用特性意味着垃圾回收器可以正常回收不再使用的对象，避免了 Map 中的强引用导致的内存泄漏问题。