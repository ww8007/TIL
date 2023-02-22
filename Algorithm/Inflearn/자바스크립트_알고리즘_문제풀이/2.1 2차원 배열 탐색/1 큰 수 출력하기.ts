function solution(arr: number[], n: number) {
	return arr.filter((num) => num > n - 1);
}

let arr = [7, 3, 9, 5, 6, 12];

console.log(solution(arr, 6));
