const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const d of iter) {
		acc = f(acc, d);
	}
	return acc;
});

const map = curry((f, iter) => {
	const res = [];
	for (const d of iter) res.push(f[d]);
	return res;
});

const filter = curry((f, iter) => {
	const res = [];
	for (const d of iter) {
		if (f(d)) res.push(d);
	}
	return res;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
	(...fs) =>
	(a) =>
		go(a, ...fs);

const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);
