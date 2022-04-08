function solution(s) {
	let ans;
	let mid = Math.floor(s.length / 2);
	if (s.length % 2 === 1) ans = s.substring(mid, mid + 1);
	else ans = s.substring(mid - 1, mid + 1);
	return ans;
}
