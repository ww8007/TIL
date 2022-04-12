function solution(str1, str2) {
	let answer = 'YES';
	let sH = new Map();
	for (const item of str1) {
		if (sH.has(item)) sH.set(item, sH.get(item) + 1);
		else sH.set(item, 1);
	}
	console.log(sH);
	for (const item of str2) {
		if (!sH.has(item) || sH.get(item) === 0) return 'NO';
		sH.set(item, sH.get(item) - 1);
	}
	return answer;
}
let a = 'AbaAeCe';
let b = 'baeeACA';
console.log(solution(a, b));
