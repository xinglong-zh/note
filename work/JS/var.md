### 变量
---

1. 变量声明 
```js
/**
 * 变量 :字母 ，下划线(_) 美元开头($)
*/
let  a ;  // 块作用域的局部变量 ，初始值可选
const $b = 'xxx';    // 块作用域的只读常量
var _c;     // 变量，初始值可选
```
+ let ，var  没有初始值时 ，值为undefined ，  a ===undefined 来判断是否已经赋值<br> undefined 类型转换    Boolean ->false  Number -> NaN  
+ 变量作用域： es6  有语句块的作用域概念 ，语句块内部声明的变量，外部无法访问 
```js
if(true){
    let y=5   // 存在if语句块内部
} 
console.log(y)   // if语句块外 ，访问不到
```
+ 变量提升：所有var 声明的变量都会提升到函数或语句的最前面 ， 可以先使用，后声明，但是会返回undefined <br>es6中  let语句声明的变量不会进行状态提升  ，声明之前引用会抛出异常
```js
console.log(x)     // x===undefined
var x

console.log(x)      //  x 处在  暂时性死区中
let x =3 ;
```
+ 函数提升  function 声明的函数可以被提升到顶部
```js
foo();   // 先使用后声明
function foo(){
    
}

bar() ; // 函数表达式 ， 此时不能使用

var bar = function(){

}
```

### 数据结构和类型
------

es6 定义了八种数据类型：<br>
基本数据类型
+ Boolean      true /false
+ null      关键字
+ undefined  关键字
+ Number    数字  整数和浮点数
+ BigInt   任意精度的整数    可以储存个操作大数
+ String    字符串
+ Symbol    实例唯一且不可变的数据类型   new Symbol('xxx) 

对象
+ Object    存放值的容器
