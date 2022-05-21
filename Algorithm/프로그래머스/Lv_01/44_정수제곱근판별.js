function solution(n) {
	let ans;

	if (Math.sqrt(n) % 1) {
		return -1;
	} else return (Math.sqrt(n) + 1) ** 2;
}
