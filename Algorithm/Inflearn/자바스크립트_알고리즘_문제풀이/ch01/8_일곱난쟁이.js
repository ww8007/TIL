function solution(arr) {
	let answer = arr;
	let sum = arr.reduce(add, -100);

	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (sum - arr[i] - arr[j] == 0) {
				arr.splice(j, 1);
				arr.splice(i, 1);
			}
		}
	}

	return answer;
}

let arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(...solution(arr));

function add(a, b) {
	return a + b;
}
