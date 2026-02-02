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
    for(let i=0;i<n;i++){
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