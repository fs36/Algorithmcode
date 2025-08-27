// 实现思路：
function _objectCreate(proto) {
    // 1. 检查参数是否为对象或 null。
    if(typeof proto !== "object" || proto === null) {
        throw new TypeError("Object prototype may only be an Object or null");
    }
    // 2. 创建一个空的构造函数 F。
    function F() { }
    // 3. 把传入的 proto 赋值给 F.prototype。
    F.prototype = proto
    // 4. return new F()，即返回一个以 proto 为原型的对象。
    return new F()
 }