function getCount(songs, capacity) {
	let cnt = 1,
		sum = 0;
	for (let item of songs) {
		if (item + sum > capacity) {
			cnt++;
			sum = item; // 다음 더할거를 미리 sum에 저장함
		} else sum += item;
	}
	return cnt;
}

function solution(m, songs) {
	let answer;

	songs.sort((a, b) => a - b);
	let lt = Math.max(...songs); // 최소 값은 제일 큰 숫자
	let rt = songs.reduce((a, b) => a + b, 0);

	while (lt <= rt) {
		let mid = parseInt((lt + rt) / 2);
		if (getCount(songs, mid) <= m) {
			answer = mid;
			rt = mid - 1;
		} else break;
	}

	return answer;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(solution(3, arr));
