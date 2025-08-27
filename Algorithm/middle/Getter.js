// 请补全JavaScript代码，完成名为"Rectangle"的矩形类。要求如下：
// 1. 构造函数只包含两个参数，依次为"height"、"width"
// 2. 设置Getter(即把方法当做属性用的语法糖)，当获取该对象的"area"属性时，返回该对象"height"与"width"属性的乘积
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter 方法，用于获取 area 属性
    get area() {
        return this.height * this.width; // 返回 height 和 width 的乘积
    }
}