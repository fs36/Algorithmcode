
// 公鸡 5 元一只，母鸡3元一只，小鸡1元3只

// 修正后的鸡买法函数
function chickenPurchase(totalMoney, totalChickens) {
    const results = [];
    // 公鸡最多买 100/5 = 20 只
    for (let x = 0; x <= Math.floor(totalMoney / 5); x++) {
        // 母鸡最多买剩余钱 / 3
        for (let y = 0; y <= Math.floor((totalMoney - 5 * x) / 3); y++) {
            const z = totalChickens - x - y; // 小鸡数量
            if (z >= 0 && z % 3 === 0) { // 小鸡必须是3的倍数
                const cost = 5 * x + 3 * y + (z / 3) * 1;
                if (cost === totalMoney) {
                    results.push({ cock: x, hen: y, chick: z });
                }
            }
        }
    }
    return results;
}

// IPv4 地址组合函数
function getIPv4Combinations(str) {
    const results = [];
    const n = str.length;
    // 需要分成4部分，每部分1-3位
    for (let i = 1; i <= 3 && i < n; i++) {
        for (let j = i + 1; j <= i + 3 && j < n; j++) {
            for (let k = j + 1; k <= j + 3 && k < n; k++) {
                const part1 = str.slice(0, i);
                const part2 = str.slice(i, j);
                const part3 = str.slice(j, k);
                const part4 = str.slice(k);
                if (part4.length > 3) continue; // 第四部分最多3位
                const parts = [part1, part2, part3, part4];
                if (parts.every(p => p.length > 0 && parseInt(p) <= 255 && (p.length === 1 || p[0] !== '0'))) {
                    results.push(parts.join('.'));
                }
            }
        }
    }
    return results;
}

// 测试
console.log('鸡的买法：', chickenPurchase(100, 100));
console.log('IPv4 组合：', getIPv4Combinations('123123125'));

