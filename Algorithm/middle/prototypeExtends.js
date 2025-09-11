// 请补全JavaScript代码，实现以下功能：
// 1. 给"Human"构造函数的原型对象添加"getName"方法，返回当前实例"name"属性
// 2. 将"Chinese"构造函数继承于"Human"构造函数
// 3. 给"Chinese"构造函数的原型对象添加"getAge"方法，返回当前实例"age"属性
function Human(name) {
    this.name = name;
    this.kingdom = 'animal';
    this.color = ['green', 'white', 'brown', 'black'];
}

// 1. 给Human原型添加getName方法
Human.prototype.getName = function () {
    return this.name;
};

function Chinese(name, age) {
    Human.call(this, name);
    this.age = age;
    this.color = 'green';
}

// 2. 实现Chinese对Human的继承
Chinese.prototype = Object.create(Human.prototype);
// 修复构造函数指向
Chinese.prototype.constructor = Chinese;

// 3. 给Chinese原型添加getAge方法
Chinese.prototype.getAge = function () {
    return this.age;
};