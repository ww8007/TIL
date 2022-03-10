function solution(input) {
	let ans = 0;
	for (const a of input) {
		if (a === a.toUpperCase()) ans++;
	}
	return ans;
}

function solution2(input) {
	let ans = 0;
	for (const a of input) {
		let num = a.charCodeAt();
		if (num >= 65 && num <= 90) ans++;
	}
	return ans;
}

let input = 'KoreaTimeGood';
console.log(solution2(input));
