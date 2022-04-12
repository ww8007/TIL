function solution(s) {
	let answer;
	const hMap = new Map();
	for (const item of s) {
		if (hMap.has(item)) hMap.set(item, hMap.get(item) + 1);
		else hMap.set(item, 1);
	}
	console.log(hMap);
	let max = 0;
	for (let [key, val] of hMap) {
		if (val > max) {
			max = val;
			answer = key;
		}
	}
	return answer;
}

let str = 'BACBACCACCBDEDE';
console.log(solution(str));
