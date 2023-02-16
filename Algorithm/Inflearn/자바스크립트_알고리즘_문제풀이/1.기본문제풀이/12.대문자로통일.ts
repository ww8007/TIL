function solution(s: string) {
	return Array.from(s)
		.map((word) => word.toUpperCase())
		.join("");
}

let str = "ItisTimeToStudy";

function solution2(s: string) {
	return Array.from(s)
		.map((word) =>
			word.charCodeAt(0) >= 97 && word.charCodeAt(0) <= 122
				? String.fromCharCode(word.charCodeAt(0) - 32)
				: word
		)
		.join("");
}

console.log(solution(str));
console.log(solution2(str));
