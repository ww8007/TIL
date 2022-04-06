function solution(sizes) {
	let arr = [0, 0];
	sizes.forEach((item) => {
		let [x, y] = item.sort((a, b) => b - a);
		if (x > arr[0]) arr[0] = x;
		if (y > arr[1]) arr[1] = y;
	});
	return arr[0] * arr[1];
}
