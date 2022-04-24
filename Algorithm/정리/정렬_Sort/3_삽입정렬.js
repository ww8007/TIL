function solution(arr) {
	let ans = arr;

	for (let i = 0; i < arr.length; i++) {
		let tmp = arr[i]; // 7
		let j;
		for (j = i - 1; j >= 0; j--) {
			if (arr[j] > tmp) arr[j + 1] = arr[j];
			else break;
		}
		arr[j + 1] = tmp;
	}

	return ans;
}

let arr = [11, 7, 5, 6, 10, 9];
console.log(solution(arr));
