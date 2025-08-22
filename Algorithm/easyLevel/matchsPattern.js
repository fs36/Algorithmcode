/**给定字符串 str，检查其是否符合如下格式
1、XXX-XXX-XXXX
2、其中 X 为 Number 类型
输入描述：
'800-555-1212'
输出描述：
true */
function matchsPattern(str) { 
    // 使用正则表达式检查格式
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    return pattern.test(str);
}