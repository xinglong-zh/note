### 闭包
---

```js
/**
 * 词法作用域：嵌套函数可访问声明于它们外部作用域的变量
 * 
 * **/
function init(){
    let name = "closure"  // init 函数创建
    function display(){
        console.log(name)  // 可以访问外部函数的局部变量
    }
    display()
}
// 内部函数可以访问外部函数的作用变量

/**
 * display 在执行之前被返回
 * **/
function init(){
    let name = "closure"  // init 函数创建
    function display(){
        console.log(name)  // 可以访问外部函数的局部变量
    }
    return display
}

let fc = init()   // closure
fc()

// 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量
// fc 是对init 创建display实例的引用 ，display 实例维护了词法环境，  创建时 作用域内的变量   name

function add(x){
    return function(y){
        return x +y
    }
}

let add5 = add(5)    //  return    function(y){ return  x + y}
// add5 5 维护了闭包的环境，x变量的值被保留
add5(10)  //15

let add10 = add（10）
add10(3)


/**
 * 闭包允许将函数和所操作的环境关联起来   ，类似于类   对象方法和对象属性相关联
 * **/


// 闭包性能稍慢
```