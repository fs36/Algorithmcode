/**
 * 二叉树基础 - JS 实现详解
 *
 * 核心概念:
 * 1. 二叉树节点的定义
 * 2. 如何手动构建一棵树
 * 3. 树的遍历方式
 */

// ============================================
// 1. 二叉树节点的定义
// ============================================

/**
 * TreeNode 类 - 二叉树的基本单元
 * 在 JS 中,树节点就是一个普通对象,通过引用连接其他节点
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;         // 节点存储的值
        this.left = left;       // 左子节点的引用(指针)
        this.right = right;     // 右子节点的引用(指针)
    }
}

// ============================================
// 2. 手动构建一棵二叉树
// ============================================

/**
 * 示例:构建下面这棵树
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 */

// 方法1: 逐个创建节点,再手动连接
function buildTreeManually() {
    // 创建叶子节点
    const node15 = new TreeNode(15);
    const node7 = new TreeNode(7);
    const node9 = new TreeNode(9);

    // 创建中间节点,连接左右子节点
    const node20 = new TreeNode(20, node15, node7);

    // 创建根节点
    const root = new TreeNode(3, node9, node20);

    return root;
}

// 方法2: 从数组构建二叉树(LeetCode 风格)
/**
 * 从层序遍历数组构建二叉树
 * 数组格式: [3, 9, 20, null, null, 15, 7]
 * null 表示该位置没有节点
 *
 * 核心思路:
 * - 使用队列,按层级顺序处理节点
 * - 每个节点从数组中取两个元素作为左右子节点
 */
function buildTreeFromArray(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;

    // 创建根节点
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1; // 数组索引,从第二个元素开始

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift(); // 取出当前节点

        // 处理左子节点
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;

        // 处理右子节点
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// ============================================
// 3. 二叉树的四种遍历方式
// ============================================

/**
 * 前序遍历 (Pre-order): 根 -> 左 -> 右
 * 用途: 复制树、序列化树
 */
function preorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;

        result.push(node.val);      // 先访问根
        traverse(node.left);         // 再访问左子树
        traverse(node.right);        // 最后访问右子树
    }

    traverse(root);
    return result;
}

/**
 * 中序遍历 (In-order): 左 -> 根 -> 右
 * 用途: 二叉搜索树(BST)中,中序遍历得到的是升序数组!
 */
function inorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;

        traverse(node.left);         // 先访问左子树
        result.push(node.val);       // 再访问根
        traverse(node.right);        // 最后访问右子树
    }

    traverse(root);
    return result;
}

/**
 * 后序遍历 (Post-order): 左 -> 右 -> 根
 * 用途: 删除树、计算树的高度
 */
function postorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;

        traverse(node.left);         // 先访问左子树
        traverse(node.right);        // 再访问右子树
        result.push(node.val);       // 最后访问根
    }

    traverse(root);
    return result;
}

/**
 * 层序遍历 (Level-order): 逐层从左到右
 * 用途: 最常用!找最短路径、按层处理节点
 *
 * 核心: 使用队列(FIFO)
 */
function levelOrderTraversal(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length; // 当前层的节点数
        const currentLevel = [];        // 存储当前层的值

        // 处理当前层的所有节点
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // 将下一层的节点加入队列
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

// ============================================
// 4. 测试代码
// ============================================

console.log('========================================');
console.log('二叉树基础演示');
console.log('========================================\n');

// 构建测试树
const tree = buildTreeFromArray([3, 9, 20, null, null, 15, 7]);

console.log('树的结构:');
console.log('       3');
console.log('      / \\');
console.log('     9  20');
console.log('       /  \\');
console.log('      15   7');
console.log('');

console.log('前序遍历 (根-左-右):', preorderTraversal(tree));
// 输出: [3, 9, 20, 15, 7]

console.log('中序遍历 (左-根-右):', inorderTraversal(tree));
// 输出: [9, 3, 15, 20, 7]

console.log('后序遍历 (左-右-根):', postorderTraversal(tree));
// 输出: [9, 15, 7, 20, 3]

console.log('层序遍历 (逐层):', levelOrderTraversal(tree));
// 输出: [[3], [9, 20], [15, 7]]

// ============================================
// 5. 常见树操作示例
// ============================================

/**
 * 计算树的最大深度
 * 思路: 递归 - 树的深度 = max(左子树深度, 右子树深度) + 1
 */
function maxDepth(root) {
    if (!root) return 0;

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * 判断是否为对称树
 * 思路: 递归比较左右子树是否镜像
 */
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

/**
 * 翻转二叉树
 * 思路: 递归交换每个节点的左右子树
 */
function invertTree(root) {
    if (!root) return null;

    // 交换左右子树
    [root.left, root.right] = [root.right, root.left];

    // 递归翻转子树
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

console.log('\n========================================');
console.log('常见操作示例:');
console.log('========================================');
console.log('树的最大深度:', maxDepth(tree));
console.log('是否对称:', isSymmetric(tree));

// ============================================
// 6. 关键知识点总结
// ============================================

/*
 * 【核心要点】
 *
 * 1. 树节点的本质:
 *    - JS 中就是普通对象,包含 val, left, right
 *    - left 和 right 是引用(指针),指向其他节点对象
 *
 * 2. 递归是树操作的核心:
 *    - 树的定义本身就是递归的
 *    - 递归三要素: 终止条件、递归逻辑、返回值
 *
 * 3. 遍历方式的选择:
 *    - DFS(深度优先): 前序/中序/后序 - 用递归或栈
 *    - BFS(广度优先): 层序遍历 - 用队列
 *
 * 4. 层序遍历(BFS)的核心:
 *    - 使用队列存储节点
 *    - 每次处理一层:先记录 levelSize,再循环处理
 *    - 处理节点时,将其子节点加入队列
 *
 * 5. 常见模式:
 *    - 需要按层处理 → 层序遍历(BFS)
 *    - 需要路径/深度 → DFS + 递归
 *    - 需要搜索最短路径 → BFS
 *    - BST 相关 → 中序遍历
 */
