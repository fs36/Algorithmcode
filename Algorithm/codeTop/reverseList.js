//206 反转链表
// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//迭代
var reverseList = function (head) { 
    let prev = null
    let curr = head
    while (curr) {
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
}
