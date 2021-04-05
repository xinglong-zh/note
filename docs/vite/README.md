# vue2

## mvvm

<https://cn.vuejs.org/v2/guide/reactivity.html>

```js
???  直接key 是否可用
const obj = {}
Object.defineProperty(obj,'a',{
    get:function(){
        return value;
    },
    set:function(val){
        value= val;
    }
})
```

```javaScript
/**
 * 
 * @param {*} data  obj 
 * @param {*} key  obj.key
 * @param {*} value  属性值 ，构建闭包环境使用 
 */
export function defineReactive(data,key,value){
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get(){
            return value;
        },
        set(newVal){
            if(newVal===value){
                return;
            }
            value = newVal;
        }    
    })
}
// vue 源码参考  observer/index.js/defineReactive 
```

```js
// obj 属性嵌套的解决方案      a.b.name

observe  -->  __ob__ --> class Observer -->  def(value,'__ob')  --> walk -->defineReactive  --> observe    // 递归调用链  ， 需要看vue的源码
```
