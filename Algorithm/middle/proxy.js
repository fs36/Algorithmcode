// 请补全JavaScript代码，请给参数对象添加拦截代理功能并返回这个代理。要求如下：
// 1. 该函数接收多个参数，首个参数为对象，从第二个参数（包括）往后皆是该对象的属性名
// 2. 通过该函数给首个参数对象添加拦截器功能，每当该对象访问到该函数第二个参数（包括）往后的属性时，返回"noright"字符串，表示无权限。
const _proxy = (object, ...prototypes) => {
    // 补全代码
    return new Proxy(object, {
        get(target, prop) {
            if(prototypes.includes(prop)) {
                return "noright";
            }
            return target[prop];
        }
    })
}
// let proxy = new Proxy(target, handler);
// target
// 被代理的目标对象（比如 { }、数组、函数等）。

// handler
// 包含拦截方法的对象，每个方法叫 陷阱（trap），比如 get、set、has 等，用来拦截对 target 的操作。

// get(target, prop, receiver)
// target
// 目标对象，即被代理的原始对象。
// 👉 在例子里就是传进来的 object。

// prop
// 被访问的属性名。
// 👉 如果你写 proxy.name，这里的 prop 就是 "name"。

// receiver（可选，一般不用）
// 代理对象本身（通常就是 proxy）。
// 👉 在继承场景下有用，可以保证正确的 this 绑定。