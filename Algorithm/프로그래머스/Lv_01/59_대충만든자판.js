function solution(keymap, targets) {
	const res = [];
	const map = new Map();

	for (let i = 0; i < keymap.length; i++) {
		for (let j = 0; j < keymap[i].length; j++) {
			if (!map.has(keymap[i][j]) || j + 1 < map.get(keymap[i][j]))
				map.set(keymap[i][j], j + 1);
		}
	}

	for (const target of targets) {
		let count = 0;
		for (let i = 0; i < target.length; i++) {
			count += map.get(target[i]);
		}
		res.push(count || -1);
	}

	return res;
}
