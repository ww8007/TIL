const answer = [];
const hanoi = (n, from, to, mid) => {
	if (n === 1) answer.push([from, to]);
	else {
		// 무조건 처음은 중간으로 옮김
		hanoi(n - 1, from, mid, to);
		// 맨 아래 원반을 목적지 이동
		answer.push([from, to]);
		// 다른 곳 옮겼던 원반들 그 위로 이동
		hanoi(n - 1, mid, to, from);
	}
};

function solution(n) {
	hanoi(n, 1, 3, 2);

	return answer;
}

console.log(solution(4));
