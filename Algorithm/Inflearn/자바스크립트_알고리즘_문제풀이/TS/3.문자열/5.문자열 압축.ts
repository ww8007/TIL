function solution(s: string) {
	let cnt = 1;
	let ans = "";
	for (let i = 0; i < s.length; i++) {
		if (s[i] === s[i + 1]) {
			cnt++;
		} else {
			cnt !== 1 ? (ans += `${s[i]}${cnt}`) : (ans += s[i]);
			cnt = 1;
		}
	}

	return ans;
}

let str5 = "KKHSSSSSSSE";
console.log(solution(str5));
