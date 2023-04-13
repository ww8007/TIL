function solution(s: string) {
	s = s.toLowerCase().replace(/[^a-z]/g, "");
	if (s.split("").reverse().join("") !== s) {
		return "NO";
	}

	return "TRUE";
}

let str2 = "found7, time: study; Yduts; emit, 7Dnuof";
console.log(solution(str2));
