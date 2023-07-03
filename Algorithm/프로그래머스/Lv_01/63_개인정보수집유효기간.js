function solution(today, terms, privacies) {
	let ans = [];
	const map = new Map();
	today = new Date(today);

	terms.forEach((term) => {
		const [mode, month] = term.split(" ");
		map.set(mode, Number(month));
	});

	privacies.forEach((privacy, idx) => {
		const [date, mode] = privacy.split(" ");
		const newDate = new Date(date);
		newDate.setMonth(newDate.getMonth() + map.get(mode));

		if (newDate <= today) ans.push(idx + 1);
	});

	return ans;
}
