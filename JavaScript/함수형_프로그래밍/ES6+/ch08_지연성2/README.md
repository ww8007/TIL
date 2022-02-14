# 지연성2

## 목차

- [지연성2](#지연성2)
  - [목차](#목차)
  - [결과를 만드는 함수 reduce,take](#결과를-만드는-함수-reducetake)
    - [queryStr](#querystr)
    - [다형성 높은 join 함수 : 문자열 추가](#다형성-높은-join-함수--문자열-추가)
    - [take, find : 찾아내기](#take-find--찾아내기)
    - [L.map, L.filter를 통해 map, filter 만들기](#lmap-lfilter를-통해-map-filter-만들기)
  - [L.flatten : 평활화](#lflatten--평활화)
    - [`yield *`](#yield-)
    - [L.deepFlat](#ldeepflat)
  - [L.flatMap](#lflatmap)
  - [2차원 배열 다루기](#2차원-배열-다루기)
  - [이터러블 중심의 실무 코드](#이터러블-중심의-실무-코드)

## 결과를 만드는 함수 reduce,take

- `map, filter` :
- ┣ `배열, iterable를 합성`하는 역할
- ┗ `지연성`을 가질 수 있다고 볼 수 있음

- `reduce, take` :
- ┣ `꺼내서 깨뜨리는` 역할
- ┣ 결과를 만드는 함수라고 할 수 있음
- ┗ `연산을 시작하는 시작점`을 알리는 함수

> 사용법

    map, reduce를 사용하면서
    ┣ 사용을 하다가
    ┣ reduce, take를 사용 하여서
    ┗ 결과값을 만들어낸다고 할 수 있음

- `take`도 값을 두개 빼낸다고
- ┣ `지연성을 가진다고 볼 수 있지만`
- ┣ 지연성을 가지는 것 보다는
- ┣ `take를 한 시점에 연산이 이루어진다고`
- ┣ 생각하는 편이 확실하고 편리 하다고
- ┗ 볼 수 있음

### queryStr

- 객체로부터 `url queryStr` 얻어내는 코드

- `Object.entries`
- ┣ `Object를 key, value로` 가진
- ┗ `배열로 변환` 시켜줌

- 특징점
- ┣ 1. `Object.entries`를 통해 `변환`
- ┣ 2. `map`을 통해 `변형`
- ┗ 3. `reduce`를 통해 `축약`

```js
const queryStr = (obj) =>
	go(
		obj,
		Object.entries,
		map(([k, v]) => `${k}=${v}`),
		reduce((a, b) => `${a}&${b}`)
	);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));
```

> pipe를 사용해 더 간결하게 표현 가능

### 다형성 높은 join 함수 : 문자열 추가

- `reduce`를 사용하다 보면 `join 함수`를
- ┗ 생각하게 될 수 있음

- `reduce : iterable`한 값을
- ┗ `축약` 시켜나갈 수 있음

```js
const join = curry((sep = ',', iter) =>
	reduce((a, b) => `${a}${sep}${b}`, iter)
);

function* a() {
	yield 10;
	yield 11;
	yield 12;
	yield 13;
}

log(join(' - ', a()));
```

> 지연 평가를 해나갈 수 있다는게 매우 큰 장점

    queryMap도 지연 평가 가능

```js
const queryStr = pipe(
	Object.entries,
	L.map(([k, v]) => `${k}=${v}`),
	function (a) {
		log(a);
		return a;
	},
	reduce((a, b) => `${a}&${b}`)
);
```

> 그러면 모든 곳에 iterator를 흘려 보내도록 만들면 됨

```js
L.entries = function* (obj) {
	for (const k in ojb) {
		yield [k, obj[k]];
	}
};

const queryStr = pipe(
	L.entries,
	L.map(([k, v]) => `${k}=${v}`),
	join('&')
);
```

### take, find : 찾아내기

- `find` : take 함수를 통해 만들어 내감

- `이터러블을 사용`하면
- ┣ 이해하기 좋은 코드가 될 수 있음
- ┣ `take를 통해 iterable을 받음`
- ┗ `실행 시점에 대한 고민이 적어짐`

```js
const find = (f, iter) => go(iter, filter(f), take(1), ([a]) => a);
```

```js
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((u) => u.age < 30, users));
```

### L.map, L.filter를 통해 map, filter 만들기

```js
const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next().done)) {
		const d = cur.value;
		res.push(f(d));
	}
	return res;
});
```

> L.map을 통한 리팩토링

- `take를 통해 Infinity를 전달`하면
- ┣ map의 길이가 얼마든지
- ┗ 출력이 가능함
-

```js
const map = curry((f, iter) => go(iter, L.map(f), take(Infinity)));
```

```js
const map = curry(pipe(L.map, take(Infinity)));
```

> filter 함수

```js
const filter = curry(pipe(L.filter), take(Infinity));
```

> takeAll을 통한 리팩토링

```js
const takeAll = take(Infinity);
const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter), takeAll);
```

## L.flatten : 평활화

- 사용

```js
log([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);
/// 1, 2, 3, 4, 5, 6, 7, 8, 9
```

```js
// a가 null 에 대한 안전장치
const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
	for (const a of iter) {
		if (isIterable(a)) for (const b of a) yield b;
		else yield a;
	}
};
```

> 즉시 평가 flatten

```js
const flatten = pipe(L.flatten, takeAll);
```

### `yield *`

- `yield *iterable` :
- ┣ `for (const val of iterable) yield val`
- ┗ 코드와 같음

```js
L.flatten = function* (iter) {
	for (const a of iter) {
		if (isIterable(a)) yield* a;
		else yield a;
	}
};
```

### L.deepFlat

- 깊은 iterable을 모두 펼치기

```js
L.deepFlat = function *f(iter) {
    const (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a;
    }
}
```

## L.flatMap

- `JS가 기본적으로 지연 동작하지 않기` 때문에
- ┣ 이를 최신 JS에 포함되어 있음
- ┗ `동일한 시간 복잡도로 동작`

> 특별한 용도

- `전달된 함수`를 사용해서
- ┗ `변화된 값을 사용`이 가능함

- `map, flatten이 비효율적`으로 동작하기 때문에
- ┣ 이를 생성하였음
- ┣ 사실 시간 복잡도는 별 차이가 없음
- ┣ `순회 해야할 것이 정해져 있는 경우`가 아니라면
- ┗ `많은 효율이 생겼다고 볼 수 없음`

- 또한 `JS의 flatMap은 Array에서만 동작`하기 때문에
- ┗ `이를 좀 더 다형성`을 가지도록 설정함

```js
L.flatMap = curry(pipe(L.map, L.flatten));
```

> 즉시 평가

```js
const flatMap = curry(pipe(L.map, flatten));
const flatMap = curry(pipe(L.map, L.flatten, takeAll));
```

> 실제 사용법

```js
log(flatMap(range, [1, 2, 3]));
log(
	take(
		3,
		L.flatMap(
			L.range,
			map((a) => a + 1, [1, 2, 3])
		)
	)
);
```

## 2차원 배열 다루기

- 누차 반복
- ┣ `지연평가를 사용`해서
- ┣ `원하는 값만 뽑아낼 때 까지만`
- ┗ `실행 시켜서 사용`하게 됨

```js
const arr = [
	[1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10]
];

go(
	arr,
	flatten,
	filter((a) => a % 2),
	log
);

go(
	arr,
	L.flatten,
	L.filter((a) => a & 2),
	take(3)
);
```

## 이터러블 중심의 실무 코드

- 그러면 이렇게 만들어 진 것들은
- ┣ `도대체 어디다 쓰는지에 대한`
- ┗ 생각이 들 수 있음

- `함수형 프로그래밍`:
- ┣ `조합되어 있는 함수`에 대한
- ┗ 데이터를 뽑아냄

- 객체지향 :
- ┣ 1. `데이터를 정리`
- ┗ 2. `메소드를 정리`

```js
var users = [
	{
		name: 'a',
		age: 21,
		family: [
			{ name: 'a1', age: 53 },
			{ name: 'a2', age: 47 },
			{ name: 'a3', age: 16 },
			{ name: 'a4', age: 15 }
		]
	},
	{
		name: 'b',
		age: 24,
		family: [
			{ name: 'b1', age: 58 },
			{ name: 'b2', age: 51 },
			{ name: 'b3', age: 19 },
			{ name: 'b4', age: 22 }
		]
	},
	{
		name: 'c',
		age: 31,
		family: [
			{ name: 'c1', age: 64 },
			{ name: 'c2', age: 62 }
		]
	},
	{
		name: 'd',
		age: 20,
		family: [
			{ name: 'd1', age: 42 },
			{ name: 'd2', age: 42 },
			{ name: 'd3', age: 11 },
			{ name: 'd4', age: 7 }
		]
	}
];

go(
	user,
	L.map((u) => u.family), // 모든 가족 꺼내기
	L.flatten, // 평활화
	L.filter((u) => u.age < 20), // 20세 미만 거르기
	L.map((u) => u.age), // 이름 뽑기
	take(4), // 4명만 뽑기
	reduce(add),
	log
);
go(
	user,
	L.flatMap((u) => u.family),
	L.filter((u) => u.age < 20), // 20세 미만 거르기
	L.map((u) => u.age), // 이름 뽑기
	take(4), // 4명만 뽑기
	reduce(add),
	log
);
```
