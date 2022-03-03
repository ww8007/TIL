function solution(a, b, c) {
	let arr = [a, b, c];
	let total = 0;
	let max = 0;
	for (const a of arr) {
		total += a;
		if (max < a) max = a;
	}
	if (total - max < 0) return 'YES';
	else return 'NO';
}

console.log(solution(13, 33, 17));
