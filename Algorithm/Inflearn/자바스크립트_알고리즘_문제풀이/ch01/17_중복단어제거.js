const solution = (str) => str.filter((v, i, arr) => str.indexOf(v) === i);

let str = ['good', 'time', 'good', 'time', 'student'];
console.log(solution(str));
