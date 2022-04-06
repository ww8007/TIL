const isPrime = (num) => {
	if (num === 1) return false;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (num % i === 1) return i;
	}
	return num - 1;
};

function solution(n) {
	var answer = 0;
	answer = isPrime(n);

	return answer;
}
