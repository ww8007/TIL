function solution(n, a, b) {
	let count = 0;
	if (a > b) [b, a] = [a, b];

	while (true) {
		if (b === a) break;
		a = Math.ceil(a / 2);
		b = Math.ceil(b / 2);
		count++;
	}

	return count;
}
