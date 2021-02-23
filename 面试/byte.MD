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

**回溯算法**: 适合全排列问题
算法框架:

```python
  def backtrace :
    if  条件成立 
        // 操作
        return;
    
    for  选项  in 候选列表:

       选择当前选项(状态改变)
       backtrace();
       撤销当前选择(回溯)
```

```js
 const backtrace =(ans,combine,deepth,used)=>{
        if(deepth==nums.length){
            ans.push(combine.concat());
            return;
        }

        for(let i =0;i<nums.length;i++){
            if(used[i]==true){
                continue;
            }
            // 选择当前元素
            combine.push(nums[i]);
            used[i] = true;

            backtrace(ans,combine,deepth+1,used);

            // 撤销当前操作,回退到树的上一个状态
            combine.pop();
            used[i] = false;

        }

    }
```

**局部贪心算法**: 每次选择当前最大的

```js

```

**动态规划**: 当前问题的解 , 由子问题组成

**分治的思想**:大问题划分为子问题

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

## 面经

编程题：有10个篮子，分别装有1，2，4，8，16，32，64，128，256，512 个苹果，篮子编号为 0 ~ 9，请问如果正好想取 825 个苹果， 需要的篮子编号为多少？例如取 5 个苹果，需要 0，2 号篮子（1 + 4 个）。

```js
// 尝试使用dfs + 回溯.  可以解决
var Sum = function(nums, target) {
     let ans =[];

    const backtrace = (combine,target,idx)=>{
        if(target==0){
            ans.push(combine);
            return;
        }
        if(idx<0){
            return;
        }

        // 做选择
        backtrace(combine,target,idx-1);
        
        if(target-nums[idx]>=0){
            backtrace([...combine,nums[idx]],target-nums[idx],idx-1);
        }
    }
    backtrace(ans,target,nums.length-1);
};

```

编程题：正则匹配邮箱
Vue 和 watch 的实现原理和所依赖的数据
EventLoop， 宏任务微任务
> stack :[frame(function)] , head:[object] , queue:[message=>handler];
一个 JavaScript 运行时包含了一个待处理消息的消息队列。每一个消息都关联着一个用以处理这个消息的回调函数。
在 事件循环 期间的某个时刻，运行时会从最先进入队列的消息开始处理队列中的消息。被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。
宏任务: I/O 操作 , setTimeout , setInterval ,requestAnimationFrame
微任务: process.nextTick   , MutationOberser  , Promise.then  catch ,finally

类式继承的方案
http 握手原理
Koa 中间件机制及代码实现
React Hook 原理
前端安全，常见的 web 漏洞
TCP 为什么是可靠的
import 和requre 的区别

+ 其他
今天看了同事写的组件，有一些感触，怎么才能设计一个好的组件呢？我感觉应该要包含下面几点：

1. 要易用 (至少让使用者能够简单方便的引入到程序当中）
2. 要稳定 (需要增加关键的测试）
3. 要灵活（关键参数可配置）
4. 要全面（日志、拦截器、监听器）
5. 要谨慎（要考虑多种情况）
6. 要易读（写的东西要能给别人讲清楚）

如何做？

1.如何做到易用，所谓众口难调，你觉得好用，其他人未必这样觉得。做一个组件之前，先了解各方使用者的需求或许是最好的选择，不要让别人适应你而是应该适应别人，并且多采用一些公认的设计模式方法，也可以提高自己的设计能力。

2.如何做到稳定，系统关键点可以多编写一些单元测试适应不同的场景，在有外部访问的组件当中，可以适当增加压力测试。

3.如何做到灵活，系统设计的时候，先要确定“变化”和“不变”，对于变化除了默认值可以增加一些配置文件选项，让使用者能够自己配置，或者开放一些抽象类和接口，让调用者自己实现。

4.如何全面，当你做一个组件的时候，别人可能也会关心，发生异常或者变化的情况，这个时候适当的增加一些日志，更进一步增加一些回调方法，或许能够为排查问题，处理异常以及后续其他操作提供一些便利条件。

5.怎么谨慎，做组件的时候，考虑到被各种不同的使用者使用，这里就需要将异常情况或者各种条件分钟考虑清楚，当变量是非法值的时候需要系统能够有效的处理，或者在输入的时候提前判断，或者做好异常处理。

6.要容易读，很多人在写组件的时候，都不注重代码的注释和更新的履历，殊不知这样的情况就是当时间比较长之后，很难理解自己的代码也很难让别人看懂，不能因为只是给别人中的组件不涉及到业务就不去写注释，良好的习惯也是程序员价值的衡量标准。

+ TODO:urls

1. <https://juejin.cn/post/6855129007852093453>
2. <https://juejin.cn/post/6885594081578696718>
3. <https://juejin.cn/post/6844903928442667015>
4. <https://juejin.cn/post/6928740564519436295>
5. <https://juejin.cn/post/6916317088521027598>
6. <https://juejin.cn/post/6925599792814882829>
7. <https://juejin.cn/post/6922290178836922381>
8. <https://leetcode-cn.com/circle/discuss/SVKmhR/>

+ 垃圾回收:

1. <https://segmentfault.com/a/1190000018605776>

+ 面试题

1. 盒子模型

2. 实现a函数

  ```js
  a(fn) = function(a,b,c){ return a+b+c } ,a(fn2) = function(a,b,c,d){return a\*b\*c\*d}
  实现 a(fn)(1)(2)(3)
  ```

3. 实现timer函数

  ```js
  let t =  timer(function(){
    console.log(1)
  },100,10)  // 打印1 , 100次  , 间隔10秒

  setTimeout(_=>{
    timer.cancel(t)
  },0)

  ```
