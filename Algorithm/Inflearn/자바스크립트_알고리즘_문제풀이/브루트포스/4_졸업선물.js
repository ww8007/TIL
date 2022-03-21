function solution(m, product) {
	let ans = 0;
	let n = product.length;
	product.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
	console.log(product);
	for (let i = 0; i < n; i++) {
		let count = 1;
		let money = m;
		let tmp = [];
		tmp.push([product[i][0], product[i][1]]);
		money -= product[i][0] / 2 + product[i][1];
		for (let j = 0; j < n; j++) {
			if (i === j) {
				continue;
			} else {
				money -= product[j][0] + product[j][1];
				if (money >= 0) {
					tmp.push([product[j][0], product[j][1]]);
					count++;
				} else {
					console.log(tmp);
					ans = Math.max(ans, count);
					break;
				}
			}
		}
	}

	return ans;
}

let arr = [
	[6, 6],
	[2, 2],
	[4, 3],
	[4, 5],
	[10, 3]
];
console.log(solution(28, arr));
