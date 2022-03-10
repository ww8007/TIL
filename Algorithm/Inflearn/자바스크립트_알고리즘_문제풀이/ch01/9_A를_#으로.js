// solution 1
function solution(input) {
	let answer = '';
	for (let x of input) {
		if (x === 'A') answer += '#';
		else answer += x;
	}

	return answer;
}

function solution2(input) {
	let ans = input;
	ans = ans.replace(/A/g, '#');
	return ans;
}

let input = 'BANANA';

console.log(solution2(input));
