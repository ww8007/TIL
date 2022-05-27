const getPermutation = (strArr) => {
	let arr = [];
	let check = Array.from({ length: strArr.length }, () => 0);
	let tmp = Array.from({ length: strArr.length }, () => 0);
	function DFS(L) {
		if (L === strArr.length) arr.push(tmp.slice());
		else {
			for (let i = 0; i < strArr.length; i++) {
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

function solution(expression) {
	let ans = [];
	const onlyExpression = expression.replace(/[0-9]/g, '');
	const onlyNumber = expression.replace(/[^0-9]/g, ' $& ').split(' ');
	const eSet = new Set([...onlyExpression]);

	const permutaionArr = getPermutation([...eSet]);

	permutaionArr.map((permutaion) => {
		let max = 0;
		let arr = onlyNumber.slice();

		permutaion.map((exp) => {
			while (arr.includes(exp)) {
				const idx = arr.indexOf(exp);
				arr.splice(idx - 1, 3, eval(arr.slice(idx - 1, idx + 2).join('')));
			}
		});

		ans.push(Math.abs(arr[0]));
	});

	return Math.max(...ans);
}
