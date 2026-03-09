
/*
1. 创建一个新对象。—— const newObject = {};
2. 将新对象的 __proto__ 属性指向构造函数的 prototype。—— newObject.__proto__ = constructor.prototype;
3. 执行构造函数中的代码（即 this 指向新对象）。
4. 如果构造函数没有显式返回对象，则返回新创建的对象。
*/
function myNew(constructor, ...args) {
  // 1. 使用 Object.create 创建一个新的对象，并将其原型链指向构造函数的 prototype
  const newObject = Object.create(constructor.prototype);

  // 2. 使用 apply 调用构造函数，将 newObject 作为 this，并传递剩余参数
  const result = constructor.apply(newObject, args);

  // 3. 如果构造函数返回的是对象，则返回构造函数返回的对象
  return result instanceof Object ? result : newObject;
}