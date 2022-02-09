//////////////////////////////////////////
// range

const log = console.log;

const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

// const reduce = curry((f, acc, iter) => {
// 	if (!iter) {
// 		iter = acc[Symbol.iterator]();
// 		acc = iter.next().value;
// 	}
// 	for (const d of iter) {
// 		acc = f(acc, d);
// 	}
// 	return acc;
// });

// const map = curry((f, iter) => {
// 	const res = [];
// 	for (const d of iter) res.push(f(d));
// });

// const filter = curry((f, iter) => {
// 	const res = [];
// 	for (const d of iter) {
// 		if (f(d)) res.push(d);
// 	}
// });

const go = (...args) => reduce((a, f) => f(a), args);

const add = (a, b) => a + b;

const L = {};

const range = (l) => {
	const res = [];
	let i = -1;
	while (++i < l) {
		res.push(i);
	}
	return res;
};

L.range = function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};

log(range(5)); // [0, 1, 2, 3, 4]
log(range(2)); // [0, 1]

let list = range(4);

log(reduce(add, list));

////////////////////////////////////////
// test 함수
function test(name, time, f) {
	console.time(name);
	while (time--) f();
	console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(100000)));
test('L.range', 10, () => reduce(add, L.range(100000)));

///////////////////////////////////////////
// take 함수
const take = curry((l, iter) => {
	let res = [];
	for (const d of iter) {
		res.push(d);
		if (res.length == l) return res;
	}
	return res;
});

console.time('');
go(range(10000), take(5), reduce(add), log);
console.timeEnd('');
console.time('');
go(L.range(10000), take(5), reduce(add), log);
console.timeEnd('');

console.clear();
///////////////////////////////////////////////
// L.map
L.map = function* (f, iter) {
	for (const d of iter) yield f(d);
};
let it = L.map((a) => a + 10, [1, 2, 3]);
// log(it.next());
// log(it.next());
// log(it.next());
log(...it);

///////////////////////////////////////////////
// L.filter
L.filter = function* (f, iter) {
	for (const d of iter) {
		if (f(d)) yield d;
	}
};
let res = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(res.next());
log(res.next());
log(res.next());
log(res.next());

///////////////////////////////////////////////////
// range, map, filter, take, reduce 중첩 사용

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

const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(f(a));
	}
	return res;
});

const filter = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (f(a)) res.push(a);
	}
	return res;
});

go(
	range(10),
	map((n) => n + 10),
	filter((n) => n % 2),
	take(2),
	log
);
