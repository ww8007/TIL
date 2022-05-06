function solution(n, m) {
	let answer = [];
	let tmp = Array.from({ length: m }, () => 0);
	function DFS(L, s) {
		if (L === m) {
			answer.push(tmp.slice());
			return;
		}
		for (let i = s; i <= n; i++) {
			tmp[L] = i;
			DFS(L + 1, i + 1);
		}
	}
	DFS(0, 1);
	return answer;
}

console.log(solution(4, 2));
