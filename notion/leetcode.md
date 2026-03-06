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
## 21
## 70
## 5
## 215
# 手撕
## 嵌套对象扁平化
// 输入：const obj = {a:{b:{a:1},d:2},e:2}
// 输出：{a.b.c:1,a.d:2;e:2}
### 笔记
递归
终止条件：不是对象停止递，是基础数据类型，存值到res
递：是对象，不为null，传递prefix和obj
归：不需要，直接返回res
``` TS
/**
 * @param {object} object
 * @return {object} res
 */
function flatten(obj){
    const res = []
    function dfs(obj,prefix){
        // 遍历当前层所有key
        for(let key in obj){
            const value = obj[key]
            // 拼接新key，有前缀就加.,没有就直接key
            const newKey = prefix ? `${prefix}.${key}` : key
            // 如果是对象 && 不是null，继续递归
            if(typeof value === 'object' && value !== null){
                dfs(value,newkey)
            } else{
                // 基本数据，直接赋值
                res[newKey] = value
            }
        }
    }
    dfs(obj,'') // 从根开始，前缀为空
    return res
}
```

## 数组扁平化（多维数组转一维）
### 笔记
递归 或者 flat
``` ts
/**
 * 数组扁平化（递归版）
 * @param {Array} arr 多维数组，如 [1, [2, [3, 4], 5]]
 * @return {Array} 一维数组
 */
function flattenArray(arr) {
    const res = [];
    // 遍历每一项
    arr.forEach(item => {
        // 若为数组则递归，否则直接加入
        if (Array.isArray(item)) {
            res.push(...flattenArray(item)); // 展开递归结果
        } else {
            res.push(item);
        }
    });
    return res;
}

// 简洁版（了解即可，面试优先递归）
function flattenArraySimple(arr) {
    return arr.flat(Infinity);
}
```


## promise.all
### 笔记
1. 接收一个可迭代对象（通常是数组），元素可以是 Promise 或非 Promise 值；
2. 返回一个新的 promise ，成功：结果是按原顺序排列的所有成功值数组，失败：结果是第一个失败的原因
``` TS
/**
 * 实现 Promise.all
 * @param {Iterable} iterable 可迭代对象（如数组）
 * @returns {Promise} 新的 Promise
 */
function myPromiseAll(iterable) {
    // 返回一个新 Promise
    return new Promise((resolve, reject) => {
        try {
            // 1. 将可迭代对象转为数组（兼容 Set/Map 等可迭代类型）
            const promises = Array.from(iterable);
            // 边界：空数组直接 resolve 空数组
            if (promises.length === 0) {
                resolve([]);
                return;
            }

            const results = []; // 存储所有成功结果（保持顺序）
            let resolvedCount = 0; // 已成功的 Promise 数量

            // 2. 遍历所有元素，逐个处理
            promises.forEach((item, index) => {
                // 关键：用 Promise.resolve 包裹，兼容非 Promise 类型
                Promise.resolve(item)
                    .then((value) => {
                        // 按原索引存结果（保证顺序）
                        results[index] = value;
                        resolvedCount++; // 成功数+1

                        // 3. 所有都成功时，resolve 结果数组
                        if (resolvedCount === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch((reason) => {
                        // 4. 只要有一个失败，立即 reject（只触发一次）
                        reject(reason);
                    });
            });
        } catch (error) {
            // 处理可迭代对象转换失败等同步错误
            reject(error);
        }
    });
}
```

## 移除连续相邻重复字符
### 笔记
使用栈
``` TS
/**
 * 移除连续相邻重复字符（移除后新重复也处理）
 * @param {string} s 输入字符串
 * @return {string} 处理后的字符串
 */
function removeDuplicates(s) {
    const stack = [];
    for (const char of s) {
        // 栈顶和当前字符相同 → 弹出栈顶（移除重复）
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            // 不同 → 压入栈
            stack.push(char);
        }
    }
    // 拼接栈中剩余字符
    return stack.join('');
}
```

