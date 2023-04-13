function solution(a: number[], b: number[]) {
	return a.reduce((acc, cur, idx) => {
		if (cur === 1 && b[idx] === 3) return acc.concat("A");
		else if (cur === 2 && b[idx] === 1) return acc.concat("A");
		else if (cur === 3 && b[idx] === 2) return acc.concat("A");
		else if (cur === b[idx]) return acc.concat("D");
		else return acc.concat("B");
	}, "");
}

let a = [2, 3, 3, 1, 3];
let b = [1, 1, 2, 2, 3];
console.log(solution(a, b));
