const solution = (input) => {
	const len = Math.floor(input.length / 2);
	let ans = 'YES';
	input = input.toLowerCase();

	for (let i = 0; i < len; i++) {
		if (input[i] !== input[input.length - i - 1]) {
			return 'NO';
		}
	}
	return ans;
};

const solution2 = (input) => {
	let ans = 'YES';
	input = input.toLowerCase();
	if (input.split('').reverse().join('') !== input) return 'NO';
	return ans;
};

const input = 'goooG';

const input2 = 'YES';

console.log(solution(input2));
console.log(solution2(input2));
