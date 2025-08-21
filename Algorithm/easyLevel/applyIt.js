/**
 * 使用 apply 调用函数
 实现函数 callIt，调用之后满足如下条件
1、返回的结果为调用 fn 之后的结果
2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
 */
function callIt(fn) {
    let args = [...arguments].slice(1);
    //apply(null,[]) apply方法第一个参数，是要替代指向的对象，这里没有要替代的，写null
    return fn.apply(null, args);
}