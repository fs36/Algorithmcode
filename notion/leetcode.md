# leetcode
## 3. 无重复字符的最长子串
### 笔记
滑动窗口（双指针）+ 哈希表
哈希表存储现在已有的子串内容，遇到重复，左指针到重复位置+1（保障无重复），判断是否有重复字符在窗口内
左指针缩小窗口，右指针扩大窗口
每次维护maxlen

``` JS
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0
    let maxLen = 0
    const charMap = new Map() 
    for(let right = 0;right<s.length;right++){
        const char = s[right]
        if(charMap.has(char) && charMap.get(char)>=left){
            left = charMap.get(char) + 1
        }
        charMap.set(char,right)
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
};
```

## 165. 比较版本号
### 笔记
使用`split`把字符串分割为数组，再把数字里面的字符串`parseInt`变成数值比较。如果数组长度有一个比较长，取到的值会是undefined，使用三元判断补零比较

``` JS
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const array1 = version1.split('.')
    const array2 = version2.split('.')
    let n = Math.max(version1.length,version2.length)
        let char1 = array1[i] === undefined ? 0 : parseInt(array1[i])
        let char2 = array2[i] === undefined ? 0 : parseInt(array2[i])
        if(char1>char2) return 1
        if(char1<char2) return -1
    }
    return 0
};
```
### 知识点复习
1. `split`
2. 超过数组长度的索引，取到的值是undefined
3. for in 是一种循环结构，用于遍历对象的可枚举属性（包括数组的索引、对象的键等）。`for(let key in obj)`
4. for of 是一种循环结构，用于遍历可迭代对象（iterable objects），例如数组、字符串、Map、Set 等。它直接返回可迭代对象的值。`for(let element of iterable)`

## 88. 合并两个有序数组
### 笔记
#### 法一：`splice + sort` 
`splice` 数组拼接 splice(start,deleteCount,item1)
start: 开始的索引位置
deleteCount：删除的个数
item1：插入的元素

#### 法二：双指针
三个指针，从后往前遍历。为什么要处理p2，p1长的话，直接就是nums1的位置不用调整，但是p2长的话需要调整，移到nums1上面去

``` JS
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function(nums1, m, nums2, n) {
    let p1 = m-1, mid = m+n-1 ,p2 = n-1
    while(p1>=0 && p2>=0){
        if(nums1[p1]<nums2[p2]){
            nums1[mid--] = nums2[p2--]
        } else{
            nums1[mid--] = nums1[p1--]
        }
    }
    while(p2>=0){
        nums1[mid--] = nums2[p2--]
    }

    // 法一
    nums1.splice(m,nums1.length-m,...nums2)
    nums1.sort((a,b)=>a-b)
};
```

## 20 有效的括号
### 笔记
1. 字符串长度不是偶数，为false
2. 使用map 定义一个map, map[key] = value
``` JS
let myMap2 = new Map([  ['name', 'Alice'],  ['age', 25] ]);
```
3. 右括号为key，左括号存入栈
4. 写函数时记得写全()

``` JS
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length%2 !== 0) return false
    const stack = []
    const map = {')':'(',']':'[','}':'{'}
    for(const char of s){
        if(char in map){
            if(!stack.length || stack.pop() !== map[char]){
                return false
            } 
        } else {
                stack.push(char)
            }
    }
    return stack.length === 0
};
```

## 415 字符串相加
### 笔记
1. reverse 不要打错
2. reverse把数组翻转，join 会把数组里的每一项都拼成一个字符串，中间用你指定的分隔符连接
``` JS
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let i= num1.length-1,j=num2.length-1,result=[],carry=0
    while(i>=0||j>=0||carry > 0){
        const digit1 = num1[i]>=0 ? parseInt(num1[i]) : 0
        const digit2 = num2[j]>=0 ? parseInt(num2[j]) : 0
        const sum = digit1 + digit2 + carry
        result.push(sum%10)
        carry = Math.floor(sum/10)
        i--
        j--
    }
    return result.reverse().join('')
};
```

## 2 两数之和
### 笔记
1. 使用map，确定谁是key，谁是value

