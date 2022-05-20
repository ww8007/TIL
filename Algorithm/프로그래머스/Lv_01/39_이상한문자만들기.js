function solution(s) {
	let ans = '';

	let arr = s.split(' ');

	arr.forEach((str) => {
		for (let i = 0; i < str.length; i++) {
			if (i % 2) ans += str[i].toLowerCase();
			else ans += str[i].toUpperCase();
		}
		ans += ' ';
	});

	ans = ans.substring(0, ans.length - 1);

	return ans;
}
