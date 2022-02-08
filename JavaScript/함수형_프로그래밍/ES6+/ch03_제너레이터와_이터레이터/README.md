# ch03 제너레이터와 이터레이터

## 목차

- [ch03 제너레이터와 이터레이터](#ch03-제너레이터와-이터레이터)
  - [목차](#목차)
  - [제너레이터](#제너레이터)
  - [odds](#odds)
  - [for of, 전개 연산자, 구조 분해, 나머지 연산자](#for-of-전개-연산자-구조-분해-나머지-연산자)

## 제너레이터

- `제너레이터` :
- ┗ `이터레이터`이자 `이터러블을 생성`하는 함수

- 제너레이터를 통해
- ┣ 1. `이터레이터를 쉽게 생성이 가능`
- ┣ 2. `문장으로 표현`이 가능함
- ┣ 어떠한 값도 `순회할 수 있는 이터러블`로 생성이 가능함
- ┗ `이는 매우 의미가 큼`

```js
function* gen() {
	yield 1;
	if (false) yield 2;
	yield 3;
    return 100; // done이 true가 되며 return을 할 수 있음
    // 마지막 done에만 의미가 존재
}

let iter = gen();
log(iter([Symbol.iterator]() === iter);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of gen()) log(a);
```

## odds

- 홀수만 return

```js
// 아래를 자동화
function* odds() {
	yield 1;
	yield 3;
	yield 5;
}
let iter2 = odds();
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
```

> 문장을 통해 구현

```js
function* odds(l) {
	for (let i = 0; i < l; i++) {
		if (i % 2) yield i; // 문장을 통해 제어가 가능
	}
}
let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
```

> 더 다양하게

    다음과 같이 제너레이터로 만들어진
    ┣ 이터레이터를 다른 제너레이터의
    ┗ 평가 조건으로 사용이 가능함

```js
function* infinity(i = 0) {
	while (true) yield i++;
}
function* limit(l, iter) {
	for (const a of iter) {
		yield a;
		if (a == l) return;
	}
}
function* odds(l) {
	for (const a of limit(l, infinity(1))) {
		if (a % 2) yield i;
	}
}
let iter3 = infinity();
log(iter3.next());
let iter4 = limit(4, [1, 2, 3, 4, 5, 6]);
iter4.next();
iter4.next();
iter4.next();
iter4.next();
iter4.next();

for (const a of odds(40)) log(a);
```

## for of, 전개 연산자, 구조 분해, 나머지 연산자

> 다양한 곳에서 사용이 가능함ㄴ

```js
log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);
const [a, b, ...rest] = odds(9);
log(a);
log(b);
log(rest);
```
