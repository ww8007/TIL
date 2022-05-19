function solution(s) {
	var answer = true;

	let arr = s.split('').map((s) => s.toLowerCase());

	let pCount = 0;
	let yCount = 0;

	arr.forEach((s) => {
		s === 'p' ? pCount++ : s === 'y' && yCount++;
	});

	return pCount === yCount;
}
