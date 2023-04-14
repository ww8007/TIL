function solution(m: number, product: number[][]) {
	product = product.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

	let max = 0;
	const n = product.length;

	for (let i = 0; i < n; i++) {
		const item = product[i];
		let money = m - item[0] / 2 + item[1];
		let cnt = 1;
		for (let j = 0; j < n; j++) {
			if (j !== i && product[j][0] + product[j][1] > money) break;
			if (j !== i && product[j][0] + product[j][1] <= money) {
				money -= product[j][0] + product[j][1];
				cnt++;
			}
		}
		max = Math.max(max, cnt);
	}

	return max;
}

let arr5 = [
	[6, 6],
	[2, 2],
	[4, 3],
	[4, 5],
	[10, 3]
];
console.log(solution(28, arr5));
