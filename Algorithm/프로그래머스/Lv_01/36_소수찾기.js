function isPrime(num) {
	if (num === 1) return false;
	if (num === 2) return true;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (!(num % i)) return false;
	}
	return true;
}

function solution(n) {
	var answer = 0;

	for (let i = 1; i <= n; i++) {
		isPrime(i) && answer++;
	}

	return answer;
}
