answer = false;
function solution(s) {
	var answer = true;

	if (s.length !== 4 && s.length !== 6) return false;

	for (const word of s) {
		if (isNaN(word)) {
			answer = false;
		}
	}

	return answer;
}
