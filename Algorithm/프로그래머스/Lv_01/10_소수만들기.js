const isPrime = (num) => {
	if (num === 1) return false;
	for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
		if (num % i === 0) return false;
	}
	return true;
};

const add = (a, b) => a + b;

const getCombinations = (arr, selectNumber) => {
	const results = [];

	if (selectNumber === 1) return arr.map((item) => [item]);

	arr.forEach((fixed, index, origin) => {
		const rest = origin.slice(index + 1);
		const combinations = getCombinations(rest, selectNumber - 1);
		const attached = combinations.map((item) => [fixed, ...item]);
		results.push(...attached);
	});

	return results;
};

function solution(nums) {
	let answer = 0;
	let numsArr = getCombinations(nums, 3);

	numsArr = numsArr.map((num) => num.reduce(add));
	console.log(numsArr);
	numsArr.forEach((num) => {
		isPrime(num) && answer++;
	});
	return answer;
}
