/**
 * 二叉树实战练习 - 从基础到进阶
 *
 * 本文件包含:
 * 1. 二叉树基础操作练习
 * 2. 层序遍历相关题目
 * 3. DFS 相关题目
 * 4. 综合应用题目
 */

// ============================================
// 树节点定义
// ============================================
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// ============================================
// 辅助函数: 从数组构建二叉树
// ============================================
function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();

        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;

        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// ============================================
// 辅助函数: 打印树的结构(层序遍历格式)
// ============================================
function printTree(root) {
    if (!root) return '[]';

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === null) {
            result.push(null);
        } else {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    // 移除末尾的 null
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return JSON.stringify(result);
}

// ============================================
// 【基础练习1】二叉树的最大深度 (LeetCode 104)
// ============================================

/**
 * 题目: 给定一个二叉树,找出其最大深度
 * 深度 = 从根节点到最远叶子节点的最长路径上的节点数
 *
 * 示例:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出: 3
 *
 * TODO(human): 请实现这个函数
 * 提示: 递归思路 - 树的深度 = max(左子树深度, 右子树深度) + 1
 */
function maxDepth(root) {
    // 你的代码
    if (!root) return 0;
}

// ============================================
// 【基础练习2】二叉树的最小深度 (LeetCode 111)
// ============================================

/**
 * 题目: 找出从根节点到最近叶子节点的最短路径上的节点数
 *
 * 注意: 叶子节点是指没有子节点的节点
 *
 * 示例:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出: 2 (路径: 3 -> 9)
 *
 * TODO(human): 请实现这个函数
 * 提示: 要注意边界情况 - 如果只有一边有子树,不能简单取 min!
 */
function minDepth(root) {
    // 你的代码
}

// ============================================
// 【层序遍历练习1】二叉树的右视图 (LeetCode 199)
// ============================================

/**
 * 题目: 返回从右侧能看到的节点值(每层最右边的节点)
 *
 * 示例:
 *     1
 *    / \
 *   2   3
 *    \   \
 *     5   4
 * 输出: [1, 3, 4]
 *
 * TODO(human): 请实现这个函数
 * 提示: 层序遍历,每层只记录最后一个节点
 */
function rightSideView(root) {
    // 你的代码
}

// ============================================
// 【层序遍历练习2】二叉树的锯齿形层序遍历 (LeetCode 103)
// ============================================

/**
 * 题目: 返回锯齿形层序遍历结果(第1层从左到右,第2层从右到左,交替进行)
 *
 * 示例:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出: [[3], [20,9], [15,7]]
 *
 * TODO(human): 请实现这个函数
 * 提示: 正常层序遍历,奇数层(level % 2 === 1)需要反转
 */
function zigzagLevelOrder(root) {
    // 你的代码
}

// ============================================
// 【DFS 练习1】路径总和 (LeetCode 112)
// ============================================

/**
 * 题目: 判断树中是否存在根节点到叶子节点的路径,路径上所有节点值相加等于目标和
 *
 * 示例:
 *       5
 *      / \
 *     4   8
 *    /   / \
 *   11  13  4
 *  /  \      \
 * 7    2      1
 * targetSum = 22
 * 输出: true (路径: 5->4->11->2)
 *
 * TODO(human): 请实现这个函数
 * 提示: 递归 - 每走一步,目标和减去当前节点值
 */
function hasPathSum(root, targetSum) {
    // 你的代码
}

// ============================================
// 【DFS 练习2】对称二叉树 (LeetCode 101)
// ============================================

/**
 * 题目: 判断一棵二叉树是否是镜像对称的
 *
 * 示例:
 *     1
 *    / \
 *   2   2
 *  / \ / \
 * 3  4 4  3
 * 输出: true
 *
 * TODO(human): 请实现这个函数
 * 提示: 递归比较左右子树是否镜像
 *       - 左子树的左节点 == 右子树的右节点
 *       - 左子树的右节点 == 右子树的左节点
 */
function isSymmetric(root) {
    // 你的代码
}

// ============================================
// 【综合练习1】二叉树的最近公共祖先 (LeetCode 236)
// ============================================

/**
 * 题目: 找到两个节点的最近公共祖先(LCA)
 *
 * 定义: 对于树中两个节点 p 和 q,最近公共祖先是最深的节点,
 *       且 p 和 q 都是它的后代节点
 *
 * 示例:
 *         3
 *        / \
 *       5   1
 *      / \ / \
 *     6  2 0  8
 *       / \
 *      7   4
 * p = 5, q = 1 → 输出: 3
 * p = 5, q = 4 → 输出: 5
 *
 * TODO(human): 请实现这个函数
 * 提示: 递归思路
 *       - 如果当前节点是 p 或 q,返回当前节点
 *       - 递归查找左右子树
 *       - 如果 p 和 q 分别在左右子树,当前节点就是 LCA
 *       - 如果都在一侧,返回那一侧的结果
 */
function lowestCommonAncestor(root, p, q) {
    // 你的代码
}

// ============================================
// 【综合练习2】从前序与中序遍历序列构造二叉树 (LeetCode 105)
// ============================================

/**
 * 题目: 给定前序遍历和中序遍历结果,构造二叉树
 *
 * 示例:
 * 前序遍历: [3,9,20,15,7]
 * 中序遍历: [9,3,15,20,7]
 * 输出:
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *
 * TODO(human): 请实现这个函数
 * 提示:
 *   - 前序遍历的第一个元素是根节点
 *   - 在中序遍历中找到根节点,左边是左子树,右边是右子树
 *   - 递归构建左右子树
 */
