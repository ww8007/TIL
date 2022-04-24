// 시간 복잡도 : O(n^2)
// 가장 기초적으로 오름차순으로
// 왼쪽 : 작게

function sort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		// 변경할 인덱스
		let idx = i;
		for (let j = i + 1; j < arr.length; j++) {
			// 만약 지정된 인덱스 값 > 후의 값들
			if (arr[idx] > arr[j]) idx = j;
		}
		// 스위칭
		[arr[i], arr[idx]] = [arr[idx], arr[i]];
	}
	return arr;
}

const arr = [10, 1, 3, 4, 2, 5, 6];

console.log(sort(arr));
