// 请补全JavaScript代码，要求以字符串的形式返回文件名扩展名，文件名参数为"filename"。
const _getExFilename = (filename) => {
    let index = filename.lastIndexOf('.');
    if (index === -1 || index === filename.length - 1) {
        return ''; // 没有扩展名或最后一个字符是"."
    }
    return filename.slice(index);
}
console.log(_getExFilename('example.txt')); // 输出: 'txt'