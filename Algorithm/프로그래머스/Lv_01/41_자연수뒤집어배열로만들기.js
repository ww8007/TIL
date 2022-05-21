function solution(n) {
	var answer = [];

	let arr = String(n).split('').reverse();

	arr = arr.map((number) => Number(number));

	return arr;
}
