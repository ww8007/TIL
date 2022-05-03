function solution(arr) {
	let answer = 'NO';
	let flag = 0;
	let total = arr.reduce((a, b) => a + b);

	function DFS(L, sum) {
		if (L === arr.length) {
			if (flag) return;
			if (total - sum === sum) {
				answer = 'YES';
				flag = 1; // flag 설정 -> 더 이상 스택이 돌지 않도록
			}
		} else {
			DFS(L + 1, sum + arr[L]); // 합을 더해서 다음으로
			DFS(L + 1, sum); // 그냥 다음으로
		}
	}

	DFS(0, 0);

	return answer;
}

let arr = [1, 3, 5, 6, 7, 10];
console.log(solution(arr));
