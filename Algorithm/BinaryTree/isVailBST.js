/*
验证二叉搜索树
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：
节点的左子树只包含 严格小于 当前节点的数。
节点的右子树只包含 严格大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
 

示例 1：
输入：root = [2, 1, 3]
输出：true

示例 2：
输入：root = [5, 1, 4, null, null, 3, 6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
*/
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function isValidBST(root) {
    // 辅助函数，检查当前节点的值是否在有效范围内
    function isValid(node, min, max) {
        if (!node) return true; // 空节点是有效的

        // 当前节点的值必须在 min 和 max 之间
        if (node.val <= min || node.val >= max) return false;

        // 递归检查左子树和右子树
        return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
    }
    //Infinity是JavaScript中的正无穷大，表示没有上限
    // 开始检查根节点，初始范围是负无穷大到正无穷大
    return isValid(root, -Infinity, Infinity);
}

// 示例运行
const root1 = new TreeNode(2, new TreeNode(1), new TreeNode(3));
const root2 = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
console.log(isValidBST(root1)); // 输出: true
console.log(isValidBST(root2)); // 输出: false
