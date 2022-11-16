# 小册面试总结
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
## JS异步编程
## 手写promise
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