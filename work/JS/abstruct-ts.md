# TS

---

## JS语法

## JS新特性

## TS项目构成

---

### 编译上下文

用来给文件分组 告诉TS哪些文件是有效的，哪些文件是无效的 ,使用 tsconfig.json

```json
// tsconfig.json
{   "files":[
        "./file.ts"  // files 指定编译的文件
],
"include":[],  // 包含
"exclude":[],  // 排除
    "compilerOptions":{

    }
}

```

编译: 运行tsc  自动寻找tsconfig.json   ，tsc -p  ./path-to-project-directory ,tsc -w 开启观测模式 ，检测到文件改动之后，重新编译

### 名称空间

- 类型声明空间

```ts
interface Foo{}
let foo:Foo

```

- 变量声明空间

---

## 创建TS项目

## TS类型系统

## JSX

## 编译选项设置

## 错误处理

## 开发与测试工具

## 提示与建议

## 代码风格

## 编译原理
