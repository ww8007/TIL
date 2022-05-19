function getSumFromOne(num) {
	return (num * (num + 1)) / 2;
}

function solution(a, b) {
	let ans = 0;
	let max = Math.max(a, b);
	let min = Math.min(a, b);

	return getSumFromOne(max) - getSumFromOne(min - 1);
}
