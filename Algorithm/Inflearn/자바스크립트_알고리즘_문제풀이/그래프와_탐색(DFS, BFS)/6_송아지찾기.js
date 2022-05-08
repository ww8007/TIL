function solution(s, e) {
	let check = Array.from({ length: 10001 }, () => 0);
	let dist = Array.from({ length: 10001 }, () => 0);

	let queue = [];
	queue.push(s);
	dist[s] = 0;
	while (queue.length) {
		let x = queue.shift();
		for (let nx of [x - 1, x + 1, x + 5]) {
			if (nx === e) return dist[x] + 1;
			if (nx > 0 && nx < 10001 && check[nx] === 0) {
				check[nx] = 1; // 방문
				queue.push(nx); // 탐색에 집어 넣기
				dist[nx] = dist[x] + 1;
			}
		}
	}
	return dist[e];
}

console.log(solution(5, 14));
