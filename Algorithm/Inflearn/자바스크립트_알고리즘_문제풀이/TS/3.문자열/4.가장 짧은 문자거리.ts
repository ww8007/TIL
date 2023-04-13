function solution(s: string, t: string) {
	const ans = [];

	let point = Number.MAX_SAFE_INTEGER;

	for (let i = 0; i < s.length; i++) {
		if (s[i] === "e") {
			point = i;
		}
		ans.push(Math.abs(point - i));
	}

	point = Number.MAX_SAFE_INTEGER;
	s = s.split("").reverse().join("");

	const len = s.length - 1;

	for (let i = 0; i < s.length; i++) {
		if (s[i] === "e") {
			point = i;
		}
		ans[len - i] = Math.min(ans[len - i], Math.abs(point - i));
	}

	return ans;
}

let str4 = "teachermode";
console.log(solution(str4, "e"));
