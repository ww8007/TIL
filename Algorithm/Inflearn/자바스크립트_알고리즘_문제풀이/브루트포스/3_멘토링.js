const solution = (input) => {
	let ans = 0;
	let h = input.length;
	let w = input[0].length;
	for (let i = 1; i <= w; i++) {
		for (let j = 1; j <= w; j++) {
			let count = 0;
			for (let k = 0; k < h; k++) {
				let pi,
					pj = 0;
				// if (findIdx(input[k], i) < findIdx(input[k], j)) count++;
				for (let l = 0; l < w; l++) {
					if (input[k][l] === i) pi = l;
					if (input[k][l] === j) pj = l;
				}
				if (pi < pj) count++;
			}
			if (count === h) {
				ans++;
			}
		}
	}
	return ans;
};

const solution2 = (input) => {
	let ans = 0;
	let h = input.length;
	let w = input[0].length;
	for (let i = 1; i <= w; i++) {
		for (let j = 1; j <= w; j++) {
			let count = 0;
			for (let k = 0; k < h; k++) {
				if (findIdx(input[k], i) < findIdx(input[k], j)) count++;
			}
			if (count === h) {
				ans++;
			}
		}
	}
	return ans;
};

const findIdx = (arr, num) => arr.indexOf(num);

let input = [
	[3, 4, 1, 2],
	[4, 3, 2, 1],
	[3, 1, 4, 2]
];
console.time('1');
console.log(solution(input));
console.timeEnd('1');
console.time('2');
console.log(solution(input));
console.timeEnd('2');
console.time('1');
console.log(solution2(input));
console.timeEnd('1');
console.time('2');
console.log(solution2(input));
console.timeEnd('2');
