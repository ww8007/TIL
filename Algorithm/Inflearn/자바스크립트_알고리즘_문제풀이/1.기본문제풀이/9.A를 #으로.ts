function solution(s: string) {
	const answer = Array.from(s).map((word) => (word === "A" ? "#" : word));
	return answer.join("");
}

// 정규식을 이용한 변경
// /A/g

function solution2(s: string) {
	return s.replace(/A/g, "#");
}

let str = "BANANA";
console.log(solution(str));
console.log(solution2(str));
