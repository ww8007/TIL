function solution(times) {
	let ans = 0;

	let timeWithString = [];

	times.forEach(([s, e]) => {
		timeWithString.push([s, 's']);
		timeWithString.push([e, 'e']);
	});

	timeWithString.sort((a, b) =>
		a[0] === b[0] ? +a[1].charCodeAt() - +b[1].charCodeAt() : a[0] - b[0]
	);
	let cnt = 0;
	for (const [_, str] of timeWithString) {
		if (str === 's') cnt++;
		else cnt--;
		ans = Math.max(ans, cnt);
	}

	return ans;
}

let arr = [
	[14, 18],
	[12, 15],
	[15, 20],
	[20, 30],
	[5, 14]
];
console.log(solution(arr));
