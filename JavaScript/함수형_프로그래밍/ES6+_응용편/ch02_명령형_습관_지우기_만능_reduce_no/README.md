# 02 명령형 습관 지우기

## 목차

- [02 명령형 습관 지우기](#02-명령형-습관-지우기)
  - [목차](#목차)
  - [reduce 복잡한 함수](#reduce-복잡한-함수)
  - [reduce 하나 보다 map + filter + reduce](#reduce-하나-보다-map--filter--reduce)
  - [query1, query2](#query1-query2)
  - [query2, query3](#query2-query3)
  - [queryToObject](#querytoobject)

## reduce 복잡한 함수

- reduce는 만능형이 아님

```js
const users = [
	{ name: 'AA', age: 35 },
	{ name: 'BB', age: 26 },
	{ name: 'CC', age: 28 },
	{ name: 'DD', age: 34 },
	{ name: 'EE', age: 23 }
];

console.log(_.reduce((total, u) => total + u.age, 0, users));
```

- 위의 코드는 시작값을 가지고 있음
- ┣ 숫자만 들어있는 reduce를 사용할 경우
- ┣ 시작값을 없앨 수 있음
- ┣ reduce에 들어갈 iter를
- ┣ 형을 맞춰주는게 좋음

```js
const add = (a, b) => a + b;

console.log(
	_.reduce(
		add,
		L.map((u) => u.age, users)
	)
);
```

> 한 끝 차이지만 코드가 간결해짐

    형이 같은 인자가 두개가 들어오면
    ┣ 쉬운 코드 작성이 가능해짐

- 더 간단하게

```js
const add = (a, b) => a + b;
const ages = L.map((u) => u.age);
console.log(_.reduce(add, ages(users)));
```

- reduce 하나로 간단한 코드를 만드는 것 보다
- ┣ `map : 하나의 형으로 축약`
- ┣ `reduce, 간단한 함수를 조합`해서
- ┣ `간결하고 쉽고 재사용성이 높은 함수`를 만드는 것이 중요

## reduce 하나 보다 map + filter + reduce

> 흔히 하는 명령형 작성

```js
console.log(
	_.reduce((total, u) => {
		if (u.age >= 30) return total;
		return total + u.age;
	})
);
```

- 여기서 삼항 연산자를 사용해서
- ┣ 리팩터링을 하더라도
- ┣ 이에 대한 효율성이나 간결함은 기대 불가

```js
// 지연 평가 조합성
console.log(
	_.reduce(
		add,
		L.filter(
			(n) => n < 30,
			L.map((u) => u.age, users)
		)
	)
);
```

## query1, query2

- reduce 안의 보조 함수를 간단하게 쓰는 장점

> 한 눈에 알아보기 힘들어지는 코드가 됨

```js
function query1(obj) {
	let res = '';
	for (const k in obj) {
		const v = obj[k];
		if (v === undefined) continue;

		if (res != '') res += '&';
		res += k + '=' + v;
	}
	return res;
}

console.log(query1(obj1));
```

> reduce를 이용한 작성

    여전히 복잡함

```js
function query2(obj) {
	return Object.entries(obj).reduce((query, [k, v], i) => {
		if (v === undefined) return query;
		return query + (i > 0 ? '&' : '') + k + '=' + v;
	}, '');
}

console.log(query2(obj1));
```

## query2, query3

- 안쓰는 컨벤션에 대해 `_`로 작성

```js
function query3(obj) {
	return _.reduce(
		(a, b) => `${a}&${b}`,
		_.map(
			([k, v]) => `${k}=${v}`,
			_.reject(([_, v]) => v === undefined, Object.entries(obj))
		)
	);
}
```

> curry 적용된 join 사용

```js
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

function query3(obj) {
	return join(
		'&',
		_.map(
			([k, v]) => `${k}=${v}`,
			_.reject(([_, v]) => v === undefined, Object.entries(obj))
		)
	);
}

console.log(query3(obj1));
```

> 함수형 go로 직관적 작성

```js
const query4 = (obj) =>
	_.go(
		obj,
		Object.entries,
		_.reject(([_, v]) => v === undefined),
		_.map(([k, v]) => `${k}=${v}`),
		join('&')
	);

console.log(query4(obj1));
```

## queryToObject

- 이터러블 프로그래밍만으로 해당 코드를 작성

> Object.assign

```js
Object.assign({ a: 1 }, { b: 2 });
/// result
{a : 1, b: 2}

// 다음과 같음
add(10, 5);
```

> 이터러블 프로그래밍

```js
const split = _.curry((sep, str) => str.split(sep));
const queryToObject = _.pipe(
	split('&'),
	_.map(split('=')),
	_.map(([k, v]) => ({ [k]: v })),
	_.reduce(Object.assign)
);
console.clear();
console.log(queryToObject('a=1&c=CC&d=DD'));
```
