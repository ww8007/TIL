import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';

const obj1 = {
	a: 1,
	b: 2,
	c: 3,
	d: 4
};

const K = {};

K.values = function* (obj) {
	for (const k in obj) {
		yield obj[k];
	}
};

_.go(
	obj1,
	K.values,
	L.map((a) => a + 10),
	L.take(2),
	_.reduce((a, b) => a + b)
	// console.log
);

// entries

K.entries = function* (obj) {
	for (const k in obj) {
		yield [k, obj[k]];
	}
};

_.go(
	obj1,
	K.entries,
	L.map(([k, v]) => ({ [k]: v })),
	_.reduce(Object.assign)
	// console.log
);

// keys

// L.keys = function* (obj) {
// 	for (const k in obj) {
// 		yield K;
// 	}
// };

/////////////////////////////////
// 제너레이터 함수
const it = (function* () {
	yield 10;
	yield 20;
	yield 30;
})();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

const g1 = function* (stop) {
	let i = -1;
	while (++i < stop) {
		// console.log(i);
		yield 10;
		if (false) yield 20 + 30;
		yield 30;
	}
};

console.log([...L.take(3, g1(3))]);

////// Object
const object = (entries) =>
	_.go(
		entries,
		L.map(([k, v]) => ({ [k]: v })),
		_.reduce(Object.assign)
	);

// const object = (entries) =>
// 	_.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);
// console.log(m);

// mapObject

const mapObject = (f, obj) =>
	_.go(
		obj,
		L.entries,
		_.map(([k, v]) => [k, f(v)]),
		object
		// console.log
	);

// console.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));
// 함수
// { a : 11, b: 12, c: 13}

// pick

const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const pick = (ks, obj) =>
	_.go(
		ks,
		_.map((k) => [k, obj[k]]),
		_.reject(([k, v]) => v === undefined),
		object
	);

// const pick = (ks, obj) => object(_.map((k) => [k, obj[k]], ks));

console.log(pick(['b', 'c', 'z'], obj2));
// {b: 2, c:3}

// indexBy
const users = [
	{ id: 5, name: 'AA', age: 35 },
	{ id: 10, name: 'BB', age: 26 },
	{ id: 19, name: 'CC', age: 28 },
	{ id: 23, name: 'CC', age: 34 },
	{ id: 24, name: 'EE', age: 23 }
];
K.indexBy = (f, iter) => _.reduce((obj, a) => ((obj[f(a)] = a), obj), {}, iter);
const M = {};
M.indexBy = (f, iter) => _.reduce((obj, a) => ((obj[f(a)] = a), obj), {}, iter);

console.log(M.indexBy((u) => u.id, users));

//////
const user2 = M.indexBy((u) => u.id, users);
_.go(
	user2,
	L.entries,
	_.filter(([_, { age }]) => age >= 30),
	object,
	console.log
);

// console.log(_.filter(({ age }) => age > 30, user2));
