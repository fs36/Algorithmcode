/**给定字符串 str，检查其是否包含 连续3个数字
1、如果包含，返回最先出现的 3 个数字的字符串
2、如果不包含，返回 false
输入描述：
'9876543'
输出描述：
987 */
//  正则表达式
function captureThreeNumber(str) { 
    const match = str.match(/\d{3}/);
    return match ? match[0] : false;
}
//  循环遍历
function captureThreeNumber(str) {
    let count = 0;
    let temp = "";

    for (let i = 0; i < str.length; i++) {
        let ch = str[i];

        if (ch >= '0' && ch <= '9') { // 判断是否为数字
            count++;
            temp += ch;

            if (count === 3) {
                return temp;
            }
        } else {
            count = 0;
            temp = "";
        }
    }

    return false;
}