function buildTreeFromPreIn(preorder, inorder) {
    // 你的代码
}

// ============================================
// 测试代码
// ============================================

console.log('========================================');
console.log('二叉树练习测试');
console.log('========================================\n');

// 测试树1: [3,9,20,null,null,15,7]
const tree1 = buildTree([3, 9, 20, null, null, 15, 7]);
console.log('测试树1:', printTree(tree1));
console.log('       3');
console.log('      / \\');
console.log('     9  20');
console.log('       /  \\');
console.log('      15   7');
console.log('');

// 测试最大深度
console.log('【基础练习1】最大深度:');
console.log('你的答案:', maxDepth(tree1));
console.log('期望答案: 3');
console.log('');

// 测试最小深度
console.log('【基础练习2】最小深度:');
console.log('你的答案:', minDepth(tree1));
console.log('期望答案: 2');
console.log('');

// 测试树2: [1,2,3,null,5,null,4]
const tree2 = buildTree([1, 2, 3, null, 5, null, 4]);
console.log('测试树2:', printTree(tree2));
console.log('     1');
console.log('    / \\');
console.log('   2   3');
console.log('    \\   \\');
console.log('     5   4');
console.log('');

// 测试右视图
console.log('【层序遍历练习1】右视图:');
console.log('你的答案:', rightSideView(tree2));
console.log('期望答案: [1, 3, 4]');
console.log('');

// 测试锯齿形遍历
console.log('【层序遍历练习2】锯齿形遍历:');
console.log('你的答案:', zigzagLevelOrder(tree1));
console.log('期望答案: [[3], [20, 9], [15, 7]]');
console.log('');

// 测试路径总和
console.log('【DFS 练习1】路径总和:');
console.log('你的答案 (targetSum=38):', hasPathSum(tree1, 38));
console.log('期望答案: true (路径: 3->20->15)');
console.log('');

// 测试对称树
const tree3 = buildTree([1, 2, 2, 3, 4, 4, 3]);
console.log('测试树3:', printTree(tree3));
console.log('     1');
console.log('    / \\');
console.log('   2   2');
console.log('  / \\ / \\');
console.log(' 3  4 4  3');
console.log('');
console.log('【DFS 练习2】对称树:');
console.log('你的答案:', isSymmetric(tree3));
console.log('期望答案: true');
console.log('');

// ============================================
// 参考答案(先自己尝试,再看答案!)
// ============================================

// 取消下面的注释查看参考答案
/*

// 答案1: 最大深度
function maxDepth(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// 答案2: 最小深度
function minDepth(root) {
    if (!root) return 0;

    // 如果左子树为空,只考虑右子树
    if (!root.left) return minDepth(root.right) + 1;
    // 如果右子树为空,只考虑左子树
    if (!root.right) return minDepth(root.left) + 1;

    // 两边都有,取较小值
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}

// 答案3: 右视图
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // 每层最后一个节点
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

// 答案4: 锯齿形遍历
function zigzagLevelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let level = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // 奇数层反转
        if (level % 2 === 1) {
            currentLevel.reverse();
        }

        result.push(currentLevel);
        level++;
    }

    return result;
}

// 答案5: 路径总和
function hasPathSum(root, targetSum) {
    if (!root) return false;

    // 叶子节点:判断是否等于目标值
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    // 递归:目标值减去当前节点值
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}

// 答案6: 对称树
function isSymmetric(root) {
    if (!root) return true;

    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;

        return left.val === right.val &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }

    return isMirror(root.left, root.right);
}

// 答案7: 最近公共祖先
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // p 和 q 分别在左右子树
    if (left && right) return root;

    // 都在一侧,返回那一侧的结果
    return left ? left : right;
}

// 答案8: 从前序与中序构造二叉树
function buildTreeFromPreIn(preorder, inorder) {
    if (preorder.length === 0) return null;

    // 前序遍历第一个是根节点
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到根节点位置
    const rootIndex = inorder.indexOf(rootVal);

    // 递归构建左右子树
    root.left = buildTreeFromPreIn(
        preorder.slice(1, rootIndex + 1),
        inorder.slice(0, rootIndex)
    );
    root.right = buildTreeFromPreIn(
        preorder.slice(rootIndex + 1),
        inorder.slice(rootIndex + 1)
    );

    return root;
}

*/

// ============================================
// 学习建议
// ============================================

/*
 * 【学习路径建议】
 *
 * 1. 基础阶段:
 *    - 熟练掌握树节点的定义和构建
 *    - 理解递归的三要素:终止条件、递归逻辑、返回值
 *    - 练习前中后序遍历(DFS)
 *
 * 2. 进阶阶段:
 *    - 掌握层序遍历(BFS)及其变体
 *    - 理解 BFS 和 DFS 的应用场景
 *    - 练习树的深度、路径相关问题
 *
 * 3. 高级阶段:
 *    - 二叉搜索树(BST)相关问题
 *    - 树的构造和序列化
 *    - 最近公共祖先等综合问题
 *
 * 【练习建议】
 *
 * 1. 先自己尝试实现,不要马上看答案
 * 2. 实现后运行测试,对比期望结果
 * 3. 如果卡住,先看提示,再看答案
 * 4. 理解答案后,自己重新实现一遍
 * 5. 总结每道题的核心思路和模式
 *
 * 【常见模式总结】
 *
 * 1. 需要按层处理 → 层序遍历(BFS) + 队列
 * 2. 需要路径/深度 → DFS + 递归
 * 3. 需要最短路径 → BFS
 * 4. 需要比较左右子树 → 递归 + 辅助函数
 * 5. 需要构造树 → 递归 + 数组切片
 */
