function solution(need, plan) {
	let answer = 'YES';
	const queue = need.split('');
	for (const item of plan) {
		if (queue.includes(item) && item !== queue.shift()) return 'NO';
	}

	return answer;
}

let a = 'CBA';
let b = 'CBDAGE';
console.log(solution(a, b));
