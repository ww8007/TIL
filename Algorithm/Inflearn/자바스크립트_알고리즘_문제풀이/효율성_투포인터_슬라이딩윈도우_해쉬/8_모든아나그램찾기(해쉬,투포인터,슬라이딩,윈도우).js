function compareMap(map1, map2) {
	if (map1.size !== map2.size) return false;
	for (let [key, val] of map1) {
		if (!map2.has(key) || map2.get(key) !== val) return false;
	}
	return true;
}

function solution(s, t) {
	let answer = 0;
	let tH = new Map();
	let sH = new Map();
	for (let item of t) {
		if (tH.has(item)) tH.set(item, tH.get(item) + 1);
		else tH.set(item, 1);
	}
	// t 변수 보다 하나 작게 셋팅 -> sH
	let len = t.length - 1;
	for (let i = 0; i < len; i++) {
		if (sH.has(s[i])) sH.set(s[i], sH.get(s[i]) + 1);
		else sH.set(s[i], 1);
	}

	// 투 포인터 설정 및 슬라이딩 하면서 설정
	let lt = 0;
	// 1. 빼고
	// 2. 추가
	// 3. 비교
	for (let rt = len; rt < s.length; rt++) {
		if (sH.has(s[rt])) sH.set(s[rt], sH.get(s[rt]) + 1);
		else sH.set(s[rt], 1);
		if (compare(sH, tH)) answer++;
		// 기존 값 가져와서 하나 작게 셋팅
		sH.set(s[lt], sH.get(s[lt]) - 1);
		// 만약 0이라면 삭제
		if (sH.get(s[lt]) === 0) sH.delete(s[lt]);
		// 밀고 가기
		lt++;
	}

	return answer;
}

let a = 'bacaAacba';
let b = 'abc';
console.log(solution(a, b));
