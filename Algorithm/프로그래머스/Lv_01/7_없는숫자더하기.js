function solution(numbers) {
	var answer = 0;
	let arr = Array.from({ length: 10 }).fill(0);
	for (let i = 0; i < numbers.length; i++) {
		arr[numbers[i]] = numbers[i];
	}
	arr.forEach((item, idx) => {
		if (!item) answer += idx;
	});
	return answer;
}
