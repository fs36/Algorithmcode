// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) { 
    const set = new Set()
    let right = 0
    let maxLength = 0
    for (let left = 0; left < s.length; left++) { 
        if (left != 0) {
            set.delete(s.charAt(left - 1))
        }
        while(right < s.length && !set.has(s.charAt(right))) { 
            set.add(s.charAt(right))
            right++
        }
        maxLength = Math.max(maxLength, right - left)
    }
    return maxLength
}
console.log(lengthOfLongestSubstring("pwwkew")); // 3