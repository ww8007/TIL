# 지연성1

## 목차

- [지연성1](#%EC%A7%80%EC%97%B0%EC%84%B11)
  - [range 함수](#range-%ED%95%A8%EC%88%98)
    - [느긋한 range](#%EB%8A%90%EA%B8%8B%ED%95%9C-range)
    - [L.range, range 테스트](#lrange-range-%ED%85%8C%EC%8A%A4%ED%8A%B8)
  - [take 함수 : 많은 값 받아 자르기](#take-%ED%95%A8%EC%88%98--%EB%A7%8E%EC%9D%80-%EA%B0%92-%EB%B0%9B%EC%95%84-%EC%9E%90%EB%A5%B4%EA%B8%B0)
  - [제너레이터/이터레이터 프로토콜로 구현하는 지연평가](#%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EC%A7%80%EC%97%B0%ED%8F%89%EA%B0%80)
  - [L.map : 지연성을 가진 map](#lmap--%EC%A7%80%EC%97%B0%EC%84%B1%EC%9D%84-%EA%B0%80%EC%A7%84-map)
  - [L.filter : 지연성을 가진 filter](#lfilter--%EC%A7%80%EC%97%B0%EC%84%B1%EC%9D%84-%EA%B0%80%EC%A7%84-filter)
  - [range, map, filter, take, reduce 중첩 사용](#range-map-filter-take-reduce-%EC%A4%91%EC%B2%A9-%EC%82%AC%EC%9A%A9)
  - [L.range L.map L.filter 에서의 평가 순서](#lrange-lmap-lfilter-%EC%97%90%EC%84%9C%EC%9D%98-%ED%8F%89%EA%B0%80-%EC%88%9C%EC%84%9C)
    - [take](#take)
    - [filter](#filter)
    - [range](#range)
  - [엄격한 계산과 느긋한 계산의 효율성 비교](#%EC%97%84%EA%B2%A9%ED%95%9C-%EA%B3%84%EC%82%B0%EA%B3%BC-%EB%8A%90%EA%B8%8B%ED%95%9C-%EA%B3%84%EC%82%B0%EC%9D%98-%ED%9A%A8%EC%9C%A8%EC%84%B1-%EB%B9%84%EA%B5%90)
  - [map, filter 계열 함수들이 가지는 결합 법칙](#map-filter-%EA%B3%84%EC%97%B4-%ED%95%A8%EC%88%98%EB%93%A4%EC%9D%B4-%EA%B0%80%EC%A7%80%EB%8A%94-%EA%B2%B0%ED%95%A9-%EB%B2%95%EC%B9%99)
  - [ES6 기본 규약을 통해 구현하는 지연 평가의 장점](#es6-%EA%B8%B0%EB%B3%B8-%EA%B7%9C%EC%95%BD%EC%9D%84-%ED%86%B5%ED%95%B4-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EC%A7%80%EC%97%B0-%ED%8F%89%EA%B0%80%EC%9D%98-%EC%9E%A5%EC%A0%90)

## range 함수

- 간단하게 숫자를 받아서
- ┗ `n-1` 까지의 배열을 만들어 주는 함수

> 생략이 되어있음

    내부에서 배열을 iter를 만들고
    ┗ next()를 통해서 평가를 진행함

```js
const range = l => {
    let i = -1;
    let res = [];
    while (++1) {
        res.push(i);
    }
    return res;
};

log(range(5)); // [0, 1, 2, 3, 4]
log(range(2)); // [0, 1]
```

### 느긋한 range

- `위와 동일한 결과`를 가져옴
- ┣ 차이점은 `아래`는 `iterator를 출력` 한다는 점
- ┣ 고로 `reduce라는 함수`가 같은 결과를
- ┗ 만들어냄

- 차이점 :
- ┣ 위의 `range` : `선언 즉시 배열이 평가됨`
- ┣ 하지만 `제너레이터`로 만들어진
- ┣ range의 경우 `이터레이터의 내부`를
- ┗ `순회 할 때 마다 값이 평가됨`

```js
const L = {};

L.range = function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};

log(list);
```

- 위의 일반 `Array를 이터레이터`로 만드는
- ┣ `과정이 없기 때문에`
- ┣ 이것이 `더욱 효율적`이라고
- ┗ 볼 수 있음

> 정리

    값이 정말로 필요할 때
    ┣ 함수나 값으로 사용될 때
    ┣ 그 값이 의미가 있기 때문에
    ┗ 이터레이터로 존재 하게 됨

### L.range, range 테스트

- 결과적으로는 `그렇게 큰 성능상의 차이가`
- ┗ `나지는 않음`

```js
function test(name, time, f) {
	console.time(name);
	while (time--) f();
	console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(100000)));
test('L.range', 10, () => reduce(add, L.range(100000)));
range: 75.428ms
L.range: 34.209ms
```

## take 함수 : 많은 값 받아 자르기

- `L.range` 같이 `지연성을 가지는 값`을
- ┣ `이터레이터`로 만들게 되면
- ┗ `조합성이 높아짐`

```js
const take = (l, iter) => {
	let res = [];
	for (const d of iter) {
		res.push(d);
		if (res.length == l) return res;
	}
	return res;
};
```

> 무한 수열을 적용 가능

```js
console.time('');
go(range(10000), take(5), reduce(add), log);
console.timeEnd('');
console.time('');
go(L.range(10000), take(5), reduce(add), log);
console.timeEnd('');

///////////////////////////////////////////////
// log
10
: 0.569ms
10
: 0.134ms
```

## 제너레이터/이터레이터 프로토콜로 구현하는 지연평가

- `제때 게산법` :
- ┣ `끝 까지 평가를 미루`다가
- ┣ `정말 필요한 시점`에 `만들어서 사용함`

> 이전 JS

    공식적인 구현이 아니였음
    ┣ 이러한 지연평가를 만들
    ┗ 프로토콜이 존재하지 않았음

- JS 라이브러리들이 안전한
- ┣ 조합성이나 안정성을 가질 수 있게
- ┗ 되었다고 볼 수 있음

- `리스트` 중심
- ┣ `이터러블` 중심 프로그래밍
- ┗ `컬렉션` 중심 프로그래밍

## L.map : 지연성을 가진 map

- `제너레이터, 이터레이터` 프로토콜 기반
- ┣ `평가를 미루는 성질`을 가지고
- ┣ `이터레이터를 반환`하는
- ┗ `제너레이터 함수`

```js
L.map = curry(function* (f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		yield f(a);
	}
});

L.map = function* (f, iter) {
	for (const d of iter) yield f(d);
};
let it = L.map((a) => a + 10, [1, 2, 3]);
// log(it.next());
// log(it.next());
// log(it.next());
log(...it); // 11 12 13
```

## L.filter : 지연성을 가진 filter

```js
L.filter = curry(function* (f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (f(a)) {
			yield a;
		}
	}
});
L.filter = function* (f, iter) {
	for (const d of iter) {
		if (f(d)) yield d;
	}
};
let res = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(res.next());
log(res.next());
log(res.next());
log(res.next());
```

## range, map, filter, take, reduce 중첩 사용

- map, filter를 명령형으로 작성

- 아래 map, filter를 거치면
- ┣ `이터러블`에서
- ┗ `이터레이터`로 변경이 되게 됨

```js
const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(f(a));
	}
	return res;
});

const filter = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (f(a)) res.push(a);
	}
	return res;
});

const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		acc = f(acc, a);
	}
	return acc;
});
```

## L.range L.map L.filter 에서의 평가 순서

```js
go(
	L.range(10),
	L.map((n) => n + 10),
	L.filter((n) => n % 2),
	take(2),
	log
);
```

> 질문

    여기서 breakpoint가 어디서 먼저 잡힐까

### take

```js
const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(a);
		if (res.length == l) return res;
	}
	return res;
});
```

- 가장 먼저 걸리게됨
- ┣ 여기서 `[[GeneratorFunction]]: ƒ* (f, iter)`가 생성됨
- ┣ JS는 `well formed iterator` :
- ┣ 1. `본인이 iterator`
- ┣ 2. `Symbol.iterator`를 가지고 있고
- ┣ 3. `Symbol.iterator`를 `실행` 시키면 `iterator인 자기 자신을 return`
- ┗ 줄을 지나도 `여전히 iterator로 존재함`

### filter

- 위에서 `iter.next()`를 호출하면 `filter로 들어옴`
- ┣ `평가 되기를 미뤄둔` `iterator`를 `return`하게 됨
- ┣ `take`의 경우 `filter가 return`한 `iterator를 take가 받음`
- ┣ `take가 받아둔 filter가 return iterator`를 `처음 next`를 했을 때
- ┗ `평가가 시작`되고 filter 내부에서 `iter.next()` 하면 map으로 이동

> 위로 계속 꼬리를 물고 올라간다고 보면 됨

### range

```js
L.range = function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};
```

- `yield`를 하게 되면
- ┣ `map에서 얻고자 한 값`이 얻어짐
- ┣ `range로 만들어진 iterator`를 통해
- ┣ `next`를 해서 해당하는 0을 받아서
- ┣ `map`의 `n => n + 10`에 전달
- ┣ 또 `yield`하면 `filter에게 전달`
- ┗ `이렇게 반복`이 됨

## 엄격한 계산과 느긋한 계산의 효율성 비교

- 기존의 `map`은 `모든 값을 만들어냄`
- ┣ 하지만 `L의 경우` 필요한 값만을
- ┣ 만들어서 사용을 하게 됨

## map, filter 계열 함수들이 가지는 결합 법칙

- 가로로 모든 값을 평가하는 것이 아닌

- ┣ 1. `사용하는 데이터가 무엇`이든지
- ┣ 2. `사용하는 보조 함수가 순수 함수`라면
- ┗ 아래와 같이 결합한다면 `둘 다 같은 결과가 같음`

```js
[
	[mapping, mapping],
	[filtering, filtering],
	[mapping, mapping],
];
[
	[mapping, filtering, mapping],
	[mapping, filtering, mapping],
];
```

- `take 같은 함수` : `reduce`, `take`를 통해 꺼내면
- ┗ `언제나 결과가 같다고 할 수 있다.`

## ES6 기본 규약을 통해 구현하는 지연 평가의 장점

- 함수와 함수의 return 값을 통해서
- ┣ `평가 시점`이나 `지연시점`을 만들어 나갈 수 있음
- ┣ JS의 고유한 약속된 값을 통해서
- ┗ `안전하게 합성, 동작이 가능해짐`

- 사용하는 라이브러리가 다르더라도
- ┗ 문제가 없음
