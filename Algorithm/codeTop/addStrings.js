// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
// 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

// 示例 1：
// 输入：num1 = "11", num2 = "123"
// 输出："134"
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    // i, j 指向两字符串当前正在处理的末尾索引；add 是进位
    let i = num1.length - 1,
        j = num2.length - 1,
        add = 0;
    // ans 用数组模拟结果数字（后面再反转拼串）
    const ans = [];

    // 只要任意一端还有数字，或还有进位，都要继续
    while (i >= 0 || j >= 0 || add != 0) {
        // 取当前位数字；如果越界（i<0 或 j<0），就当作 0
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;

        // 本位相加 + 上一次的进位
        const result = x + y + add;

        // 本位结果是 result % 10
        ans.push(result % 10);
        // 新的进位是 Math.floor(result / 10)
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    //reverse把数组翻转，join 会把数组里的每一项都拼成一个字符串，中间用你指定的分隔符连接
    return ans.reverse().join('');
};

console.log(addStrings("11", "123")); // "134"