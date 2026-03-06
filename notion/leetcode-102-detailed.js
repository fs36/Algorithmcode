/**
 * LeetCode 102: 二叉树的层序遍历 (Binary Tree Level Order Traversal)
 *
 * 题目:
 * 给定一个二叉树的根节点 root,返回其节点值的层序遍历结果
 * (即逐层地,从左到右访问所有节点)
 *
 * 示例:
 * 输入: root = [3,9,20,null,null,15,7]
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 * 输出: [[3],[9,20],[15,7]]
 */

// ============================================
// 核心思想: BFS + 队列
// ============================================

/**
 * 【为什么用队列?】
 *
 * 队列的特点: FIFO (先进先出)
 * - 先加入的节点先处理
 * - 天然符合"逐层"的要求
 *
 * 【算法流程】
 * 1. 初始化: 根节点入队
 * 2. 循环处理每一层:
 *    a. 记录当前队列长度 = 本层节点数
 *    b. 循环处理本层所有节点:
 *       - 出队一个节点
 *       - 记录节点值
 *       - 将其子节点入队(下一层)
 *    c. 将本层结果加入总结果
 * 3. 重复步骤2,直到队列为空
 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * 层序遍历 - 标准解法
 * 时间复杂度: O(n) - 每个节点访问一次
 * 空间复杂度: O(n) - 队列最多存储一层的节点,最坏情况(完全二叉树最后一层)为 n/2
 */
var levelOrder = function(root) {
    // 边界条件: 空树返回空数组
    if (!root) return [];

    const result = [];           // 存储最终结果
    const queue = [root];        // 队列初始化:根节点入队

    // 只要队列不为空,就继续处理
    while (queue.length > 0) {
        // ========== 关键步骤1: 记录本层节点数 ==========
        // 为什么要先记录? 因为循环过程中队列会变化!
        const levelSize = queue.length;

        // 存储本层所有节点的值
        const currentLevel = [];

        // ========== 关键步骤2: 处理本层所有节点 ==========
        // 注意: 循环次数是固定的 levelSize,不是 queue.length!
        for (let i = 0; i < levelSize; i++) {
            // 出队:取出队首节点
            const node = queue.shift();

            // 记录节点值
            currentLevel.push(node.val);

            // ========== 关键步骤3: 子节点入队(下一层) ==========
            // 先左后右,保证下一层从左到右的顺序
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // 将本层结果加入总结果
        result.push(currentLevel);
    }

    return result;
};

// ============================================
// 可视化执行过程
// ============================================

/**
 * 示例树:
 *        3
 *       / \
 *      9  20
 *        /  \
 *       15   7
 *
 * 执行过程:
 *
 * 初始化:
 * queue = [3]
 * result = []
 *
 * ===== 第1轮循环 (处理第1层) =====
 * levelSize = 1
 * currentLevel = []
 *
 * i=0:
 *   - 出队: node = 3
 *   - currentLevel = [3]
 *   - 子节点入队: queue = [9, 20]
 *
 * result = [[3]]
 *
 * ===== 第2轮循环 (处理第2层) =====
 * levelSize = 2  ← 注意!此时 queue = [9, 20]
 * currentLevel = []
 *
 * i=0:
 *   - 出队: node = 9
 *   - currentLevel = [9]
 *   - 无子节点, queue = [20]
 *
 * i=1:
 *   - 出队: node = 20
 *   - currentLevel = [9, 20]
 *   - 子节点入队: queue = [15, 7]
 *
 * result = [[3], [9, 20]]
 *
 * ===== 第3轮循环 (处理第3层) =====
 * levelSize = 2  ← queue = [15, 7]
 * currentLevel = []
 *
 * i=0:
 *   - 出队: node = 15
 *   - currentLevel = [15]
 *   - 无子节点, queue = [7]
 *
 * i=1:
 *   - 出队: node = 7
 *   - currentLevel = [15, 7]
 *   - 无子节点, queue = []
 *
 * result = [[3], [9, 20], [15, 7]]
 *
 * ===== 队列为空,循环结束 =====
 * 返回 result = [[3], [9, 20], [15, 7]]
 */

// ============================================
// 常见错误及解决方案
// ============================================

/**
 * 错误1: 不记录 levelSize,直接用 queue.length
 */
function levelOrderWrong1(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const currentLevel = [];

        // ❌ 错误: queue.length 在循环中会变化!
        for (let i = 0; i < queue.length; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * 为什么错误?
 * - 当 i=0 时,queue.length = 1
 * - 处理节点后,queue.push 了子节点,queue.length 变成 2
 * - 循环条件 i < queue.length 变成 i < 2
 * - 导致多处理了下一层的节点!
 */

/**
 * 错误2: 使用递归但没有正确传递层级信息
 */
function levelOrderWrong2(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;

        // ❌ 错误: 无法知道当前节点在哪一层!
        result.push(node.val);

        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
    return result; // 得到的是扁平数组,不是按层分组的
}

/**
 * 正确的递归版本 (了解即可,面试优先队列版本)
 */
function levelOrderRecursive(root) {
    const result = [];

    function traverse(node, level) {
        if (!node) return;

        // 如果这一层还没有数组,创建一个
        if (result.length === level) {
            result.push([]);
        }

        // 将当前节点值加入对应层
        result[level].push(node.val);

        // 递归处理子节点,层级+1
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }

    traverse(root, 0);
    return result;
}

// ============================================
// 相关变体题目
// ============================================

/**
 * LeetCode 107: 二叉树的层序遍历 II (自底向上)
 * 输出: [[15,7],[9,20],[3]]
 *
 * 解法: 正常层序遍历,最后 reverse 结果数组
 */
function levelOrderBottom(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    // 关键: 反转结果
    return result.reverse();
}

/**
 * LeetCode 103: 二叉树的锯齿形层序遍历
 * 输出: [[3],[20,9],[15,7]] (第2层从右到左)
 *
 * 解法: 正常层序遍历,奇数层反转
 */
function zigzagLevelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let level = 0; // 记录当前层级

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // 奇数层(level % 2 === 1)需要反转
        if (level % 2 === 1) {
            currentLevel.reverse();
        }

        result.push(currentLevel);
        level++;
    }

    return result;
}

/**
 * LeetCode 199: 二叉树的右视图
 * 输出: [3, 20, 7] (每层最右边的节点)
 *
 * 解法: 层序遍历,每层只取最后一个节点
 */
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // 关键: 只记录每层最后一个节点
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

/**
 * LeetCode 637: 二叉树的层平均值
 * 输出: [3, 14.5, 11] (每层节点的平均值)
 *
 * 解法: 层序遍历,计算每层和再除以节点数
 */
function averageOfLevels(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // 计算平均值
        result.push(levelSum / levelSize);
    }

    return result;
}

