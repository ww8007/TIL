# 코드를 값으로 다루어 표현력 높이기

## 목차

- [코드를 값으로 다루어 표현력 높이기](#%EC%BD%94%EB%93%9C%EB%A5%BC-%EA%B0%92%EC%9C%BC%EB%A1%9C-%EB%8B%A4%EB%A3%A8%EC%96%B4-%ED%91%9C%ED%98%84%EB%A0%A5-%EB%86%92%EC%9D%B4%EA%B8%B0)
  - [go](#go)
  - [pipe : 합성된 함수](#pipe--%ED%95%A9%EC%84%B1%EB%90%9C-%ED%95%A8%EC%88%98)
  - [go를 사용해서 읽기 쉬운 함수 만들기](#go%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%9D%BD%EA%B8%B0-%EC%89%AC%EC%9A%B4-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [curry 함수](#curry-%ED%95%A8%EC%88%98)
  - [함수 조합으로 함수 만들기](#%ED%95%A8%EC%88%98-%EC%A1%B0%ED%95%A9%EC%9C%BC%EB%A1%9C-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)

## go

- 평가하는 시점을 원하는 대로 사용이 가능함
- ┣ 하나의 값으로 만들어 가는 과정

```js
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

const go = (...args) => {
	reduce((a, f) => f(a), args);
};
```

- go 함수의 경우
- ┣ 1. `args를 모두 받아서`
- ┣ 2. `reduce`에게 `args를 전체`를 넘겨주고
- ┣ 3. `a : 첫번째 값`
- ┣ 4. `f : 함수가 들어옴`

> 2개씩 잘라서 보면 편함

    1. 첫번째 값
    2. 함수

## pipe : 합성된 함수

- `go를 이용해서` 만들 수 있음
- ┗ `초기값을 인자`로 전달하면 됨

```js
const pipe =
	(...fs) =>
	(a) =>
		go(a, ...fs);

const f = pipe(
	(a) => a + 1,
	(a) => a + 10,
	(a) => a + 100
);
log(f(0));
```

> 아쉬운 점

    go의 경우 첫번째 인자로
    ┗ 인자를 여러개 전달이 가능함

```js
go(
	add(0, 1),
	(a) => a + 10,
	(a) => a + 100
);
go(
	add(0, 1),
	(a) => a + 10,
	(a) => a + 100
);
```

- 인자를 두개 이상 전달이 가능하도록 설정

```js
const pipe =
	(f, ...fs) =>
	(...as) =>
		go(f(...as, ...fs));
```

## go를 사용해서 읽기 쉬운 함수 만들기

- 코드를 좀 더 `가독성을 좋게` 작성이 가능해짐

```js
go(
	products,
	(products) => filter((p) => p.price < 20000, products),
	(products) => map((p) => p.price, products),
	(prices) => reduce(add, prices),
	console.log
);
```

## curry 함수

- 함수를 받아서 함수를 return 하고
- ┣ `인자가 원하는 대로` 들어왔을 때
- ┗ `함수를 실행` 시킴

> 작동

- ┣ 1. 일단 `함수를 받아서 함수를 return`
- ┣ 2. `return 함수 실행 시` `인자가 2개 이상`이면
- ┣ `받아둔 함수를 즉시 실행 `
- ┣ `2개 보다 작다면` `함수를 return` 한 후
- ┗ 그 전 `받은 인자들을 합쳐서 실행`

```js
const curry =
	(f) =>
	(a, ..._) =>
		_.length ? f(a, ..._) : (..._) => f(a, ..._);
```

> map, filter, reduce에 curry 적용

    다음과 같이 간결한 코드를 작성이 가능함

```js
go(
	products,
	filter((p) => p.price < 20000),
	map((p) => p.price),
	reduce(add),
	console.log
);
```

## 함수 조합으로 함수 만들기

```js
const total_price = pipe(
	map((p) => p.price),
	reduce(add)
);

go(
	products,
	filter((p) => p.price >= 20000),
	total_price,
	console.log
);
```

> 더욱 간결하게 작성이 가능함

```js
const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
	products,
	base_total_price((p) => p.price < 2000),
	console.log
);
```
