function solution(day: number, arr: number[]) {
	return arr.reduce((acc, cur) => (cur % 10 === day ? ++acc : acc), 0);
}

const arr = [25, 23, 11, 47, 53, 17, 33];
console.log(solution(3, arr));
