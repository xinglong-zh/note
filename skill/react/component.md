### react component
---

```js
/**
 * 组件 ，概念上类似于函数 ，接收入参（props）  返回react元素 
 * 
 * **/

// 函数组件
function Welcome(props){
    return <h1>hello ,world</h1>
}

// class组件
class Welcome extends React.Component{
    render(){
       return <h1>hello ,world</h1>
    }
}


// 两者渲染的结果相同

// FIXME:react 认为  小写字母开头为原生dom标签 ，大写字母开头为组件

// 组件引用
class Welcome extends React.Component{
    render(){
        <h1>hello , {this.props.name}</h1>
    }
}
// or
function Welcome(props){
    return (
        <h1>hello , {props.name}</h1>
    )
}

function App(){
    return(
        <div>
            <Welcome name="alex"></Welcome>
        </div>
    )
}

// FIXME:所有react组件必须保护props不被修改


// 将函数组件转换成 class 组件
// 1 创建一个同名的 ES6 class，并且继承于 React.Component。
// 2 添加一个空的 render() 方法。
// 3 将函数体移动到 render() 方法之中。
// 4 在 render() 方法中使用 this.props 替换 props。
// 5 删除剩余的空函数声明。


// 局部的state
class Clock extends React.Component{
    construnctor(props){
        super(props)   // 传递到父类的构造函数中
        this.state = {data:new Date()}
    }

    render(){
        <div>
            <h1>hello ,world</h1>
            <h2>it is {this.state.date.toLocaleTimeString()}</h2>
        </div>
    }
}


// 生命周期的概念
componentDidMount(){}   // mount

componentWillUnmount(){}    // unmount


//  使用 state  
setState()

this.setState({comment:'hello'})
// 构造函数是唯一可以给state赋值的地方

// state 的更新可能是异步
//  react 会把多个setState 调用合并成一个调用，性能优化 
// this.props    this.state 可能会异步更新

this.setState({
    counter:this.state.counter + this.props.increment, // 可能异步导致出错
})

this.setState((state,props)=>({counter:state.counter+props.increments}))   //接收函数，防止异步问题

// state 为组件私有 ， 其他组件无法访问，数据单行向下流动

// 事件处理

<botton onClick={activate}>
    activate
</botton>

this 问题

class LoggingButton extends React.Component {
    /**
     * class fields 语法 ，解决this 丢失问题   **建议
     * **/
    handClick = () => {
        console.log('this ', this)
    }

    constructor(props){
        super(props)
        this.handleClick.bind(this)  // 解决this丢失问题
    }
    handleClick(){
        console.log(this)
    }
    /** 利用箭头函数 ，自动捕获this 解决丢失问题**/
    render(){
        return(
            <botton  onClick={()=> this.handleClick}>
            logging
            </botton>
        )
    }
}


// key 使用数据中 独一无二的字符串，不建议使用index ，在顺序变动的时候，性能变差

// 表单
<input value={this.state.value} onChange={this.handkeChange}> </>
<textarea value={this.state.value} onChange ={this.handleChange}></textarea>
<select value={this.select.value} onChange={this.handleChange}>
    <option value="mango">芒果</option>
</select>


// 处理多个数据 ，input 给name 属性进行区分

// 状态提升 ， 数据单向流动，存在相互依赖的数据时 ，提升到父组件处理 props 可以传递数据和处理的函数

// prop 传递组件 ，类似于  vue 的slot 
function FancyBorder(props){
    return (
        <div className={'FancyBorder-' + props.color}>
            {prop.children}
        </div>
    )
}

function WelcomeDialog(){
    return (
        <FancyBorder color="blue">
            <h1> welcome</h1>
            <p>say  some thing</p>
        </FancyBorder>
    )
}



function SplitPane(props){
    return (
        <div className ="Pane">
            <div className="Pane-left">
                {p.left}
            </div>
            <div>
                {p.right}
            </div>
        </div>
    )
}

function App(){
    return (
        <SplitPane 
        left={<Context />}
        right={<Context />}
        />
        )
}



// react 哲学


// 组件划分: 单一功能原则  -->设计模式中的六大原则
```

#### react 哲学
+ 组件划分:SRP 单一职责原则
+ react创建静态UI ， 自下而上编写组件
+ 确定UI state的最小表示 ： don`t repeat youself
+ 确定state放置的位置 ，哪些组件可以拥有
+ 反向数据流，state 只能由所有者进行更改，props 同时传递数据和更改数据的方法

that`s all