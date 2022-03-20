const solution = (input) => {
	let max = 0;
	let ans = 0;
	for (const item of input) {
		if (item > max) {
			max = item;
			ans++;
		}
	}
	return ans;
};

const input = [130, 135, 148, 140, 145, 150, 150, 153];

console.log(solution(input));
