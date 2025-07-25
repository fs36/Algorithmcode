// leetcode100 1.两数之和使用哈希map，注意谁是key谁是value 
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 找出nums里面和为target的两个数，并返回其数组下标
const nums = [2,7,11,15], target = 9
function twoSum(nums,target){
    const map = new Map()
    for(let i=0;i<nums.length;i++){
        if(map.has(target-nums[i])){
            return [i,map.get(target-nums[i])]
        }
        map.set(nums[i],i)
    }
}
const result = twoSum(nums,target)
console.log(result)