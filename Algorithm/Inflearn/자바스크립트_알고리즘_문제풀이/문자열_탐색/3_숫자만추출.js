const solution = (input) => {
	let ans = '';

	for (let item of input) {
		if (!isNaN(item)) ans += ans * 10 + Number(item);
	}
	console.log(input.replace(/[^0-9]/g, ''));
	return ans;
};

const input = 'g0en2T0s8eSoft';

console.log(solution(input));
