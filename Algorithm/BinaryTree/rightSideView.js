// 二叉树的右视图
/*给定一个二叉树的 根节点 root，想象自己站在它的右侧，
按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

示例 1：
输入：root = [1, 2, 3, null, 5, null, 4]
输出：[1, 3, 4]

示例 2：
输入：root = [1, 2, 3, 4, null, null, null, 5]
输出：[1, 3, 4, 5]

示例 3：
输入：root = [1, null, 3]
输出：[1, 3]

示例 4：
输入：root = []
输出：[] */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function rightSideView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            // 如果是当前层的最后一个节点，添加到结果中
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            // 将子节点加入队列
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}