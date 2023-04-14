function solution(s: string) {
	const stack = [];

	let ans = 0;

	for (let i = 0; i < s.length; i++) {
		const item = s[i];
		if (item === "(") stack.push(item);
		else {
			stack.pop();
			if (s[i - 1] === "(") ans += stack.length;
			else ans++;
		}
	}

	return ans;
}

let a = "()(((()())(())()))(())";
console.log(solution(a));
