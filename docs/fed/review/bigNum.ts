/**
 * 处理大数相加， 模仿竖式加法
 * 1. 先转字符串or数组，短位补0
 * 2. 每一位相加，保留进位
 * @param {*} num1 
 * @param {*} num2 
 */
function add(num1: string, num2: string) {
    let maxLen = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLen, '0')
    num2 = num2.padStart(maxLen, '0')
    let result: string = '';
    let temp: number;
    let f: number = 0; // 进位
    for (let i = maxLen - 1; i >= 0; i--) {
        temp = parseInt(num1[i]) + parseInt(num2[i]) + f;
        f = Math.floor(temp / 10);
        result = temp % 10 + result;
    }
    if (f === 1) {
        result = '1' + result;
    }

    return result;
}


let a = '9007199254740991';
let b = '1234567899999999999';
const res = add(a, b);
console.log('res', res)

let c = 9007199254740991n;
let d = 1234567899999999999n;

console.log('bigint', res == (c + d).toString())

/**
 * 大数乘法运算，num1[i]*num2[j] = res[i+j+1] , 最后处理进位
 * @param num1
 * @param num2
 */
function multi(num1: string, num2: string) {
    const m: number = num1.length, n: number = num2.length;
    const result: number[] = new Array(m + n).fill(0)
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            result[i + j + 1] += (parseInt(num1[i]) * parseInt(num2[j])); // [i+j+1]  累加
        }
    }
    for (let i = m + n - 1; i > 0; i--) {
        result[i - 1] += Math.floor(result[i] / 10)
        result[i] %= 10;
    }
    return result[0] === 0 ? result.slice(1).join('') : result.slice(0).join('')
}

console.log('multi', multi('123', '456') === `${123 * 456}`)


