import { filterMaxNumber, getTotal } from "./util"

function solution(arr: number[]) {
	while (true) {
		arr = filterMaxNumber(arr)
		if (getTotal(arr) <= 100) return arr
	}
}

const arr = [20, 7, 23, 19, 10, 15, 25, 8, 13]
console.log(solution(arr))
