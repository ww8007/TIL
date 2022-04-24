function solution(target, arr) {
	let answer;
	arr.sort((a, b) => a - b);
	let lt = 0;
	let rt = arr.length;
	while (lt <= rt) {
		// 중간 인덱스 구해주기
		let mid = parseInt((lt + rt) / 2);
		// 타깃 보다 큰 경우 오른쪽 값 다 필요 없음
		if (arr[mid] > target) rt = mid - 1;
		// 작은 경우 왼쪽 값 다 필요 없음
		else if (arr[mid] < target) lt = mid + 1;
		else {
			// 인덱스가 아니므로 +1
			answer = mid + 1;
			break;
		}
	}

	return answer;
}

let arr = [23, 87, 65, 12, 57, 32, 99, 81];
console.log(solution(32, arr));
