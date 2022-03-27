function solution(answers) {
	var answer = [];
	let obj = {
		1: 0,
		2: 0,
		3: 0
	};
	let len = answers.length;

	let oneAns = [1, 2, 3, 4, 5];
	let twoAns = [2, 1, 2, 3, 2, 4, 2, 5];
	let threeAns = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

	let count = 0;
	for (let i = 0; i < len; i++) {
		if (oneAns[i % 5] === answers[i]) obj[1]++;
		if (twoAns[i % 8] === answers[i]) obj[2]++;
		if (threeAns[i % 10] === answers[i]) obj[3]++;
	}
	let max = Math.max(obj[1], obj[2], obj[3]);

	if (max === obj[1]) answer.push(1);
	if (max === obj[2]) answer.push(2);
	if (max === obj[3]) answer.push(3);

	return answer;
}
