function solution(d, budget) {
	let answer = 0;
	let sum = budget;
	let arr = d.sort((a, b) => Number(a) - Number(b));
	for (let item of arr) {
		if (sum - item < 0) {
			return answer;
		}
		sum = sum - item;
		answer++;
	}

	return answer;
}

console.log(solution([1, 3, 2, 5, 4], 9));
