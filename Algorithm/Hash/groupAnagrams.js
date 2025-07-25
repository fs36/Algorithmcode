/* 
2-字母异位词分组
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
示例 :

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

输出: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

解释：
在 strs 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。*/

function groupAnagrams(strs) { 
    const map = new Map();
    for (let str of strs) {
        // 将字符串排序后作为key，所有字母异位词的key是相同的
        // split的作用是把字符串变成数组，sort是排序，join是把数组变成字符串
        const key = str.split("").sort().join("");
        // 如果map中没有这个key，就创建一个新的数组
        if(!map.has(key)) {
            map.set(key, []);
        }
        // 并将当前字符串添加到这个数组中
        map.get(key).push(str);
    }
    // map.value返回的是所有value值组成的对象，
    // Array.from把对象和类数组变成真正的数组
    return Array.from(map.values());
}
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const result = groupAnagrams(strs);
console.log(result); // [["eat","tea","ate"],["tan","nat"],["bat"]]