function solution(priorities, location) {
	let answer = 0;
	// 큐 생성
	let queue = priorities;

	while (queue.length) {
		// 최대값 구하기
		let max = Math.max(...queue);
		if (queue[0] === max) {
			answer++;
			// 큐에서 제거
			queue.shift();
			// 최대값이고 맨 앞이면 return
			if (location === 0) {
				return answer;
			}
		} else {
			// 큐에서 빼서 뒤에 다시 삽입
			queue.push(queue.shift());
		}
		// 요소 인덱싱
		location--;
		if (location === -1) {
			location = queue.length - 1;
		}
	}

	return answer;
}

console.log(solution([2, 1, 3, 2], 2));
console.log(solution([1, 1, 9, 1, 1, 1], 0));
