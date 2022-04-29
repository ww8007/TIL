function solution(n, r) {
	let answer = [];

	function DFS(n, r) {
		if (n === r || r === 0) return 1;
		else return DFS(n - 1, r - 1) + DFS(n - 1, r);
	}

	answer = DFS(n, r);
	return answer;
}

function solution2(n, r) {
	let answer = [];
	let memo = Array.from(Array(35), () => Array(35).fill(0));
	function DFS(n, r) {
		if (memo[n][r] > 0) return memo[n][r];
		if (n === r || r === 0) return 1;
		else return (memo[n][r] = DFS(n - 1, r - 1) + DFS(n - 1, r));
	}

	answer = DFS(n, r);
	return answer;
}

console.log(solution2(5, 3));
console.log(solution2(33, 19));
