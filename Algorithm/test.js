/*3. 最长连续序列
给定一个未排序的整数数组 nums ，
找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
示例 1：

输入：nums = [100, 4, 200, 1, 3, 2]
输出：4
解释：最长数字连续序列是[1, 2, 3, 4]。它的长度为 4。*/

function longestConsecutive(nums) { 
    const numSet = new Set(nums)
    let maxLength = 0
    for (let num of numSet) {
        if (!numSet.has(num - 1)) {
            let current = num
            let currentLength = 1
            while (numSet.has(current + 1)) {
                current++
                currentLength++
            }
            maxLength = Math.max(maxLength, currentLength)
        }
    }
    return maxLength
}
const nums = [100, 4, 200, 1, 3, 2];
const result = longestConsecutive(nums);
console.log(result);