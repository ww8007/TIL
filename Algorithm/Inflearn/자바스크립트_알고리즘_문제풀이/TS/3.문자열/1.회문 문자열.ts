function solution(s: string) {
	let lp = 0;
	let rp = s.length - 1;

	while (lp < rp) {
		if (s[lp].toLowerCase() !== s[rp].toLowerCase()) return "NO";
		lp++;
		rp--;
	}

	return "YES";
}

function solution2(s: string) {
	s = s.toLowerCase();

	const reverse = s.split("").reverse().join("");

	return reverse === s ? "YES" : "NO";
}

let str = "goooG";
console.log(solution(str));
console.log(solution2(str));
