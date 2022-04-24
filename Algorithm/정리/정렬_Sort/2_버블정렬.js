// 시간 복잡도 : O(n^2)
// 단순하게 앞과 뒤 비교
// 왼쪽 : 작게

function bubbleSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	return arr;
}

const arr = [10, 1, 3, 4, 2, 5, 6];

console.log(bubbleSort(arr));
