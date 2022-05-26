function solution(places) {
	let answer = [];

	const dx = [-1, 0, 1, 0];
	const dy = [0, 1, 0, -1];

	answer = places.map((place) => {
		return place.some((row, rowIdx) => {
			return row.split('').some((col, colIdx, thisArr) => {
				if (col === 'X') return false;
				let count = 0;
				for (let i = 0; i < 4; i++) {
					const nx = rowIdx + dx[i];
					const ny = colIdx + dy[i];
					if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5 && place[nx][ny] === 'P')
						count++;
					if (col === 'P' && count > 0) return true;
					if (col === 'O' && count >= 2) return true;
				}

				return false;
			});
		})
			? 0
			: 1;
	});

	return answer;
}
