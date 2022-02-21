# 04 객체를 이터러블 프로그래밍으로 다루기

- 객체 : key, value

```js
const obj = {
	a: 1,
	b: 2,
	c: 3
};
```

```js
arr[Symbol.iterator]();
```

- `지연성`, `동시성`
- ┣ 평가가 완료되지 않은
- ┣ 이터레이터를 생성함으로
- ┣ `이점들을 얻음`
- ┣ `Object.entries`를 사용하게되면
- ┣ 이터러블로 얻을 수 있는 장점이 사라짐
- ┣ 고로 `이를 객체 자체로 다룰 수 있도록 하도록`

> 기본적인 함수

```js
_go(
	obj1,
	Object.values,
	_.map((a) => a + 10),
	_.reduce((a, b) => a + b),
	console.log
);
```

## 목차

- [04 객체를 이터러블 프로그래밍으로 다루기](#04-객체를-이터러블-프로그래밍으로-다루기)
  - [목차](#목차)
  - [`L.values`](#lvalues)
  - [entries](#entries)
  - [keys](#keys)
  - [어떠한 값이든 이터러블 프로그래밍으로 다루기](#어떠한-값이든-이터러블-프로그래밍으로-다루기)
  - [Object : Object를 객체로 변환](#object--object를-객체로-변환)
  - [mapObject : 객체에 map 적용](#mapobject--객체에-map-적용)
  - [pick](#pick)
  - [indexBy : 원하는 자료 구조로 key value 변형](#indexby--원하는-자료-구조로-key-value-변형)
  - [indexBy 된 값을 filter 하기](#indexby-된-값을-filter-하기)

## `L.values`

```js
L.values = function* (obj) {
	for (const k in obj) {
		yield obj[k];
	}
};

_.go(
	obj1,
	L.values,
	L.map((a) => a + 10),
	L.take(2),
	_.reduce((a, b) => a + b),
	console.log
);
```

## entries

> 여기서 알고 가는 for ... in , for ... of 차이

```js
for (const a in obj1); //객체 순회
for (const a of obj1); // 배열 순회
```

```js
L.entries = function* (obj) {
	for (const k in obj) {
		yield [k, obj[k]];
	}
};

_.go(
	obj1,
	K.entries,
	L.map(([k, v]) => ({ [k]: v })),
	_.reduce(Object.assign),
	console.log
);
```

- 단지 `구현 방법을 보는 것이 아닌`
- ┣ `이터러블이 아닌 값`을
- ┣ `이터러블화 하는 코드를 작성`하여
- ┣ `이터러블 프로그래밍이 가능 하도록 설정` 하는 것

## keys

```js
L.keys = function* (obj) {
	for (const k in obj) {
		yield K;
	}
};
```

- 이를 이용해서 다른 것들을 할 수 있음

## 어떠한 값이든 이터러블 프로그래밍으로 다루기

- 지금까지는 `이터러블을 중심`으로
- ┣ `이터러블 프로그래밍을 진행` 하였음
- ┣ Array, Obj

- `객체` : `제너레이터를 이용`해서
- ┣ 이터레이터로 만들어서 이터러블 프로그래밍
- ┣ 곧 이말은 : `어떤 제너레이터든`
- ┣ `이터레이터로 만들어서 이터러블 프로그래밍`
- ┣ 가능하다는 말

```js
// 문장으로 작성

const it = (function* () {
	let i = 1;
	while (++i < 5) {
		yield 10;
		if (false) yield 20 + 30;
		yield 30;
	}
})();

console.log([...it]);
```

> 이러한 코드도 작성이 가능함

- 어디까지 평가 되고
- ┣ 지연 평가의 이점을 최대로 살리고
- ┣ `모두 값으로 다뤄질 수 있음`

```js
const g1 = function* (stop) {
	let i = -1;
	while (++i < stop) {
		console.log(i);
		yield 10;
		if (false) yield 20 + 30;
		yield 30;
	}
};

console.log([...L.take(3, g1(20))]);
```

## Object : Object를 객체로 변환

```js
const a = [
	['a', 1],
	['b', 2],
	['c', 3]
];
const b = { a: 1, b: 2, c: 3 };
```

> 기존에 만든 방식

```js
const object = (entries) =>
	_.go(
		entries,
		L.map(([k, v]) => ({ [k]: v })),
		_.reduce(Object.assign)
	);
```

> reduce 만으로 작성

```js
const object = (entries) =>
	_.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);
```

> 재밌는 부분

- `new Map()`
- ┣ 일반적으로 방법으로는 `Json.stringfy()`
- ┣ 사용이 불가능함
- ┣ 지금의 object만 사용해도 가능

## mapObject : 객체에 map 적용

- 함수형 사고
- ┣ 1. 먼저 entries로 만듬
- ┣ 2. value 값을 변경
- ┣ 3. 객체로 다시 생성

> 단계적으로 생성하는 것을 생각하면 됨

```js
const mapObject = (f, obj) =>
	_.go(
		obj,
		L.entries,
		_.map(([k, v]) => [k, f(v)]),
		object,
		console.log
	);
```

## pick

- 순회를 할 대상을 찾음
- ┣ 1. 배열에 의존
- ┣ 2. 객체에 의존
- ┣ 하지만 어느것이 효율적인지는
- ┣ 그 때 마다 다를 수 있음

> pick의 의미

    대체적으로 뽑는 값이 더 적음

```js
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const pick = (ks, obj) => {
	_.go(
		ks,
		_.map((k) => [k, obj[k]]),
		object,
		console.log
	);
};

console.log(pick(['b', 'c'], obj2));
```

> 꼭 파이프라인의 구조를 가질 필요는 없음

    파이프라인을 가질 필요가 없다면
    ┣ 아래와 같이 작성해도 됨

```js
const pick = (ks, obj) => object(_.map((k) => [k, obj[k]], ks));
```

> 없는 값을 뽑는 경우

- 런타임에서 undefined는 사용하지 않는 것이 좋음
- ┣ 서버에 전달도 불가
- ┣ 의미가 없는 값임

```js
// {b: 2, c:3, z:undefined}

const pick = (ks, obj) =>
	_.go(
		ks,
		_.map((k) => [k, obj[k]]),
		_.reject(([k, v]) => v === undefined),
		object
	);
```

## indexBy : 원하는 자료 구조로 key value 변형

```js
const users = [
	{ id: 5, name: 'AA', age: 35 },
	{ id: 10, name: 'BB', age: 26 },
	{ id: 19, name: 'CC', age: 28 },
	{ id: 23, name: 'CC', age: 34 },
	{ id: 24, name: 'EE', age: 23 }
];

console.log(_.indexBy((u) => u.id, users));

// result
{
  '5': { id: 5, name: 'AA', age: 35 },
  '10': { id: 10, name: 'BB', age: 26 },
  '19': { id: 19, name: 'CC', age: 28 },
  '23': { id: 23, name: 'CC', age: 34 },
  '24': { id: 24, name: 'EE', age: 23 }
}
```

> 인덱싱을 통해 콜 비용을 줄임

- 원래는 find를 통해 전체 순회를 해야 하지만
- ┣ indexBy는 추후에 key 값으로 바로 찾을 수 있음
- ┣ 이는 reduce를 통해 생성함

> 왜?

    원래는 이터러블 형태를
    ┣ 1. 모두를 순회하며
    ┣ 2. 새로운 형태의 값으로 만들어 낼 때
    ┣ 이 때 reduce를 사용함

```js
_.indexBy = (f, iter) => _.reduce((obj, a) => ((obj[f(a)] = a), obj), {}, iter);
```

- 동작 설명
- ┣ 1. `이터러블을 통해 객체`로부터 출발`({})`
- ┣ 2. `reduce를 통해 모두 순회`
- ┣ 3. 각각의 key들을 `f(a)`로 만들고
- ┣ 4. `obj를 만들면서 return 하면서 다음으로 전달`

- obj : index가 된 결과
- ┣ `a` : `iter를 통해 하나씩` 들어온 값
- ┣ `return 하면서 obj를 누적하면서 전달`

> 알아두기

```js
function(obj, a) {
    return obj[a] = a, obj;
}
(obj, a) => obj[a] = a, obj;
```

## indexBy 된 값을 filter 하기

```js
const users = [
	{ id: 5, name: 'AA', age: 35 },
	{ id: 10, name: 'BB', age: 26 },
	{ id: 19, name: 'CC', age: 28 },
	{ id: 23, name: 'CC', age: 34 },
	{ id: 24, name: 'EE', age: 23 }
];

console.log(_.filter(({ age }) => age > 30, users));
```

> 하지만 key 값으로 이루어진 경우는 filter를 사용 불가

```js
_.go(
	user2,
	L.entries, // 먼저 entries를 통해 [k, v] 쌍으로 변형
	_.filter(([_, { age }]) => age >= 30), // 구조분해 통해서 변형
	object, // 다시 객체로 변형
	console.log
);
```
