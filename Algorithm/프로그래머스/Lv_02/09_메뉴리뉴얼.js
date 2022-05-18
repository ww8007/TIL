function solution(orders, course) {
	let mMap = new Map();
	let ans = [];
	function combination(order, idx, len, prevArr) {
		if (prevArr.length === len) {
			let key = prevArr.sort().join('');
			if (mMap.has(key)) mMap.set(key, mMap.get(key) + 1);
			else mMap.set(key, 1);
			return;
		}
		for (let i = idx; i < order.length; i++) {
			combination(order, i + 1, len, [...prevArr, order[i]]);
		}
	}

	orders.forEach((order) => {
		course.forEach((num) => combination(order, 0, num, []));
	});

	const sortOrder = [...mMap.entries()]
		.filter(([_, count]) => count > 1)
		.sort((a, b) => a[0].length - b[0].length);

	course.map((num) => {
		let max = 0;
		const filterLength = sortOrder.filter(([string, count]) => {
			if (count > max && string.length === num) max = count;
			return string.length === num;
		});
		filterLength
			.filter(([_, count]) => count === max)
			.forEach(([string, _]) => ans.push(string));
	});
	return ans.sort();
}

console.log(
	solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4])
);
