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

## vite+vue3 项目搭建

----
参考:<https://vitejs.dev/guide/#scaffolding-your-first-vite-project>
<https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5>
<https://vitejs.dev/guide>
<https://v3.vuejs.org/>

```sh
yarn create @vitejs/app FED-APP --template vue
cd FED-APP
yarn
yarn dev
```

### 配置路由

```sh
# 安装依赖
yarn add vue-router@4

# 创建router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('@/components/HelloWorld.vue')
    }
]
const router = createRouter({
    history:createWebHashHistory(import.meta.env.BASE_URL),
    routes:routes
})
export default router
# 挂载到main.js 上面
import router from '/router/index'
use(router)
```

### 问题1：无法识别@

```js
在vite.config.js 中配置  resolve
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[
      {find:'@',replacement:resolve(__dirname,'src')}
    ]
  }
})

```
