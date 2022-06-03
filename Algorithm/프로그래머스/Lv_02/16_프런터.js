function solution(priorities, location) {
	var answer = 0;
	const queue = priorities.slice();

	while (queue.length) {
		let max = Math.max(...queue);
		if (queue[0] === max) {
			queue.shift();
			answer++;
			if (location === 0) return answer;
		} else queue.push(queue.shift());

		location--;
		if (location < 0) location = queue.length - 1;
	}

	return answer;
}
