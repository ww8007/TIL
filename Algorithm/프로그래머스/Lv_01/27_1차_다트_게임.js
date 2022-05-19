function solution(dartResult) {
	var answer = 0;

	const dartArr = Array.from(Array(3), () => new Array(0));

	let count = -1;

	for (let i = 0; i < dartResult.length; i++) {
		if (!isNaN(Number(dartResult[i]))) {
			count++;
			if (dartResult[i] === '1' && dartResult[i + 1] === '0') {
				dartArr[count].push(10);
				i++;
			} else {
				dartArr[count].push(Number(dartResult[i]));
			}
		} else {
			dartArr[count].push(dartResult[i]);
		}
	}

	for (let i = 0; i < 3; i++) {
		for (const item of dartArr[i]) {
			if (item === 'D') dartArr[i][0] = dartArr[i][0] ** 2;
			if (item === 'T') dartArr[i][0] = dartArr[i][0] ** 3;
			if (item === '*') {
				dartArr[i][0] *= 2;
				if (i !== 0) dartArr[i - 1][0] *= 2;
			}
			if (item === '#') dartArr[i][0] *= -1;
		}
	}

	for (let i = 0; i < 3; i++) {
		answer += dartArr[i][0];
	}

	return answer;
}
