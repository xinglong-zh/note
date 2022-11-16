# JS设计模式
设计原则是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID 指代的五个基本原则分别是：

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

## 创建型
- 创建型模式提供了**创建对象的机制**， 能够提升已有代码的灵活性和可复用性。

### 工厂方法模式
> 工厂方法模式是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

### 抽象工厂模式

### 单例模式
> 单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

识别方法： 单例可以通过返回相同缓存对象的静态构建方法来识别。
> 所有单例的实现都包含以下两个相同的步骤：
> - 将默认构造函数设为私有， 防止其他对象使用单例类的 new运算符。
> - 新建一个静态构建方法作为构造函数。 该函数会 “偷偷” 调用私有构造函数来创建对象， 并将其保存在一个静态成员变量中。 此后所有对于该函数的调用都将返回这一缓存对象。

<<< @/fed/designPattern/singleton/index.class.ts

class 只是语法糖，内部依赖的依然是原型链

<<< @/fed/designPattern/singleton/index.es5.js



### 原型模式
### 生成器


## 结构型
---

### 原型模式
### 装饰器模式
### 适配器模式
### 代理模式


## 行为型
---
### 策略模式
### 状态模式
### 观察者模式
### 迭代器模式

## 参考
[设计模式](https://refactoringguru.cn/design-patterns/catalog)