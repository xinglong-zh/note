### 对象
---
+ 枚举一个对象的属性
```js
// es6 
for ... in 
Object.keys(o)  //返回o的所有可枚举值
Object.getOwnPropertyNames(o)  // 返回o自身的所有属性 ，无论是否可枚举
```

+ 创建新对象
```js
function Car(name,color){
    this.name = name;
    this.color = color;
}

let car = new Car('benz','red')

// 为对象类型定义属性
Car.prototype.make = null
car.make = 'ford'


/**
 * getter setter 
 * **/
const obj = {
    property:value,
    get property(){
        return property
    },
    set property(newVal){
        this.property = newVal
    }
}

// defineProperties
Object.defineProperties(o,{
    'b':{get function(){return this.a}},
    'c':{set function(x){this.a = x}}
})


let sub_obj = Object.create(obj)   // 为创建的对象选定一个原型

```