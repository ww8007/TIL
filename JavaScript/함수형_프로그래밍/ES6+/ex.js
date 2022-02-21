const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const nop = Symbol('nop');

const reduceF = (acc, a, f) =>
	a instanceof Promise
		? a.then(
				(a) => f(acc, a),
				(e) => (e == nop ? acc : Promise.reject(e))
		  )
		: f(acc, a);

const reduce = curry((f, acc, iter) => {
	if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);
	iter = iter[Symbol.iterator]();

	return go1(acc, function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			acc = reduceF(acc, cur.value, f);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	});
});

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const head = (iter) => go1(take(1, iter), ([h]) => h);

const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	return (function recur() {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			if (a instanceof Promise)
				return a
					.then((a) => ((res.push(a), res).length == l ? res : recur()))
					.catch((e) => (e == nop ? recur() : Promise.reject(e)));
			res.push(a);
			if (res.length == l) return res;
		}
		return res;
	})();
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);
