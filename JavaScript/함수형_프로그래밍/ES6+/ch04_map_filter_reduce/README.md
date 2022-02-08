# ch03 map filter reduce

## 목차

- [ch03 map filter reduce](#ch03-map-filter-reduce)
  - [목차](#목차)
  - [map](#map)
    - [이터러블 프로토콜을 따른 map의 다형성](#이터러블-프로토콜을-따른-map의-다형성)
    - [이터러블 프로토콜을 따른 map의 다형성2](#이터러블-프로토콜을-따른-map의-다형성2)
  - [filter](#filter)
  - [reduce](#reduce)
  - [map, filter, reduce를 중첩 사용](#map-filter-reduce를-중첩-사용)

## map

```js
const products = [
	{ name: '반팔티', price: 15000 },
	{ name: '긴팔티', price: 20000 },
	{ name: '핸드폰케이스', price: 15000 },
	{ name: '후드티', price: 30000 },
	{ name: '바지', price: 25000 },
];
```

- `함수형 프로그래밍`의 경우 :
- ┣ 1. `인자`와
- ┗ 2. `return` 값으로 소통하는 것을 중시

> 보조 함수를 전달하는 것으로 사용

    보조 함수에

```js
const map = (f, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(f(a));
	}
	return res;
};
```

### 이터러블 프로토콜을 따른 map의 다형성

- 이터러블 프로토콜을 따라서
- ┣ 다형성이 높음

```js
log(document.querySelector('*').map((el) => el.nodeName)); // 사용 불가
// Array 프로퍼티를 상속받지 못했음
// 하지만 앞에서 만든 map의 경우 사용이 가능함
log(map((el) => el.nodeName, document.querySelectorAll('*')));

const it = document.querySelectorAll('*')[Symbol.iterator]();
log(it.next());
```

> 제너레이터도 사용 가능

```js
function* gen() {
	yield 2;
	if (false) yield 3;
	yield 4;
}
console.log(map((a) => a * a, gen()));
```

- `문장을 사용 가능`하기 때문에
- ┣ `모든것에 대해서 map`을 할 수 있다는 것을
- ┗ 의미하기도 함

### 이터러블 프로토콜을 따른 map의 다형성2

- Map을 만든다고 했을 때
- ┣ map을 이용해서 새로운 Map을 만들 때
- ┣ 사용이 가능함

```js
let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
console.log(new Map(map(([k, a]) => [k, a * 2], m)));
```

## filter

> 다형성을 높힌 filter

```js
const filter = (f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}
	return res;
};

console.log(...filter((p) => p.price < 20000, products));
console.log(filter((n) => n % 2, [1, 2, 3, 4]));
```

- 다음과 같이 제너레이터를 인자로도 사용 가능

```js
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
```

## reduce

- `이터러블` 값을 하나로 `축약 시켜나감`
- ┣ 재귀적으로 동작함
- ┗ `f 에게 평가 조건을 위임`

```js
const reduce = (f, acc, iter) => {
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
};
```

> JS에서 acc 없어도 동작하도록 설계 되어있음

- iter가 없으면 `인자가 2개임`
- ┣ 이를 이용해서 `iter`에 `acc[Symbol.iterator]()` 적용
- ┗ acc에는 `iter.next().value`를 적용

```js
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
console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
console.log(reduce(add, [1, 2, 3, 4, 5]));
```

- `reduce`에서는 `보조 함수에 완전히 위임`
- ┣ `특정한 값으로 축약해 나가는 것에 대한`
- ┗ 어려움이 없음

```js
console.log(
	reduce((total_price, product) => total_price + product.price, 0, products)
);
```

## map, filter, reduce를 중첩 사용

```js
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
```

> 이를 좀 더 함수형적 사고로 생각하기

```js
console.log(reduce(add, [1, 2, 3, 4]));
// reduce의 iter에 숫자가 들어있을 것을 기대함
```