## 防抖
### 笔记
核心思路
触发事件后，延迟 wait 毫秒执行回调；
``` TS
/**
 * 非立即执行版防抖（核心：每次触发重置定时器）
 * @param {Function} fn 目标函数
 * @param {number} wait 延迟时间（毫秒）
 * @return {Function} 防抖后的函数
 */
function debounce(fn, wait = 500) {
  let timer = null; // 存储定时器ID（关键：闭包保存，跨调用共享）

  return function(...args) {
    const context = this; // 保存this指向

    // ========== 重置定时器的核心代码 ==========
    // 1. 清除之前的定时器（关键：取消未执行的延迟任务）
    if (timer) clearTimeout(timer);
    // 2. 重新设置新的定时器（覆盖原timer，完成“重置”）
    timer = setTimeout(() => {
      fn.apply(context, args); // 延迟后执行目标函数
      timer = null; // 执行完清空timer（可选，增强鲁棒性）
    }, wait);
    // =========================================
  };
}
```
## 节流
限制函数执行频率：不管事件多频繁触发，每隔 wait 毫秒最多执行一次，且兼顾「首次触发立即执行」+「末次触发延迟执行」（最贴合业务场景的版本）。
### 笔记
``` TS
/**
 * 节流函数（组合版：首次立即执行，末次延迟执行）
 * @param {Function} fn 目标回调函数
 * @param {number} wait 节流间隔（毫秒）
 * @return {Function} 节流后的函数
 */
function throttle(fn, wait = 500) {
    // 1. 闭包变量：保存上一次执行时间（时间戳版核心）
    let lastTime = 0;
    // 2. 闭包变量：保存定时器ID（定时器版核心，处理末次执行）
    let timer = null;

    // 返回节流后的函数（闭包：共享 lastTime/timer）
    return function(...args) {
        // 3. 保存当前函数的this指向（比如DOM事件中的this是元素本身）
        const context = this;
        // 4. 获取当前时间戳（用于计算时间间隔）
        const now = Date.now();

        // ========== 核心逻辑1：处理“首次立即执行” ==========
        // 首次触发：now - lastTime > wait（lastTime初始为0，必然满足）
        // 非首次：距离上一次执行超过wait，立即执行
        if (now - lastTime > wait) {
            // 清空之前的定时器（避免末次执行重复触发）
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            // 立即执行目标函数（绑定this和参数）
            fn.apply(context, args);
            // 更新上一次执行时间（标记本次执行的时间点）
            lastTime = now;
        } 
        // ========== 核心逻辑2：处理“末次延迟执行” ==========
        // 距离上一次执行不足wait，且无定时器时，设置延迟执行
        else if (!timer) {
            // 计算剩余等待时间：wait - (now - lastTime)
            const remaining = wait - (now - lastTime);
            // 设置定时器：剩余时间后执行（保证末次触发能执行）
            timer = setTimeout(() => {
                // 执行目标函数（绑定this和参数）
                fn.apply(context, args);
                // 重置状态（避免内存泄漏）
                lastTime = Date.now();
                timer = null;
            }, remaining);
        }
    };
}
```
## 柯里化
### 笔记
1. 柯里化：将多参数函数转为单参数依次调用的函数（如 fn(a,b,c) → fn(a)(b)(c)）；
2. 核心逻辑：
    - 收集调用时传入的参数；
    - 若参数数量 ≥ 原函数形参数量，执行原函数；
    - 若不足，返回新函数继续收集参数。
```TS
/**
 * 函数柯里化
 * @param {Function} fn 原函数
 * @return {Function} 柯里化后的函数
 */
function curry(fn) {
    // 收集参数的核心函数
    const curried = function(...args) {
        // 1. 参数数量足够：执行原函数
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        // 2. 参数不足：返回新函数继续收集
        return function(...newArgs) {
            return curried.apply(this, [...args, ...newArgs]);
        };
    };
    return curried;
}
```
## 深拷贝
1. 处理基础类型：直接返回；
2. 处理引用类型：
    - 数组：创建新数组，递归拷贝每一项；
    - 对象：创建新对象，递归拷贝每一个属性；
    - 特殊类型：Date/RegExp 新建实例，Function 直接返回（函数无需深拷贝）；
