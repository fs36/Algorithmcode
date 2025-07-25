/*双指针-移动零
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。
示例 1:

输入: nums = [0, 1, 0, 3, 12]
输出: [1, 3, 12, 0, 0]*/

function moveZeros(nums) {
    // 当前可以放非零元素的位置
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            // 如果fast指向的元素不是0，就把它放到slow指向的位置
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}

const nums = [0, 1, 0, 3, 12];
moveZeros(nums);
console.log(nums); // 输出: [1, 3, 12, 0, 0]