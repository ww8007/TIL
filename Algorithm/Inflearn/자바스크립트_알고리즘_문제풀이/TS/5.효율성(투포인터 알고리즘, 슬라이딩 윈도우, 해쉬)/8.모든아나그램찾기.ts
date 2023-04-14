function solution(s: string, t: string) {
	const map = new Map();

	for (const word of t) {
		map.has(word) ? map.set(word, map.get(word) + 1) : map.set(word, 1);
	}

	let lp = 0;
	let rp = lp + t.length;

	let ans = 0;

	let compareMap = new Map();

	while (rp <= s.length) {
		for (let i = lp; i < rp; i++) {
			compareMap.has(s[i])
				? compareMap.set(s[i], compareMap.get(s[i]) + 1)
				: compareMap.set(s[i], 1);
		}
		isSameMap(map, compareMap) && ans++;
		lp++;
		rp++;
		console.log(compareMap);
		compareMap = new Map();
	}

	return ans;
}

const isSameMap = (map1: Map<any, any>, map2: Map<any, any>) => {
	const ans = [...map1].some(([key, value]) => map2.get(key) !== value);
	if (!ans) {
		console.log(!ans);
	}
	return !ans;
};

let a = "bacaAacba";
let b = "abc";
console.log(solution(a, b));
