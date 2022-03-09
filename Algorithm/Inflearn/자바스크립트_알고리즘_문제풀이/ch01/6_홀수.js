function solution(arr) {
	let answer = [];
	answer = arr.filter((n) => n % 2);

	return [answer.reduce((a, b) => a + b), Math.min(...answer)];
}

arr = [12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));

function sol(arr) {
	let ans = [];
	let sum = 0,
		min = Number.MAX_SAFE_INTEGER;
	for (let x of arr) {
		if (x % 2 === 1) {
		}
	}
}
