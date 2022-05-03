function solution(n) {
	let answer = [];
	let check = Array.from({ length: n + 1 }, () => 0);
	function DFS(v) {
		if (v === n + 1) {
			let tmp = '';
			for (let i = 1; i <= n; i++) {
				if (check[i]) tmp += i + ' ';
			}
			console.log(tmp);
		} else {
			// 포함 시킴
			check[v] = 1;
			DFS(v + 1);
			// 포함 안시킴
			check[v] = 0;
			DFS(v + 1);
		}
	}

	DFS(1);
	return answer;
}

console.log(solution(3));
