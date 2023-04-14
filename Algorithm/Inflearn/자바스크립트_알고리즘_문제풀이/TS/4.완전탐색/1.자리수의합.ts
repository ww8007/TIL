function solution(n: number, arr: number[]) {
	let ans = 0;
	let max = Number.MIN_SAFE_INTEGER;

	for (const x of arr) {
		let sum = 0;
		let temp = x;

		while (temp) {
			sum += temp % 10;
			temp = Math.floor(temp / 10);
		}

		if (sum > max) {
			max = sum;
			ans = x;
		} else if (sum === max) {
			ans = Math.max(ans, x);
		}
	}

	return ans;
}

function solution2(n: number, arr: number[]) {
	let ans = 0;
	let max = Number.MIN_SAFE_INTEGER;

	for (const x of arr) {
		let sum = x
			.toString()
			.split("")
			.reduce((acc, cur) => acc + Number(cur), 0);

		if (sum > max) {
			max = sum;
			ans = x;
		} else if (sum === max) {
			ans = Math.max(ans, x);
		}
	}

	return ans;
}

let arr = [128, 460, 603, 40, 521, 137, 123];
console.log(solution2(7, arr));
