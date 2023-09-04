const selectionSort = (arr: number[]): number[] => {
	const result = [...arr];
	for (let i = 0; i < result.length; i++) {
		let min = i;
		for (let j = i + 1; j < result.length; j++) {
			if (result[min] > result[j]) {
				min = j;
			}
		}
		[result[i], result[min]] = [result[min], result[i]];
	}
	return result;
};

const selectionExample = [5, 4, 3, 2, 1];
console.log(selectionSort(selectionExample));
// [ 1, 2, 3, 4, 5 ]