``` TS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i =0;i<nums.length;i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

## 46 全排列
### 笔记

**回溯算法——递归**
1. 递归出口（防止死循环），明确什么时候去返回结果
2. 递归公式：把问题拆解成小问题。
3. 状态重置与回溯：在下一层递归前做的修改，在从递归返回之后必须撤销

全排列问题的本质是决策树的**深度优先遍历**
- 决策过程：当你站在起点时，你有 $n$ 种选择（1, 2, 3...）。选了 1 之后，接下来的位置只能从剩余的数字里选。这形成了一个树状结构。
- 空间探索：回溯法允许我们深入到树的最底层（找到一个结果），然后原路返回，撤销上一步的选择，再去尝试另一条分支。
- 结论：只要题目要求“找出所有可能的结果”，且每一步都依赖之前的选择，回溯法通常是唯一解。
``` TS
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const path = [];
    const used = new Array(nums.length).fill(false);
    function backtrack() {
        if(path.length === nums.length) {
            // ❌ 错误写法
            res.push(path);
            // 结果：[[],[],[],[],[],[]]
            // 原因：path 是引用类型，后续 pop 会修改同一个数组
            res.push([...path]);
            return;
        }
        for(let i = 0; i < nums.length; i++) {
            if(used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            backtrack();
            path.pop();
            used[i] = false;
        }
    }
    backtrack();
    return res;
};
```

## 78 子集
### 笔记

**回溯算法——子集/组合模板**
1. 子集 vs 全排列的区别：
   - 全排列：关心顺序，固定长度，用 used 数组
   - 子集：不关心顺序，长度可变，用 start 参数
2. 关键点：
   - 每个节点都是合法子集（不只是叶子节点）
   - 用 start 参数避免重复（保证只选择后面的元素）
   - 递归时传递 i+1（不是 start+1）
3. 时间复杂度：O(n × 2^n)，共 2^n 个子集，每个需要 O(n) 复制

**核心思想**：子集是"选或不选"的组合问题，用 start 控制选择范围避免重复

``` TS
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];
    const path = [];

    function backtrack(start) {
        // 每个节点都是合法子集
        res.push([...path]);

        // 从 start 开始选择，避免重复
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1); // 注意是 i+1，不是 start+1
            path.pop();
        }
    }

    backtrack(0);
    return res;
};
```

**变体：子集 II（包含重复元素）- LeetCode 90**
``` TS
var subsetsWithDup = function(nums) {
    const res = [];
    const path = [];
    nums.sort((a, b) => a - b); // 先排序

    function backtrack(start) {
        res.push([...path]);

        for (let i = start; i < nums.length; i++) {
            // 剪枝：跳过同一层的重复元素
            if (i > start && nums[i] === nums[i - 1]) continue;

            path.push(nums[i]);
            backtrack(i + 1);
            path.pop();
        }
    }

    backtrack(0);
    return res;
};
```

## 206 反转链表
### 笔记
1. 使用双指针，prev current，要保留next
2. 翻转next，移动指针
``` TS
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
// 迭代
var reverseList = function(head) {
    let prev = null
    let current = head
    while(current!==null){
        const next = current.next // 保存next
        current.next = prev // 翻转指针
        // 移动指针
        prev = current 
        current = next
    }
    // 循环结束的时候prev指向最后一个节点，current为空
    return prev
};

// 递归
var reverseList = function(head) {
    // 终止条件
    if(head === null || head.next === null) return head

    const newHead = reverseList(head.next)
    // 反转链表的主要操作
    head.next.next = head
    head.next = null
    // 返回新的头节点
    return newHead
};
```  

## 15 三数之和
### 笔记
1. 排序 + 边界修剪：length<3 返回null；排序后第一位为0 直接终止返回结果
2. 固定一个数 i，双指针遍历另外两个 j k，sum = 0，sum < 0 j右移，sum > 0,k 左移
3. 去重：i j k的重复
4. 终止遍历 i = len-3、j < k
``` TS
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let result = []
    nums.sort((a,b)=>a-b)
    if(nums.length<3 || nums[0]>0) return result // error
    for(let i=0;i<nums.length-2;i++){
        if(nums[i]>0) break // 优化
        if(i>0 && nums[i]===nums[i-1]) continue // error
        let j = i + 1,k = nums.length - 1
        while(j<k){
            let sum = nums[j]+nums[i]+nums[k]
            if(sum === 0){
                result.push([nums[i],nums[j],nums[k]])
                // error
                while( j< k && nums[j] === nums[j+1]) j++
                while(j< k && nums[k] === nums[k-1]) k--
                j++
                k--
            } else if(sum>0){
                k--
            } else {
                j++
            }
        }
    }
    return result
};
```

## 102 二叉树的层序遍历（BFS）
### 笔记
**核心思想**: BFS(广度优先搜索) + 队列
1. **为什么用队列?** 队列是 FIFO(先进先出),天然符合"逐层"处理的要求
2. **关键三步**:
   - ① 记录 `levelSize` = 本层节点数(必须先记录!因为循环中队列会变化)
   - ② 循环 `levelSize` 次,处理本层所有节点
   - ③ 处理节点时,将其子节点加入队列(为下一层做准备)
3. **常见错误**: 直接用 `queue.length` 作为循环条件 → 会导致处理到下一层的节点!
4. **时间复杂度**: O(n) - 每个节点访问一次
5. **空间复杂度**: O(n) - 队列最多存储一层节点,完全二叉树最后一层约 n/2 个节点

**应用场景**:
- 需要按层处理节点
- 找每层特定节点(最左、最右、平均值)
- 找最短路径(BFS 保证先到达的是最短路径)

``` TS
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
// errorco
var levelOrder = function(root) {
    if(!root) return []
    const res = []
    const queue = [root]  // 队列初始化:根节点入队

    while(queue.length > 0){
        // ========== 关键1: 先记录本层节点数 ==========
        const levelSize = queue.length // 固定本层要处理的节点数
        const currentLevel = []         // 存本层节点的值

        // ========== 关键2: 循环处理本层所有节点 ==========
        // 注意: 循环次数是固定的 levelSize,不是 queue.length!
        for(let i = 0; i < levelSize; i++){
            const node = queue.shift() // 出队:取出队首节点
            currentLevel.push(node.val)

            // ========== 关键3: 子节点入队(下一层) ==========
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        res.push(currentLevel) // 本层结果加入总结果
    }
    return res
};
```

### 相关变体
- **LeetCode 107**: 层序遍历 II (自底向上) → 正常遍历后 `reverse()`
- **LeetCode 103**: 锯齿形层序遍历 → 奇数层反转
- **LeetCode 199**: 右视图 → 每层只取最后一个节点
- **LeetCode 637**: 层平均值 → 计算每层和再除以节点数

## 53 最大子数组和
### 笔记
使用动态规划（用过去最优——>推现在最优——>不重复计算）
1. 核心思路：每一个数都有两个选择：加入前面的子数组，或者自己重新开始一段
``` TS
/**
 * @param {number[]} nums
 * @return {number}
 */
// error
var maxSubArray = function(nums) {
    if(!nums|| nums.length === 0) return 0
    let currentMax = nums[0],maxSum = nums[0]
    for(let i=1;i<nums.length;i++){
        // 要么延续以前，要么重新开始
        currentMax = Math.max(nums[i],currentMax+nums[i])
        // 更新全局最大
        maxSum = Math.max(currentMax,maxSum)
    }
    return maxSum
};
```

## 121 买卖股票的最佳时机
### 笔记
min 价格最低，max 当前价格减去最低价格的最大利润
``` TS
var maxProfit = function(prices) {
    let min = prices[0]
    let max = 0
    for(let i=1;i<prices.length;i++){
        min = Math.min(prices[i],min)
        max = Math.max(prices[i]-min,max) // error
    }
    return max
};
```

## 141 环形链表
### 笔记 
快慢指针(快指针比慢指针快一步)，有环必定相遇，无环快指针走到null
``` TS
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head || !head.next) return false // error
    let slow = head, fast = head
    // 确保快节点可以走两步
    while(fast && fast.next){ // error
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) return true
    }
    return false
};
```

## 112 路径之和
### 笔记
递归
终止条件：1. 空节点；2. 叶子节点
递：向左走，向右走
归：有一边的值为目标sum
**走一个节点，减去一个节点的值**
``` TS
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
 * @param {number} targetSum
 * @return {boolean}
 */
