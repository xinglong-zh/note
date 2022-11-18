/**
 * 原型链实现继承
 * 问题:继承的引用类型 ，全部实例共享，引用类型变化。相互影响
 */


function SuperType(value) {
    this.property = value
    this.colors = ['red', 'yellow']
}

SuperType.prototype.getValue = function () {
    return this.property
}

function SubType(value) {
    this.subProperty = value;
}

// 继承, 改变原型指向
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
    return this.subProperty;
}

const instance = new SubType();

console.log(instance instanceof SuperType, instance.colors)
// true (2) ['red', 'yellow']



/**
 * 1. instance 是SuperType 实例，实现了继承
 * 2. colors 等属性成为了原型属性，所有实例共享
 */



/**
 * 组合继承：原型链+盗用构造函数
 * 基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性
 */
function Parent(value) {
    this.val = value
}
function Child(value) {
    // 盗用构造函数继承
    Parent.call(this, value); // 盗用构造函数方式 ， 调用构造函数  (2)
}
// 原型继承
Child.prototype = new Parent(); // 原型链的方式 ，  调用构造函数（1）





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


