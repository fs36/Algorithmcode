// 请补全JavaScript代码，完成函数的接口功能。要求如下：
// 1. 函数接收两种类型的参数，分别为"get?"和"update?name=xxx&to=yyy"，"xxx"、"yyy"为参数。
// 2. 当参数为"get?"时，返回data数据
// 3. 当参数为"update?name=xxx&to=yyy"时，更改data数据中"name"为"xxx"的值为"yyy"

let data = [
    {name: 'nowcoder1'},
    {name: 'nowcoder2'}
]
const _api = string => {
    let method = string.split('?')[0]
    switch (method) {
        case 'get': {
            return data
        }
        case 'update': {
            let query = string.split('?')[1]
            let name = query.split('&')[0].split('=')[1]
            let to = query.split('&')[1].split('=')[1]
            for (item of data) {
                if (item.name === name) item.name = to
            }
            break
        }
        default: {
            return ''
        }
    }
}


