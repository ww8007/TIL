function solution(strings, n) {
	var answer = [];

	strings.sort((a, b) => {
		if (a[n] < b[n]) return -1;
		if (a[n] > b[n]) return 1;
		if (a[n] === b[n]) {
			if (a < b) return -1;
			if (b > a) return 1;
			else return 0;
		}
	});

	return strings;
}
