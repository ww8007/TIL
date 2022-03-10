function solution(s, t) {
	let answer = s.split(t).length;

	return answer - 1;
}

let str = 'COMPUTERPROGRAMMING';
console.log(solution(str, 'R'));
