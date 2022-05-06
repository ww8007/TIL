const solution = (n) => {
	const arr = [];
	function DFS(L) {
		if (L === 0) return;

		DFS(L - 1);
		arr.push(L);
	}
	DFS(n);
	return arr;
};

console.log(solution(3));
