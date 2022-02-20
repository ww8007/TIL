# 비동기 3

## async:await

- 비동기를 문장으로 다루기 위해 사용
- ┣ 보다 쉽게 비동기 상황을 제어

> 기본 사용법

```js
function delay(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a), 500));
}

async function f1() {
	const a = await delay(10);
	log(a);
}

f1();
```

- 하지만 async await 문법을 안다고
- ┣ 모든 비동기 상황을 다룰 수 있는 것은 아님
- ┣ 결국에는 Promise를 다룰줄 알아야만
- ┣ Promise를 return 해야만 사용이 가능함

- Promise를 사용하는 lib의 경우
- ┣ async await만 사용해도 되지만
- ┣ 아닌 경우 Promise를 사용해야 함

> 오해

- 아래 코드가 값을 return 한다고
- ┣ 생각할 수 있음
- ┣ 모든 부수 효과를 끝낸다고 할 수 없음
- ┣ 함수 내부 : 동기적 사용 가능
- ┣ 함수 외부 : 처리를 꼭 해줘야만 함

```js
async function f1() {
	const a = await delay(10);
	const b = await delay(5);
	return a + b;
}
```

> 사용

- 결론적으로는
- ┣ Promise가 값으로 떨어지는 것
- ┣ 이를 이해하고 있어야 함

```js
f1().then(log);
go(f1(), log);
(async () => {
	log(await f1());
})();
```

> 결론

    Promise, async, await을
    ┣ 중점적으로 이해하고
    ┣ 사용할 줄 알아야함

## Array.prototype.map이 있는데 왜 FxJS의 map 함수가 필요한지?

```js
function f2() {
	const list = [1, 2, 3, 4];
	const res = list.map((a) => delayI(a * a));
	log(res);
}
f2();
```

- 비동기 제어에 await을 사용 하더라도
- ┣ 사용이 어려움

> async await에 대한 오해

- async 문에서의 풀린 Promise가
- ┣ return 문에 담더라도 풀리지 않음
- ┣ 1. Promise를 풀어서 전달
- ┣ 2. 그대로 전달
- ┣ 이 둘은 같음
- ┣ 고로 Promise를 return 함

```js
async function f2() {
	const list = [1, 2, 3, 4];
	const res = await map((a) => delayI(a * a), list);
	log(res); // [1, 4, 9, 16]
	return res; // Promise {<pending>}
}
```

> 결론

    함수 call에 대한 비동기 제어
    ┣ 기존의 map으로는 제어가 어려움

## async:await으로 비동기 제어가 가능한데 왜 파이프라인이 필요한지?

- 파이프와 체인이 해결하고자 하는 문제와
- ┣ async await이 해결하고자 하는 문제가
- ┣ 서로 다름

> 목적이 다름

- async, await :
- ┣ 표현식으로 국한된
- ┣ Promise에 비해 문장형으로
- ┣ 다루기 위함

- 파이프라인, 체이닝 :
- ┣ 비동기 프로그래밍이 아닌
- ┣ 명령형이 아닌 안전한 함수 합성을 위함
- ┣ 풀어놓기 위함

> 아예 비교 대상이 아니라 목적이 다름

## async:await와 파이프라인을 같이 사용하기도 하는지?

- 맞음

```js
function f52(list) {
	const r1 = await go(
		list,
		L.map((a) => delayI(a * a)),
		L.filter((a) => delayI(a % 2)),
		L.map((a) => delayI(a + 1)),
		C.take(2),
		reduce((a, b) => delayI(a + b))
	);
	const r2 = await go(
		list,
		L.map((a) => delayI(a * a)),
		L.filter((a) => delayI(a % 2)),
		reduce((a, b) => delayI(a + b))
	);
	return r1 + r2;
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8], (a) => log(a, 'f52')));
```

## 동기 상황에서의 에러 핸들링은 어떻게 하는지?

```js
function f7(list) {
	return list
		.map((a) => a + 10)
		.filter((a) => a % 2)
		.slice(0, 2);
}
log(f7(null));
```

- 에러 핸들링은 언어 마다 다름
- ┣ 1. 매개변수 기본값 지정
- ┣ 2.

- 가장 간단, 간편 :
- ┣ 엉망진창의 값인 경우
- ┣ 에러를 뿜거나
- ┣ 비슷하게 흘려보내도록

```js
function f7(list) {
	try {
		return list
			.map((a) => a + 10)
			.filter((a) => a % 2)
			.slice(0, 2);
	} catch (e) {
		log(e);
		return [];
	}
}
log(f7(null));
```

> 만약 함수 안에서 에러가 일어난다면

- try, catch로 에러 핸들링 하기 때문에
- ┣ catch문에서 걸리게 됨

## 비동기 상황에서 에러 핸들링은 어떻게 해야하는지?

```js
function f7(list) {
	try {
		return list
			.map(
				(a) =>
					new Promise((resolve) => {
						aslkdfjlkad;
					})
			)
			.filter((a) => a % 2)
			.slice(0, 2);
	} catch (e) {
		log(e);
		return [];
	}
}
```

> 왜 위 코드가 catch가 안되냐

- 에러 핸들링을 위한 map, filter, slice 함수가
- ┣ 아니기 때문임
- ┣ 고로 함수형 프로그래밍의 map, filter, slice 사용

## 동기/비동기 에러 핸들링에서의 파이프라인의 이점은?

- async 문에서 catch 문에서
- ┣ catch 문으로 걸러 내기 위해서는
- ┣ go 에 await을 담으면 됨

```js
async function f9(list) {
	try {
		return await go(
			list,
			map(
				(a) =>
					new Promise((resolve) => {
						resolve(JSON.parse(a));
					})
			),
			filter((a) => a % 2),
			take(2)
		);
	} catch (e) {
		log(e);
		return [];
	}
}
```
