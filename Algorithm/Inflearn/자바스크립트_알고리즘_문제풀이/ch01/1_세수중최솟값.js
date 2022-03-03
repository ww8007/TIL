function solution(a, b, c) {
	let arr = [a, b, c];
	let ans = 101;
	for (const a of arr) {
		if (a < ans) ans = a;
	}
	return ans;
}

console.log(solution(6, 5, 11));
