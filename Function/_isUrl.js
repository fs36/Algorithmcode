/*
请补全JavaScript代码，要求以Boolean的形式返回字符串参数是否为合法的URL格式。
注意：
1. 协议仅为HTTP(S)
*/
const _isUrl = url => {
    const reg = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
    return reg.test(url);
};
