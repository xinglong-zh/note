/**
 * 实现深拷贝,
 * weakMap 解决循环引用问题
 * Reflect.ownKeys 解决symbol 作为键的问题
 * new target.constructor() ， 解决函数、数组
 */

function deepClone(target,hash=new WeakMap()){
    if(target ===null) return target; // null 不处理
    if(typeof target !=='object') return target;// 原始类型不处理
    
    if(hash.get(target)) return hash.get(target);
    const cloneTarget = new target.constructor();
    hash.set(target,cloneTarget);
    Reflect.ownKeys(target).forEach(key=>{
        cloneTarget[key] = deepClone(target[key],hash)
    })
    return cloneTarget;
}

const obj = {
    a:124,
    b:{
        foo:function(){
            console.log('abc')
        },
        c:400
    }
}

const newObj = deepClone(obj);
obj.a.c=800

console.log(newObj.b)