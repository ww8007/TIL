function solution(numbers) {
	var answer = [];
	numbers = numbers.sort((a, b) => a - b);
	let setArr = new Set();
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			setArr.add(numbers[i] + numbers[j]);
		}
	}
	answer = Array.from(setArr).sort((a, b) => a - b);
	return answer;
}

console.log(solution([2, 1, 3, 4, 1]));
