function solution(progresses, speeds) {
	var answer = [];
	let queue = progresses;
	while (queue.length) {
		// 매일 speeds 만큼 더해주기
		queue = queue.map((item, idx) => (item += speeds[idx]));
		let count = 0;
		const len = queue.length;
		// 맨앞이 100 이상일 경우
		if (queue[0] >= 100) {
			// 모든 100이상 빠지도록 설정
			while (queue[0] >= 100) {
				count++;
				queue.shift();
				speeds.shift();
			}
		}
		if (count) answer.push(count);
	}
	return answer;
}
