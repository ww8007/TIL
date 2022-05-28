function solution(s) {
	var answer = [];

	s = s.replace(/{/g, '[');
	s = s.replace(/}/g, ']');

	let arr = JSON.parse(s);
	arr.sort((a, b) => a.length - b.length);

	const nSet = new Set();

	for (const item of arr) {
		for (const eachItem of item) {
			nSet.add(eachItem);
		}
	}

	return [...nSet];
}
