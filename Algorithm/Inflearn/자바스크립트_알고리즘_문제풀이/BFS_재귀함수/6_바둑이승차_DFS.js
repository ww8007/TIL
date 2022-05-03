function solution(c, arr) {
	let answer = 0;
	let n = arr.length;

	function DFS(L, sum) {
		if (sum > c) return; // 스택 더 이상 안돌게
		if (L === n) {
			answer = Math.max(answer, sum);
		} else {
			DFS(L + 1, sum + arr[L]); // 태운다
			DFS(L + 1, sum); // 태우지 않는다
		}
	}
	DFS(0, 0);
	return answer;
}

let arr = [81, 58, 42, 33, 61];
console.log(solution(259, arr));
