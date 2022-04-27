const quickSort = function (arr) {
	if (arr.length <= 1) return arr;

	const pivot = arr[0];
	const left = [];
	const right = [];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] <= pivot) left.push(arr[i]);
		else right.push(arr[i]);
	}

	const lSorted = quickSort(left);
	const rSorted = quickSort(right);
	return [...lSorted, pivot, ...rSorted];
};

function solution(arr) {
	let ans = arr;

	ans = quickSort(arr);

	return ans;
}

let arr = [11, 7, 5, 6, 10, 9];
console.log(solution(arr));
