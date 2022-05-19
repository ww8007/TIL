function sort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let tmp = arr[i];
		let j;
		for (j = i - 1; j >= 0; j--) {
			if (arr[j] > tmp) arr[j + 1] = arr[j];
			else break;
		}
		arr[j + 1] = tmp;
	}
}

function quickSort(arr) {
	if (arr.length <= 1) return arr;

	const pivot = arr[0];
	const left = [];
	const right = [];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) left.push(arr[i]);
		else right.push(arr[i]);
	}
	return [...quickSort(left), pivot, ...quickSort(right)];
}

function merge(left, right) {
    const res = [];
    while(left.length !==0) {
        left[0] <
    }
}
