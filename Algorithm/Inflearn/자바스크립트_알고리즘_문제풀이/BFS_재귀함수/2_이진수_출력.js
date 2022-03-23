const solution = (n) => {
	let ans = '';
	const DFS = (n) => {
		if (n === 0) return;

		DFS(parseInt(n / 2));
		ans += n % 2;
	};
	DFS(n);
	return ans;
};

console.log(solution(11));
