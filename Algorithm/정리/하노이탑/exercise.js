const answer = [];

function hanoi(n, from, to, middle) {
	if (n === 1) answer.push([from, to]);
	else {
		hanoi(n - 1, from, middle, to);
		answer.push([from, to]);
		hanoi(n - 1, middle, to, from);
	}
}

function solution(n) {
	hanoi(n, 1, 3, 2);
	console.log(answer);
	return answer;
}

console.log(solution(3));
