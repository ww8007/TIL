const quickSortTS = (arr: number[]): number[] => {
	const result = [...arr];
	if (result.length <= 1) return result;

	const pivot = result[0];
	const left = [];
	const right = [];

	for (let i = 1; i < result.length; i++) {
		if (result[i] < pivot) {
			left.push(result[i]);
		} else {
			right.push(result[i]);
		}
	}

	return [...quickSort(left), pivot, ...quickSort(right)];
};

const quickExample = [5, 4, 3, 2, 1];
console.log(quickSort(quickExample));
// [ 1, 2, 3, 4, 5 ]
