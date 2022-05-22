function solution(num) {
	let ans;
	function dfs(n, count) {
		if (count >= 500) {
			ans = -1;
			return;
		}
		if (n === 1) {
			ans = count;
			return;
		}
		dfs(n % 2 ? n * 3 + 1 : n / 2, count + 1);
	}

	dfs(num, 0);
	return ans;
}
