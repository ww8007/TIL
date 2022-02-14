# 비동기

## 목차

- [비동기](#%EB%B9%84%EB%8F%99%EA%B8%B0)
  - [Promise](#promise)
  - [비동기를 값으로 만드는 Promise](#%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A5%BC-%EA%B0%92%EC%9C%BC%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-promise)
  - [값으로서의 Promise 활용](#%EA%B0%92%EC%9C%BC%EB%A1%9C%EC%84%9C%EC%9D%98-promise-%ED%99%9C%EC%9A%A9)
  - [함수 합성 관점에서의 Promise와 모나드](#%ED%95%A8%EC%88%98-%ED%95%A9%EC%84%B1-%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C%EC%9D%98-promise%EC%99%80-%EB%AA%A8%EB%82%98%EB%93%9C)
  - [Kleisli Composition 관점에서의 Promise](#kleisli-composition-%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C%EC%9D%98-promise)
  - [go, pipe, reduce에서 비동기 제어](#go-pipe-reduce%EC%97%90%EC%84%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%A0%9C%EC%96%B4)
    - [reduce를 Promise 실행 가능하게 설정](#reduce%EB%A5%BC-promise-%EC%8B%A4%ED%96%89-%EA%B0%80%EB%8A%A5%ED%95%98%EA%B2%8C-%EC%84%A4%EC%A0%95)
    - [go의 첫 인자가 Promise를 받을 수 있게 설정](#go%EC%9D%98-%EC%B2%AB-%EC%9D%B8%EC%9E%90%EA%B0%80-promise%EB%A5%BC-%EB%B0%9B%EC%9D%84-%EC%88%98-%EC%9E%88%EA%B2%8C-%EC%84%A4%EC%A0%95)
    - [go에 reject가 포함된 경우](#go%EC%97%90-reject%EA%B0%80-%ED%8F%AC%ED%95%A8%EB%90%9C-%EA%B2%BD%EC%9A%B0)
  - [Promise.then의 중요한 규칙](#promisethen%EC%9D%98-%EC%A4%91%EC%9A%94%ED%95%9C-%EA%B7%9C%EC%B9%99)

## Promise

> callback을 통한 비동기 처리

```js
const log = console.log;
function add10(a, callback) {
	setTimeout(() => {
		callback(a + 10);
	}, 100);
}

add10(5, (res) => {
	log(res);
});
```

> Promise 사용

- return이 상징적인 의미를 가지고 있음
- ┣

```js
function add20(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a + 20)), 100);
}
```

> call back 지옥

```js
add10(5, (res) => {
	add10(res, (res) => {
		add10(res, (res) => {
			log(res);
		});
	});
});
```

> .then을 사용하면 좀 더 직관적

```js
add20(5).then(add20).then(add20).then(log);
```

## 비동기를 값으로 만드는 Promise

- `중요한 점`은
- ┣ `어떻게 결과를 꺼내오는 것이 아닌`
- ┣ `특별하게 callback과 다른 점` :
- ┣ `then 메서드`로 꺼내오는 것이 아닌
- ┗ `일급 값으로 비동기를 처리` 하는 것

- `Promise return`
- ┣ 1. 대기
- ┣ 2. 성공
- ┗ 3. 실패

- `코드나 context로 다루는게 아니라`
- ┣ `값`으로 다루는 것이 가장 중요함
- ┗ 이 점을 기억하는 것이 가장 중요

```js
// 코드로만 값으로 다룸
add10(5, (res) => {
	add10(res, (res) => {
		add10(res, (res) => {
			log(res);
		});
	});
});
// 값으로 다룸
function add20(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a + 20)), 100);
}
```

- `callback` : `context만 남아있음`
- ┣ `Promise는 Promise를 return` 하기 때문에
- ┣ 이후에 `원하는 작업을 해나갈 수 있음`
- ┣ `비동기 상황이 값으로써 다뤄짐`
- ┣ 이는 `일급 이라는 의미`
- ┣ 이는 변수에 `1. 할당`, `2. 함수 전달`
- ┗ `뒤에 행동을 이어나갈 수 있음`

> Promise return은 일급

## 값으로서의 Promise 활용

```js
const go1 = (a, f) => f(a);
const add5 = (a) => a + 5;
// Promise가 아닌 일반 값이
// 들어와야 함수가 제대로 작동함
log(go1(10, add5));

log(go1(Promise.resolve(10), add5));
```

> 해결 instanceof로 Promise인지 확인

- 다형성을 지원 하도록 사용

```js
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = (a) => a + 5;

const delay100 = (a) =>
	new Promise((resolve) => setTimeout(() => resolve(a), 100));

var r2 = go1(delay100(10), add5);

r2.then(log);
log(go1(go1(n2, add5), log));
```

## 함수 합성 관점에서의 Promise와 모나드

- `비동기 값`을 가지고
- ┣ `연속적인 함수 실행`을
- ┣ `안전하게 하기 위한 도구`
- ┗ 모나드

- 모나드
- ┗ `함수 합성이 필요`

```js
// f, g
// f(g(x))
```

- 비동기 합성을 안전하게 하는 것이
- ┗ Promise라고 할 수 있음

- `모나드라는 객체`는
- ┣ JS에 존재하지는 않음
- ┣ 하지만 `Array, Promise를 통해`
- ┣ 모나드를 알 수 있고
- ┣ `함수 합성의 안정성을 보장`을 한다는
- ┗ 것을 알 수 있음

- `모나드는 박스`
- ┣ `박스 안에 값`이 들어있고
- ┣ `박스에 들어 있는 메서드`를 가지고
- ┗ `함수 합성을 함`

```js
const g = (a) => a + 1;
const f = (a) => a * a;

log(f(g(1))); // 유의미한 값
log(f(g())); // 잘못된 값이지만 일어남
```

> 안전한 합성이라고 볼 수 없음

    동작할 수 있는
    ┣ 인자만 들어오는 것을
    ┗ 목표로 하고 있음

```js
[1]
	.map(g)
	.map(f)
	.forEach((r) => log(r)); // 모나드 박스
```

- 여기서 Array는 필요한 값이 아님
- ┣ 사용자 화면에 노출되는 필요한 의미가 아님
- ┣ Html에 Array를 출력하는 일은 없음
- ┣ `컨테이너에 들어있는 값이`
- ┗ `필요한 의미임`

> 그럼 이것의 이점이 뭐냐

```js
Array.of(1)
	.map(g)
	.map(f)
	.forEach((r) => log(r));
```

- `forEach 함수 자체가 실행이 안됨`
- ┣ `박스 안의 효과가 있는지 없는지에 따라서`
- ┣ 함수 합성을 안전하게 진행하고 있음
- ┣ `빈 값이 들어와도 안정장치`가 있음
- ┗ 효과가 일어나지 않음

> 그럼 Promise는 어떤 함수 합성을 목표

- 비동기 상황을 안전하게 처리 하게함
- ┣ `대기가 일어났을 때의 상황을`
- ┗ `안전하게 처리`하도록 함

```js
Promise.resolve(1).then(g).then(f);
```

- 모나드에 대한 개념을 가장 중요하게
- ┣ 생각해야 하는 것이 아닌
- ┣ `함수들을 안전하게 실행`하고
- ┗ `값을 가지고 어떠한 효과`를 만들어 내기 위함

- Promise는
- ┣ 비동기 상황 얼마만큼의 delay가 필요한 상황에서도
- ┣ `함수를 적절한 시점에 평가`해서
- ┗ `합성 시키기 위한 도구`로 `모나드`를 이해

## Kleisli Composition 관점에서의 Promise

- Promise는 `Kleisli Composition`을 지원
- ┣ `오류가 있는 상황`에서의
- ┣ 수학적 : 안정성을 보장
- ┣ 현대 프로그래밍 :
- ┣ 1. `상태`, 2. `효과`, 3. `외부상황`
- ┗ `함수 합성이 오류가 날 수 있음`

- `정확한 인자가 들어오지 않더라도 오류가 나지 않게`
- ┣ 수학적으로 만들어주는 것이
- ┗ `Kleisli Composition`

```js
// f, g
// f(g(x)) = f(g(x))
// x가 같다면 언제나 결과는 같음

// 하지만 실무에서는 다를 수 있음

// f(g(x)) = g(x)
// 이를 같게 만들도록 설정
// f가 오류가 나더라도 동일하게 처리
const f1 = ({ name }) => name;
const g1 = getUserById;

const fg = (id) => f1(g1(id));
log(fg(2) == fg(2));
```

- 하지만 `실제 코딩`에서는
- ┣ users.pop();
- ┣ users.pop();
- ┣ 두 번이 일어나서
- ┗ 달라지는 경우가 있음

> 예외처리를 Promise.reject를 통해 해줌

```js
const getUserById = (id) =>
	find((u) => u.id == id, users) || Promise.reject('없어요!');
```

- `엉뚱한 결과를 받아들이지 않고`
- ┣ log 또한 출력되지 않도록 함
- ┣ `합성된 함수를 실행 시키더라도`
- ┗ `정상적으로 동작함`

```js
const getUserById = (id) =>
	find((u) => u.id == id, users) || Promise.reject('없어요!');

const f1 = ({ name }) => name;
const g1 = getUserById;

const fg = (id) => f1(g1(id));
console.clear();
log(fg(2) == fg(2));

const fg2 = (id) =>
	Promise.resolve(id)
		.then(g1)
		.then(f1)
		.catch((a) => a);

users.pop();
users.pop();

fg2(2).then(log); // 없어요!
```

## go, pipe, reduce에서 비동기 제어

```js
go(
	1,
	(a) => a + 10,
	(a) => Promise.resolve(a + 100),
	(a) => a + 1000,
	log
);
```

> go, pipe

```js
const go = (...args) => reduce((a, f) => f(a), args);
```

> reduce 살펴보기

- 아래를 Promise를 return 하도록 해야함
-

```js
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

- 간단하게 이렇게만 해줘도 해결가능
- ┗ `그러나 완벽한 코드는 아님`

> 한 번이라도 Promise를 만나면
> 연속적인 Promise 체인이 생김

    성능저하가 있음

```js
while (!(cur = iter.next()).done) {
	const a = cur.value;
	acc = acc instanceof Promise ? acc.then((acc) => f(acc, a)) : f(acc, a);
}
```

### reduce를 Promise 실행 가능하게 설정

> 즉시 실행하면서 이름을 갖는 유명 함수 사용

```js
const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}
	return (function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			acc = f(acc, a);
			if (acc instanceof Promise) return acc.then(recur);
		}
		return acc;
	})(acc);
});
```

### go의 첫 인자가 Promise를 받을 수 있게 설정

- `go1 함수`를 만들어서
- ┗ 첫 인자가 `Promise면 then으로 풀어서 전달`

```js
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

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
	})(acc);
});
```

### go에 reject가 포함된 경우

- 다음 로직이 실행이 안되도록 설정

```js
go(
	1,
	(a) => a + 10,
	(a) => Promise.reject('error~~'),
    a => console.log('---')
	(a) => a + 1000,
	log
).catch((a) => console.log(a));
// error~~
```

- `go, pipe, reduce`
- ┣ 중간에 Promise를 만났을 때
- ┣ 안전하게 처리
- ┣ then의 연속적인 실행이 아닌
- ┣ `callback 지옥 해결이 아닌`
- ┣ 값을 가지고
- ┣ 1. `내가 원하는 로직` 사용
- ┣ 2. `원하는 시점에 원하는 방식`으로
- ┗ `실행하는 고차함수를 사용이 가능해짐`

## Promise.then의 중요한 규칙

- `Promise.then`이 반드시
- ┗ `Promise가 아닐 수 있음`

```js
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(function (a) {
	log(a);
});
```

- `중첩된 Promise`
- ┣ `한번의 then으로 꺼내볼 수 있음`
- ┣ JS에서 개발자나 언어와 개발자
- ┗ 소통하는 중요한 법칙임

```js
new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(
	log
);
// 아무리 중첩 되더라도
// 한번에 꺼낼 수 있고
```

- `아무리 중첩` 되더라도
- ┣ 1. `한번에 꺼낼 수 있고`
- ┣ 2. `아무리 깊은 Promise` 더라도
- ┣ `결과값을 꺼낼 수 있음`
