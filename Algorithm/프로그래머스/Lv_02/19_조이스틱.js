function solution(name) {
	var answer = 0;
	let min = name.length - 1;

	for (let i = 0; i < name.length; i++) {
		answer +=
			name.charCodeAt(i) < 78
				? name.charCodeAt(i) % 65
				: 91 - name.charCodeAt(i);

		let nIdx = i + 1;

		while (nIdx < name.length && name.charCodeAt(nIdx) === 65) {
			nIdx += 1;
		}
		min = Math.min(min, i * 2 + name.length - nIdx);
		min = Math.min(min, (name.length - nIdx) * 2 + i);
	}
	answer += min;
	return answer;
}