3. 处理循环引用：用 WeakMap 缓存已拷贝的对象，避免无限递归。
### 笔记
```TS
/**
 * 深拷贝（支持循环引用、Date、RegExp）
 * @param {any} target 要拷贝的目标
 * @param {WeakMap} cache 缓存已拷贝对象（处理循环引用）
 * @return {any} 拷贝后的结果
 */
function deepClone(target, cache = new WeakMap()) {
    // 1. 基础类型：直接返回
    if (target === null || typeof target !== 'object') {
        return target;
    }

    // 2. 处理循环引用：缓存中存在则直接返回
    if (cache.has(target)) {
        return cache.get(target);
    }

    let result;
    // 3. 处理数组
    if (Array.isArray(target)) {
        result = [];
        cache.set(target, result); // 存入缓存
        target.forEach((item, index) => {
            result[index] = deepClone(item, cache);
        });
    }
    // 4. 处理Date
    else if (target instanceof Date) {
        result = new Date(target);
    }
    // 5. 处理RegExp
    else if (target instanceof RegExp) {
        result = new RegExp(target.source, target.flags);
    }
    // 6. 处理普通对象
    else {
        result = {};
        cache.set(target, result); // 存入缓存
        Object.keys(target).forEach(key => {
            result[key] = deepClone(target[key], cache);
        });
    }

    return result;
}
```
## 扁平数组结构化为树
### 笔记
1. 用 Map 缓存所有节点：快速通过 id 找到对应节点（O (1) 查询）；
2. 遍历扁平数组：
    - 给每个节点初始化 children 数组（避免后续判断）；
    - 若为根节点（parentId 符合根规则），直接加入结果数组；
    - 若为子节点，找到父节点并将当前节点推入父节点的 children；
``` TS
const flatArr = [
  { id: 1, name: '一级菜单1', parentId: 0 },
  { id: 2, name: '一级菜单2', parentId: 0 },
  { id: 3, name: '二级菜单1-1', parentId: 1 },
  { id: 4, name: '三级菜单1-1-1', parentId: 3 },
  { id: 5, name: '二级菜单2-1', parentId: 2 },
  { id: 6, name: '一级菜单3', parentId: 0 },
];

/**
 * 扁平数组转树形结构
 * @param {Array} flatArr 扁平数组（每个元素含 id、parentId）
 * @return {Array} 树形结构数组
 */
function flatToTree(flatArr){
    const Tree = []
    const nodeMap = new Map() // 缓存所有节点：key=id，value=节点

    // 第一步：遍历数组，缓存节点 + 初始化 children
    flatArr.forEach((node)=>{
        nodeMap.set(node.id,{...node,children:[]})
    })
    
    flatArr.forEach(node =>{
        const currentNode = nodeMap.get(node.id)
        // 根节点
        if(currentNode.parentId === 0){
            tree.push(currentNode)
        } else {
            // 父节点
            const parentNode = nodeMap.get(node.parentId)
            parentNode && parentNode.children.push(currentNode)
        }
    })
    return Tree
}
```
## 树形菜单数据转换与索引构建
``` text
要求：
1. 将入参data转化为Node类型，并且携带父节点key(没有父节点，父节点key为空字符)，最终输出treeData
2. 实现工具函数getNode，传入key获取到treeData对应node信息;
3. 实现工具函数getAllChildKeys，根据传入node key获取该node下所有层级children的key

type Node {
    /** 节点唯一键 对应key */
    key: string;
    /** 节点名称 对应title */
    label: string;
    /** 父节点key */
    parentKey: string;
    /** 子节点 */
    children: Node[];
};

type treeData = Node[];

const data = [
  {
    title: '绩效分析',
    key: '/performanceAnalysis',
    children: [
      {
        title: '拆单绩效分析',
        key: '/performanceAnalysis/splitOrder',
        children: [
          {
            title: '绩效总览',
            key: '/performanceAnalysis/splitOrder/overview',
            children: [],
          },
          {
            title: '算法分析',
            key: '/performanceAnalysis/splitOrder/algoAnalysis',
            children: [],
          },
          {
            title: '客户分析',
            key: '/performanceAnalysis/splitOrder/custom',
            children: [],
          },
        ],
      },
    ],
  },
  {
    title: '系统监控',
    key: '/monitor',
    children: [
      {
        title: '任务调度',
        key: '/monitor/spike',
        children: [],
      },
      {
        title: '服务监控',
        key: '/monitor/serviceMonitor',
        children: [],
      },
      {
        title: '流量监控',
        key: '/monitor/flowControl',
        children: [],
      },
    ],
  },
  {
    title: '系统管理',
    key: '/management',
    children: [
      {
        title: '用户管理',
        key: '/management/user',
        children: [],
      },
      {
        title: '角色管理',
        key: '/management/role',
        children: [],
      },
      {
        title: '南方数据权限管理',
        key: '/management/userAuthority',
        children: [],
      },
      {
        title: '金桥数据权限管理',
        key: '/management/jqUserAuthority',
        children: [],
      },
    ],
  },
];

```

