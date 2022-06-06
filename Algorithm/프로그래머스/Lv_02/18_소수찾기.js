function isPrime(num) {
	if (num === 1) return false;
	if (num === 0) return false;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (!(num % i)) return false;
	}
	return true;
}

const getPermutation = (strArr, n) => {
	let arr = [];
	let check = Array.from({ length: strArr.length }, () => 0);
	let tmp = Array.from({ length: n }, () => 0);
	function DFS(L) {
		if (L === n) {
			if (!tmp.includes(undefined)) arr.push(tmp.slice());
		} else {
			for (let i = 0; i <= strArr.length; i++) {
				if (!check[i]) {
					check[i] = 1;
					tmp[L] = strArr[i];
					DFS(L + 1);
					check[i] = 0;
				}
			}
		}
	}
	DFS(0);
	return arr;
};

function solution(numbers) {
	var answer = 0;
	const nSet = new Set();
	for (let i = 1; i <= numbers.length; i++) {
		let arr = getPermutation(numbers.split(''), i).map((s) =>
			Number(s.join(''))
		);
		arr.forEach((num) => nSet.add(num));
	}
	console.log(nSet);
	[...nSet].forEach((num) => isPrime(num) && answer++);

	return answer;
}
