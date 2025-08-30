// _searchStrIndexOf该函数接受两个参数分别为字符串、子字符串，要求返回子字符串在字符串中出现的频次。
function _searchStrIndexOf(str, target) {
    let index = str.indexOf(target);
    let sum = 0
    while (index > -1) {
        index = str.indexOf(target, index + target.length);
        sum++
    }
    return true
}