function solution(s) {
	if (s.length === 1) return 1;
	let strArr = [];
	for (let i = 1; i <= Math.floor(s.length / 2); i++) {
		let count = 1;
		let str = '';
		for (let j = 0; j < s.length; j += i) {
			let current = s.substr(j, i);
			let next = s.substr(j + i, i);
			if (current === next) count++;
			else {
				str = count > 1 ? str + count + current : str + current;
				count = 1;
			}
		}
		strArr.push(str.length);
	}

	return Math.min(...strArr);
}
