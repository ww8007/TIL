const solution = (input) => {
	let ans = [];

	for (let item of input) {
		let reverse = item.toString().split('').reverse().join('');
		isPrime(Number(reverse)) && ans.push(Number(reverse));
	}
	return ans;
};

const solution2 = (input) => {
	let ans = [];

	for (let item of input) {
		let res = 0;
		while (item) {
			let t = item % 10;
			res = res * 10 + t;
			item = parseInt(item / 10);
		}
		isPrime(res) && ans.push(res);
	}
	return ans;
};

const isPrime = (num) => {
	if (num === 1) return false;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (!(num % i)) return false;
	}
	return true;
};

const input = [32, 55, 62, 20, 250, 370, 200, 30, 100];

console.log(solution(input));
