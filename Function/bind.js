Function.prototype._bind = function (target, ...arguments1) {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    const originalFunc = this
    return function (...args) {
        return originalFunc.apply(target, arguments1.concat(args))
    }
}