// error
var hasPathSum = function(root, targetSum) {
    if (!root) return false
    if(!root.left && !root.right) return root.val === targetSum
    return hasPathSum(root.left,targetSum-root.val) || hasPathSum(root.right,targetSum-root.val)
};
```

## 56 合并区间
### 笔记
考点：排序 + 贪心合并
关键注意点：按左边界排序，合并时取右边界最大值
``` ts
/**
 * 合并重叠区间
 * @param {number[][]} intervals 二维数组，如 [[1,3],[2,6],[8,10],[15,18]]
 * @return {number[][]} 合并后的区间
 */
function mergeIntervals(intervals) {
    // 边界：空数组直接返回
    if (intervals.length === 0) return [];
    // 1. 按区间左边界升序排序
    intervals.sort((a, b) => a[0] - b[0]);
    // 2. 初始化结果数组，存入第一个区间
    const res = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = res[res.length - 1];
        // 3. 重叠则合并（更新右边界）
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]); // error
        } else {
            // 不重叠则加入结果
            res.push(current);
        }
    }
    return res;
}
```
## 146 LRU缓存机制
### 笔记
```TS
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity // 缓存容量
    this.cache = new Map () // 按顺序存入
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    // 把新用的key移到末尾
    this.cache.delete(key)
    this.cache.set(key,value)
    return value
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)){
        this.cache.delete(key) // 已有的要更新value
    }
    this.cache.set(key,value)
    if(this.cache.size > this.capacity){
        const oldKey = this.cache.keys().next().value // 最旧的key —— .next() 取出迭代器的第一个元素
        this.cache.delete(oldKey)
    }
};
```
## 21
## 70
## 5
## 215
## LCR 032. 有效的字母异位词
### 笔记
错误点：没有考虑到直接相等的情况
长度不一样和**直接相等**都返回false，直接排序比较最快
``` TS
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    return s.length == t.length && s !== t && [...s].sort().join('') === [...t].sort().join('')
};
```
## 518. 零钱兑换 II
### 笔记
动态规划
``` TS
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    // dp[i] 表示金额 i 的不同组合数
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;  // 只有一种方式凑成金额 0，就是不使用任何硬币

    // 遍历每个硬币
    for (let coin of coins) {
        // 对每个硬币，更新 dp 数组
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];  // 将 dp[i - coin] 的组合数加到 dp[i] 上
        }
    }

    return dp[amount];  // 最终返回金额 amount 的组合数
};
```
## 104. 二叉树的最大深度
### 笔记
递归思路 - 树的深度 = max(左子树深度, 右子树深度) + 1
``` TS
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
```
## 199. 二叉树的右视图
### 笔记
层序遍历，只记录该层的最后一个节点
```TS
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
```