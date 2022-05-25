function solution(str1, str2) {
	//
	const makeTwo = (str) => {
		const arr = [];
		const regEx = /[a-z]{2}/;
		for (let i = 1; i < str.length; i++) {
			let make = str[i - 1].toLowerCase() + str[i].toLowerCase();
			if (regEx.test(make)) arr.push(make);
		}
		return arr;
	};

	const arr1 = makeTwo(str1);
	const arr2 = makeTwo(str2);
	const set = new Set([...arr1, ...arr2]);
	let union = 0;
	let intersection = 0;

	//같은 원소를 검사해서 많은  쪽은 union에 더하고 적은쪽은 intersection에 더한다.
	set.forEach((item) => {
		const has1 = arr1.filter((x) => x === item).length;
		const has2 = arr2.filter((x) => x === item).length;
		union += Math.max(has1, has2);
		intersection += Math.min(has1, has2);
	});
	return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
}
