function sort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let tmp = arr[i];
		let j;
		for (j = i - 1; i >= 0; j--) {
			if (arr[j] > tmp) arr[j + 1] = arr[j];
			else break;
		}
	}
}
