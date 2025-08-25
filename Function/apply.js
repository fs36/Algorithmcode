Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') {
        throw new TypeError('myApply must be called on a function');
    }

    context = (typeof context === 'object' && context !== null) ? context : window;
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;

    let result;
    if (Array.isArray(args)) {
        result = context[fnSymbol](...args);
    } else if (args === undefined || args === null) {
        result = context[fnSymbol]();
    } else {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    delete context[fnSymbol];
    return result;
};
