function solution(n: number, k: number, card: number[]) {
	card.sort((a, b) => b - a);

	console.log(card);

	const set = new Set<number>();

	for (let i = 0; i < card.length; i++) {
		let lp = i + 1;
		let rp = card.length - 1;
		while (lp < rp) {
			set.add(card[i] + card[lp] + card[rp]);
			rp--;
		}
	}

	const sortedSet = [...set].sort((a, b) => b - a);
	console.log(sortedSet);
	return sortedSet[k - 1] || -1;
}

let arr6 = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr6));
