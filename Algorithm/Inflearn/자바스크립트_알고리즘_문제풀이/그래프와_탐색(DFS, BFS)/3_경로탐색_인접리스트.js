function solution(n, arr) {
	let answer = 0;

	let graph = Array.from(Array(n + 1), () => Array()); // 0으로 초기화 X
	let ch = Array.from({ length: n + 1 }, () => 0);
	let path = [];
	for (const [a, b] of arr) {
		graph[a].push(b); // a에다 b를 푸쉬 하면 인접 리스트
	}

	function DFS(v) {
		if (v === n) {
			answer++;
			console.log(path);
		} else {
			for (const item of graph[v]) {
				if (ch[item] === 0) {
					ch[item] = 1;
					path.push(item);
					DFS(item);
					ch[item] = 0;
					path.pop();
				}
			}
		}
	}
	path.push(1);
	ch[1] = 1;
	DFS(1);

	return answer;
}

let arr = [
	[1, 2],
	[1, 3],
	[1, 4],
	[2, 1],
	[2, 3],
	[2, 5],
	[3, 4],
	[4, 2],
	[4, 5]
];
console.log(solution(5, arr));
