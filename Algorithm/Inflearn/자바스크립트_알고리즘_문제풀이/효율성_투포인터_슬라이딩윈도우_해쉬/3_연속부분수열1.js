function solution(m, arr) {
	let answer = 0;
	let lt = 0;
	let sum = 0;
	let consoleArr = [];
	for (let rt = 0; rt < arr.length; rt++) {
		sum += arr[rt];
		consoleArr.push(arr[rt]);
		if (sum === m) {
			answer++;
			console.log(consoleArr);
		}
		while (sum >= m) {
			sum -= arr[lt++];
			consoleArr.shift();
			if (sum === m) {
				answer++;
				console.log(consoleArr);
			}
		}
	}
	return answer;
}

let a = [1, 2, 1, 3, 1, 1, 1, 2];
console.log(solution(6, a));
