const map = (f, iter) => {
	let res = [];
	for (d of iter) {
		res.push(f(d));
	}
	return res;
};

const filter = (f, iter) => {
	let res = [];
	for (d of iter) {
		if (f(d)) res.push(d);
	}
	return res;
};

const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (d of iter) {
		acc = f(acc, d);
	}
	return acc;
};

const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

console.log(
	reduce(
		add,
		map(
			(p) => p.price,
			filter((p) => p.price < 20000, products)
		)
	)
);

console.log(
	reduce(
		add,
		filter(
			(n) => n >= 20000,
			map((p) => p.price, products)
		)
	)
);
