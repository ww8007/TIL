function solution(nums) {
	let setArr = new Set();
	let pickNum = nums.length / 2;
	for (const item of nums) {
		setArr.add(item);
	}
	const newArr = Array.from(setArr);
	return Math.min(newArr.length, pickNum);
}
