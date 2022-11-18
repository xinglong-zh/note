//  测试节流  ， 防抖 ， call apply ,bind


function logInfo(msg) {
    // 打印一些东西
    console.log('测试', new Date(), msg);
}

let test = debounce(logInfo, 2000);

let test1 = throttle(logInfo, 2000);

var timeIn = setInterval(() => {
    // test("防抖");
    // logInfo("正常");
    // test1("节流");
}, 1000)


setTimeout(() => {
    clearInterval(timeIn);
}, 10000);




// 一秒打印一次 ，5秒后停止

// 准备防抖函数
/**
 * 延迟到 delay 之后执行 ， 
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce(fn, delay) {
    let timer = null;
    return function () {
        let _this = this;
        let _arguments = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(_this, ..._arguments);
        }, delay)
    }
}

/**
 * delay 时间内  ， 函数只执行一次
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            //  do nothing
            return;
        }
        let _this = this;
        let _arguments = arguments;
        timer = setTimeout(() => {
            fn.apply(_this, _arguments);
            timer = null;
        }, delay);

    }
}

/**
 * 模拟 call 调用 ， 
 * @param {*} context 
 * @param  {...any} args 
 * @returns 
 */

Function.prototype.call2 = function (context, ...args) {
    console.log(this, context, args);
    let fn = '__fn__'
    context[fn] = this; //  this 指向的就是函数
    let res = context[fn](...args)
    delete context[fn];
    return res;
}

/**
 * 利用闭包 ，返回新函数
 * @param {*} context 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype.bind2 = function (context, ...args) {
    let _this = this;
    return function () {
        return _this.call(...args);
    }
}


/**
 * 原型链实现继承
 * 问题:继承的引用类型 ，全部实例共享
 */

function SuperType(value) {
    this.property = value;
}
function SubType(value) {
    this.subProperty = value;
}
subType.prototype = new SuperType();  // 原型链挂载实例 ， 关键代码

/**
 * 盗用构造函数
 * 问题： 无法调用父类的方法 ，函数
 */

function SuperType(value) {
    this.value = value;
}

function SubType(value) {
    SuperType.call(this, "args");     // 调用构造函数，实现继承 
    this.name = value;
}

/**
 * 组合式继承 = 原型链 + 盗用构造函数
 * 问题 ： 调用两次构造函数
 */

function SuperType(value) {
    this.property = value;
}

function SubType(value) {
    SuperType.call(this, "args");  // 盗用构造函数方式 ， 调用构造函数  (2)
    this.subProperty = value;
}

SubType.prototype = new SuperType();   // 原型链的方式 ，  调用构造函数（1）


/**
 * 原型式继承 ,
 * 问题 ： 引用对象 所有实例共享
 */

function object(o) {
    function F() { };
    F.prototype = o;  //基于传入对象，创建新对象 ，  Object.create();
    return new F();
}


/**
 * 寄生式继承 , 增强对象
 */

function createAnother(original) {
    let clone = object(original);   // 返回临时对象
    clone.sayHi = function () {       // 增强对象
        console.log('hello world');
    }
    return clone;  // 返回增强后的目标
}



/**
 * 寄生式组合继承 = 寄生式 + 组合继承(原型+构造函数)
 */

function inheritPrototype(subType, superType) {
    let prototype = createAnother(superType); //创建对象
    prototype.constructor = subType;  //  增强对象
    subType.prototype = prototype;  //  赋值对象
}


function SuperType() {
}
function SubType() {
    SuperType.call(this); //  构词函数
}
inheritPrototype(SubType, SuperType);