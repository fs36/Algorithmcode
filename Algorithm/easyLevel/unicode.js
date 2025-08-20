/*
牛客编程简单1/10：
给定一个字符串，计算字符串的长度。
如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2
输入描述：'hello world, 牛客', false
输出描述：17 
*/
const s = 'hello world, 牛客';
const bUnicode255For1 = false;
function strLength(s, bUnicode255For1) { 
    if (bUnicode255For1) {
        return strLength.length
    } else {
        let length = 0
        for (let str of s) {
            if (str.codePointAt(0) > 255) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }
}
console.log(strLength(s, bUnicode255For1)); // 输出：17