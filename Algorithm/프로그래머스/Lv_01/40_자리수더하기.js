function solution(n) {
	var answer = 0;

	let arr = String(n).split('');

	for (const num of arr) {
		answer += Number(num);
	}

	return answer;
}
