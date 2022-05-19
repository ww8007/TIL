function solution(s) {
	var answer = '';

	let arr = s.split('').sort((a, b) => {
		return a > b ? -1 : a < b ? 1 : 0;
	});

	return arr.join('');
}
