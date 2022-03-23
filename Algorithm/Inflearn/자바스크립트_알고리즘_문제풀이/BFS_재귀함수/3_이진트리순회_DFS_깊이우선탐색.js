const solution = (v) => {
	let ans;
	function DFS(v) {
		if (v > 7) return;
		else {
			DFS(v * 2);
			console.log(v);
			DFS(v * 2 + 1);
		}
	}
	DFS(v);
	return ans;
};

console.log(solution(1));
