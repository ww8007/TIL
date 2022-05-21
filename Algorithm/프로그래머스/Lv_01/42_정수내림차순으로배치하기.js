function solution(n) {
	var answer = 0;

	let arr = String(n)
		.split('')
		.map((num) => Number(num))
		.sort((a, b) => b - a);

	arr = arr.join('');

	return Number(arr);
}
