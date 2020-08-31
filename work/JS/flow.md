### 流程控制和错误处理
---

+ 语句块    { } + 语句  = 语句块 ，{ } 限制范围
```js
/**
 * es6 中语句块有作用域的概念 ，let const 基于语句块的作用域，不会被提升
*/
{
    statement_1;
     statement_1;
      statement_1;
}

// 条件语句
if(condition_1){
    dosomethong()
}else if(condition_2){
    some()
}else {
    thing()
}

condition: false , undefined ,null , 0 ,NaN ,''   //  被视为false

switch (expression){
    case label_1:  dosomething();break;
    case label_2:  some();break;
    ...
    default:
        something()
}

// 异常处理
throw  exp
throw new Error('error name ');  
throw {key:value}   //可以自定义对象

try {
    dosomething()

}catch(e){
    
    handle(e)
}finally{
   
    done()
}
/**
 * es6 支持promise
*/
Promise 的状态如下:
pending    初始状态，正在执行
fullfilled  成功的完成了操作
rejected    失败，没有完成操作
settled     处于fullfilled or rejected 之间 ，非 pending状态 

new Promise((resolve,reject)=>{
    resolve('')  // 成功返回 ，  状态fullfilled

    reject('')  // 失败返回  ， 状态 settled
})


// 循环 
for(let i=0;i<n;i++){

}
/**
 * do while
*/
do {

}while (i<n)

/**
 * while
*/
while(true){

}

/**
 * label:
 *  statement
*/

outPoint:
for(let i =0;i<10;i++){
    inPoint:
    for (let j=0;j<10;j++){
        break outPoint; // 跳出外层循环
        continue inPoint;  // 继续外层循环
    }
}

/**
 * for ... in 遍历对象的     所有可枚举属性
*/
for (val in obj){

}
let arr = [1,2,3]
arr.foo ='foo'
for ... in 的时候会被遍历出来  1,2,3,foo  所有可枚举属性

/**
 * for ... of   遍历 array  map  set arguments 等  ，在可迭代对象上创建一个循环
*/
for (val of obj){

}

```
