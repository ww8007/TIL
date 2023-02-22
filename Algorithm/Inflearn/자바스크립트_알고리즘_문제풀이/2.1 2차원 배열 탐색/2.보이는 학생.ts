function solution(arr: number[]) {
	return arr.reduce(
		(acc, cur) => (acc.max < cur ? { max: cur, count: ++acc.count } : acc),
		{ max: 0, count: 0 }
	).count;
}

const arr = [130, 135, 148, 140, 145, 150, 150, 153];

console.log(solution(arr));
