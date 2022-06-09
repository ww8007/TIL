function solution(maps) {
	var answer = -1;
	let dx = [-1, 0, 1, 0];
	let dy = [0, 1, 0, -1];
	let m = maps[0].length;
	let n = maps.length;
	if (m === 1 && n === 1) return 0;

	let queue = [[0, 0, 1]];
	maps[0][0] = 0;

	while (queue.length) {
		let [x, y, count] = queue.shift();
		if (x === m - 1 && y === n - 1) {
			return count;
		}
		for (let i = 0; i < 4; i++) {
			let nx = x + dx[i];
			let ny = y + dy[i];
			if (nx >= 0 && nx < m && ny >= 0 && ny < n && maps[ny][nx] === 1) {
				queue.push([nx, ny, count + 1]);
				maps[ny][nx] = 0;
			}
		}
	}

	return -1;
}
