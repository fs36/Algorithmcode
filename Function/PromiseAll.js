Promise.mpAll = function (promiseList = []) {
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;

        promiseList.forEach((p, index) => {
            Promise.resolve(p).then(res => {
                result[index] = res; // 按顺序放入对应位置
                count++;
                if (count === promiseList.length) {
                    resolve(result);
                }
            }).catch(reject); // 只要一个失败就立即 reject
        });

        // 空数组处理（forEach 不会执行）
        if (promiseList.length === 0) {
            resolve([]);
        }
    });
};

