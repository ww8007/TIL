const isCorrect = (str) => {
	let stack = [];
	for (const word of str) {
		if (word === '(') stack.push(word);
		else {
			if (stack.length) stack.pop();
			else return false;
		}
	}
	if (stack.length) return false;
	return true;
};

function solution(p) {
	var answer = '';
	let l = 0;
	let r = 0;
	let isBalance = true;

	if (isCorrect(p)) return p;

	for (let i = 0; i < p.length; i++) {
		// 올바른 문자열 확인
		if (p[i] === '(') l++;
		else r++;
		// ')' 개수가 더 많아지면 올바른 문자열 X
		if (r > l) isBalance = false;

		if (r === l) {
			if (isBalance) {
				answer += p.slice(0, i + 1); // u : 균형잡힌 문자열
				answer += solution(p.slice(i + 1, p.length)); // v -> 1 단계부터 시작 3
				return answer; // 이어 붙인 후 반환 3-1
			}
			if (!isBalance) {
				answer += '(';
				answer += solution(p.slice(i + 1, p.length)); // v에 대해 1단계 부터 재귀적 수행
				answer += ')';

				// 첫번째 마지막 문자 제거
				for (let j = 1; j < i; j++) {
					// 나머지 문자열 뒤집기
					if (p[j] == ')') answer += '(';
					if (p[j] == '(') answer += ')';
				}
				return answer;
			}
		}
	}

	return answer;
}
