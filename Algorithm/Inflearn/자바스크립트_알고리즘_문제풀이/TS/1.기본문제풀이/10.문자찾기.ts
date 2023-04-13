function solution(s: string, t: string) {
	return Array.from(s).reduce((acc, cur) => (cur === t ? ++acc : acc), 0);
}

const str = "COMPUTERPROGRAMMING";
console.log(solution(str, "R"));
