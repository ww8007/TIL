function solution(input) {
	let ans;
	let mid = Math.floor(input.length / 2);
	if (input.length % 2 === 1) ans = input.substring(mid, mid + 1);
	else ans = input.substring(mid - 1, mid + 1);
	return ans;
}

let input = 'study';
let input2 = 'good';

console.log(solution(input2));
