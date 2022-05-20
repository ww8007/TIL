function solution(s, n) {
	var answer = '';

	let arr = s.split('');

	arr = arr.map((word) => {
		if (word !== ' ') {
			let nextWord = word.charCodeAt() + n;
			if (nextWord > 'z'.charCodeAt()) {
				nextWord = nextWord - 'z'.charCodeAt() + 'a'.charCodeAt() - 1;
			} else if (
				word.charCodeAt() >= 'A'.charCodeAt() &&
				word.charCodeAt() <= 'Z'.charCodeAt() &&
				nextWord > 'Z'.charCodeAt()
			) {
				nextWord = nextWord - 'Z'.charCodeAt() + 'A'.charCodeAt() - 1;
			}
			return String.fromCharCode(nextWord);
		} else {
			return ' ';
		}
	});

	return arr.join('');
}
