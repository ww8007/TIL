function solution(s) {
	let answer = '';
	let cnt = 1;
	s = s + ' ';

	for (let i = 0; i < s.length; i++) {
		if (s[i] === s[i + 1]) cnt++;
		else {
			answer += s[i];
			if (cnt > 1) answer += cnt;
			cnt = 1;
		}
	}
	return answer;
}

let str = 'KKHSSSSSSSE';
console.log(solution(str));
