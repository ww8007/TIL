// 조건
// 두개의 합 > 나머지

import { getMaxNumber, getTotal } from "./util"

type Return = "TRUE" | "FALSE"

function solution2(a: number, b: number, c: number): Return {
	return getTotal([a, b, c]) - getMaxNumber([a, b, c]) >
		getMaxNumber([a, b, c])
		? "TRUE"
		: "FALSE"
}

console.log(solution2(13, 33, 17))
console.log(solution2(6, 7, 11))
