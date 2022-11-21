/**
 * 1. promise 有三个状态：pending，fulfilled，or rejected
 * 2. new promise时， 需要传递一个executor()执行器，执行器立即执行；executor接受两个参数，分别是resolve和reject；
 * 3. promise 的默认状态是 pending；
 * 4. promise 有一个value保存成功状态的值，可以是undefined/thenable/promise
 * 5. promise 有一个reason保存失败状态的值
 * 6. promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
 * 7. promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；
 * 8. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
 */
// 三个状态：PENDING、FULFILLED、REJECTED
// pending: 一个promise在resolve或者reject前就处于这个状态。
// fulfilled: 一个promise被resolve后就处于fulfilled状态，这个状态不能再改变，而且必须拥有一个不可变的值(value)。
// rejected: 一个promise被reject后就处于rejected状态，这个状态也不能再改变，而且必须拥有一个不可变的拒绝原因(reason)。
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MPromice {
    // 构造函数接收一个函数
    constructor(executor) {
        this.status = PENDING; // 初始状态
        this.value = undefined; // 储存成功值
        this.reason = undefined; // 储存失败值

        // 储存成功和失败的回调，应对异步问题
        this.onFulfilledCallBacks = [];
        this.onRejectedCallBacks = [];

        // 修改状态为fulfilled
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // resolve里面将所有成功的回调拿出来执行
                this.onFulfilledCallBacks.forEach(callback => {
                    callback(value)
                })
            }
        }
        // 修改状态为rejected
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // resolve里面将所有失败的回调拿出来执行
                this.onRejectedCallBacks.forEach(callback => callback(reason))
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    /**
     * then 方法两个可选参数，promice 执行结束后调用
     * onFulfilled 和 onRejected 都是可选参数。如果 onFulfilled 不是函数，其必须被忽略。如果 onRejected 不是函数，其必须被忽略
     * @param {*} onFulfilled   第一个参数为promice 最终值value
     * @param {*} onRejected    第一个参数为promice 最终值reason
     * then 方法必须返回一个 promise 对象
     * 1.如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e . try{}catch(){}包裹一下
     * 2. 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
     * 3. 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
     * 4. 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程
     * 
     * onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用.
     * 要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
     */
    then(onFulfilled, onRejected) {
        // 如果 onFulfilled 不是函数，其必须被忽略。如果 onRejected 不是函数，其必须被忽略
        // 添加兜底逻辑
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

        if (this.status === FULFILLED) {
            // typeof onFulfilled === 'function' && onFulfilled(this.value);
            // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
            // 由于then的回调是异步执行的，因此我们需要把onFulfilled和onRejected执行放到异步中去执行，同时做一下错误的处理
            let promice2 = new MPromice((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promice2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            })
            return promice2;
        }

        if (this.status === REJECTED) {
            // typeof onRejected === 'function' && onRejected(this.reason); 
            // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
            let promice2 = new MPromice((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promice2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            })
            return promice2
        }

        /**
         * status状态还是PENDING，我们应该将onFulfilled和onRejected两个回调存起来
         * 当executor 主动调用resolve or reject ，代表异步操作执行完成了，
         * 等resolve或者reject的时候将数组里面的全部方法拿出来执行一遍
         * 如果还是PENDING状态，也不能直接保存回调方法了，需要包一层来捕获错误
         */
        if (this.status === PENDING) {
            // typeof onFulfilled === 'function' && this.onFulfilledCallBacks.push(onFulfilled);
            // typeof onRejected === 'function' && this.onRejectedCallBacks.push(onRejected);
            let promice2 = new MPromice((resolve, reject) => {
                this.onFulfilledCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promice2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })

                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promice2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
            })

            return promice2;
        }
    }

    static resolve(value) {
        if (value instanceof MPromice) {
            return value
        }
        return new MPromice((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        if (reason instanceof MPromice) {
            return reason
        }
        return new MPromice((resolve, reject) => {
            reject(reason)
        })
    }
    /**
     * Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，
     * 如果不是，就会先调用Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。
     * 当p1, p2, p3全部resolve，大的promise才resolve，有任何一个reject，大的promise都reject。
     * @param {MPromice[]} promiceList 
     */
    static all(promiceList) {
        return new MPromice((resolve, reject) => {
            let count = 0;
            let result = []
            let length = promiceList.length;
            if (length === 0) {
                return resolve(result)
            }

            promiceList.forEach((promice, index) => {
                MPromice.resolve(promice).then((value) => {
                    count++
                    result[index] = value;
                    if (count === length) {
                        // 所有promice均 resolve
                        resolve(result)
                    }
                }, (reason) => {
                    // 任意reject 则，reject
                    reject(reason)
                })
            })
        })
    }
    /**
     * 该方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
     * 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
     * @param {MPromice[]} promiceList 
     */
    static race(promiceList) {
        return new MPromice((resolve, reject) => {
            let length = promiceList.length;
            if (length === 0) {
                resolve();
            }
            // for 循环一起执行, 先改变状态的返回
            for (let i = 0; i < length; i++) {
                MPromice.resolve(promiceList[i]).then((value) => {
                    resolve(value)
                }, (reason) => {
                    reject(reason)
                })
            }
        })
    }

}
// 相当于一个没有成功的then
MPromice.prototype.catch = function (errCallBack) {
    return this.then(null, errCallBack)
}

// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
MPromice.prototype.finally = function (callback) {
    return this.then((value) => {
        return MPromice.resolve(callback()).then(() => value)
    }, (reason) => {
        return MPromice.reject(callback()).then(() => { throw reason })
    })
}

/**
 * promice 解决过程
 * Promise 解决过程是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，
 * 如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise
 * @param {*} promise 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise, x, resolve, reject) {
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise 
    // 防止死循环
    if (promise === x) {
        return reject(new TypeError('The promise and the return value are the same'))
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let called = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)s
                    if (called) return;
                    // 如果 resolvePromise 和 rejectPromise 均被调用，
                    // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                    // 实现这条需要前面加一个变量called
                    called = true;
                    resolvePromise(promise, y, resolve, reject)
                }, (r) => {
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                // x.then 是对象，直接返回
                if (called) return;
                called = true;
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            reject(error)
        }
    } else {
        // 普通值直接返回
        resolve(x)
    }


}