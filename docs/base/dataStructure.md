# 数据结构

-------------

## 数据结构概念

抽象数据类型：abstract data type

数据：可观事物的符号表示
数据类型：数据值的集合 + 集合上的操作

抽象：

+ 与存放的机器无关
+ 与数据存储的物理结构无关
+ 与实现的操作的算法和实现的语言无关

**数据结构 = 逻辑结构(线性表，树， 图) + 物理储存结构（数组 ，链表）+ 操作(算法)**.

```mermaid
graph TB;
　　逻辑结构 --> 线性结构;
    线性结构 -->  一般线性表 ;
    线性结构 --> 受限线性表 ;
    受限线性表 --> 栈;
     受限线性表 --> 队列;


    逻辑结构 --> 非线性结构;
    非线性结构 --> 树结构;
    树结构 --> 树;
    树结构 --> 二叉树;
    非线性结构 --> 图结构;
    图结构 --> 有向图;
    图结构 --> 无向图;
```

```mermaid
graph TB;

A[物理存储结构]-->B[顺序存储]
A[物理存储结构]-->C[链式存储]
A[物理存储结构]-->D[索引]
A[物理存储结构]-->E[散列-hash]

```

算法：Algorithm 为了解决某类问题而规定的一个有限长的操作序列
算法的五个特征：

1. 有穷性   执行有穷步后，在有穷的时间内得到结果
2. 确定性   每种情况下所执行的操作，在算法中有明确的规定，不会产生二义性
3. 可行性    算法中的所有操作都可以通过已经实现的基本操作运算执行有限次来实现
4. 输入   有0个或多个输入
5. 输出   有一个或多个输出

算法分析：

1. 时间复杂度： O渐进上界   0 < T(n) < O(n)   Ω渐进下界  θ渐进确界
2. 空间复杂度：   .

## 线性表  

线性结构的基本特点是除第一个元素无直接前驱，最后一个元素无直接后继之外，其他每个数据元素都有一个前驱和后继。

线性表的操作：

1. InitList(L) 初始化一个空的线性表
2. locateElem(L,e) 按值查找 ，返回e在线性表中的位置
3. getElem(L,K)  按位查找 ，返回index=k位置上的元素
4. Insert(L,i,e) 在指定位置i上插入一个元素
5. delete(L,i)  删除指定位置上的元素
6. Length(L)  返回线性表的长度

线性表的两种实现：

+ 数组实现：
按位查找速度快，直接计算地址
插入到i位置， i后面的元素需要向后移动，操作慢。删除同理

+ 链表实现
按位查找需要指针移动i次，速度慢
插入，删除，找到对应位置的前一项，改变指针指向，操作快。查找耗时。

### 栈

栈是一种操作受限的线性表。只能在栈顶进行操作。

栈的操作：
入栈  把一个元素放在栈顶
出栈  从栈顶弹出一个元素

栈的实现
数组实现:栈顶放在数组的末尾，插入，删除操作方便
链表实现：栈顶设置为链表的表头 ，插入，删除操作方便

### 队列

队列是两端操作受限的线性表，只能在队列头出队，队列尾入队。
队列的操作
入队:EnQueue（Q,e）  将e加入队尾
出队:DeQueue(Q,p)   堆头元素删除，返回值为p
判空:Empty(Q)      队头和队尾相遇为空
队列的实现
数组实现：环形队列  头尾指针
链表实现：头尾指针 ，头指针做出队 ，尾位置做入队

## 树

### 树的概念

### 二叉树

二叉树: n个节点的有限集合

1. 可以为空二叉树
2. 根节点和左右子树，左右子树也是二叉树，递归定义。

```mermaid
graph TB;
A((T))---B((L));
A((T))---C((R));

```

二叉树的遍历：前中后续遍历，根节点的相对位置

**二叉树遍历的核心问题 ：二维结构的线性化**
> 需要解决：
    1. 从节点访问左右儿子节点
    2. 访问左儿子之后，右儿子怎么办 ==> 需要借助数据结构来记忆 ==> 可选的结构: 堆栈(前 中 后)   队列（层）

+ 前序遍历：输出 T->L->R  根 左 右

