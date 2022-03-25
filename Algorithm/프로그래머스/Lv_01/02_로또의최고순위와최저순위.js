function solution(lottos, win_nums) {
	let count = 0; // 포함 수
	let zeroCount = 0; // 0의 개수
	for (const item of lottos) {
		if (win_nums.includes(item)) count++;
		if (item === 0) zeroCount++;
	}
	console.log(count, zeroCount);

	let maxWin = count > 0 ? 7 - count : 6;

	return [zeroCount !== 6 ? maxWin - zeroCount : 1, maxWin];
}
