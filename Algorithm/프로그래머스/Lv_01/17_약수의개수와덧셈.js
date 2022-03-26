function solution(left, right) {
	var answer = 0;
	for (let i = left; i <= right; i++) {
		if (isMeasureEven(i)) answer += i;
		else answer -= i;
	}

	return answer;
}

const isMeasureEven = (number) => {
	let count = 1;
	if (number === 1) return false;
	for (let i = 2; i <= Math.floor(number / 2); i++) {
		if (number % i === 0) count++;
	}
	count++;
	console.log(count);
	return count % 2 ? false : true;
};

console.log(solution(13, 17));

// 다른 분 풀이
function solution2(left, right) {
	var answer = 0;
	for (let i = left; i <= right; i++) {
		// 제곱근이 정수면 약수의 갯수가 홀수
		if (Number.isInteger(Math.sqrt(i))) {
			answer -= i;
		} else {
			answer += i;
		}
	}
	return answer;
}
