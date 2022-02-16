const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const nop = Symbol('nop');
const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduceF = (acc, a, f) =>
	a instanceof Promise
		? a.then(
				(a) => f(acc, a),
				(e) => (e == nop ? acc : Promise.reject(e))
		  )
		: f(acc, a);

const head = (iter) => go1(take(1, iter), ([h]) => h);

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
const reduce2 = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	return go1(acc, function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			acc = reduceF(acc, cur.value, f);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	});
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);

const L = {};

L.map = curry(function* (f, iter) {
	for (const a of iter) yield go1(a, f);
});

L.filter = curry(function* (f, iter) {
	for (const a of iter) {
		const b = go1(a, f);
		if (b instanceof Promise) {
			yield b.then((b) => {
				return b ? a : Promise.reject(nop);
			});
		} else if (b) yield a;
	}
});

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

const log = console.log;

// go(
// 	[Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
// 	L.map((a) => a + 10),
// 	take(2),
// 	log
// );

//////////////////////////////////////////////////
// Kleisli Composition
// go(
// 	[1, 2, 3, 4, 5, 6],
// 	L.map((a) => Promise.resolve(a * a)),
// 	L.filter((a) => a % 2),
// 	L.map((a) => a * a),
// 	take(2),
// 	log
// );

///////////////////////////////////////////////////
// reduce nop

const add = (a, b) => a + b;

// go(
// 	[1, 2, 3, 4, 5],
// 	L.map((a) => Promise.resolve(a * a)),
// 	L.filter((a) => Promise.resolve(a % 2)),
// 	reduce(add),
// 	log
// );

////////////////////////////////////////////////
// 효율성
// go(
// 	[1, 2, 3, 4],
// 	L.map((a) => {
// 		// log(a);
// 		return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
// 	}),
// 	L.filter((a) => {
// 		// log(a);
// 		return new Promise((res) => setTimeout(() => res(a % 2), 1000));
// 	}),
// 	take(4)
// 	// log
// );

////////////////////////////////////////////////
// 동시성

const C = {};

function noop() {}
const catchNoop = (arr) => (
	arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
	iter ? reduce(f, acc, catchNoop([...iter])) : reduce(f, catchNoop([...acc]))
);

// console.time('');
// go(
// 	[1, 2, 3, 4, 5],
// 	L.map((a) => delay500(a * a)),
// 	L.filter((a) => delay500(a % 2)),
// 	L.map((a) => delay500(a * a)),
// 	C.reduce(add),
// 	log,
// 	(_) => console.timeEnd('')
// );

//////////////////////////////////////////
// C.take

C.take = curry((l, iter) => {
	return take(l, catchNoop([...iter]));
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));

/////////////////////////////////////////////
// C.make, C.filter

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

// C.map((a) => delay500(a * a), [1, 2, 3, 4]).then(log);

/////////////////////////////////////////////
// 즉시, 지연, Promise, 병렬적 조합하기

const delay500 = (a, name) =>
	new Promise((res) => {
		console.log(`${name}: ${a}`);
		setTimeout(() => res(a), 500);
	});

console.time('');
go(
	[1, 2, 3, 4, 5, 6, 7, 8],
	C.map((a) => delay500(a * a, 'map 1')),
	C.filter((a) => delay500(a % 2, 'filter 2')),
	C.map((a) => delay500(a + 1, 'map3')),
	C.take(2),
	(_) => console.timeEnd('')
);
