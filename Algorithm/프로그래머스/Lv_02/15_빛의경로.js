function solution(grid) {
	var answer = [];

	const checkArr = grid.map((row) =>
		row.split('').map((_) => Array.from({ length: 4 }, () => false))
	);

	const dx = [0, 0, 1, -1]; // 상하좌우 -> 진행 방향
	const dy = [-1, 1, 0, 0];

	const DFS = (rdx, cdx, idx) => {
		let count = 0;

		while (true) {
			if (checkArr[rdx][cdx][idx]) break;
			checkArr[rdx][cdx][idx] = true;

			rdx += dx[idx];
			cdx += dy[idx];
			count++;
			if (rdx < 0) rdx = checkArr.length - 1;
			if (rdx >= checkArr.length) rdx = 0;
			if (cdx < 0) cdx = checkArr[0].length - 1;
			if (cdx >= checkArr[0].length) cdx = 0;

			if (grid[rdx][cdx] === 'L') idx = [2, 3, 1, 0][idx];
			if (grid[rdx][cdx] === 'R') idx = [3, 2, 0, 1][idx];
		}

		return count;
	};

	checkArr.map((row, rdx) => {
		row.map((col, cdx) => {
			col.map((z, idx) => {
				if (!z) answer.push(DFS(rdx, cdx, idx));
			});
		});
	});

	answer.sort((a, b) => a - b);

	return answer;
}
