function solution(board) {
	let answer = 0;
	let dx = [-1, 0, 1, 0];
	let dy = [0, 1, 0, -1];
	let min = 9999;
	function DFS(i, j, count) {
		if (i === 6 && j === 6) {
			answer++;
			console.log(count);
			min = Math.min(min, count);
		} else {
			for (let k = 0; k < 4; k++) {
				let nx = j + dx[k];
				let ny = i + dy[k];
				if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7 && board[nx][ny] === 0) {
					board[nx][ny] = 1;
					DFS(nx, ny, count + 1);
					board[nx][ny] = 0;
				}
			}
		}
	}
	DFS(0, 0, 0);
	return [answer, min];
}

let arr = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 1, 0, 0, 0],
	[1, 1, 0, 1, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 1],
	[1, 1, 0, 1, 1, 0, 0],
	[1, 0, 0, 0, 0, 0, 0]
];

console.log(solution(arr));
