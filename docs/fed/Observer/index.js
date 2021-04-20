/**
 * 简易实现
 */
export class Observer {
    value; // object
    constructor(value) {
        this.value = value;
        def(value, '__ob__', this);

        // 检测对象
        this.walk(value);
    }
    walk(value) {
        let keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }
}

/**
 * 添加getter / setter 方法
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 */
export function defineReactive(obj, key, value) {

    // Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
    const property = Object.getOwnPropertyDescriptor(obj, key);
    // 是否存在getter  setter
    let getter = property && property.get
    let setter = property && property.set

    // 没有getter 并且只有两个参数 ，
    if ((!getter || setter) && arguments.length == 2) {
        value = obj[key];
    }
    // 针对嵌套
    let childOb = observe(value);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            let val = getter ? getter.call(obj) : value; // 有getter 调用自身的getter ，没有就返回value 的值
            // when getter , collection as dependency
            return val;
        },
        set: function reactiveSetter(newVal) {
            //  newVal 和原始值不相等时 ，赋值
            if (value === newVal || (newVal !== newVal || value !== value)) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal);
            } else {
                value = newVal;
            }
            childOb = observe(newVal); // 新赋值也要__ob__;
        }
    })
}

/**
 * 判断是否被监控 ，即有没有 __ob__ 属性，没有则进行添加
 * @param {*} value 
 */
export function observe(value) {
    let ob;
    if (value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}

/**
 * 
 * @param {Array} value 
 */
export function observeArray(value) {
    for (let i = 0; i < value.length; i++) {
        observe(value[i]);
    }
}


/**
 * 给对象挂载 __ob__ ,表示已经被监测 ，有getter  setter 方法
 * @param {object} obj 
 * @param {string key 
 * @param {*} value 
 * @param {*} enumerable 
 */
export function def(obj, key, value, enumerable) {
    // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: !!enumerable,
        configurable: true,
        writable: true,
    })

}