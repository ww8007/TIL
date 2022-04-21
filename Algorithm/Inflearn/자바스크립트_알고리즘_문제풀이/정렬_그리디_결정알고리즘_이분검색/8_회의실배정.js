function solution(meeting) {
	let answer = 0;
	let sortArr = meeting.slice();

	sortArr.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

	for (let i = 0; i < meeting.length; i++) {
		let max = 1;
		let pos = sortArr[i][1];
		for (let j = i; j < meeting.length; j++) {
			if (pos <= sortArr[j][0]) {
				max++;
				pos = sortArr[j][1];
			}
		}
		answer = Math.max(answer, max);
	}

	console.log(sortArr);
	return answer;
}

function solution2(meeting) {
	let answer = 0;

	meeting.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));
	console.log(meeting);
	let et = 0;
	for (let x of meeting) {
		if (x[0] >= et) {
			answer++;
			et = x[1];
			console.log(et);
		}
	}
	return answer;
}

let arr = [
	[1, 4],
	[2, 3],
	[3, 5],
	[4, 6],
	[5, 7]
];
let arr2 = [
	[3, 3],
	[1, 3],
	[2, 3]
];
console.log(solution2(arr));
