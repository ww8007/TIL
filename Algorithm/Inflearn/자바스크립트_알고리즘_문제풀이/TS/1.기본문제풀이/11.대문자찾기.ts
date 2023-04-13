function solution(s: string) {
	return Array.from(s).reduce(
		(acc, cur) => (cur.toUpperCase() === cur ? ++acc : acc),
		0
	);
}

let str = "KoreaTimeGood";

function solution2(s: string) {
	let count = 0;
	for (const word of s) {
		const num = word.charCodeAt(0);
		if (num >= 65 && num <= 90) ++count;
	}
	return count;
}

console.log(solution(str));
console.log(solution2(str));
