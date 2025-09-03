// 请补全JavaScript代码，实现一个函数，要求如下：
// 1. 根据输入的数字范围（包括）和随机数个数生成随机数
// 2. 生成的随机数存储到数组中，返回该数组
// 示例1
// 输入：getUniqueNums(2, 10, 4)
// 输出：[4, 6, 2, 8]
const _getUniqueNums = (start, end, n) => { 
    if(n<=0 || end<start || n>(end-start+1)){
        return []
    }
    const set = new Set();
    while(set.size < n){
        const num = Math.floor(Math.random() * (end - start + 1)) + start;
        //重复的数会被自动过滤
        set.add(num);
    }
    //将其转换为数组格式返回
    return Array.from(set);
}