function solution(m, arr) {
	let answer = 500;
	let n = arr.length;

	function DFS(L, sum) {
		if (m - sum < 0) return;
		if (L > answer) return; // 굳이 다른 L 탐색 안하도록
		if (sum === m) {
			console.log(L, sum);
			answer = Math.min(answer, L); // 최솟값 구하기
		} else {
			for (let i = 0; i < n; i++) {
				DFS(L + 1, sum + arr[i]); // 다음으로 넘어가기
			}
		}
	}

	DFS(0, 0);
	return answer;
}

let arr = [1, 2, 5];
console.log(solution(15, arr));
