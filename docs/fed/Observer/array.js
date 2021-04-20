/**
 * 监控array的变化
 */
import { def, observe } from './index'
//  Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto);

/**@type {string[]} */
let methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(method => {
    // 备份原方法
    let original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
        let result = original.apply(this, args);
        const ob = this.__ob__;
        let insert;
        switch (method) {
            // 三种添加的情况 ，observe 新添加的值
            case 'push':
            case 'unshift':
                insert = args
                break;
            case 'splice':
                insert = args.slice(2);
                break;
        }
        if (insert) ob.observeArray(insert);
        // setter ，notify watch
        return result;
    })
})