# 1. 이터러블 프로그래밍 혹은 리스트 프로세싱

## 목차

- [1. 이터러블 프로그래밍 혹은 리스트 프로세싱](#1-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%98%B9%EC%9D%80-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8B%B1)
  - [들어가며](#%EB%93%A4%EC%96%B4%EA%B0%80%EB%A9%B0)
  - [홀수 n개 더하기](#%ED%99%80%EC%88%98-n%EA%B0%9C-%EB%8D%94%ED%95%98%EA%B8%B0)
    - [if를 filter로 변경하기](#if%EB%A5%BC-filter%EB%A1%9C-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0)
    - [값 변화 후 변수 할당을 map으로](#%EA%B0%92-%EB%B3%80%ED%99%94-%ED%9B%84-%EB%B3%80%EC%88%98-%ED%95%A0%EB%8B%B9%EC%9D%84-map%EC%9C%BC%EB%A1%9C)
    - [break를 take로 변경](#break%EB%A5%BC-take%EB%A1%9C-%EB%B3%80%EA%B2%BD)
    - [축약 및 합산을 reduce로](#%EC%B6%95%EC%95%BD-%EB%B0%8F-%ED%95%A9%EC%82%B0%EC%9D%84-reduce%EB%A1%9C)
  - [while을 range로](#while%EC%9D%84-range%EB%A1%9C)
  - [효과를 each로 구분](#%ED%9A%A8%EA%B3%BC%EB%A5%BC-each%EB%A1%9C-%EA%B5%AC%EB%B6%84)
  - [추억의 별 그리기](#%EC%B6%94%EC%96%B5%EC%9D%98-%EB%B3%84-%EA%B7%B8%EB%A6%AC%EA%B8%B0)
  - [추억의 구구단](#%EC%B6%94%EC%96%B5%EC%9D%98-%EA%B5%AC%EA%B5%AC%EB%8B%A8)

## 들어가며

- 좀 더 함수형 프로그래밍의 이야기 확장
- ┣ 좀 더 실무에 사용될 법한 코드를 활용
- ┣ 어떻게 사용해 나가는가

## 홀수 n개 더하기

- 홀수 n개를 뽑아서
- ┣ n개를 더함

> 명령형 프로그래밍

```js
function f1(limit, list) {
	let acc = 0;
	for (const a of list) {
		if (a % 2) {
			const b = a * a;
			acc += b;
			console.log(a);
			if (--limit == 0) break;
		}
	}
	console.log(acc);
}
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### if를 filter로 변경하기

- 명령형을 이터러블에서는 어떻게 코딩이 되나
- ┣ 리스트 프로세싱으로 변경

- 위의 코드가 쉬워보이지만
- ┣ 우리가 하는 코딩의 전부를 담고 있음
- ┣ 효율성을 가지고 있다는 점
- ┣ `for, if, i++ 같은 것들로 추상화가 되어 있음`
- ┣ 명령형 → 함수형으로 변경

> if → filter
> 값 변화 후 변수 할당 → map
> break → take
> 값 추출 → reduce

- if → filter를 변경
- ┣ if 한번만 있는 코드는 filter로 대체 가능

```js
function f2(limit, list) {
	let acc = 0;
	for (const a of L.filter((a) => a % 2, list)) {
		acc += a * a;
		if (--limit == 0) break;
	}
	console.log(acc);
}
f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### 값 변화 후 변수 할당을 map으로

```js
function f3(limit, list) {
	let acc = 0;
	for (const a of L.map(
		(a) => a * a,
		L.filter((a) => a % 2, list)
	)) {
		acc += a;
		if (--limit == 0) break;
	}
	console.log(acc);
}
f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### break를 take로 변경

```js
function f3(limit, list) {
	let acc = 0;
	for (const a of L.take(
		limit,
		L.map(
			(a) => a * a,
			L.filter((a) => a % 2, list)
		)
	)) {
		acc += a;
	}
	console.log(acc);
}
f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### 축약 및 합산을 reduce로

- 축약 및 합산에는 reduce를 이용함

```js
const add = (a, b) => a + b;
function f3(limit, list) {
	console.log(
		reduce(
			add,
			L.take(
				limit,
				L.map(
					(a) => a * a,
					L.filter((a) => a % 2, list)
				)
			)
		)
	);
}
f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

```js
function f4(limit, list) {
	go(
		list,
		L.filter((a) => a % 2),
		L.map((a) => a * a),
		L.take(limit),
		reduce(add),
		console.log
	);
}
f4(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

## while을 range로

- while : 어떤 일을 반복
- ┣ 언제까지 위해서 반복을 하는 것
- ┣ 이터러블에서는 이를 range로 판단

```js
function f5(end) {
	let i = 0;
	while (++i < end) {
		console.log(i);
	}
}
// 다음과 같이 변경
function f6(end) {
	each(console.log, L.range(end));
}
```

> while문을 쓰는 이유

    순회를 여러번 하는 것이 아닌
    ┣ 명령형적 으로 코드를 조율하면
    ┣ 코드를 더 간결하게 작성이 가능
    ┣ 함수형에서는 이를 어떻게 표현?

- each, range의 조합을 통해
- ┣ filter나 if문의 분기문 없이
- ┣ 코드 작성이 가능해짐

## 효과를 each로 구분

- 함수형 프로그래밍에서는
- ┣ 1. 순수한 영역과
- ┣ 2. 외부 세상과 소통
- ┣ 이를 명확하게 구분
- ┣ each : 부수 효과가 존재

- each 함수의 결과
- ┣ 들어간 값과 동일한 결과를 내보냄
- ┣ 반드시 어떤 변화가 있을 수 밖에 없음
- ┣ 실행결과 : 전달한 인자를 그대로 ?
- ┣ 이는 함수 안에서 어떤 효과를
- ┣ 함수 안에서 일으킨다는 것을
- ┣ 명시적으로 나타내는 의미임

## 추억의 별 그리기

```js
go(
	range(1, 6), // 별의 최대 개수
	map(range),
	map(map((_) => '*')),
	map(reduce((a, b) => `${a}${b}`)),
	reduce((a, b) => `${a}\n${b}`),
	console.log
);
```

> 아래와 같이도 가능

```js
go(
	L.range(1, 6), // 별의 최대 개수
	L.map((s) =>
		go(
			L.range(s),
			L.map((_) => '*'),
			reduce((a, b) => `${a}${b}`)
		)
	),
	reduce((a, b) => `${a}\n${b}`),
	console.log
);
```

> join 함수를 만들어서 리팩토링

```js
const join = (sep) => reduce((a, b) => `${a}${sep}${b}`);

go(
	L.range(1, 6), // 별의 최대 개수
	L.map(range),
	L.map(map((_) => '*')),
	L.map(join('')),
	join('\n'),
	console.log
);
```

## 추억의 구구단

```js
go(
	range(2, 10),
	map((a) =>
		go(
			range(1, 10),
			map((b) => `${a}x${b}=${a * b}`),
			join('\n')
		)
	),
	join('\n\n'),
	console.log
);
```
