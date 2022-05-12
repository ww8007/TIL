function solution() {
	let ans = '';
	let queue = [];
	queue.push(1);
	while (queue.length) {
		let v = queue.shift();
		ans += v + ' ';
		for (let nv of [v * 2, v * 2 + 1]) {
			if (nv > 7) continue; // 7 이상은 넣지 않겠다
			queue.push(nv);
		}
	}

	return ans;
}

console.log(solution());
