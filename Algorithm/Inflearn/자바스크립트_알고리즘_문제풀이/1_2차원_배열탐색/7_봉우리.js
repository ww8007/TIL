function solution(arr) {
	let answer = 0;
	let n = arr.length;
	let dx = [-1, 0, 1, 0];
	let dy = [0, 1, 0, -1];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			let flag = 1;
			for (let k = 0; k < 4; k++) {
				let nx = i + dx[k];
				let ny = j + dy[k];
				if (
					nx >= 0 &&
					nx < n &&
					ny >= 0 &&
					ny < n &&
					arr[nx][ny] >= arr[i][j]
				) {
					flag = 0;
					break;
				}
			}
			if (flag) answer++;
		}
	}

	return answer;
}

let arr = [
	[5, 3, 7, 2, 3],
	[3, 7, 1, 6, 1],
	[7, 2, 5, 3, 4],
	[4, 3, 6, 4, 1],
	[8, 7, 3, 5, 2]
];
console.log(solution(arr));
