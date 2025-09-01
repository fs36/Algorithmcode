// 请补全JavaScript代码，
// 要求将数组参数中的对象以总成绩(包括属性"chinese"、"math"、"english")
// 从高到低进行排序并返回。
const _rank = array => {
    return array.sort((a, b) => {
        // 计算每个人的总成绩
        const sumA = a.chinese + a.math + a.english;
        const sumB = b.chinese + b.math + b.english;
        // 从高到低排序
        return sumB - sumA;
    });
};
