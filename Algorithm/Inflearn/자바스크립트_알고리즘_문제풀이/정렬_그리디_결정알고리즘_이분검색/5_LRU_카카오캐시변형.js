function solution(size, arr) {
	let answer = Array.from({ length: size }, () => 0);

	arr.forEach((item) => {
		let pos = -1;
		for (let i = 0; i < size; i++) {
			if (item === answer[i]) pos = i;
		}
		// miss 난 경우
		if (pos === -1) {
			for (let i = size - 1; i >= 1; i--) {
				answer[i] = answer[i - 1];
			}
		} // hit 난 경우
		else {
			for (let i = pos; i >= 1; i--) {
				answer[i] = answer[i - 1];
			}
		}
		answer[0] = item;
	});

	return answer;
}

function solution2(size, arr) {
	let answer = [];

	arr.forEach((item) => {
		let pos = -1;
		for (let i = 0; i < size; i++) {
			if (item === answer[i]) pos = i;
		}
		// miss 난 경우
		if (pos === -1) {
			// 계속 밀리다 보면 size 크기가 커짐
			answer.unshift(item);
			if (answer.length > size) answer.pop();
		} // hit 난 경우
		else {
			answer.splice(pos, 1);
			answer.unshift(item);
		}
	});

	return answer;
}

let arr = [1, 2, 3, 2, 6, 2, 3, 5, 7];
console.time('1');
console.log(solution(5, arr));
console.log(solution(5, arr));
console.log(solution(5, arr));
console.timeEnd('1');
console.time('2');
console.log(solution2(5, arr));
console.log(solution2(5, arr));
console.log(solution2(5, arr));
console.timeEnd('2');
