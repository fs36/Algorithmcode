// 二叉树展开为链表
/*
给你二叉树的根结点 root ，请你将它展开为一个单链表：
展开后的单链表应该同样使用 TreeNode ，
其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。

示例
输入：root = [1,2,5,3,4,null,6]
    1
  2   5
3   4    6
输出：[1,null,2,null,3,null,4,null,5,null,6]
*/
/*思路：使用栈来模拟先序遍历(根-左-右)的顺序。

从栈中弹出节点，然后按先右后左的顺序将右子节点和左子节点依次入栈。
将 当前节点的右指针指向栈顶元素，并将 左指针置为 null。
栈顶元素的右指针会始终指向下一个待访问的节点，符合先序展开的要求。
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
// 迭代
function flatten(root) {
    if (!root) return;

    // 使用栈来模拟前序遍历(根 → 左 → 右)
    // 这里使用栈的原因是我们需要先访问右子节点
    // 因为在展开链表时，右子节点需要在左子节点之后处理
    // 这样才能保证展开后的链表顺序是先序遍历的顺序
    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();

        // 如果有右子节点，先将右子节点入栈
        if (node.right) {
            stack.push(node.right);
        }

        // 如果有左子节点，先将左子节点入栈
        if (node.left) {
            stack.push(node.left);
        }

        // 将当前节点的右指针指向栈顶元素（即下一个要访问的节点）
        node.right = stack.length > 0 ? stack[stack.length - 1] : null;
        // 将左指针置为 null
        node.left = null;
    }
}
