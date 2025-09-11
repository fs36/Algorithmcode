// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const path = [];
    const used = new Array(nums.length).fill(false);
    function backtrack() {
        if(path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for(let i = 0; i < nums.length; i++) {
            if(used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            backtrack();
            path.pop();
            used[i] = false;
        }
    }
    backtrack();
    return res;
};

console.log(permute([1,2,3]));