###  keyed_collection
---
+ Map
```js
let map = new Map()
map.set('dog','wangwang')
map.set('cat','miaomiao')

map.size

map.has('cat')
map.delete('cat')

for(let [key,value] in map){
    console.log(key,value)
}

// map 的key可以为任意类型  ，添加顺序有序

```
+ WeakMap
```js

```
+ Set
```js
//set 是一组值的集合，值不可重复 ，添加顺序有序
let set = new Set()
set.add(1)
set.add('text')

set.has('text')
set.delete(1)

set.size

Array.from(set)

Set.from(arr)  // 可以做去重

// array with set 
// indexOf()  效率不如  has()
// 不包含重复对象
// array 要求数据类型一致
```
+ WeakSet
```js

```