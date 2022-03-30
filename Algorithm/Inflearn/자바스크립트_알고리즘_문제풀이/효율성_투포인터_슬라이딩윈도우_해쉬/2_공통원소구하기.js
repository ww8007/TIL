function solution(arr1, arr2) {
	let answer = [];
	arr1.sort((a, b) => a - b);
	arr2.sort((a, b) => a - b);

	let n = arr1.length;
	let m = arr2.length;
	let p1 = 0;
	let p2 = 0;

	while (p1 < n && p2 < m) {
		if (arr1[p1] === arr2[p2]) {
			answer.push(arr1[p1++]);
			p2++;
		} else if (arr1[p1] < arr2[p2]) p1++;
		else p2++;
	}
	return answer;
}

let a = [1, 3, 10, 5, 2];
let b = [3, 2, 5, 7, 8];
console.log(solution(a, b));
