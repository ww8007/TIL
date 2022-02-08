# ch02 순회와 이터러블 : 이터레이블 프로토콜

- `함수형 프로그래밍`에서 `list 순회` :
- ┣ `중요한 요소` 중 하나
- ┗ `ES6`가 되면서 list 순회가 많이 바뀜

## 기존과 달라진 ES6에서의 리스트 순회

- `length` 라는 `프로퍼티`에 의존
- ┣ `숫자`라는 `key`로 순회를 하였음

```js
const list = [1, 2, 3, 4];
for (var i = 0; i < list.length; i++) {
	log(list[i]);
}
```

- 유사배열 또한 같음

```js
const str = 'abc';
for (var i = 0; i < str.length; i++) {
	log(str[i]);
}
```

## ES6에서 바뀜

- `복잡한 for 문`을 `간결하게 만든 것` 이외에
- ┗ `더 의미적인 부분이 존재함`

```js
for (const a of list) {
	log(a);
}

for (const a of str) {
	log(a);
}
```

## Array, Set, Map을 통해 알아보는 이터러블

### for 문을 통한 Array, Set, Map 순회하기

- 기존의 `for문에 i라는 key로 접근해서`
- ┣ 사용하는 방식으로 구현되는 것은 아님
- ┣ `for of 문`이 `다음과 같이 생기지 않음`
- ┗ `key, value 쌍`으로 추상화 된 것이 아님

- `Symbol.iterator`
- ┣ 객체의 key로 사용이 가능함
- ┣ `arr[Symbol.iterator] = null`
- ┗ 위와 같이 `설정하면 접근이 불가함`

```js
const arr = [1, 2, 3];
for (const a of arr) = log(a);

// Set
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

// Map
const map = new Map(['a', 1], ['b', 2], ['c', 3]);
for (const a of map) log(a);
```

### 이터러블 / 이터레이터 프로토콜

- `Array, Set, Map` :
- ┣ JS의 내장 객체로서
- ┣ `이터러블` : `이터레이터`를 리턴하는
- ┣ `[Symbol.iterator]()를 가지는 값`
- ┣ `이터레이터` : `{value, done} 객체`를 리턴하는
- ┣ `next()`를 가지는 값

- `이터러블 / 이터레이터 프로토콜`
- ┣ 이터러블을
- ┣ 1. `for ... of`
- ┗ 2. `전개 연산자` 등과 함께 동작하도록한 규약

> Array

    Array는 이터러블이고
    ┣ Symbol.iterator를 리턴하기 때문에
    ┣ 이터러블 / 이터레이블 프로토콜

- 좀 더 쉬운 이해

```js
const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator()];
iter1.next();
iter1.next();
iter1.next();
for (const a of iter1) log(a);
// 안에 value로 이루어지는 값을
// 계속 return 해주는 것
// arr : Symbol.iterator를 실행한 iterator를
// 계속해서 순회하면서 value로 떨어지는 값을 순회
```

> 결론

    `Symbol.iterator`를 실행한 `iterator`를
    ┣ 게속 순회하면서 value로 떨어지는
    ┗ 값들을 순회 한다고 볼 수 있음

- for ... of 문이 내부적으로

- `Map.keys()`
- ┣ key만 뽑아낼 수 있음
- ┣ `values()`
- ┣ `entries()`
- ┣ 두개 더 존재

```js
const map = new Map([['a', 1, ['b', 2], ['c', 3]]]);
var it = map.values();
var it2 = it[Symbol.iterator];
// 위는 자기 자신을 return 함
it2.next(); // {value : 1, done: false}
it2.next(); // {value : 2, done: false}
it2.next(); // {value : 3, done: false}
```

### 사용자 정의 이터러블

- iterable의 경우
- ┣ 1. `[Symbol.iterator]`를 `메서드`로 가지고
- ┣ 2. 메서드가 `next`로 `{value, done}을 return` 해야 함

```js
const iterable = {
	[Symbol.iterator]() {
		let i = 3;
		return {
			next() {
				return i == 0 ? { done: true } : { value: i--, done: false };
			},
		};
	},
};
let iterator = iterable[Symbol.iterator]();
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());
for (const a of iterable) log(a);
```

- 하지만 이것만을 가지고는
- ┣ `iterator`의 모든 속성을 구현한 것은 아님
- ┗ `위는 자기 자신을 return 해주지 않음`

```js
const arr2 = [1, 2, 3];
let ier2 = arr2[Symbol.iterator]();
iter2.next();
log(iter2[Symbol.iterator]() == iter2); // true
for (const a of arr2) log(a);
```

> 해결법

```js
const iterable = {
	[Symbol.iterator]() {
		let i = 3;
		return {
			next() {
				return i == 0 ? { done: true } : { value: i--, done: false };
			},
			// 아래 구문을 추가 시켜줘야 함
			[Symbol.iterator]() {
				return this;
			},
		};
	},
};
```

> 이는 여러 곳에서 사용이 가능함

    document 순회 가능
    ┣ 이는 Array 이여서가 아닌
    ┣ 이터러블로 구성되어 다음과 같이
    ┗ 사용이 가능해짐

```js
for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');
log(all[Symbol.iterator]);
let iter3 = all[Symbol.iterator]();
log(iter3.next());
log(iter3.next());
log(iter3.next());
```

## 전개 연산자

```js
const a = [1, 2];
log([...a, ...[3, 4]]); // [1, 2, 3, 4]
a[Symbol.iterator] = null;
log([...a, ...[3, 4]]); // Error
log([...a, ...set, ...map.keys()]);
```
