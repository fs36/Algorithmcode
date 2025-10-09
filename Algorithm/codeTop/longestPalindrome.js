// 给你一个字符串 s，找到 s 中最长的 回文 子串。

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s
    let start = 0, maxLen = 1
    // 中心扩展法
    const expandAroundCenter = (left, right) => {
        // 向两边扩展，只要字符相等就继续扩展
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        // 计算当前回文子串长度，并更新最大长度和起始位置
        // 此时s[left+1……right-1] 是回文串
        if (right - left - 1 > maxLen) {
            start = left + 1
            maxLen = right - left - 1
        }
    }
    // 遍历字符串的每个字符，尝试以它为中心扩散
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i) // 奇数长度回文
        expandAroundCenter(i, i + 1) // 偶数长度回文
    }

    return s.substring(start, start + maxLen)
}