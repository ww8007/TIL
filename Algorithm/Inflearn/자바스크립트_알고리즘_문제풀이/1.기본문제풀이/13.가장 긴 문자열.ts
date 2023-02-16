function solution(s: string[]) {
	return s.reduce((acc, cur) => (cur.length > acc.length ? cur : acc), "");
}
let str = ["teacher", "time", "student", "beautiful", "good"];
console.log(solution(str));
