function solution(arr, divisor) {
	var answer = [];

	arr.sort((a, b) => a - b);

	arr.map((item) => {
		!(item % divisor) && answer.push(item);
	});

	if (!answer.length) return [-1];

	return answer;
}
