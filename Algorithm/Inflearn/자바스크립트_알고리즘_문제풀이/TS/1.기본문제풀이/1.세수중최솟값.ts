import { getMinNumber } from "./util"

function solution(a: number, b: number, c: number) {
	const arr = [a, b, c]

	return Math.min(...arr)
}

console.log(solution(2, 5, 1))
console.log(getMinNumber([2, 5, 1]))