```sh
递归实现：
void preOrder(BineryTree T){
    if(T!=NULL){
        visit(T)             //访问根节点
        preOrder(T->lchild)  //访问左子树
        preOrder(T->rchild)  // 访问右子树
    }
}

非递归实现:第一次遇到 ，print 出来为先序遍历
1. 遇到节点 ，print ，压入栈 ，遍历左子树
2. 左子树遍历完毕后，从栈顶弹出一个节点，并访问他
3. 按其右指针中序遍历改节点的右子树

void inOrder(BinaryTree BT){
    BineryTree T = BT   //指针
    Stack s  = createStack()  //创建堆栈
    while(T||!IsEmpty(s)){   //节点不为空，栈不空
        while(T){          //遇到节点压栈，循环遍历左子树
            visit(T)      //**print 的顺序，第一次遇到就print为先序 **
            Push(s,T)
            T = T->lchild
        }
        if(!IsEmpty(s)){
            // 栈不为空
            T = Top(s)   //弹出节点 并访问
            T = T -> rchild  // 按右指针做中序遍历
        }
    } 
}


```

+ 中序遍历：输出 L->T->R  左 中 右

```sh
递归实现：
void inOrder(BineryTree T){
    if(T!=NULL){
        midOrder(T->lchild)  // 访问左子树
        visit(T)             // 访问根节点
        midOrder(T-rchild)   // 访问右子树
    }
}

非递归实现：  第二次遇到节点 ，print出来为中序

1. 遇到节点 ，先压入栈 ，遍历左子树
2. 左子树遍历完毕后，从栈顶弹出一个节点，并访问他
3. 按其右指针中序遍历改节点的右子树

void inOrder(BinaryTree BT){
    BineryTree T = BT   //指针
    Stack s  = createStack()  //创建堆栈
    while(T||!IsEmpty(s)){   //节点不为空，栈不空
        while(T){          //遇到节点压栈，循环遍历左子树
            Push(s,T)
            T = T->lchild
        }
        if(!IsEmpty(s)){
            // 栈不为空
            T = Top(s)   //弹出节点 并访问
            visit(T)     //**print 的顺序，第二次遇到就print为中序 **
            T = T -> rchild  // 按右指针做中序遍历
        }
    } 
}

```

+ 后续遍历：输出 L->R->T  右 左 中  

```sh

递归实现：
void postOrder(BineryTree T){
    if(T!=NUll){
        postOrder(T-lchild)  //访问左子树
        postOrder(T->rchild)  // 访问右子树
        visit(T)             // 输出根节点
    }
}

```

+ 按层遍历：自上到下 自左到右遍历

```sh
使用队列实现：
1. 根节点入队
2. 从队列中取出一个元素
3. 访问元素，
4. 左右儿子非空加入队列
5。循环2,3，4

void leverOrder(BineryTree T){
    InitQueue(Q)   // 初始化队列
    EnQueue(Q,T)  // 根节点入队
    BineryTree p; // 创建一个指针
    while(Empty(Q)){
             // 队列不为空，循环执行
        Dequeue(Q,p)   //出队
        visit(p)     // 访问
        if(p->lchild!=NULL){
            Enqueue(Q,p-lchild)  // 左子树不空，入队
        }

        if(p-rchild!=NULL){
            Enqueue(Q,p-rchlid)  // 右子树不空，入队
        }
    }
}
```

### 二叉搜索树

### 平衡二叉树

+ RR旋转
+ LL旋转
+ LR旋转
+ RL旋转

### 堆（heap）

可以用来实现优先队列
插入
删除

### 哈夫曼树（可以用来做编码的压缩）

构造:每次把权值最小的两个二叉树合并 ，借助最小堆实现

## 图  多对多的关系

G(V,E)
最短路径问题
最小生成树问题

图的表示

1. 邻接矩阵

G[i][j] = 1 or 0  . <Vi,vj> 存在边 1
使用一维数组 ，压缩一半  原先的G[i][j] = A[i*(i+1)/2 + j]

2. 邻接表

图的遍历
BFS(breadth first search) 广度优先  (层序遍历，队列)
DFS（depth first search） 深度优先 （先序遍历，堆栈）
