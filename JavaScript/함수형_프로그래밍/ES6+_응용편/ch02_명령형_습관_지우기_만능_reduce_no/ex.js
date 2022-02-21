import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';
const users = [
	{ name: 'AA', age: 35 },
	{ name: 'BB', age: 26 },
	{ name: 'CC', age: 28 },
	{ name: 'DD', age: 34 },
	{ name: 'EE', age: 23 }
];

console.log(_.reduce((total, u) => total + u.age, 0, users));

const add = (a, b) => a + b;
const ages = L.map((u) => u.age);
console.log(_.reduce(add, ages(users)));

////////////////
// filter
console.log(
	_.reduce(
		add,
		L.filter(
			(n) => n < 30,
			L.map((u) => u.age, users)
		)
	)
);

const obj1 = {
	a: 1,
	b: undefined,
	c: 'CC',
	d: 'DD'
};

function query1(obj) {
	let res = '';
	for (const k in obj) {
		const v = obj[k];
		if (v === undefined) continue;

		if (res != '') res += '&';
		res += k + '=' + v;
	}
	return res;
}

console.log(query1(obj1));

const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
});

function query2(obj) {
	return Object.entries(obj).reduce((query, [k, v], i) => {
		if (v === undefined) {
			console.log(query);
			return query;
		}
		return query + (i > 0 ? '&' : '') + k + '=' + v;
	}, '');
}

console.log(query2(obj1));

// query 3

const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

function query3(obj) {
	return join(
		'&',
		_.map(
			([k, v]) => `${k}=${v}`,
			_.reject(([_, v]) => v === undefined, Object.entries(obj))
		)
	);
}

console.log(query3(obj1));

const query4 = (obj) =>
	_.go(
		obj,
		Object.entries,
		_.reject(([_, v]) => v === undefined),
		_.map(([k, v]) => `${k}=${v}`),
		// _m.map(join('='))
		join('&')
	);

console.log(query4(obj1));

//// queryToObject

const split = _.curry((sep, str) => str.split(sep));
const queryToObject = _.pipe(
	split('&'),
	_.map(split('=')),
	_.map(([k, v]) => ({ [k]: v })),
	reduce(Object.assign)
);
console.clear();
console.log(queryToObject('a=1&c=CC&d=DD'));
