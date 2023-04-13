function solution(s: string) {
	const mid = Math.floor(s.length / 2);
	if (s.length % 2) return s.substring(mid, mid + 1);
	else return s.substring(mid - 1, mid + 1);
}
console.log(solution("studyo"));
