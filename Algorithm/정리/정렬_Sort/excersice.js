// 선택 정렬
function selectionSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let idx = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[idx]) idx = j;
		}
		[arr[i], arr[idx]] = [arr[idx], arr[i]];
	}
	return arr;
}

const arr = [10, 1, 3, 4, 2, 5, 6];

console.log(selectionSort(arr));

// 버블 정렬
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

console.log(bubbleSort(arr));

// 삽입 정렬
function insertionSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let tmp = arr[i];
		let j;
		for (j = i - 1; j >= 0; j--) {
			if (arr[j] > arr[tmp]) arr[j + 1] = arr[j];
			else break;
		}
		arr[j + 1] = tmp;
	}
	return arr;
}

console.log(insertionSort(arr));
