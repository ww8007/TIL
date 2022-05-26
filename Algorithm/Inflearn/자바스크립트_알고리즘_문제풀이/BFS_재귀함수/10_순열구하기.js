function solution(m, arr) {
	let answer = [];
	n = arr.length;

	let check = Array.from({ length: m }, () => 0);
	let tmp = Array.from({ length: m }, () => 0);

	function DFS(L) {
		if (L === m) {
			answer.push(tmp.slice());
		} else {
			for (let i = 0; i < n; i++) {
				if (!check[i]) {
					check[i] = 1; // 체크를 해서
					tmp[L] = arr[i]; // 사용할 tmp에 넣고
					DFS(L + 1); // 탐색을 돌리고
					check[i] = 0; // 체크 해제
				}
			}
		}
	}
	DFS(0);
	return answer;
}

let arr = [3, 6, 9];

console.log(solution(3, arr));
