function solution(n, k, card) {
	let answer;
	let obj = {};
	let tmp = new Set();
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			for (let k = j + 1; k < n; k++) {
				tmp.add(card[i] + card[j] + card[k]);
			}
		}
	}
	let ans = Array.from(tmp).sort((a, b) => b - a);
	console.log(ans);
	return ans[2];
}

let arr = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr));
