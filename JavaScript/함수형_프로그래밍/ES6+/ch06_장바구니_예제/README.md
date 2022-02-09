# 장바구니 예제

- `추상화 레벨`을 높혀나가는 것이
- ┗ `함수형 프로그래밍의 관점`

```js
const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);
```

```js
const go = (...args) => reduce((a, f) => f(a), args);
```

```js
const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as), ...fs);
```

```js
const products = [
	{ name: '반팔티', price: 15000, quantity: 1 },
	{ name: '긴팔티', price: 20000, quantity: 2 },
	{ name: '핸드폰케이스', price: 15000, quantity: 3 },
	{ name: '후드티', price: 30000, quantity: 4 },
	{ name: '바지', price: 25000, quantity: 5 },
];

const add = (a, b) => a + b;

const total_quantity = pipe(
    map((p) => p.quantity),
    reduce(add);

const total_prices = pipe(
    map((p)=> p.price * p.quantity),
    reduce(add)
)
```

> 현재는 products에 의존하는 함수임

- 이를 sum 이라는 추상화 함수를 만들어서 위임

```js
const sum = (f, iter) => go(iter, map(f), reduce(add));

const total_quantity = (products) => sum((p) => p.quantity, products);
const total_price = (products) => sum((p) => p.price * p.quantity, products);
```

> 이를 커링을 이용해서 추상화를 더 가능

    보조 함수를 사용하겠다만으로
    ┗ 코드를 작성이 가능함

```js
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);
```
