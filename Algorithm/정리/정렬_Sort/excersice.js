// 선택 정렬
function selectionSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let idx = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[idx] > arr[j]) idx = j;
		}
		[arr[i], arr[idx]] = [arr[idx], arr[i]];
	}
	return arr;
}

let arr = [10, 1, 3, 4, 2, 5, 6];

console.log(selectionSort(arr));

// 버블 정렬
function bubbleSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
			}
		}
	}
	return arr;
}
arr = [10, 1, 3, 4, 2, 5, 6];
console.log(bubbleSort(arr));

// 삽입 정렬
function insertionSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		let tmp = arr[i];
		let j;
		for (j = i - 1; j >= 0; j--) {
			if (arr[j] > tmp) arr[j + 1] = arr[j];
			else break;
		}
		arr[j + 1] = tmp;
	}
	return arr;
}
arr = [10, 1, 3, 4, 2, 5, 6];
console.log(insertionSort(arr));

function quickSort(arr) {
	if (arr.length < 2) return arr;

	const pivot = arr[0];
	let left = [];
	let right = [];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] <= pivot) left = [...left, arr[i]];
		else right = [...right, arr[i]];
	}
	return [...quickSort(left), pivot, ...quickSort(right)];
}

arr = [10, 1, 3, 4, 2, 5, 6];
console.log(quickSort(arr));

function mergeSort(arr) {
	if (arr.length === 1) return arr;

	const middleIdx = Math.floor(arr.length / 2);
	const left = arr.slice(0, middleIdx);
	const right = arr.slice(middleIdx);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	const res = [];
	while (left.length !== 0 && right.length !== 0) {
		left[0] <= right[0] ? res.push(left.shift()) : res.push(right.shift());
	}
	return [...res, ...left, ...right];
}
arr = [10, 1, 3, 4, 2, 5, 6];
console.log(mergeSort(arr));

arr.replace(/[^a-z]/g);
