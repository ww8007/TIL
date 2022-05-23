function solution(arr1, arr2) {
	let arr = Array.from(Array(arr1.length), () => Array(arr1[0].length).fill(0));

	arr = arr.map((sepArr, idx) =>
		sepArr.map((_, i) => arr1[idx][i] + arr2[idx][i])
	);

	return arr;
}
