# 6. 시간을 이터러블로 다루기

## 목차

- [6. 시간을 이터러블로 다루기](#6-%EC%8B%9C%EA%B0%84%EC%9D%84-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94%EB%A1%9C-%EB%8B%A4%EB%A3%A8%EA%B8%B0)
  - [range와 take의 재해석](#range%EC%99%80-take%EC%9D%98-%EC%9E%AC%ED%95%B4%EC%84%9D)
  - [takeWhile takeUntil](#takewhile-takeuntil)
  - [자동차 경주 이터러블로 바라보기](#%EC%9E%90%EB%8F%99%EC%B0%A8-%EA%B2%BD%EC%A3%BC-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94%EB%A1%9C-%EB%B0%94%EB%9D%BC%EB%B3%B4%EA%B8%B0)
  - [아임포트 결제 누락 처리 스케쥴러 - API 설명](#%EC%95%84%EC%9E%84%ED%8F%AC%ED%8A%B8-%EA%B2%B0%EC%A0%9C-%EB%88%84%EB%9D%BD-%EC%B2%98%EB%A6%AC-%EC%8A%A4%EC%BC%80%EC%A5%B4%EB%9F%AC---api-%EC%84%A4%EB%AA%85)
    - [결제된 내역 가져오기](#%EA%B2%B0%EC%A0%9C%EB%90%9C-%EB%82%B4%EC%97%AD-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)
    - [가맹점 DB의 주문서 가져오기](#%EA%B0%80%EB%A7%B9%EC%A0%90-db%EC%9D%98-%EC%A3%BC%EB%AC%B8%EC%84%9C-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)
    - [비교 후 결제 취소 API 실행하기](#%EB%B9%84%EA%B5%90-%ED%9B%84-%EA%B2%B0%EC%A0%9C-%EC%B7%A8%EC%86%8C-api-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)
    - [반복 실행 하기](#%EB%B0%98%EB%B3%B5-%EC%8B%A4%ED%96%89-%ED%95%98%EA%B8%B0)

## range와 take의 재해석

- 큰 축 : 최대 10번 까지의 행동을 하겠다는 의미로
- ┣ `L.range` : 0부터 10까지의 배열을 만들 겠다는
- ┣ 단순한 의미로 해석되는 것이 아니라
- ┣ `시점을 정해주는 의미로 생각하는 것이 좋음`
- ┣ 중간에 `최적화 시점에 종료를 한다고 생각`
- ┣ `지연 평가`의 경우 :
- ┣ `세로로 평가 된다는 점을 기억`

```js
_.go(
	_.range(10), // 0부터 9까지의 배열
	_.take(3), // 앞에서 세개만 자르기
	console.log
);

_.go(
	L.range(10), // 0부터 9까지의 이터러블
	// 최대 10번 일어날 일
	L.map(_.delay(1000)),
	L.take(3), // 최대 3개의 값이 필요
	_.each(console.log)
);
```

> `_.delay`

```js
_.delay(2000).then(console.log);
// 커링이 적용
var f = _.delay(2000);
f('A').then(console.log);
```

> 이를 다르게 볼 수 있음

    어떤 일에 대한
    ┣ 큰 줄기로 봤을 때
    ┣ 최대 10번이 일어나겠다는 의미로
    ┗ range를 생각하면 좋음

- 코드를 다른 시각으로 보면
- ┣ 이터러블 프로그래밍을 더
- ┗ 자유롭게 구현이 가능 함

> 시간을 배열로 다루기

- 시간을 배열로 바라볼 수 있게됨
- ┣ 추후에 일어날 `일들을`
- ┗ 이터러블로 바라보게 됨

```js
_.go(
	L.range(10), // 0부터 9까지의 배열
	L.map((n) => _.delay(500 * n, n)),
	L.filter((a) => a % 2),
	L.take(3), // 앞에서 세개만 자르기
	_.each(console.log)
);

_.go(
	L.range(10), // 0부터 9까지의 배열
	L.map(_.delay(1000)),
	L.filter((a) => a % 2),
	L.map((_) => new Date()),
	L.take(3), // 앞에서 세개만 자르기
	_.each(console.log)
);
```

> 시간 데이터 만들기

```js
// 동기적 실행
_.go(
	L.range(10), // 0부터 9까지의 배열
	L.map(_.delay(1000)),
	L.filter((a) => a % 2),
	L.map((_) => new Date()),
	L.take(3), // 앞에서 세개만 자르기
	_.each(console.log)
);
// 스케쥴러 처럼 동작
// 앞에서 일어난 일 들을 다 모아서
// 한번에 실행할 수 있음
_.go(
	L.range(10), // 0부터 9까지의 배열
	L.map(_.delay(1000)),
	L.filter((a) => a % 2),
	L.map((_) => new Date()),
	_.take(3), // 앞에서 세개만 자르기
	_.each(console.log)
);
```

- if, for, while을 대체하는
- ┣ 언어로써 함수형 프로그래밍을
- ┣ 바라볼 수 있다는게 가장 큰 이점

## takeWhile takeUntil

- take : 숫자를 통해서 일어날 일들을
- ┣ 제약 하는 함수라면
- ┣ takeWhile, takeUntil : 동적으로
- ┣ 이를 제어 할 수 있는 헬퍼 함수

> takeWhile

    while을 쓰는 것과 같음
    ┣ truthy한 값만 담음

```js
_.go(
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0],
	_.takeWhile((a) => a),
	_.each(console.log)
);
```

> takeUntil

    처음으로 true를 만날 때 까지
    ┣ 담음

```js
_.go(
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0],
	_.takeUntil((a) => !a),
	_.each(console.log)
);
```

## 자동차 경주 이터러블로 바라보기

```js
_.go(
	L.range(Infinity),
	L.map((i) => track[i]),
	// 구조 분해 해서 할당 하는것
	L.takeWhile(({ length : l} }) => l == 4),
	_.each(console.log)
);
```

> 4명 이하가 되는 부분에서 종료

```js
_.go(
	L.range(Infinity),
	L.map((i) => track[i]),
	L.map(({ cars }) => cars),
	L.map(_.delay(1000)),
	L.takeUntil(({ length: l }) => l < 4),
	L.flat,
	L.map((car) => `${car} 출발`),
	_.each(console.log)
);
```

> 4명만 출발

```js
_.go(
	L.range(Infinity),
	L.map((i) => track[i]),
	L.map(({ cars }) => cars),
	L.map(_.delay(1000)),
	L.takeWhile(({ length: l }) => l == 4),
	L.flat,
	L.map((car) => `${car} 출발`),
	_.each(console.log)
);
```

## 아임포트 결제 누락 처리 스케쥴러 - API 설명

- 결제 누락에 대한
- ┗ 싱크를 맞춰주는 스케쥴러를 생성

### 결제된 내역 가져오기

- 스케쥴러 생성

> 있을 때 까지 받아오기

- 지금은 비효율적인 코드임
- ┣ 3번의 콜만 이루어져도 문제가 없는데
- ┗ 4번의 콜이 이루어지고 있음

```js
async function job() {
	const payments = _.go(
		L.range(1, Infinity), // 언제까지 할지 모름
		L.map(Impt.getPayments),
		L.takeWhile(({ length }) => length),
		_.each(console.log)
	);
}
```

> 한번에 모든것을 평탄화 시켜서 받아오기

```js
async function job() {
	const payments = _.go(
		L.range(1, Infinity), // 언제까지 할지 모름
		L.map(Impt.getPayments),
		L.takeUntil(({ length }) => length < 3),
		_.flat,
		console.log
	);
}
// result
[
	{ imp_id: 11, order_id: 1, amount: 15000 },
	{ imp_id: 12, order_id: 2, amount: 25000 },
	{ imp_id: 13, order_id: 3, amount: 10000 },
	{ imp_id: 14, order_id: 4, amount: 25000 },
	{ imp_id: 15, order_id: 5, amount: 45000 },
	{ imp_id: 16, order_id: 6, amount: 15000 },
	{ imp_id: 17, order_id: 1, amount: 20000 },
	{ imp_id: 18, order_id: 2, amount: 30000 }
];
```

> async await을 사용해서 받아오기

```js
async function job() {
	// 결제된 결제모듈측 payments 가져옴
	// page 단위로 가져오는데, 내용이 있을 때 까지
	// 가져와서 하나로 합침
	const payments = _.go(
		L.range(1, Infinity), // 언제까지 할지 모름
		L.map(Impt.getPayments),
		L.takeUntil(({ length }) => length < 3),
		_.flat
	);

	console.log(await payments);
}
job();
```

### 가맹점 DB의 주문서 가져오기

- 위에서 만든 payment를 통해
- ┣ 결제가 된 것으로 보이는
- ┣ 것을 뽑아오려고 함
- ┗ 모든 order_id 들로 통해서

> order_id 뽑아오기

```js
const orderIds = await _.go(
	payments,
	_.map((p) => p.order_id),
	console.log
);
```

> id만 구조분해 해서 뽑아오기

```js
const orderIds = await _.go(
	payments,
	_.map((p) => p.order_id),
	DB.getOrders,
	_.map(({ id }) => id),
	console.log
);
```

### 비교 후 결제 취소 API 실행하기

```js
// 결제모듈의 payments와 가맹점의 주문서를 비교해서
// 결제를 취소해야할 id들을 뽑아서
// 결제 취소 api를 실행
await _.go(
	payments,
	L.reject((p) => orderIds.includes(p.order_id)),
	L.map((p) => p.imp_id),
	L.map(Impt.cancelPayment),
	_.each(console.log) // 출력
);
```

### 반복 실행 하기

- 계속 실행해서 좋지 않다고 판단되면
- ┗ 다른 로직으로 바꿀 수 있음

```js
// 5초에 한번만 한다.
// 그런데 만일 job 자체가 5초보다 더 걸리면
// job이 끝날 때까지 다 기다리고
// 아니면 5초에 한번씩 실행
(function recur() {
	job().then(recur);
})();
```

- 이를 기본 프로그래밍으로 생각 한다면
- ┣ 매우 어렵게 생각이 듬
- ┣ 하지만 함수형 프로그래밍 관점에서 본다면
- ┣ 매우 쉽게 해결이 가능함

```js
(function recur() {
	Promise.all([_.delay(7000, undefined), job()]).then(recur);
})();
```

- if나 분기문 상태변수에 대한
- ┣ 생각을 할 필요가 없어짐
- ┣ 고로 이를 함수형 프로그래밍으로
- ┣ 작성하게 된다면
- ┣ `테스트 케이스 작성`이나
- ┗ 이에 대한 `고민을 할 필요성이 줄어듬`
