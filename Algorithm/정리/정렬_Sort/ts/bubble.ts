const bubbleSort = (arr: number[]): number[] => {
	const result = [...arr];
	for (let i = 0; i < result.length; i++) {
		for (let j = 0; j < result.length - i; j++) {
			if (result[j] > result[j + 1]) {
				[result[j], result[j + 1]] = [result[j + 1], result[j]];
			}
		}
	}
	return result;
};

const example = [5, 4, 3, 2, 1];

console.log(bubbleSort(example));
// [ 1, 2, 3, 4, 5 ]
