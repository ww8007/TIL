const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];

/////////////////////////////////////////
// map

const map = (f, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(f(a));
	}
	return res;
};

let names = [];
for (const p of products) {
	names.push(p.name);
}
let prices = [];
for (const p of products) {
	prices.push(p.price);
}

// 이를 map을 통해 작성
// console.log(map((p) => p.name, products));
// console.log(map((p) => p.price, products));
// console.log(prices);

function* gen() {
	yield 2;
	if (false) yield 3;
	yield 4;
}
// console.log(map((a) => a * a, gen()));

/////////////////////////////////////////
// map 다형성2

let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
// console.log(new Map(map(([k, a]) => [k, a * 2], m)));

/////////////////////////////////////////
// filter
// 명령형 코드 작성
let under2000 = [];
for (const p of products) {
	if (p.price < 20000) under2000.push(p);
}
// console.log(under2000);

// filter 작성
const filter = (f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}
	return res;
};

console.log(
	filter(
		(n) => n % 2,
		(function* () {
			yield 1;
			yield 2;
			yield 3;
		})()
	)
);

console.log(...filter((p) => p.price < 20000, products));
console.log(filter((n) => n % 2, [1, 2, 3, 4]));

/////////////////////////////////////////
// reduce
console.clear();
const nums = [1, 2, 3, 4, 5];

/// 명령형 코드
let total = 0;
for (const a of nums) {
	total += a;
}
console.log(total);

/// reduce

const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
};

const add = (a, b) => a + b;
// console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
// console.log(reduce(add, [1, 2, 3, 4, 5]));

// console.log(
// 	reduce((total_price, product) => total_price + product.price, 0, products)
// );
