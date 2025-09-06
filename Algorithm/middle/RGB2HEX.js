// 将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
// 1. rgb 中每个, 后面的空格数量不固定
// 2. 十六进制表达式使用六位小写字母
// 3. 如果输入不符合 rgb 格式，返回原始输入
// 样例：
// 输入：'rgb(255, 255, 255) '
// 输出：'#ffffff'

function rgb2hex(sRGB) {
    let list = sRGB.match(/\d+/g); // 只取数字
    if (!list || list.length !== 3) return sRGB;

    let res = '#';
    for (let i = 0; i < 3; i++) {
        let num = Number(list[i]);
        if (num < 0 || num > 255) return sRGB; // 校验合法范围
        if (num === 0) {
            res += '00'
        } else {
            res += num.toString(16);
        }
    }
    return res.toLowerCase();
}