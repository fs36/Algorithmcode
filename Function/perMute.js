/**请补全JavaScript代码，要求以数组的形式返回字符串参数的所有排列组合。
注意：
1. 字符串参数中的字符无重复且仅包含小写字母
2. 返回的排列组合数组不区分顺序
输入描述：
_permute('abc')
输出描述：
['abc','acb','bac','bca','cab','cba'] */
function _permute(str) {
    // 用来存放所有排列组合
    const result = [];

    // 递归回溯函数
    function backtrack(path, remaining) {
        // 当剩余字符为空时，说明一个排列完成
        if (remaining.length === 0) {
            result.push(path);
            return;
        }

        // 遍历每个字符，选择一个加入 path
        for (let i = 0; i < remaining.length; i++) {
            const newPath = path + remaining[i];
            const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
            backtrack(newPath, newRemaining);
        }
    }

    backtrack("", str);

    return result;
}

// 测试
console.log(_permute("abc"));
// 输出: ['abc','acb','bac','bca','cab','cba']
