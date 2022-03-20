const solution = (num, input) => {
	let arr = [];
	for (const item of input) {
		if (item > num - 1) arr.push(item);
	}
	return arr;
};

const input = [7, 3, 9, 5, 6, 12];

console.log(solution(6, input));
