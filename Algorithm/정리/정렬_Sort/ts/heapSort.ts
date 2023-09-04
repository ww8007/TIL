const heapSort = (arr: number[]) => {
	const result = [...arr];
	const len = result.length;

	for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
		heapify(result, len, i);
	}

	for (let i = len - 1; i > 0; i--) {
		[result[0], result[i]] = [result[i], result[0]];
		heapify(result, i, 0);
	}

	return result;
};

const heapify = (arr: number[], len: number, i: number) => {
	let largest = i;
	const left = i * 2 + 1;
	const right = left + 1;

	if (left < len && arr[left] > arr[largest]) {
		largest = left;
	}

	if (right < len && arr[right] > arr[largest]) {
		largest = right;
	}

	if (largest !== i) {
		[arr[i], arr[largest]] = [arr[largest], arr[i]];
		heapify(arr, len, largest);
	}
};
