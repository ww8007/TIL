# 비동기2

## 목차

- [비동기2](#비동기2)
	- [목차](#목차)
	- [지연 평가 Promise L.map, map, take](#지연-평가-promise-lmap-map-take)
	- [Kleisli Composition - L.filter, filter, nop, take](#kleisli-composition---lfilter-filter-nop-take)
	- [reduce에서 nop 지원](#reduce에서-nop-지원)
	- [지연평가 + Promise의 효율성](#지연평가--promise의-효율성)
	- [지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take](#지연된-함수열을-병렬적으로-평가하기---creduce-ctake)
	- [즉시 병렬적으로 평가하기 - C.map, C.filter](#즉시-병렬적으로-평가하기---cmap-cfilter)
	- [즉시, 지연, Promise, 병렬적 조합하기](#즉시-지연-promise-병렬적-조합하기)
	- [코드 간단히 정리](#코드-간단히-정리)
	- [Node.js에서 SQL 병렬 평가로 얻은 효율](#nodejs에서-sql-병렬-평가로-얻은-효율)

## 지연 평가 Promise L.map, map, take

- 비동기를 처리 할 수 있게 설정

```js
go(
	[Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
	L.map((a) => a + 10),
	take(2),
	log
);
```

> 현재 상태에서는 이게 정상적으로 동작하지 않음

```js
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
// go1을 사용하면 a가 Promise면 풀어서 전달

L.map = curry(function* (f, iter) {
	for (const a of iter) yield go1(a, f);
});
```

> take 함수 Promise 처리

- 아래 코드는 지금 return을
- ┣ 통해 while을 빠져 나갔기 때문에
- ┣ while을 다시 들어가기 어려움
- ┗ 고로 `reduce 에서 사용했던 재귀를 자름`

```js
const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (a instanceof Promise)
			return a.then((a) => {
				// return을 찍어서
				res.push(a);
				if (res.length == l) return res;
			});
		res.push(a);
		if (res.length == l) return res;
	}
	return res;
});

// After
const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	return (function recur() {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			if (a instanceof Promise)
				return a.then((a) => ((res.push(a), res).length == l ? res : recur()));
			res.push(a);
			if (res.length == l) return res;
		}
		return res;
	})();
});
```

> 한 문장으로 자르기

```js
// before
return a.then((a) => {
	res.push(a);
	return res.length == l ? res : recur();
});
// after
return a.then((a) => ((res.push(a), res).length == l ? res : recur()));
```

## Kleisli Composition - L.filter, filter, nop, take

```js
go(
	[1, 2, 3, 4, 5, 6],
	L.map((a) => Promise.resolve(a * a)),
	L.filter((a) => a % 2),
	take(2),
	log
);
```

- 현재는 제대로 동작하지 않음

> 동기 상황 처리

```js
L.filter = curry(function* (f, iter) {
	for (const a of iter) {
		const b = go1(a, f);
		if (b) yield a;
	}
});
```

- 단순하게 `map에서 사용했던`
- ┣ `go1을 사용`해도 `다음 문제는 해결이 가능함`
- ┗ 아직은 `Promise를 해결하지 못했음`

- 만약 `동기` : 이후 `함수 대기열을`
- ┣ 실행하지 않고 `끝내버리도록 설정`
- ┣ `Kleisli Composition`을 사용함
- ┗ `Promise.reject()`를 사용

- 다시 정리하면 `go1을 사용`해서
- ┣ 1. `Promise`이면 `.then`을 통해 `Promise를 다시 받고 b에 할당`
- ┣ 2. 다시 `b를 .then을 통해서 filter 함수 적용`
- ┣ 3. 만약 `참`이면 `a를 return`
- ┗ 3. `거짓`이면 `return Promise.reject(nop)`

```js
const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
	for (const a of iter) {
		const b = go1(a, f);
		if (b instanceof Promise)
			yield b.then((b) => (b ? a : Promise.reject(nop)));
		else if (b) yield a;
	}
});
```

> 이를 take에도 적용

- `take에서 Promise`를 받았을 때
- ┣ 만약 `의도한 nop`이라면 `다시 recur() 함수`를 실행
- ┣ 만약 아니라면 `Promise.reject(e)`를 통해서
- ┗ `오류를 다시 throw` 해주면 됨

```js
while (!(cur = iter.next()).done) {
	const a = cur.value;
	if (a instanceof Promise)
		return a
			.then((a) => ((res.push(a), res).length == l ? res : recur()))
			.catch((e) => (e == nop ? recur() : Promise.reject(e))); // 이 부분
	res.push(a);
	if (res.length == l) return res;
}
```

> then then then 전달

- 뒤에 `어떤 then을 엮더라도`
- ┣ `Promise.reject`가 되면
- ┣ `then 코드를 실행 시키지 않고`
- ┗ `catch문으로 이동`하게 됨

```js
Promise.resolve(1)
	.then(() => Promise.reject('err'))
	.then(() => console.log('여기'))
	.then(() => console.log('여기'))
	.then(() => console.log('여기'))
	.catch((e) => console.log(e));
```

## reduce에서 nop 지원

- `[1, 2, 3, 4]`
- ┣ 1은 잘 전달이 되지만
- ┣ 2는 map, filter를 꺼내면
- ┣ `Promise 자체로 있기 때문에`
- ┗ `1과 Promise로 전달이 됨`

> 기존의 reduce

```js
const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	return go1(acc, function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			acc = f(acc, a);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	});
});
```

- 이런 경우는 `함수로 빼주면 좋음`
- ┣ `acc는 항상 recur를 통해 Promise`를
- ┣ `풀은 값`을 가지므로
- ┗ a에 대한 체크만 해주면 됨

> then의 두번째 인자로 reject를 전달이 가능함

```js
const reduceF = (acc, a, f) =>
	a instanceof Promise
		? a.then(
				(a) => f(acc, a),
				(e) => (e == nop ? acc : Promise.reject(e))
		  )
		: f(acc, a);
```

> 좀 더 다향성을 가질 수 있도록 설정

```js
iter = acc[Symbol.iterator]();
acc = inter.next().value; // 문장이 아닌 표현식으로
```

- application 내부는 그렇게 필요 없지만
- ┗ `특수 경우를 처리 하기 위함`

> head만 꺼내는 head 함수

```js
const head = (iter) => go1(take(1, iter), ([h]) => h);
```

> reduce에 head 적용하기

```js
const reduce = curry((f, acc, iter) => {
	if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);
	iter = iter[Symbol.iterator]();

	return go1(acc, function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			acc = reduceF(acc, cur.value, f);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	});
});
```

## 지연평가 + Promise의 효율성

- 많은 `장점과 효율성이 생김`
- ┣ 전체 비동기에 대해서
- ┣ 필요한 양 만큼의 처리만 하기 때문에
- ┣ `순차적인 처리에 비해서`
- ┗ `많은 효율성이 생김`

```js
go(
	[1, 2, 3, 4],
	L.map((a) => {
		log(a);
		return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
	}),
	L.filter((a) => {
		log(a);
		return new Promise((res) => setTimeout(() => res(a % 2), 1000));
	}),
	take(4),
	log
);
```

## 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take

- JS에서는 `브라우저, Node`
- ┣ `비동기 IO`로 동작함
- ┣ 하나의 `쓰레드에서 CPU 효율적인`
- ┗ `처리`를 하고 있음

> 오해가 생길 수 있음

    JS 병렬적 불가?

- 하지만 틀린 생각
- ┣ 얼마든지 필요 가능
- ┣ `병렬적으로 API 콜` 하는 예시
- ┗ `동시성으로 동작하는 병렬성`

```js
go(
	[1, 2, 3, 4, 5],
	L.map((a) => delay500(a * a)),
	L.filter((a) => a % 2),
	reduce(add),
	log
);
```

- 지금은 `reduce를 순차적으로 처리`하고 있음
- ┣ 부하는 좀 더 걸리겠지만
- ┗ `동시적으로 출발 시키는 reduce를 생성`

```js
C.reduce = curry((f, acc, iter) =>
	iter ? reduce(f, acc, [...iter]) : reduce(f, [...acc])
);
```

> 코드 설명

- `[...iter]`의 경우
- ┣ 1. `비동기가 일어나는 것을 고려하지 않고`
- ┣ `모든 코드를 한번에 실행`시킴
- ┣ 2. `다시 reduce에서 순회`하면서
- ┣ `비동기 제어`를 함
- ┗ 원래의 reduce는 하나씩 평가

```js
// 1s
console.time('');
go(
	[1, 2, 3, 4, 5],
	L.map((a) => delay500(a * a)),
	L.filter((a) => a % 2),
	C.reduce(add),
	log,
	(_) => console.timeEnd('')
);

// 5s
console.time('');
go(
	[1, 2, 3, 4, 5],
	L.map((a) => delay500(a * a)),
	L.filter((a) => a % 2),
	reduce(add),
	log,
	(_) => console.timeEnd('')
);
```

> Promise의 특징

- 이미 출력된 reject 에러는
- ┣ `callStack에 남아있게됨`
- ┣ 고로 `먼저 보여 줄 필요가 없다는`
- ┗ 것을 코드에 작성을 해주면 됨

- `catch문`이 먼저 작성되면
- ┗ `괜찮지만 아닌 경우 남아있음`

> catch만 해두기

- 이미 catch를 해버리게 만들어버리면
- ┣ `이후에 catch를 할 수 없게 됨`
- ┣ 고로 `catch만 걸어두어 에러만 나지 않게 하고`
- ┗ `원하는 시점에 catch`를 할 수 있게 설정

```js
function noop() {}
const catchNoop = (arr) => (
	arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
	// arr를 그대로 return 해주는 것이 관건
);

C.reduce = curry((f, acc, iter) => {
	const iter2 = catchNoop(iter ? [...iter] : [...acc]);
	return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
```

- 이후 `함수 대기열이 얼마나 길던지`
- ┣ `코드들을 처리` 하게 해줌
- ┗ 최대한 `병렬적으로 처리함`

> take 또한 병렬적 처리

```js
C.take = curry((l, iter) => {
	return take(l, catchNoop([...iter]));
});
```

- 기존 `reduce, take` :
- ┣ `명령 자체를 덜 실행`
- ┣ `C.reduce, C.take`
- ┣ `최대한 많은 자원`을 써서
- ┗ 최대한 `빨리 처리`

## 즉시 병렬적으로 평가하기 - C.map, C.filter

- `특정 라인에서만 병렬적`으로 처리
- ┣ `C.take`를 이용해서
- ┣ 이를 처리 할 수 있음
- ┗ `C.takeAll을 만들어서 이를 이용`

> C.takeAll

```js
C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

C.map((a) => delay500(a * a), [1, 2, 3, 4]).then(log);
```

## 즉시, 지연, Promise, 병렬적 조합하기

> 엄격하게 평가되는 map, filter, take

```js
console.time('');
go(
	[1, 2, 3, 4, 5, 6, 7, 8],
	map((a) => delay500(a * a, 'map 1')),
	filter((a) => delay500(a % 2, 'filter 2')),
	map((a) => delay500(a + 1, 'map3')),
	take(2),
	(_) => console.timeEnd('')
);
```

> 평가의 최소화

```js
console.time('');
go(
	[1, 2, 3, 4, 5, 6, 7, 8],
	L.map((a) => delay500(a * a, 'map 1')),
	L.filter((a) => delay500(a % 2, 'filter 2')),
	L.map((a) => delay500(a + 1, 'map3')),
	take(2),
	(_) => console.timeEnd('')
);
```

- 정리
- ┣ `JS는 단일 스레드` 이지만
- ┣ `평가 순서`와
- ┣ `자원을 효율성을 고려`하여
- ┗ 제어가 가능함

## 코드 간단히 정리

- reduce를 좀 더 간단히 정리

> 변수의 사용을 최대한 억제

```js
// before
C.reduce = curry((f, acc, iter) => {
	const iter2 = catchNoop(iter ? [...iter] : [...acc]);
	return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
// after
C.reduce = curry((f, acc, iter) =>
	iter ? reduce(f, acc, catchNoop([...iter])) : reduce(f, catchNoop([...acc]))
);
```

## Node.js에서 SQL 병렬 평가로 얻은 효율

- mql : ORM 다루는 라이브러리
- ┗ `함수형 적인 함수`로 사용
