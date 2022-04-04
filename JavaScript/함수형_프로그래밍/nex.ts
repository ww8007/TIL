async function asyncMap<T, R>(arr: Array<T>, fn: (elem: T) => R) {
	const promises = arr.map(async (e) => fn(e));

	const results = [];

	for await (const elem of promises) {
		results.push(elem);
	}

	return results;
}

(async () => {
	const mapped = await asyncMap([1, 2, 3, 4, 5], (num) => {
		const result = num * 10000;

		console.log(result);

		return result;
	});

	console.log(mapped);
})();
