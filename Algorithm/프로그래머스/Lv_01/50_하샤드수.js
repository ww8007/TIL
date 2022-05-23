function solution(x) {
	let sum = String(x)
		.split('')
		.reduce((a, b) => Number(a) + Number(b));
	return x % sum ? false : true;
}
