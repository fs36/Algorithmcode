/*将有序数组转换为二叉搜索树
给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。
// 平衡 二叉树 是指一个二叉树每个节点 的左右两个子树 的高度差的绝对值不超过 1 。
示例 1：
输入：nums = [-10, -3, 0, 5, 9]
输出：[0, -3, 9, -10, null, 5]
解释：[0, -10, 5, null, -3, null, 9] 也将被视为正确答案：

示例 2：
输入：nums = [1, 3]
输出：[3, 1]
解释：[1, null, 3] 和[3, 1] 都是高度平衡二叉搜索树。*/
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function sortedArrayToBST(nums) { 
    // 第一种递归方式，直接使用数组的中间元素作为根节点
    let mid = Math.floor(nums.length / 2);

    // 递归的终止条件是数组为空或只有一个元素
    if (nums.length === 0) return null; // 如果数组为空，返回null
    if (nums.length === 1) return new TreeNode(nums[0]); // 如果数组只有一个元素，返回该元素的节点
    
    // 创建根节点
    const root = new TreeNode(nums[mid]);
    
    // 递归构建左子树和右子树
    root.left = sortedArrayToBST(nums.slice(0, mid)); // 提取左半部分
    root.right = sortedArrayToBST(nums.slice(mid + 1)); // 右半部分

    return root;
    
    // 下面是另一种递归方式，使用索引范围来构建树
    // function buildBST(left, right) {
    //     if (left > right) return null
        
    //     const mid = Math.floor((left + right) / 2);
    //     const root = new TreeNode(nums[mid]);

    //     root.left = buildBST(left, mid - 1);
    //     root.right = buildBST(mid + 1, right);

    //     return root
    // }
    // return buildBST(0, nums.length - 1);
}

//辅助函数，树变数组
function TreeToArray(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null); // 如果节点为空，添加null
        }
    }
    
    // 去除末尾的null
    while (result.length && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
}

// 测试代码
const nums = [-10, -3, 0, 5, 9]
const bstRoot = sortedArrayToBST(nums);
const result = TreeToArray(bstRoot);
console.log(result); // 输出: [0, -10, 5, null, -3, null, 9]或者 [0, -3, 9, -10, null, 5]