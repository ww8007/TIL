function solution(name, yearning, photo) {
	const ans = [];
	const map = new Map();

	for (let i = 0; i < name.length; i++) {
		map.set(name[i], yearning[i]);
	}

	let idx = -1;
	for (const people of photo) {
		ans.push(0);
		idx++;
		for (const person of people) {
			ans[idx] += map.get(person) ?? 0;
		}
	}

	return ans;
}
