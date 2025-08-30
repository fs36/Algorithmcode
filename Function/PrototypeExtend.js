// 请补全JavaScript代码，要求通过寄生组合式继承使"Chinese"构造函数继承于"Human"构造函数。要求如下：
// 1. 给"Human"构造函数的原型上添加"getName"函数，该函数返回调用该函数对象的"name"属性
// 2. 给"Chinese"构造函数的原型上添加"getAge"函数，该函数返回调用该函数对象的"age"属性

// 补全代码
function Human(name) {
    this.name = name
    this.kingdom = 'animal'
    this.color = ['yellow', 'white', 'brown', 'black']
}

function Chinese(name, age) {
    // 继承父类实例属性
    Human.call(this, name)
    // 子类实例属性
    this.age = age
    this.color = 'yellow'
}
// 1.在"Human"构造函数的原型上添加"getName"函数
Human.prototype.getName = function () {
    return this.name
}

// 关键：寄生组合式继承
Chinese.prototype = Object.create(Human.prototype); // 继承父类原型方法,（能调用 getName)
Chinese.prototype.constructor = Chinese; // 修正 constructor 指向,保持类关系正确

// 2.在"Chinese"构造函数的原型上添加"getAge"函数
// 应该先建立继承关系，再添加 getAge;先添加 getAge 会被覆盖
Chinese.prototype.getAge = function () {
    return this.age
}
