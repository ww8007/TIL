function solution(s) {
	var answer = s;
	let obj = {
		zero: 0,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9
	};
	Object.keys(obj).map((n) => {
		let arr = answer.split(n);
		answer = arr.join(obj[n]);
	});

	return Number(answer);
}
