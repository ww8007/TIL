function solution(arr) {
	let answer = [];
	let sortArr = arr.slice(); // 배열 1차원 깊은 복사
	sortArr.sort((a, b) => a - b);
	for (let i = 0; i < arr.length; i++) {
		if (sortArr[i] !== arr[i]) answer.push(i + 1);
	}
	return answer;
}

let arr = [120, 125, 152, 130, 135, 135, 143, 127, 160];
let arr2 = [120, 130, 150, 150, 130, 150];
console.log(solution(arr2));
