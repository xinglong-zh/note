/**
 * 1. 创建一个新对象obj {}
 * 2. 对象与构建函数的原型链接起来  __proto__
 * 3. 构建函数的this绑定到对象obj上, call,apply
 * 4. 返回新对象，原始值忽略
 * @param {Function} Func 
 * @param  {...any} args 
 */
function create(Func, ...args) {
    // 1. 创建一个新对象obj
    let obj = {};
    // 2. 对象与构建函数的原型链接起来
    obj.__proto__ = Func.prototype; // Func.prototype = contructor ,原型链
    // 3. 构建函数的this绑定到对象obj上
    let result = Func.apply(obj, args);
    // 4.返回新对象，原始值忽略
    return result instanceof Object ? result : obj;
}


/**
 * instanceof 运算符用于检测构造函数的prototype 属性是否出现在某个实例对象的原型链上
 * 顺着原型链去找，直到找到相同的原型对象，返回true，否则为false
 * @param {*} left 
 * @param {*} right 
 */
function myInstanceof(left, right) {
    // 基础数据类型，return false
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left); // 获得原型对象
    // 遍历原型链
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;// 找到相同原型对象，返回true
        proto = Object.getPrototypeOf(proto); // 获得proto 原型
    }
}