/**给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false
输入描述：
'rattler'
输出描述：
true */
// 循环遍历检查
function containsRepeatingLetter(str) {
    let n = str.length
    for (let i = 1; i < n; i++)
        if (str[i] == str[i - 1] && ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')))
            return true
    return false
}

// 正则表达式
function containsRepeatingLetter(str) {
    return /([a-zA-Z])\1/.test(str)
}