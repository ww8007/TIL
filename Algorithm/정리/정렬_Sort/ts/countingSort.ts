const countingSort = (arr: number[]) => {
	const result = [...arr];
	const len = result.length;
	const count = Array.from({ length: len }, () => 0);
	const output = Array.from({ length: len }, () => 0);

	for (let i = 0; i < len; i++) {
		count[result[i]]++;
	}

	for (let i = 1; i < len; i++) {
		count[i] += count[i - 1];
	}

	for (let i = len - 1; i >= 0; i--) {
		output[count[result[i]] - 1] = result[i];
		count[result[i]]--;
	}

	return output;
};

const countingSortExample = [5, 4, 3, 2, 1];
console.log(countingSort(countingSortExample));
// [ 1, 2, 3, 4, 5 ]
