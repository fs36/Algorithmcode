// 165. 比较版本号
// 给你两个 版本号字符串 version1 和 version2 ，请你比较它们。版本号由被点 '.' 分开的修订号组成。修订号的值 是它 转换为整数 并忽略前导零。
// 比较版本号时，请按 从左到右的顺序 依次比较它们的修订号。如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0。

// 返回规则如下：
// 如果 version1 < version2 返回 - 1，
// 如果 version1 > version2 返回 1，
// 除此之外返回 0。

// 示例 1：
// 输入：version1 = "1.2", version2 = "1.10"
// 输出：-1
// 解释：
// version1 的第二个修订号为 "2"，version2 的第二个修订号为 "10"：2 < 10，所以 version1 < version2。
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    let version1arr = version1.split('.').map(item => parseInt(item))
    let version2arr = version2.split('.').map(item => parseInt(item))
    for (let i = 0; i < version1arr.length || i < version2arr.length; i++) {
        let v1 = i < version1arr.length ? version1arr[i] : 0
        let v2 = i < version2arr.length ? version2arr[i] : 0
        if (v1 > v2) {
            return 1
        } else if (v1 < v2) {
            return -1
        }
    }
    return 0
};

console.log(compareVersion("1.01", "1.001")); // 0
