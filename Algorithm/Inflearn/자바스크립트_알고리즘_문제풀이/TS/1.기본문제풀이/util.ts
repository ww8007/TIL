const getMinNumber = (arr: number[]) =>
	arr.reduce((acc, cur) => (acc > cur ? cur : acc), Number.MAX_SAFE_INTEGER);

const getMaxNumber = (arr: number[]) =>
	arr.reduce((acc, cur) => (acc < cur ? cur : acc), Number.MIN_SAFE_INTEGER);

const getTotal = (arr: number[]) => arr.reduce(sum, 0);

const sum = (a: number, b: number) => a + b;

const range = (l: number) => {
	let i = -1;
	const arr = [];
	while (++i < l) arr.push(i);
	return arr;
};

const getOddNumbers = (arr: number[]) => arr.filter((number) => number % 2);

const filterMaxNumber = (arr: number[]) =>
	[...arr].filter((num) => num !== getMaxNumber(arr));

export {
	getMinNumber,
	getMaxNumber,
	getTotal,
	sum,
	range,
	getOddNumbers,
	filterMaxNumber
};
