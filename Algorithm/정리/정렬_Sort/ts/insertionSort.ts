const insertionSort = (arr: number[]): number[] => {
	const result = [...arr];
	for (let i = 1; i < result.length; i++) {
		const temp = result[i];
		let j = i - 1;
		while (j >= 0 && result[j] > temp) {
			result[j + 1] = result[j];
			j--;
		}
		result[j + 1] = temp;
	}
	return result;
};

const exampleInsertion = [5, 4, 3, 2, 1];
console.log(insertionSort(exampleInsertion));
// [ 1, 2, 3, 4, 5 ]
