const getGcd = (a, b) => (a % b ? getGcd(b, a % b) : b);

function solution(n, m) {
	let big = Math.max(n, m);
	let small = n === big ? m : n;

	return [getGcd(big, small), (n * m) / getGcd(big, small)];
}
