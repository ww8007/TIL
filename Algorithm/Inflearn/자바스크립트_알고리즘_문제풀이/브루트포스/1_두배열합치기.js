const solution = (input) => {
	let ans,
		max = Number.MIN_SAFE_INTEGER;

	for (let item of input) {
		let sum = 0,
			tmp = item;
		while (tmp) {
			sum += tmp % 10;
			tmp = Math.floor(tmp / 10);
		}
		if (sum > max) {
			max = sum;
			ans = item;
		} else if (sum === max) {
			ans = Math.max(ans, item);
		}
	}
	return ans;
};

const solution2 = (input) => {
	let ans,
		max = Number.MIN_SAFE_INTEGER;
	for (let x of input) {
		let sum = x.toString().split('').reduce(add, 0);
		if (sum > max) {
			max = sum;
			ans = x;
		} else if (sum === max) ans = Math.max(x, ans);
	}
	return ans;
};

const add = (a, b) => Number(a) + Number(b);

const input = [137, 460, 603, 40, 521, 128, 123];

console.log(solution2(input));
