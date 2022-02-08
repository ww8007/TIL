const go = (...args) => {
	reduce((a, f) => f(a), args);
};

go(
	0,
	(a) => a + 1,
	(a) => a + 10,
	(a) => a + 100,
	console.log
);

///////////////////////////////////////////
// pipe : 합성된 함수

const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as, ...fs));

const f = pipe(
	(a) => a + 1,
	(a) => a + 10,
	(a) => a + 100
);

const add = (a, b) => a + b;

// go(
// 	products,
// 	(products) => filter((p) => p.price < 20000, products),
// 	(products) => map((p) => p.price, products),
// 	(prices) => reduce(add, prices),
// 	console.log
// );

const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
console.log(mult(1)(2));

///////////////////////////////////////////
// 모두 curry 적용

const map = curry((f, iter) => {
	const res = [];
	for (const a of iter) res.push(f(a));
	return res;
});

const filter = curry((f, iter) => {
	const res = [];
	for (a of iter) {
		if (f(a)) res.push(a);
	}
	return res;
});

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (d of iter) {
		acc = f(acc, d);
	}
	return acc;
});

go(
	products,
	filter((p) => p.price < 20000),
	map((p) => p.price),
	reduce(add),
	console.log
);

const total_price = pipe(
	map((p) => p.price),
	reduce(add)
);

const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
	products,
	base_total_price((p) => p.price < 2000),
	console.log
);
