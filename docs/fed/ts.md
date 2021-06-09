# TypeScript

---

## Function

> call()方法的作用和 apply() 方法类似，**区别** 就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

+ apply  
在一个对象的上下文中应用另一个对象的方法；参数能够以数组形式传入。

+ call
在一个对象的上下文中应用另一个对象的方法；参数能够以列表形式传入。

```js
func.apply(thisArg, [argsArray])
function.call(thisArg, arg1, arg2, ...)


let numbers = [5, 6, 7, 8, 9]

let max = Math.max.apply(null, numbers);
let array = ['a', 'b'];
//  apply 接收参数数组， []
numbers.push.apply(numbers, array);
// call 接收参数列表
numbers.push.call(numbers, ...array);

```

+ bind
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

+ 对象池

```js
objectPoolFactory: function (createFn) {
      let objects = [];
      // 利用闭包
      return {
        create: function () {
           let obj = objects.length? objects.shift(): createFn.apply(this,arguments);
           return obj;
        },
        recover: function (obj) {
            objects.push(obj);
        },
      };
    }
```
