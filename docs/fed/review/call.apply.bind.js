/**
 * call ,apply
 * 1.第一个参数是this指向的对象，不传or 传如undefined ，null 默认指向window
 * 2. 改变this指向，并立即执行
 * 
 */

Function.prototype.myCall = function (context, ...args) {
    if (context === 'undefined' || context === null) {
        context = window
    }
    const symbol = Symbol();
    context[symbol] = this; // 这里this是调用call时的方法
    const result = context[symbol](...args); // 执行方法
    delete context[symbol];// 删除方法
    return result
}


function sum(num1, num2) {
    return num1 + num2;
}

let res = sum.myCall(null, 1, 2)
console.log('call:res is', res)

/**
 * apply ，临时改变this并执行，接收数组
 * @param {*} context 
 * @param {Array} args 
 * @returns 
 */
Function.prototype.myApply = function (context, args) {
    if (context === undefined || context === null) {
        context = window;
    }
    const symbol = Symbol();
    context[symbol] = this;
    let result;
    if (args.length) {
        result = context[symbol](...args);
    } else {
        result = context[symbol](); // 无参数
    }
    delete context[symbol];
    return result;
}

res = sum.myApply(null, [1, 2]);
console.log('apply:res', res)


/**
 * 1. 修改this指向
 * 2. 动态传递参数： fn.bind(obj,1,2)()  fn.bind(obj,1)(2)
 * 3. 兼容new关键字
 * @param {*} context 
 */
Function.prototype.myBind = function (context) {
    if (context === undefined || context === null) {
        context = window;
    }
    const args = [...arguments].slice(1)
    const fn = this;
    return function F() {
        // 兼容new 关键字
        if (this instanceof F) {
            // new 关键字this不会被改变，固定在实例上
            return new fn(...arguments)
        }
        // 返回函数： f.bind(obj, 1)(2)
        return fn.apply(context, args.concat(...arguments))
    }
}