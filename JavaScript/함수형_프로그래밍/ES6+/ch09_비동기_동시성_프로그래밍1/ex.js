const log = console.log;
function add10(a, callback) {
	setTimeout(() => {
		callback(a + 10);
	}, 100);
}

var a = add10(5, (res) => {
	add10(res, (res) => {
		add10(res, (res) => {});
	});
});

function add20(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a + 20)), 100);
}

// var b = add20(5).then(add20).then(add20).then(log);

//////////////////////////////////////
// 값으로서 Promise 활용
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = (a) => a + 5;
// Promise가 아닌 일반 값이
// 들어와야 함수가 제대로 작동함
// log(go1(10, add5));

const delay100 = (a) =>
	new Promise((resolve) => setTimeout(() => resolve(a), 100));

var r2 = go1(delay100(10), add5);

// r2.then(log);

// go1(go1(10, add5), log);
const n2 = delay100(10);
// log(go1(go1(n2, add5), log));
// Promise가 1급이라는 것을 활용

//////////////////////////////////////
// 모나드 관점의 Promise
const g = (a) => a + 1;
const f = (a) => a * a;
Promise.resolve(1)
	.then(g)
	.then(f)
	.then((r) => log(r));

// new Promise((resolve) =>
// 	setTimeout(() => resolve(2), 100)
// 		.then(g)
// 		.then(f)
// 		.then((r) => log(r))
// );

//////////////////////////////////////
// Kleisli Composition

var users = [
	{ id: 1, name: 'aa' },
	{ id: 2, name: 'bb' },
	{ id: 3, name: 'cc' }
];

const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	return (function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			acc = f(acc, a);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	})(acc);
});

const go = (...args) => reduce((a, f) => f(a), args);
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
const L = {};

L.filter = curry(function* (f, iter) {
	for (const a of iter) {
		if (f(a)) yield a;
	}
});

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

const getUserById = (id) =>
	find((u) => u.id == id, users) || Promise.reject('없어요!');

const f1 = ({ name }) => name;
const g1 = getUserById;

const fg = (id) => f1(g1(id));
// console.clear();
// log(fg(2) == fg(2));

const fg2 = (id) =>
	Promise.resolve(id)
		.then(g1)
		.then(f1)
		.catch((a) => a);

users.pop();
users.pop();

// fg2(2).then(log);

//////////////////////////////////////
// go, pipe, reduce에서 비동기 제어

go(
	1,
	(a) => a + 10,
	(a) => Promise.resolve(a + 100),
	(a) => a + 1000,
	log
);

// const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log);
