// css 中经常有类似 background - image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
// 1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
// 2. - webkit - border - image 转换后的结果为 webkitBorderImage
// 样例：
// 输入：’font - size‘
// 输出：’fontSize‘
function cssStyle2DomStyle(sName) {
    let parts = sName.split('-');
    if (parts[0] === '') parts.shift();
    let name = ''
    parts.forEach((word, index) => {
        if (index === 0) {
            name +=word
        } else {
            name +=word.charAt(0).toUpperCase() + word.slice(1)
        }
    });
    return name
 }