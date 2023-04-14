function solution3(arr2: number[]) {
	let ans = [];
	for (let item of arr2) {
		let res = 0;

		while (item) {
			let t = item % 10;
			res = res * 10 + t;
			item = Math.floor(item / 10);
		}

		if (isPrime(res)) ans.push(res);
	}

	return ans;
}

const isPrime = (n: number) => {
	if (n <= 1) return false;

	for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
		if (n % i === 0) return false;
	}
	return true;
};

let arr2 = [32, 55, 62, 20, 250, 370, 200, 30, 100];
console.log(solution(arr2));
