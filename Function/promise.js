 function MyPromise(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.callBacks = [];

    const resolve = (value) =>{
        if(this.status === "pending" ){
            this.status = "fulfilled"
            this.value = value;
            this.callBacks.forEach(callback => callback.onFulfilled(value));
        }
    }
    const reject = (reason)=>{
        if(this.status === "pending"){
            this.status = "rejected"
            this.reason = reason;
            this.callBacks.forEach(callback =>callback.onRejected(reason));
        }
    }
    try{
        executor(resolve,reject)
    } catch(error){
        reject(error)
    }
 }

 MyPromise.prototype.then = function(onFulfilled,onRejected){
    if(this.status ==="fulfilled"){
        onFulfilled(this.value)
    } else if(this.status === "rejected"){
        onRejected(this.reason)
    } else{
        //存入的是对象
        this.callBacks.push({onFulfilled,onRejected})
    }
 }
 //onFulfilled:当Promise成功时要执行的回调函数
 // onRejected：当Promise失败时要执行的回调函数
 // 都由then传入

 // executor 执行器函数，就是你传入的那个函数，在new Promise时会立即执行，作用：决定Promise的状态
 // 并接收两个参数：
    // resolve：成功时调用，它会将Promise的状态从“未完成”变为“成功”，并传入成功的值。
    // reject：失败时调用，它会将Promise的状态从“未完成”变为“失败”，并传入失败的原因。