// 请补全JavaScript代码，请给参数对象添加拦截代理功能，并返回这个代理，
// 要求每当通过代理调用该对象拥有的属性时，"count"值加1，否则减1。
let count = 0;

const _proxy = object => {
    return new Proxy(object, {
        get(target, prop) {
            if (target.hasOwnProperty(prop)) {
                count++;
            } else {
                count--;
            }
            return target[prop]; // 返回原属性值
        }
    });
};
