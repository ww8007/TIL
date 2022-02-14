const log = console.log;

const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const L = {};

L.map = curry(function* (f, iter) {
	for (const d of iter) yield f(d);
});

const map = curry(function* (f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const d = cur.value;
		yield f(d);
	}
});

L.filter = curry(function* (f, iter) {
	for (const d of iter) {
		if (f(d)) yield d;
	}
});

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		acc = f(acc, a);
	}
	return acc;
});

L.range = function* (l) {
	let i = -1;
	while (++i < l) yield i;
};

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);

const add = (a, b) => a + b;

const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(a);
		if (res.length == l) return res;
	}
	return res;
});

go(
	L.range(100),
	L.map((d) => d + 2),
	L.filter((d) => d > 10),
	reduce(add),
	log
);
