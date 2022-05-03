function solution(m, ps, pt) {
	let answer = Number.MIN_SAFE_INTEGER;
	let n = ps.length;

	function DFS(L, sum, timeSum) {
		if (timeSum > m) return;
		if (L === n) {
			answer = Math.max(sum, answer);
		} else {
			DFS(L + 1, sum + ps[L], timeSum + pt[L]); // 문제를 푼다
			DFS(L + 1, sum, timeSum); // 문제를 풀지 않는다.
		}
	}

	DFS(0, 0, 0);

	return answer;
}

let ps = [10, 25, 15, 6, 7];
let pt = [5, 12, 8, 3, 4];
console.log(solution(20, ps, pt));
