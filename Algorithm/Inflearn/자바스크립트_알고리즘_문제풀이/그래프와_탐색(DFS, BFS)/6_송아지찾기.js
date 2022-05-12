// dist 배열을 통한 탐색
function solution(s, e) {
	let ch = Array.from({ length: 10001 }, () => 0);
	let dist = Array.from({ length: 10001 }, () => 0);

	let queue = [s];
	while (queue.length) {
		let x = queue.shift();
		for (const nx of [x - 1, x + 1, x + 5]) {
			if (nx === e) return dist[x] + 1;
			if (nx > 0 && nx < 10000 && ch[nx] === 0) {
				ch[nx] = 1;
				queue.push(nx);
				dist[nx] = dist[x] + 1;
			}
		}
	}

	return answer;
}

// 레벨을 통한 탐색
// 현재 레벨을 모두 탐색 한다는 것이 특징
function solution2(s, e) {
	let answer = 0;

	let ch = Array.from({ length: 10001 }, () => 0);

	let queue = [s];
	let L = 0;
	while (queue.length) {
		let len = queue.length;
		for (let i = 0; i < len; i++) {
			let x = queue.shift();
			for (const nx of [x - 1, x + 1, x + 5]) {
				if (nx === e) return L + 1;
				if (nx > 0 && nx < 10000 && ch[nx] === 0) {
					ch[nx] = 1;
					queue.push(nx);
				}
			}
		}
		L += 1;
	}

	return answer;
}

console.log(solution(5, 14));
console.log(solution2(5, 14));
console.log(solution(8, 3));
console.log(solution2(8, 3));
