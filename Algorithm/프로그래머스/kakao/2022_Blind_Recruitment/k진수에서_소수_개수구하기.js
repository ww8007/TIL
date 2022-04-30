function isPrime(num) {
	if (num < 2) return false;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (!(num % i)) return false;
	}
	return true;
}

function solution(n, k) {
	let ans = 0;
	const binaryNum = n.toString(k).split(0);

	for (const item of binaryNum) {
		isPrime(item) && ans++;
	}

	return ans;
}
