function solution(t, p) {
	var answer = 0;

	let lp = 0;

	for (let i = 0; i < t.length - p.length + 1; i++) {
		const num = Number(t.slice(lp, lp + p.length));
		if (num <= Number(p)) answer++;
		lp++;
	}

	return answer;
}
