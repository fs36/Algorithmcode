// 请补全JavaScript代码，要求将字符串参数URL中的参数解析并以对象的形式返回。
// 示例1
// 输入：getParams('https://nowcoder.com/online?id=1&salas=1000')
// 输出：{ id: 1, salas: 100 }
const _getParams = (url) => {
    // 1. 找到 ? 后面的部分
    let queryStr = url.split('?')[1];
    if (!queryStr) return {}; // 没有参数时返回空对象

    // 2. 拆分成 key=value
    let pairs = queryStr.split('&');

    // 3. 构造对象
    let result = {};
    pairs.forEach(pair => {
        let [key, value] = pair.split('=');
        // 尝试把数字字符串转成数字
        result[key] = isNaN(value) ? value : Number(value);
    });

    return result;
};

// 示例
console.log(_getParams('https://nowcoder.com/online?id=1&salas=1000'));
// { id: 1, salas: 1000 }
