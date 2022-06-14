// 이분 탐색입니다. 해당 값이 어느 인덱스에 있을지를 탐색하여 결과를 반환합니다.
const binarySearch = (arr, target) => {
	let lt = 0;
	let rt = arr.length - 1;
	let mid = Math.floor((lt + rt) / 2);
	while (lt <= rt) {
		if (arr[mid] === target) return mid;
		if (arr[mid] < target) lt = mid + 1;
		else rt = mid - 1;

		mid = Math.floor((lt + rt) / 2);
	}
	// 기준이 되는 인덱스는, 여기서 나온 값보다 항상 1이 더 큽니다. 따라서 +1을 해주죠!
	return mid + 1;
};

const getInfos = (info) => {
	const infos = {}; // object를 생성해줄 거에요.
	info.forEach((infoString) => {
		// 이제 object에 `info`를 처리해줘야겠죠?!
		const arr = infoString.split(' '); // 먼저 " " 기준으로 string을 분리해줍시다.
		const score = parseInt(arr.pop()); // 정수로 바꿔줄 거에요.
		const key = arr.join(''); // key를 javabackendjuniorpizza와 같은 형태로 해줄 거에요.
		if (infos[key]) infos[key].push(score);
		else infos[key] = [score]; // [150]의 형태로 배열에 점수를 넣어줘요.
	});
	for (const key in infos) {
		// 다 처리된 이후에는 각 키의 점수 배열을 정렬해줍니다.
		// 이건 이분탐색을 위한 거에요.
		infos[key].sort((a, b) => a - b);
	}
	return infos;
};

const getResult = (infos, query, score) => {
	// 키들을 배열 형태로 갖고 옵시다.
	const infosKey = Object.keys(infos);
	// 여기서 이제 키들에 대해 쿼리 조건을 만족하는 것들을 필터링해서 배열로 반환하고 (filter)
	// reduce로 전체 점수 배열의 길이값 - 이분 탐색 결과 인덱스 값을 해줍니다.
	// 그러면 결국 값이 같거나 큰 애들의 수만큼 값이 나오겠죠? (정렬되어 있으니까요)
	// 이를 누산해줍니다.
	return infosKey
		.filter((key) => query.every((v) => key.includes(v)))
		.reduce(
			(acc, key) => acc + infos[key].length - binarySearch(infos[key], score),
			0
		);
};

const solution = (info, query) => {
	let answer = [];
	const infos = getInfos(info); // solution
	console.log(infos);
	query
		.map(
			(q) =>
				q
					.split(/ and | |-/i) //' and '와 ' '와 '-'이 들어가 있는 친구들 기준으로 split 처리해줘요.
					.filter((v) => v !== '') // `split`에 의해 값이 "" 처리가 된 친구들을 없애줍니다.
		) // 쿼리 조건들을 필터링해줄 거에요.
		.forEach((query) => {
			const score = query.pop();
			const result = getResult(infos, query, score);
			answer.push(result); // getResult로 인해 누산된 결과값을, answer에 넣어줍시다.
		});
	return answer;
};
