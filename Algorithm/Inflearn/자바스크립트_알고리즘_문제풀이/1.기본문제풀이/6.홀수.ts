import { getMinNumber, getOddNumbers, getTotal } from "./util"

function solution(arr: number[]) {
	const oddNumbers = getOddNumbers(arr)
	return [getTotal(oddNumbers), getMinNumber(oddNumbers)]
}

const arr = [12, 77, 38, 41, 53, 92, 85]
console.log(solution(arr))
