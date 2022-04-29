function solution(arr) {
	let answer = 'NO';
	let total = arr.reduce((a, b) => a + b);

	function DFS(v, sum) {
		if (v === arr.length) {
			if (total - sum === sum) {
				console.log(sum);
				answer = 'YES';
			}
		} else {
			DFS(v + 1, sum + arr[v]);
			DFS(v + 1, sum);
		}
	}
	DFS(0, 0);
	return answer;
}

let arr = [1, 3, 5, 6, 7, 10];
console.log(solution(arr));
