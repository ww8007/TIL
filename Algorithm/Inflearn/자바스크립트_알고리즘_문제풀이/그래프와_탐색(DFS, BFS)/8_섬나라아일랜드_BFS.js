function solution(board) {
	let answer = 0;
	let n = board.length;
	let dx = [-1, -1, 0, 1, 1, 1, 0, -1];
	let dy = [0, 1, 1, 1, 0, -1, -1, -1];

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (board[i][j] === 1) {
				let queue = [[i, j]];
				answer++;
				board[i][j] = 0;
				while (queue.length) {
					let [x, y] = queue.shift();
					console.log(x, y);
					for (let i = 0; i < dx.length; i++) {
						let nx = x + dx[i];
						let ny = y + dy[i];
						if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] === 1) {
							board[nx][ny] = 0;
							queue.push([nx, ny]);
						}
					}
				}
				console.log('BFS end');
			}
		}
	}

	return answer;
}

let arr = [
	[1, 1, 0, 0, 0, 1, 0],
	[0, 1, 1, 0, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 0, 0],
	[1, 0, 0, 0, 1, 0, 0],
	[1, 0, 1, 0, 1, 0, 0]
];

console.log(solution(arr));
