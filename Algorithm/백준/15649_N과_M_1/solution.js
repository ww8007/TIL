const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

readline
	.on("line", function (line) {
		input = line.split(" ").map((el) => parseInt(el));
	})
	.on("close", function () {
		solution(input);
		process.exit();
	});

const solution = (input) => {
	const [num, checkNum] = input;

	const arr = Array.from({ length: num }, (_, i) => i + 1);
	const result = getPermutation(arr, checkNum);
	console.log(result.map((el) => el.join(" ")).join("\n"));
};
const getPermutation = (arr, selectNumber) => {
	const results = [];
	if (selectNumber === 1) return arr.map((value) => [value]);
	arr.forEach((fixed, index, origin) => {
		const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
		const permutations = getPermutation(rest, selectNumber - 1);
		const attached = permutations.map((permutation) => [fixed, ...permutation]);
		results.push(...attached);
	});
	return results;
};
