# 面试准备

---

## 软件工程核心概念

---

+ 如何从一个需求落实到一个系统设计，
  + 完成需求分析 , 根据需要找出功能点和对应的方案 ,  注意找出隐藏的需求点 , 较困难的部分也要及时调整 .
  + 根据方案做原型设计
  + 根据原型设计来定架构方案,技术栈,接口数据结构,数据库表结构,后端数据结构,模块划分
  + UI设计后 , 模块划分 , 根据需要调整接口的数据结构.
  + 开发, 测试,迭代,优化.
+ 如何衡量两个不同设计的好坏，
  + 一是开发者的角度, 模块, 代码结构的设计是否方便开发 , 易于维护和扩展 , 性能 ,代码规范是否合理
  + 二是用户的角度 , 界面是否美观 , 操作是否流畅和简便
+ 如何在各种限制下（人员、时间、资源等）选择其中更合适的设计
  + 人员方法,开发开发者储备较多的技术栈,
  + 时间方面 ,时间紧张先做最核心最重要的功能 , 不必要的功能往后延期 ,后续在迭代优化 .
  + 资源方面, 资源不足时考虑用现有的资源实现最有用的功能 , 然后通过已经实现的功能去获取更大的资源
+ 以及提升该设计的可拓展性等
  + 项目的目录结构要合理 , 类别清晰, 在需要拓展功能的时候 , 可以最快的找到功能添加的位置 .
  + 数据结构的设计要考虑未来可能增加的参数 , 参数可以采用对象的样式来进行定义方便拓展
  + 模块或函数多做拆分 , 注释要清晰 .
  + 公共模块 , 方法 , 变量 ,组件需要抽取出来在模块间或项目间进行共享 , 提高复用率 .

## leecode

---

## highscalability.com

---

+ begin guide to scale

1. 1 user : single instance . instance run the entire web stack ,for example web app,database,management,etc.
2. vertical scaling: 同一个逻辑单元内 , 增加资源来提高处理能力 , cpu ,内存 , 硬盘 .
problem:no failover ,no redundancy . problem in instance ,website will die.  
eventually a single instance can only  get so big . you need to do something else.
3. users>10: separate out a single host into multiple hosts.  web site and database .   SQL database instead of NoSQl database .
4. users>100: use a separate for web tier.
5. users:1000: web host load balance , slave database .
6. users>10000 - 100000s: horizontal scaling.  
use load balance management instance .  
add more read replicas to database take load off the write master .
lightening the load off tier . use cache and CDN.
7. users>500000: microservice.
8. users>10000000: Federation - splitting into multiple DBs based on function(分库); sharding - splitting one dataset across multiple hosts(分表); moving some functionality to other types of DBS (think about NoSQl);
9. users>11 million : build custom solutions , deep analysis og you entire stack .

+ 222
+ 222
+ 444
+ 555
