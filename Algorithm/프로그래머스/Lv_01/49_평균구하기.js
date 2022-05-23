const add = (a, b) => a + b;

function solution(arr) {
	return arr.reduce(add) / arr.length;
}