### 笔记
- forEach 里的 return 只是退出当前回调，不会让外层函数返回！
- 创建新的对象并添加属性，使用map、结构，添加属性
- 使用 ... 做数组展开
- 注意递归返回的值和对象的遍历
```TS
type Node = {
  /** 节点唯一键 对应key */
  key: string;
  /** 节点名称 对应title */
  label: string;
  /** 父节点key */
  parentKey: string;
  /** 子节点 */
  children: Node[];
};

type TreeData = Node[];

// 原始数据类型
type OriginalNode = {
  title: string;
  key: string;
  children: OriginalNode[];
};

// 全局索引 Map，用于快速查找节点
let nodeMap: Map<string, Node> = new Map();

/**
 * 将原始数据转换为 Node 类型，并添加 parentKey
 * @param data 原始数据
 * @returns 转换后的树形数据
 */
function transformToTreeData(data: OriginalNode[]): TreeData {
  // 清空并重建 Map
  nodeMap = new Map();

  /**
   * 递归转换函数
   * @param nodes 当前层级的节点数组
   * @param parentKey 父节点的 key
   * @returns 转换后的节点数组
   */
  function transform(nodes: OriginalNode[], parentKey: string = ''): Node[] {
    return nodes.map(node => {
      // 创建新节点
      const newNode: Node = {
        key: node.key,
        label: node.title,
        parentKey: parentKey,
        children: [], // 先初始化为空数组
      };

      // 递归处理子节点，传入当前节点的 key 作为 parentKey
      newNode.children = transform(node.children, node.key);

      // 将节点添加到 Map 中，便于后续查找
      nodeMap.set(newNode.key, newNode);

      return newNode;
    });
  }

  return transform(data);
}

/**
 * 根据 key 获取对应的节点信息
 * @param key 节点的唯一键
 * @returns 对应的节点，如果不存在返回 undefined
 */
function getNode(key: string): Node | undefined {
  return nodeMap.get(key);
}

/**
 * 获取指定节点下所有层级子节点的 key
 * @param key 节点的唯一键
 * @returns 所有子节点的 key 数组
 */
function getAllChildKeys(key: string): string[] {
  const node = nodeMap.get(key);

  // 如果节点不存在，返回空数组
  if (!node) {
    return [];
  }

  const childKeys: string[] = [];

  /**
   * 递归收集所有子节点的 key
   * @param currentNode 当前节点
   */
  function collectKeys(currentNode: Node) {
    for (const child of currentNode.children) {
      childKeys.push(child.key);
      // 递归收集子节点的子节点
      collectKeys(child);
    }
  }

  collectKeys(node);

  return childKeys;
}
```
## 网格布局
``` text
题目描述：
给定一个数组，数组内存在每一个行列的信息
如： [{ row: 1, col: 2, sizeX: 3, sizeY: 4 }]
第一条数据的信息为该模块位于第一行，第二列，水平宽度为3份额，垂直高度为4份额，1份额大小为20px

每一行每一列的宽高，根据当前行列的最大值来定

测试数据：
[
{row: 13, col: 12, sizeX: 12, sizeY: 8},
{row: 1, col: 6, sizeX: 3, sizeY: 2},
{row: 1, col: 3, sizeX: 3, sizeY: 2},
{row: 3, col: 15, sizeX: 3, sizeY: 2},
{row: 3, col: 6, sizeX: 3, sizeY: 2},
{row: 5, col: 0, sizeX: 12, sizeY: 8},
{row: 13, col: 0, sizeX: 12, sizeY: 8},
{row: 1, col: 21, sizeX: 3, sizeY: 2},
{row: 3, col: 21, sizeX: 3, sizeY: 2},
{row: 1, col: 0, sizeX: 3, sizeY: 2},
{row: 1, col: 18, sizeX: 3, sizeY: 2},
{row: 3, col: 18, sizeX: 3, sizeY: 2},
{row: 5, col: 12, sizeX: 12, sizeY: 8},
{row: 0, col: 0, sizeX: 24, sizeY: 1},
{row: 3, col: 3, sizeX: 3, sizeY: 2},
{row: 3, col: 9, sizeX: 3, sizeY: 2},
{row: 1, col: 9, sizeX: 3, sizeY: 2},
{row: 1, col: 15, sizeX: 3, sizeY: 2},
{row: 3, col: 12, sizeX: 3, sizeY: 2},
{row: 1, col: 12, sizeX: 3, sizeY: 2},
{row: 3, col: 0, sizeX: 3, sizeY: 2},
]

实现一个通用的渲染逻辑，将一个数组内的模块信息都按行列及大小渲染出来
```
### 笔记
``` TS
/**
 * 动态网格布局渲染 - 核心算法
 *
 * 题目：给定模块的行列位置和尺寸，计算每个模块的实际渲染位置
 *
 * 核心思路：
 * 1. 找出每行的最大高度、每列的最大宽度
 * 2. 计算每行的累积 top 位置、每列的累积 left 位置
 * 3. 根据模块的 row/col，查表得到实际的 top/left
 */

const UNIT_SIZE = 20; // 1份额 = 20px

/**
 * 核心函数：计算网格布局
 * @param {Array} data - 模块数据 [{row, col, sizeX, sizeY}, ...]
 * @returns {Object} 布局信息
 */
function calculateGridLayout(data) {
  // ============================================
  // Step 1: 找出网格的边界（最大行号和列号）
  // ============================================
  let maxRow = 0;
  let maxCol = 0;

  data.forEach(item => {
    maxRow = Math.max(maxRow, item.row);
    maxCol = Math.max(maxCol, item.col);
  });

  console.log(`网格范围: ${maxRow + 1} 行 × ${maxCol + 1} 列`);

  // ============================================
  // Step 2: 初始化每行每列的最大尺寸数组
  // ============================================
  // rowHeights[i] 表示第 i 行的最大高度（份额）
  // colWidths[i] 表示第 i 列的最大宽度（份额）
  const rowHeights = new Array(maxRow + 1).fill(0);
  const colWidths = new Array(maxCol + 1).fill(0);

  // ============================================
  // Step 3: 遍历所有模块，更新每行每列的最大值
  // ============================================
  data.forEach(item => {
    const { row, col, sizeX, sizeY } = item;

    // 关键：当前行的高度 = max(当前行已有高度, 当前模块的高度)
    rowHeights[row] = Math.max(rowHeights[row], sizeY);

    // 关键：当前列的宽度 = max(当前列已有宽度, 当前模块的宽度)
    colWidths[col] = Math.max(colWidths[col], sizeX);
  });

  console.log('每行高度（份额）:', rowHeights);
  console.log('每列宽度（份额）:', colWidths);

  // ============================================
  // Step 4: 计算每行的累积位置（top 坐标）
  // ============================================
  // rowPositions[i] 表示第 i 行的起始 top 位置（像素）
  const rowPositions = [0]; // 第 0 行从 0px 开始

  for (let i = 0; i < rowHeights.length; i++) {
    const prevTop = rowPositions[i];
    const currentHeight = rowHeights[i] * UNIT_SIZE;
    const nextTop = prevTop + currentHeight;
    rowPositions.push(nextTop);
  }

  console.log('每行起始位置（px）:', rowPositions);

  // ============================================
  // Step 5: 计算每列的累积位置（left 坐标）
  // ============================================
  // colPositions[i] 表示第 i 列的起始 left 位置（像素）
  const colPositions = [0]; // 第 0 列从 0px 开始

  for (let i = 0; i < colWidths.length; i++) {
    const prevLeft = colPositions[i];
    const currentWidth = colWidths[i] * UNIT_SIZE;
    const nextLeft = prevLeft + currentWidth;
    colPositions.push(nextLeft);
  }

  console.log('每列起始位置（px）:', colPositions);

  // ============================================
  // Step 6: 计算每个模块的实际位置和尺寸
  // ============================================
  const renderedItems = data.map((item, index) => {
    const { row, col, sizeX, sizeY } = item;

    return {
      id: index,
      // 原始数据
      row,
      col,
      sizeX,
      sizeY,
      // 计算出的实际位置和尺寸
      top: rowPositions[row],      // 查表：第 row 行的起始位置
      left: colPositions[col],     // 查表：第 col 列的起始位置
      width: sizeX * UNIT_SIZE,    // 宽度 = 份额 × 单位大小
      height: sizeY * UNIT_SIZE,   // 高度 = 份额 × 单位大小
    };
  });

  // ============================================
  // Step 7: 计算容器总尺寸
  // ============================================
  const containerWidth = colPositions[colPositions.length - 1];
  const containerHeight = rowPositions[rowPositions.length - 1];

  console.log(`容器尺寸: ${containerWidth}px × ${containerHeight}px`);

  return {
    renderedItems,      // 渲染数据
    containerWidth,     // 容器宽度
    containerHeight,    // 容器高度
    rowHeights,         // 每行高度（份额）
    colWidths,          // 每列宽度（份额）
    rowPositions,       // 每行起始位置（像素）
    colPositions,       // 每列起始位置（像素）
  };
}

// ============================================
// 测试数据
// ============================================
const testData = [
  {row: 13, col: 12, sizeX: 12, sizeY: 8},
  {row: 1, col: 6, sizeX: 3, sizeY: 2},
  {row: 1, col: 3, sizeX: 3, sizeY: 2},
  {row: 3, col: 15, sizeX: 3, sizeY: 2},
  {row: 3, col: 6, sizeX: 3, sizeY: 2},
  {row: 5, col: 0, sizeX: 12, sizeY: 8},
  {row: 13, col: 0, sizeX: 12, sizeY: 8},
  {row: 1, col: 21, sizeX: 3, sizeY: 2},
  {row: 3, col: 21, sizeX: 3, sizeY: 2},
  {row: 1, col: 0, sizeX: 3, sizeY: 2},
  {row: 1, col: 18, sizeX: 3, sizeY: 2},
  {row: 3, col: 18, sizeX: 3, sizeY: 2},
  {row: 5, col: 12, sizeX: 12, sizeY: 8},
  {row: 0, col: 0, sizeX: 24, sizeY: 1},
  {row: 3, col: 3, sizeX: 3, sizeY: 2},
  {row: 3, col: 9, sizeX: 3, sizeY: 2},
  {row: 1, col: 9, sizeX: 3, sizeY: 2},
  {row: 1, col: 15, sizeX: 3, sizeY: 2},
  {row: 3, col: 12, sizeX: 3, sizeY: 2},
  {row: 1, col: 12, sizeX: 3, sizeY: 2},
  {row: 3, col: 0, sizeX: 3, sizeY: 2},
];

// ============================================
// 执行测试
// ============================================
console.log('========================================');
console.log('开始计算网格布局');
console.log('========================================\n');

const layout = calculateGridLayout(testData);

console.log('\n========================================');
console.log('渲染数据示例（前3个模块）：');
console.log('========================================');
layout.renderedItems.slice(0, 3).forEach(item => {
  console.log(`模块 ${item.id}:`);
  console.log(`  位置: row=${item.row}, col=${item.col}`);
  console.log(`  尺寸: ${item.sizeX}×${item.sizeY} 份额 = ${item.width}×${item.height}px`);
  console.log(`  渲染: top=${item.top}px, left=${item.left}px`);
  console.log('');
});

// ============================================
// 简化版本：如果只需要渲染位置
// ============================================
function simpleRender(data) {
  const layout = calculateGridLayout(data);

  return layout.renderedItems.map(item => ({
    id: item.id,
    style: {
      position: 'absolute',
      top: `${item.top}px`,
      left: `${item.left}px`,
      width: `${item.width}px`,
      height: `${item.height}px`,
    }
  }));
}

// ============================================
// React 组件示例
// ============================================
function GridLayoutComponent_Example() {
  /*
  const GridLayout = ({ data }) => {
    const layout = calculateGridLayout(data);

    return (
      <div
        className="grid-container"
        style={{
          position: 'relative',
          width: layout.containerWidth,
          height: layout.containerHeight,
        }}
      >
        {layout.renderedItems.map(item => (
          <div
            key={item.id}
            className="grid-item"
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
            }}
          >
            Row {item.row}, Col {item.col}
          </div>
        ))}
      </div>
    );
  };
  */
}
```