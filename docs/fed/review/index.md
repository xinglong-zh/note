# 面试准备
## JS基础知识点
### 类型
JS类型分为两种:**原始类型**,**引用类型**
**原始类型**分为七种
- null
- undefined
- number
- string 
- boolean
- symbol
- bigint

**引用类型**，非原始类型均为引用类型

### 面试题
**0.1 + 0.2 !== 0.3**
问题: 十进制0.1,0.2 在进行二进制转换的时候，精度丢失。导致最后的结果不是0.3
```js
0.1.toString(2)  ==> '0.0001100110011001100110011001100110011001100110011001101' (无限循环)
0.2.toString(2)  ==> '0.001100110011001100110011001100110011001100110011001101' （无线循环）
0.3.toString(2)  ==> '0.010011001100110011001100110011001100110011001100110011'
```
**大数相加、大数相乘**

<<< @/fed/review/bigNum.ts
### 类型判断
typeof 可以判断原始类型，typeof null 会判断为object
instanceof 基于原型链判断对象类型, 可以覆写Symbol.hasInstance，控制其返回结果，不可信
Object.prototype.toString.call（）,可以正确判断类型

```js
class PrimitiveString {
    static [Symbol.hasInstance](x){
        return typeof x==='string'
    }
}
```
![this指向](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0d9e65d315749a48e256d791a710097~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 闭包
> 假如一个函数能访问外部的变量，那么就形成了一个闭包
```js
for (var i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i)
  })
}

// 6

// 块级作用域的局部变量
for (let i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i)
  })
}

// 1 2 3 4 5 
```
### 浅拷贝、深拷贝
- 但是浅拷贝只进行一层复制，深层次的引用类型还是共享内存地址，原对象和拷贝对象还是会互相影响。
- 深拷贝就是无限层级拷贝，深拷贝后的原对象不会和拷贝对象互相影响
**浅拷贝**： object.assign()   , 扩展运算符可实现目的
**深拷贝**
- JSON.parse()可以解决大部分问题，但是会忽略函数，undefined，symbol
### 原型链
p1 ===> Parent ==> Object
[原型链](https://segmentfault.com/a/1190000021232132)

```
__proto__(指向上层原型), constructor(记录谁创造了自己)属性为对象所有，
prototype 为函数所有(new 对象)

p1.__proto__ == Parent.prototype , p1的__proto__指向Parent的原型属性
Person.prototype.constructor == Person ，Parent 原型的构造函数指向他自身

通过__proto__ 进行相互链接，形成了原型链 
p1 ===> Parent ==> Object   
p1.__proto__  ==> Parent.prototype.__proto__  ==> Object.prototype.__proto__  ==> null

```


## ES6知识点
### 提升
- var声明会有变量提升，即未声明也可以使用
- let const 存在暂时性死区，先声明后使用
- 函数提升，会提升到顶部

### 继承实现
#### 原型链
#### 组合继承
#### 寄生继承: 原型通过对超类的复制得到，不包含超类的实例属性
<<< @/fed/review/extends.js
#### class 继承
class 继承行为+结构，不继承数据
传统继承（寄生组合式），继承行为+结构+数据

### CJS，AMD，UMD，ESM
[打包格式](https://segmentfault.com/a/1190000040282826)<br>
[打包格式](https://segmentfault.com/a/1190000012419990)
#### CJS：CommonJS
- 特点：
>1、模块可以多次加载，但是只会在**第一次加载时运行一次**，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
>2、模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载。

- 环境:服务器环境使用
- 示例
```js
//importing 
const doSomething = require('./doSomething.js'); 

//exporting
module.exports = function doSomething(n) {
  // do something
}
``` 
#### AMD：异步模块定义
- 特点：
>1、异步加载, define 关键字
- 环境：浏览器环境
- 示例
```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```

#### UMD:Universal Module Definition
- 特点
> 兼容AMD和commonJS规范的同时，还兼容全局引用的方式
- 环境：浏览器或服务器环境
- 示例
```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //方法
    function myFunc(){};
    //暴露公共方法
    return myFunc;
}));
```

#### ESM:ES Modules
- 特点
> 1、按需加载，编译时
- 示例
```js
import {foo, bar} from './myLib';

export default function() {
  // your Function
};
```
总结
- ESM得益于简单的语法、异步和摇树的特点，基本上就是最好的模块机制了
- UMD哪里都可以用，所以被用作备用打包方案
- CJS是同步的，在后端中用的比较多
- AMD是异步的，对前端友好

### proxy
[vue3 proxy]https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#what-is-reactivity


### Array API
https://vue3js.cn/interview/JavaScript/array_api.html#%E4%B8%80%E3%80%81%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95
https://juejin.cn/post/7101163833120522248
数组的操作分为增删查改
#### 增: concat()不影响原数组
- push()
- unshift()
- splice(index,0,item): index代表起始位置,0(删除元素个数)，插入的元素 
- concat()
#### 删：slice() 不影响原数组
- pop()
- shift()
- splice(index,num)：index代表起始位置，num删除元素个数
- slice()

#### 改:修改原数组
- splice(index,num,...items): index位置删除num个元素，同时插入 ...items
#### 查：
- indexOf()
- find()
- includes()

---
#### 排序方法
- sort(compareFn):可接受比较方法,lambda表达式
- reverse():翻转
#### 转换
- join()

#### 迭代:不改变原始数组
- forEach():没有返回值
- some():有一项满足即可
- every()：所有项均要满足
- filter():返回lambda 为true组成的数组
- map():返回新数组
- reduce(cb,?initialValue):返回新数组


### object , map , weakMap

## JS异步编程

## 手写promise
https://juejin.cn/post/6850037281206566919<br>
http://dennisgo.cn/Articles/JavaScript/Promise.html<br>
https://zhuanlan.zhihu.com/p/144058361<br>

<<<  @/fed/review/Promice.js
## Event Loop
## JS进阶知识点
## 浏览器基础知识点
## webpack
## vue
## react
## 监控
## 设计模式
## 数据结构
## 算法
## TS
## 单元测试