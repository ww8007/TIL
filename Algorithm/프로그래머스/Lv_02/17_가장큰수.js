function solution(numbers) {
	let ans = numbers.map((n) => String(n)).sort((a, b) => b + a - (a + b));

	return ans[0] === '0' ? '0' : ans.join('');
}
