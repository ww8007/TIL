function solution(n, m, section) {
	let ans = 0;
	let pos = 0;

	for (let i = 0; i < section.length; i++) {
		if (pos < section[i]) {
			pos = section[i] + m - 1;
			ans++;
		}
	}

	return ans;
}
