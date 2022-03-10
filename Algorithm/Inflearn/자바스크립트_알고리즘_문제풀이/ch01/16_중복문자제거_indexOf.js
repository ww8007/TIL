const solution = (input) => {
	let ans = '';
	// console.log(input.indexOf('k', 3));
	for (let i = 0; i < input.length; i++) {
		if (i === input.indexOf(input[i])) ans += input[i];
		console.log(input[i], i, input.indexOf(input[i]));
	}
	return ans;
};

const input = 'ksekkset';
console.log(solution(input));
