### 函数
---

+ 定义函数 
```js
/**
* 定义一个函数  function 关键字  ，function 关键字定义的函数可以被提升到顶部 ，先使用 后声明不会报错
**/
function (param){
     sth.();
     return value ;
}


// 函数表达式   , 可以是匿名函数  ，函数表达式定义的函数 不会状态提升到顶层
const fc = function(param){ }       // 匿名函数
or  
const fc = (param)=>{}
or 
const fc = function fc(param) { }  // 提供函数名

// 函数作用域
/**
*  外部函数  ，只能访问内部函数，不能访问内部函数的变量
*/
function (parma){
    /**
      *内部函数
    */
    function(){
        let b        // 可以局部变量，父函数变量 ，全部变量
    }
}

/**
    闭包
*/
function out(x){
    /**
        传入 x 的时候 返回 in 函数 ， in 可以访问out的变量，自身可以接收变量y
    */
    function in (y){
        return x+y
    }
    return in 
}

fn_in = out(5)  // 返回一个函数 in
/***
    in(y){
        return x +y
    }
*/

res = fn_in(3)   //8  

res = out(5)(3)

// arguments 函数的实际参数被包含在arguments 数组中 ，使用index可以访问
// 类数组对象: 无法使用数据的全部方法，例如 forEach
function fc(params){
    for(let value of arguments){
        console.log(value)
    }
    // arguments.forEach((val)=>console.log(val))
}

fc(1,2,3)  //  1,2,3

/**
默认参数 ，剩余参数
*/
function fc(factor=2 , ...rest){
    return rest.map((val)=>factor*val)
}
fc(2,2,3)  // [4,6]

/**
    箭头函数   （param）=>{ sth.() 
    总是匿名的，可以捕捉闭包的上下文 this 
*/

[1,2,4].map((val)=>val*2)


```
+ 预定义函数
```js
eavl(str)         //将传入的str当做js代码执行， 不安全（权限与调用者相同，可以通过作用域执行恶意代码），速度慢（调用js接收器，无法被js引擎优化）   不建议使用

isNan()
isFinite()
parseInt()
parseFloat()
encodeURI()
encodeURIComponent()
```