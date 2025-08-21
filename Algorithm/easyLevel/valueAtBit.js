/**获取数字 num 二进制形式第 bit 位的值。注意：
1、bit 从 1 开始
2、返回 0 或 1
3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1 */
function valueAtBit(num, bit) { 
    const binaryStr = num.toString(2); // 将数字转换为二进制字符串
    return binaryStr[binaryStr.length - bit]
}

//将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。
function toBinaryString(num) {
    let binaryStr = num.toString(2);
    return binaryStr.padStart(8,'0')
}