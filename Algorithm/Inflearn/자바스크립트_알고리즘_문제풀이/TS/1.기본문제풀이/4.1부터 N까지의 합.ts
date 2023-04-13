import { getTotal, range } from "./util"

function solution4(n: number) {
	return getTotal(range(n))
}

console.log(solution4(10))
