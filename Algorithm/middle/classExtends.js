// 请补全JavaScript代码，完成类的继承。要求如下：
// 1. "Chinese"类继承于"Human"类
// 2. "Human"类实现一个函数"getName"，返回该实例的"name"属性
// 3. "Chinese"类构造函数有两个参数，分别为"name"、"age"
// 4. "Chinese"类实现一个函数"getAge"，返回该实例的"age"属性
class Human {
    constructor(name) {
        this.name = name
        this.kingdom = 'animal'
        this.color = ['yellow', 'white', 'brown', 'black']
    }
    // 补全代码
    getName() {
        return this.name
    }
}

// 补全代码
class Chinese extends Human {
    constructor(name, age) {
        super(name)
        this.age = age
    }
    getAge() {
        return this.age
    }
}