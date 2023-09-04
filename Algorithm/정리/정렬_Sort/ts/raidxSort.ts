const radixSort = (arr: number[]) => {
	const result = [...arr];
	const max = Math.max(...result);
	let exp = 1;

	while (max / exp > 0) {
		countingSort(result, exp);
		exp *= 10;
	}

	return result;
};

const countingSort = (arr: number[], exp: number) => {
	const len = arr.length;
	const count = Array.from({ length: 10 }, () => 0);
	const output = Array.from({ length: len }, () => 0);

	for (let i = 0; i < len; i++) {
		count[Math.floor(arr[i] / exp) % 10]++;
	}

	for (let i = 1; i < 10; i++) {
		count[i] += count[i - 1];
	}

	for (let i = len - 1; i >= 0; i--) {
		output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
		count[Math.floor(arr[i] / exp) % 10]--;
	}

	for (let i = 0; i < len; i++) {
		arr[i] = output[i];
	}

	return arr;
};

const radixSortExample = [5, 4, 3, 2, 1];
console.log(radixSort(radixSortExample));
// [ 1, 2, 3, 4, 5 ]
