function solution(N, stages) {
	var answer = [];
	let sortArr = stages.sort((a, b) => a - b);
	console.log(sortArr);
	let obj = {};
	let valueObj = {};
	for (let i = 1; i <= N; i++) {
		obj[i] = 0;
		valueObj[i] = 0;
	}
	for (const item of sortArr) {
		obj[item]++;
	}

	let len = sortArr.length;

	for (let i = 1; i <= N; i++) {
		valueObj[i] = obj[i] / len;
		len -= obj[i];
	}
	sortArr = Object.entries(valueObj).sort((a, b) => b[1] - a[1]);

	sortArr.map((item) => answer.push(Number(item[0])));

	return answer;
}