// ============================================
// 测试代码
// ============================================

// 构建测试树
function buildTree() {
    const node15 = new TreeNode(15);
    const node7 = new TreeNode(7);
    const node20 = new TreeNode(20, node15, node7);
    const node9 = new TreeNode(9);
    const root = new TreeNode(3, node9, node20);
    return root;
}

const tree = buildTree();

console.log('========================================');
console.log('LeetCode 102 及相关变体');
console.log('========================================\n');

console.log('树的结构:');
console.log('       3');
console.log('      / \\');
console.log('     9  20');
console.log('       /  \\');
console.log('      15   7');
console.log('');

console.log('102. 层序遍历:', levelOrder(tree));
// [[3],[9,20],[15,7]]

console.log('107. 层序遍历II (自底向上):', levelOrderBottom(tree));
// [[15,7],[9,20],[3]]

console.log('103. 锯齿形层序遍历:', zigzagLevelOrder(tree));
// [[3],[20,9],[15,7]]

console.log('199. 右视图:', rightSideView(tree));
// [3,20,7]

console.log('637. 层平均值:', averageOfLevels(tree));
// [3, 14.5, 11]

// ============================================
// 核心知识点总结
// ============================================

/*
 * 【层序遍历的核心要点】
 *
 * 1. 为什么用队列?
 *    - 队列是 FIFO,天然符合"逐层"处理的要求
 *    - 先加入的节点先处理,保证按层级顺序
 *
 * 2. 关键步骤 (三步走):
 *    ① 记录 levelSize (本层节点数)
 *    ② 循环 levelSize 次,处理本层所有节点
 *    ③ 处理节点时,将子节点加入队列
 *
 * 3. 为什么要先记录 levelSize?
 *    - 因为循环过程中队列在变化!
 *    - levelSize 固定了本层要处理的节点数
 *    - 避免误处理下一层的节点
 *
 * 4. 时间和空间复杂度:
 *    - 时间: O(n) - 每个节点访问一次
 *    - 空间: O(n) - 队列最多存储一层节点
 *
 * 5. 层序遍历的应用场景:
 *    - 需要按层处理节点
 *    - 需要找每层的特定节点(最左、最右、平均值等)
 *    - 需要找最短路径(BFS 天然保证先到的是最短路径)
 *
 * 6. 与 DFS 的对比:
 *    - BFS (层序遍历): 用队列,逐层处理,适合找最短路径
 *    - DFS (前中后序): 用递归或栈,深入到底,适合找路径/深度
 */
