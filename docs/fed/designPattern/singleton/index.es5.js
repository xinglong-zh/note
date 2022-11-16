/**
 * class 只是语法糖, 内部还是依赖原型链进行实现
 */

var Singleton_01 = function (value) {
    this.value = value;
    this.instance = null
}

Singleton_01.prototype.getName = function () {
    return this.value
}


Singleton_01.getInstance = function (value) {
    if (!this.instance) {
        this.instance = new Singleton_01(value)
    }
    return this.instance;
}


// 利用闭包
Singleton_01.getInstance01 = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton_01(name)
        }
        return instance
    }
})()


var a = Singleton_01.getInstance('demo')
var b = Singleton_01.getInstance('demo2')

var c = Singleton_01.getInstance01('demo')
var d = Singleton_01.getInstance01('demo2')



console.log('a === b', a === b)
console.log('c === d', c === d)


/**
 * 这里的单例模式，具有两个职能，创建对象+全局访问节点，需要进行优化
 */
const getSingle = function (creatFn) {
    let result;
    return function () {
        return result || (result == creatFn.apply(this, arguments))
    }
}

const creatSingle = function (value) {
    return new Singleton_01(value)
}


const getInstance = getSingle(getSingle)

const instance01 = getInstance('demo1')
const instance02 = getInstance('demo2')

console.log('instance01===instance02', instance01 === instance02)
