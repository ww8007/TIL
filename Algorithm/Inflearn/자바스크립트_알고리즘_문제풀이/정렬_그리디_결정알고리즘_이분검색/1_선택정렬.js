function solution(arr) {
	let answer = arr;

	for (let i = 0; i < arr.length - 1; i++) {
		let idx = i;
		for (let j = i + 1; j < arr.length; j++) {
			// idx를 이용해서 최소값 구하기
			if (arr[j] < arr[idx]) idx = j;
		}
		// 바꿔주기
		[arr[i], arr[idx]] = [arr[idx], arr[i]];
	}

	return answer;
}

let arr = [13, 5, 11, 7, 23, 15];
console.log(solution(arr));
