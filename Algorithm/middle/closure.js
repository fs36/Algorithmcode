// 请补全JavaScript代码，要求返回一个函数，调用该函数会返回一个数字，每次调用该函数返回的数字会加1。
// 注意：
// 1. 初次调用返回值为1
const closure = () => { 
    let count = 0; // 闭包变量，保存调用次数
    return () => {
        count += 1; // 每次调用时将count加1
        return count; // 返回当前的count值
    };
}