function solution(x, n) {
	let answer = Array(n).fill(x);
	return answer.map((item, idx) => item + x * idx);
}
