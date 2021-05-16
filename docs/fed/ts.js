let numbers = [5, 6, 7, 8, 9]

let max = Math.max.apply(null, numbers);
let array = ['a', 'b'];
//  apply 接收参数数组， []
numbers.push.apply(numbers, array);
// call 接收参数列表
numbers.push.call(numbers, ...array);

