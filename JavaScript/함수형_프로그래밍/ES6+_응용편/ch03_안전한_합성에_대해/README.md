# 3. 안전한 합성에 대해

## 목차

- [3. 안전한 합성에 대해](#3-안전한-합성에-대해)
  - [목차](#목차)
  - [map으로 합성하기](#map으로-합성하기)
  - [find 대신 `L.filter` 써보기](#find-대신-lfilter-써보기)

## map으로 합성하기

- 아래의 예제를 예로 들 때
- ┣ 어떻게 실행해야 오류가 안생기고
- ┣ 어떤 상황에서는 문제 없이 실행 해야
- ┣ 하는 이야기

```js
const f = (x) => x + 10;
const g = (x) => x - 5;
const fg = (x) => f(g(x));
// Error
console.log(fg());
// Good
console.log(fg(10));
```

> 구현법

```js
_.go([], _.map(fg), _.each(console.log));
```

- map을 이용해서 작성함
- ┣ 간단한 모나드의 형태를 띈다고 볼 수 있음

## find 대신 `L.filter` 써보기

- 다음과 같은 코드에서
- ┣ DD 같은걸 찾게 되면
- ┣ undefined가 출력되게 됨
-

```js
const users = [
	{ name: 'AA', age: 35 },
	{ name: 'BB', age: 26 },
	{ name: 'CC', age: 28 },
	{ name: 'CC', age: 34 },
	{ name: 'EE', age: 23 }
];

const user = _.find((u) => u.name == 'BB', users);
console.log(user);
```

> 안전 장치

```js
if (user) console.log(user);
```

> 이런 코드보다 좀 더 우아하게 작성

```js
_.go(
	users,
	L.filter((u) => u.name == 'CC'),
	L.map((u) => u.age),
	L.take(1),
	_.each(console.log)
);
```

- `find는 데이터를 깨서 결과를 만들어내지만`
- ┣ 1. `L.filter를 사용`하면서
- ┣ 2. `take`를 사용하게 되면
- ┗ `find와 동일한 시간 복잡도를 가지게 됨`

- 배열에 대해서 바라보게 해서
- ┣ 오류가 생겨도 터지지 않도록 설정하는 것이
- ┣ 이 함수형 프로그래밍의 또는 모나드의 목적이 됨

> 배열로 만들어서 사용하는 것이 특징점임
