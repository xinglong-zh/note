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

## webpack  配置

### 概念

- entry   构建依赖的起点
- output  打包后的输出配置
- loader  解析资源文件
- plugin  插件使用
- mode    模式

webpack.config.js

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  /// boundle 分析工具
const CompressionPlugin = require("compression-webpack-plugin");  // 压缩文件 .gz

module.exports ={
    // entry:'./src/index.js',
    entry:{
        index:'./src/index.js',  // 多入口
        print:'./src/print.js'   // 多入口
    },
    devServer:{
        contentBase:'./dist',  // server 输出目录
        publicPath:'/',
        hot:true, // 开启模块热替换   -- vite 的dev采用 ESM 可以做到按需加载 ， 更有优势。但是打包还是一样。
        compress:true, // 启用压缩
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"管理输出", // 配置自动生成 index.html
        }),
        new BundleAnalyzerPlugin(), // boundle 分析工具
        new CompressionPlugin({
            test:/\.js(\?.*)?$/i
        }), // 压缩为.gz 文件
    ],
    output:{
        // filename:'[name].boundle.js',
        filename:'[name].[contenthash].js', // 使用hash缓存
        path:resolve(__dirname,'dist'),
        clean:true,  // 打包后清理dist,
        // https://webpack.docschina.org/guides/author-libraries/  打包类库配置
        // library:{
        //     name:'customLib',
        //     type:'umd',
        // }
    },
    // 代码分离
    optimization:{
        moduleIds: 'deterministic', // 保持vendor 不变
        runtimeChunk:true, // 创建额外的chunk
        // 分离重复引用
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            },
            chunks:'all',
        }
    },
    mode:'production',
    module:{
        rules:[
            // 使用正则表达式来匹配对应的loader , 链式传递
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
    // https://webpack.docschina.org/guides/scaffolding/
}
```

或者为开发环境 ， 生产环境单独进行配置

```js
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim:true,
      skipWaiting:true,
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module:{
    rules:[
        // 使用正则表达式来匹配对应的loader , 链式传递
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ]
}
};

// webpack.dev.js
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
 module.exports = merge(common,{
     mode:'development',
     devtool:'inline-source-map',
     devServer:{
         contentBase:'./dist',
         port:3000,
         hot:true,
         compress:true,
     }
 })

// webpack.prod.js

// https://webpack.docschina.org/guides/production/
const {merge} = require('webpack-merge');  // 合并配置文件
const common = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  /// boundle 分析工具
const {resolve} = require('path');
const CompressionPlugin = require("compression-webpack-plugin");  // 压缩文件 .gz



module.exports = merge(common,{
    mode:'production',
    plugins:[
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            test:/\.js(\?.*)?$/i
        }), // 压缩为.gz 文件
    ],
    devtool:'source-map', // 生产环境启用 source-map
    output:{
        // filename:'[name].boundle.js',
        filename:'[name].[contenthash].js', // 使用hash缓存
        path:resolve(__dirname,'dist'),
        clean:true,  // 打包后清理dist,
        // https://webpack.docschina.org/guides/author-libraries/  打包类库配置
        // library:{
        //     name:'customLib',
        //     type:'umd',
        // }
    },
    // 代码分离
    optimization:{
        moduleIds: 'deterministic', // 保持vendor 不变
        runtimeChunk:true, // 创建额外的chunk
        // 分离重复引用
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            },
            chunks:'all',
        }
    },
})
```
