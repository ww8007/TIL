function solution(n) {
	let answer = [];
	let ch = Array.from({ length: n + 1 }, () => 0);
	function DFS(v) {
		if (v == n + 1) {
			let tmp = '';
			for (let i = 1; i <= n; i++) {
				if (ch[i]) tmp += i + ' ';
			}
			tmp && answer.push(tmp.trim());
			return;
		} else {
			ch[v] = 1;
			// 두갈래 뻗기
			DFS(v + 1);
			ch[v] = 0;
			DFS(v + 1);
		}
	}
	DFS(1);
	return answer;
}

console.log(solution(3));
