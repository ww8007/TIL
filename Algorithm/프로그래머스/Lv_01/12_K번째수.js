function solution(array, commands) {
	var answer = [];

	for (const item of commands) {
		let arr = array;
		let fixArr = arr.slice(item[0] - 1, item[1]).sort((a, b) => a - b);
		answer.push(fixArr[item[2] - 1]);
	}

	return answer;
}
