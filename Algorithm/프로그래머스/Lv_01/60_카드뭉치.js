function solution(cards1, cards2, goal) {
	var answer = "Yes";

	const arr = [];

	for (const word of goal) {
		if (cards1.includes(word)) {
			const popWord = cards1.shift();
			if (word !== popWord) return "No";
		}
		if (cards2.includes(word)) {
			const popWord = cards2.shift();
			if (word !== popWord) return "No";
		}
	}

	return answer;
}
