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
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		acc = f(acc, a);
	}
	return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);

const L = {};

L.map = curry(function* (f, iter) {
	for (const a of iter) {
		yield f(a);
	}
});

L.filter = curry(function* (f, iter) {
	for (const a of iter) {
		if (f(a)) yield a;
	}
});

//////////////////////////////////////////
// queryStr
const log = console.log;
// const queryStr = (obj) => obj;

// 일단 key value를 모두 추출
const _queryStr = (obj) =>
	go(
		obj,
		Object.entries,
		map(([k, v]) => `${k}=${v}`),
		reduce((a, b) => `${a}&${b}`)
	);

const join = curry((sep = ',', iter) =>
	reduce((a, b) => `${a}${sep}${b}`, iter)
);

L.entries = function* (obj) {
	for (const k in obj) {
		yield [k, obj[k]];
	}
};

const queryStr = pipe(
	L.entries,
	L.map(([k, v]) => `${k}=${v}`),
	join('&')
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

//////////////////////////////////////////
// join

const _join = curry((sep = ',', iter) =>
	reduce((a, b) => `${a}${sep}${b}`, iter)
);

function* a() {
	yield 10;
	yield 11;
	yield 12;
	yield 13;
}

log(join(' - ', a()));

/////////////////////////////////////////////////
// take, find

const users = [
	{ age: 32 },
	{ age: 31 },
	{ age: 37 },
	{ age: 32 },
	{ age: 34 },
	{ age: 25 },
	{ age: 31 },
	{ age: 37 }
];

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

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((u) => u.age < 30, users));

go(
	users,
	L.map((u) => u.age),
	find((n) => n < 30),
	log
);

/////////////////////////////////////////////////
// L.map, L.filter를 이용한 map, filter

L.map = curry(function* (f, iter) {
	for (const a of iter) {
		yield f(a);
	}
});

// log(map((a) => a + 10, range(4)));

const _map = curry(pipe(L.map, take(Infinity)));

// filter
const _filter = curry(pipe(L.filter), take(Infinity));

// takeAll
const takeAll = take(Infinity);
const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));

/////////////////////////////////////////////////
// L.flatten

const isIterable = (a) => a && a[Symbol.iterator];
L.flatten = function* (iter) {
	for (const a of iter) {
		if (isIterable(a)) for (const b of a) yield b;
		else yield a;
	}
};

var it = L.flatten([[1, 2], 4, 5, [6, 7, 8], [9, 10]]);

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 4, 5, [6, 7, 8], [9, 10]]));

/////////////////////////////////////////////////
// L.flatten

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten));

var it = L.flatMap(
	(a) => a,
	[
		[1, 2],
		[3, 4],
		[5, 6, 7]
	]
);
log([...it]);
// 응용

L.range = function* (l) {
	let i = -1;
	while (++i < l) yield i;
};

const range = (l) => {
	let i = -1;
	let res = [];
	while (++i < l) {
		res.push(i);
	}
	return res;
};

log(flatMap(range, [1, 2, 3]));
log(
	take(
		3,
		L.flatMap(
			L.range,
			map((a) => a + 1, [1, 2, 3])
		)
	)
);

/////////////////////////////////////////////////
// 2차원 배열 다루기

console.clear();
const arr = [
	[1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10]
];

go(
	arr,
	flatten,
	filter((a) => a % 2),
	log
);

go(
	arr,
	L.flatten,
	L.filter((a) => a & 2),
	take(3)
);

//////////////////////////////////////////////
// 실무 데이터
var user = [
	{
		name: 'a',
		age: 21,
		family: [
			{ name: 'a1', age: 53 },
			{ name: 'a2', age: 47 },
			{ name: 'a3', age: 16 },
			{ name: 'a4', age: 15 }
		]
	},
	{
		name: 'b',
		age: 24,
		family: [
			{ name: 'b1', age: 58 },
			{ name: 'b2', age: 51 },
			{ name: 'b3', age: 19 },
			{ name: 'b4', age: 22 }
		]
	},
	{
		name: 'c',
		age: 31,
		family: [
			{ name: 'c1', age: 64 },
			{ name: 'c2', age: 62 }
		]
	},
	{
		name: 'd',
		age: 20,
		family: [
			{ name: 'd1', age: 42 },
			{ name: 'd2', age: 42 },
			{ name: 'd3', age: 11 },
			{ name: 'd4', age: 7 }
		]
	}
];

const add = (a, b) => a + b;
console.clear();
go(
	user,
	L.map((u) => u.family), // 모든 가족 꺼내기
	L.flatten, // 평활화
	L.filter((u) => u.age < 20), // 20세 미만 거르기
	L.map((u) => u.age), // 이름 뽑기
	take(4), // 4명만 뽑기
	reduce(add),
	log
);
