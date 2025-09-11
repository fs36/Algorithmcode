// 102 二叉树的层级遍历
// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return []
    const res = []
    const queue = [root]
    while (queue.length > 0) {
        let level = []
        let length = queue.length
        for (let i = 0; i < length; i++) {
            const node = queue.shift()
            level.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        res.push(level)
    }
    return res
};