function solution(input) {
	let ans = '';
	for (const item of input) {
		if (isUpperCase(item)) ans += item;
		else ans += item.toLowerCase();
	}
	return ans;
}

let input = 'StuDY';

console.log(solution(input));

function isUpperCase(item) {
	if (item.toUpperCase() === item) return true;
	return false;
}
