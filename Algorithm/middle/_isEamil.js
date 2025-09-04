// 描述: 判断输入是否是正确的邮箱格式
// 输入描述：邮箱字符串
// 输出描述：true表示格式正确
function isAvailableEmail(sEmail) {
    return /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-z]{2,6})+$/.test(sEmail)
}