// 找出二叉树的第k小的元素
/*
给定一个二叉搜索树的根节点 root ，和一个整数 k ，
请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。

示例 2：
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
*/
/**思路：中序遍历（左-根-右）= 升序遍历，遍历到第k个node，其实就是第k个小的元素，直接返回 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
// 递归
var kthSmallest = function (root, k) {
    let count = 0
    let result = null

    function isOrder(node) {
        if (!node || result !== null) return

        isOrder(node.left)

        count++
        if (count === k) {
            result = node.val
            return
        }

        isOrder(node.right)
    }

    isOrder(root)
    return result
};

// 非递归
var kthSmallestIterative = function (root, k) {
    const stack = []
    let count = 0
    let result = null

    while (stack.length > 0 || root !== null) {
        while (root !== null) {
            stack.push(root)
            root = root.left
        }

        root = stack.pop()
        count++
        if (count === k) {
            result = root.val
            break
        }

        root = root.right
    }

    return result
};