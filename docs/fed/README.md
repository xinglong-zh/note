# FED note

## js高程

JS = ES+DOM+BOM

### html中的js

<code> \<script> </code> :可选属性

- async(立即开始下载，不能阻止其他页面操作)
- defer(脚本可以延迟到文档被完全解析和显示后执行)
- src 外部文件路径
- type  :module 会被解析为ES6模块
- scrossorigin : 配置相关请求的CORS（跨源资源共享）设置

包含在<code>\<script></code>内的代码会被从上到下解释 ,在<code>\<script></code>元素中的代码被计算完成之前，页面的其余内容不会被加载，也不会被显示。 **阻塞HTML解析**

<code>\script</code> 中的代码按照在页面中出现的顺序依次解释 ，（排除 <code>async|defer</code> 修饰）

现在实践将<code> \script</code> 标签放置在 body 标签之后 ，页面先渲染，然后处理 script 标签 ，用户会感觉加载的更快.
参考[浏览器](./optimize.md)

```js
<link res="proload" href="example.js" >
使预加载器识别
```

```js
<noscript>不支持js / 禁用js 的优雅降级  </noscript>
```

行内代码VS外部文件

- 可维护性
- 缓存
- 适应未来
- http2 支持

### 语言基础

### 变量 作用域 内存

### 基本引用类型

### 集合引用类型

### 迭代器与生成器

### 对象类面向对象编程

### 代理与反射

### 函数

### prosmise 与异步函数

### BOM

### 客户端检测

### DOM

### DOM扩展

### 事件

### 动画与canvas

### 表单脚本

### js API

### 错误处理与调试

### 处理XML

### JSON

### 网络请求与远程资源

### 客户端储存

### 模块

### worker

### 最佳实践
