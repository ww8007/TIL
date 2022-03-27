function solution(n, lost, reserve) {
	var answer = 0;

	let arr = Array.from({ length: n + 1 }).fill(1);

	for (const item of reserve) {
		arr[item] += 1;
	}
	for (const item of lost) {
		arr[item] -= 1;
	}
	for (let i = 1; i < n + 1; i++) {
		if (arr[i] === 0 && arr[i + 1] === 2) {
			arr[i] = 1;
			arr[i + 1] = 1;
		}
		if (arr[i] === 2 && arr[i + 1] === 0) {
			arr[i] = 1;
			arr[i + 1] = 1;
		}
	}
	for (let i = 1; i <= n + 1; i++) {
		if (arr[i] >= 1) answer++;
	}

	return answer;
}

console.log(solution(6, [6, 2, 4], [1, 5, 3]));
