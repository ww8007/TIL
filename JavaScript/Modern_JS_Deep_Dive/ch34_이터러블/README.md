# 34. 이터러블

## 34.1 이터레이션 프로토콜

- ES6에서 도입된 `이터레이션 프로토콜` :
- ┣ `(iteration protocol)`은
- ┣ `순회 가능한(iterable) 데이터 컬렉션`
- ┣ 자료구조를 만들기 위해서
- ┗ ECMAScript 사양에 정의하여 미리 약속한 규칙임

- ES6 이전의 순회 가능한 데이터 컬렉션
- ┣ 즉 : `배열, 문자열, 유사 배열 객체, DOM 컬렉션`
- ┣ 등의 것 들은 → 통일된 규약 없이 각자 나름의
- ┣ 구조를 가지고
- ┣ 1. `for 문`
- ┣ 2. `for...in 문`
- ┗ 3. `forEach 메서드` 등 다양한 메서드로 순회 가능

- 고로 ES6에서 순회 가능한 데이터 컬렉션을
- ┣ 이터레이션 프로토콜을 준수하는
- ┣ `이터러블로 통일`하여
- ┣ 1. `for...of 문`
- ┣ 2. `스프레드 문법`
- ┣ 3. `배열 디스트럭처링 할당`
- ┗ 사용 하도록 일원화 했음

- 이터레이션 프로토콜
- ┣ 1. `이터러블 프로토콜`
- ┗ 2. `이터레이터 프로토콜 존재`

### 이터러블 프로토콜(iterable protocol)

- Well-Known Symbol인 Symbol.iterator를
- ┣ 1. `프로퍼티 키로 사용한 메서드를 직접 구현하거나`
- ┣ 2. 프로토타입 체인을 통해 상속받은
- ┣ `Symbol.iterator 메서드를 호출`하면
- ┣ `이터레이터 프로토콜을 준수한 이터레이터를 반환함`
- ┣ 이러한 규약 → 이터러블 프로토콜이라고 하면
- ┗ `이러터블 프로토콜 준수한 객체` : `이터러블`

- 이터러블 : for...of문 으로 순회 가능하며
- ┗ 스프레드, 배열 디스트럭처링 대상으로 사용 가능

### 이터레이터 프로토콜(iterator protocol)

- 이터러블의 Symbol.iterator 메서드를 호출하면
- ┣ 이터레이터 프로토콜을 준수한
- ┗ 이터레이터를 반환함

- ┣ 이터레이터 : next 메서드를 소유하며
- ┣ `next 메서드를 호출하면 이터러블을 순회하며`
- ┣ `value, done 프로퍼티를 갖는`
- ┣ `이터레이터 result 객체를 반환함`
- ┣ 이러한 규약 : `이터레이터 프로토콜`
- ┗ 이터레이터 프로토콜 준수한 객체 : `이터레이터`

### 34.1.1 이터러블

- 이터러블 프로토콜을 준수한 객체 :
- ┣ 이터러블이라고 부름
- ┣ 즉 : 1. 이터러블은 `Symbol.iterator를`
- ┣ `프로퍼티 키로 사용한 메서드 직접 구현`
- ┗ 2. `프로토타입 체인을 통해 상속받은 객체`

> 이터러블인지 확인하는 함수

```js
const isIterable = (v) =>
	v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블인
isIterable([]); // true
isIterable(''); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
isIterable({}); // false
```

- EX ) 배열 :
- ┣ `Array.prototype의`
- ┣ `Symbol.iterator 메서드를 상속받는 이터러블임`
- ┣ 이터러블 : `for...of 문으로 순회가 가능하며`
- ┣ 스프레드 문법, 배열 디스트럭처링 할당의 대상
- ┗ 사용이 가능함

```js
const array = [1, 2, 3];

// 배열은 Array.prototype의 Symbol.iterator 메서드를
// 상속받은 이터러블임
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능
for (const item of array) {
	console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로
// 사용이 가능함
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의
// 대상으로 사용이 가능함
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]
```

- `Symbol.iterator 메서드를 직접 구현하지 않거나`
- ┣ 상속받지 않는 → `일반 객체의 경우`
- ┣ 이터러블 프로토콜을 준수한 이터러블이 아님
- ┗ 따라서 : 일반 객체 → `for...of 문으로 순회 불가`

> 당연하게 스프레드, 배열 디스트럭처링 사용 불가

```js
const obj = { a: 1, b: 2 };

// 일반 객체 : Symbol.iterator 메서드를 구현하거나
// 상속받지 않음
// 따라서 일반 객체는 이터러블 프로토콜을 준수한
// 이터러블이 아님
console.log(Symbol.iterator in obj); // false
```

- 단 : 21년 1월 TC39 프로세스의
- ┣ stage 4(Finished) 단계에 제안되어 있는 스프레드
- ┣ `프로퍼티 제안은 일반 객체에 스프레드 문법의`
- ┗ `사용을 허용함`

```js
const obj = { a: 1, b: 2 };

// 스프레드 프로퍼티 제안(stage 4)은
// 객체 리터럴 내부에서 스프레드 문법 사용 허용
console.log({ ...obj }); // {a : 1, b: 2}
```

- 하지마 일반 객체의 경우도
- ┣ 이터러블 프로토콜을 준수하도록
- ┣ 구현을 한다면 → 이터러블이 됨
- ┗ 이에 대해서는 34.6 에서 학습

### 34.1.2 이터레이터

- 이터러블의 `Symbol.iterator 메서드를 호출하면`
- ┣ 이터레이터 프로토콜을 준수한 `이터레이터를 반환함`
- ┣ 이터러블의 `Symbol.iterator 메서드가 반환한 `
- ┗ 이터레이터의 경우 → `next 메서드를 가짐`

```js
// 배열 : 이터러블 프로토콜을 준수한 이터러블임
const array = [1, 2, 3];

// Symbol.iterator 메서드 : 이터레이터를 반환함
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터
// next 메서드를 가짐
console.log('next' in iterator); // true
```

- 이터레이터의 next 메서드 :
- ┣ 이터러블의 각 요소를 순회하기 위한
- ┣ 포인터의 역할을 함
- ┣ 즉 : `next 메서드를 호출`하면
- ┣ 이터러블은 순차적으로 `한 단계씩 순회하며`
- ┣ `순회 결과를 나타내는`
- ┣ `이터레이터 result 객체를 반환함`
- ┗ `(iterator result object)`

```js
// 배열 : 이터러블 프로토콜을 준수한 이터러블임
const array = [1, 2, 3];

// Symbol.iterator 메서드 : 이터레이터를 반환함
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면
// 이터러블을 순회하며 순회 결과를 나타내는
// 이터레이터 result 객체를 반환함
// 이터레이터 result 객체는
// 1. value, 2. done 프로퍼티를 가지는 객체
console.log(iterator.next()); // {value : 1, done: false}
console.log(iterator.next()); // {value : 2, done: false}
console.log(iterator.next()); // {value : 3, done: false}
console.log(iterator.next()); // {value : undefined, done: true}
```

- next 메서드가 반환하는
- ┣ result 객체의 `value 프로퍼티` :
- ┣ 현재 `순회 중인 이터러블의 값을 나타내고`
- ┗ `done 프로퍼티` : `순회 완료 여부`

## 34.2 빌트인 이터러블

- JS는 이터레이션 프로토콜을 준수한 객체인
- ┣ 빌트인 이터러블을 제공함
- ┣ 다음 `표준 빌트인 객체들은`
- ┗ `빌트인 이터러블임`

| 빌트인 이터러블 | Symbol.iterator 메서드                    |
| --------------- | ----------------------------------------- |
| Array           | Array.prototype[Symbol.iterator]          |
| String          | String.prototype[Symbol.iterator]         |
| Map             | Map.prototype[Symbol.iterator]            |
| TypedArray      | TypedArray.prototype[Symbol.iterator]     |
| arguments       | arguments.prototype[Symbol.iterator]      |
| DOM 컬렉션      | NodeList.prototype[Symbol.iterator]       |
| DOM 컬렉션      | HTMLCollection.prototype[Symbol.iterator] |

## 34.3 for...of 문

- for...of 문 :
- ┣ 이터러블을 순회하면서
- ┗ `이터러블 요소에 변수를 할당함`

> 문법

```js
for (변수선언문 of 이터러블) {...}
```

> 이는 for...in 문의 형식과 매우 유사함

```js
for (변수선언문 in 이터러블) {...}
```

- `for...in 문` : 객체의 프로토타입 체인 상에
- ┣ 존재하는 모든 프로토타입의 프로퍼티 중에서
- ┣ `프로퍼티 어트리뷰트 [[Enumerable]] 값이 : true인`
- ┣ `프로퍼티를 순회하며 열거(enumeration)함`
- ┗ 이때 프로퍼티 키가 심벌인 프로퍼티 열거하지 않음

- `for...of문` : 내부적으로 `이터레이터의 next 메서드를`
- ┣ `호출하여 이터러블을 순회하며`
- ┣ next 메서드가 반환한 이터레이터 result 객체의
- ┣ value 프로퍼티 값을 `for...of 문의 변수에 할당함`
- ┣ 이터레이터 객체의 `done 프로퍼티 값이 : false 인 경우`
- ┗ 이터러블의 순회를 계속하고 true 이면 순회를 중단함

```js
for (const item of [1, 2, 3]) {
	// item 변수에 순차적으로 1, 2, 3이 할당됨
	console.log(item);
}
```

- 위 예제의 for...of 문의 내부 동작을 for 문으로
- ┗ 표현하게 된다면 다음과 같음

```js
// 이터러블
const iterable = [1, 2, 3];

// 이터러블의 Symbol.iterator 메서드를 호출하여
// 이터레이터를 생성함
const iterator = iterable[Symbol.iterator]();

for (;;) {
	// 이터레이터의 next 메서드를 호출하여
	// 이터러블을 순회함
	// 이때 next 메서드는 이터레이터 result 객체 반환함
	const res = iterator.next();

	// next 메서드가 반환한 이터레이터 result 객체의
	// done 프로퍼티 값이 true이면
	// 이터러블의 순회를 중단함
	if (res.done) break;

	// 이터레이터 result 객체의 value 프로퍼티 값을
	// item 변수에 할당함
	const item = res.value;
	console.log(item); // 1, 2, 3
}
```

## 34.4 이터러블과 유사 배열 객체

- 유사 배열 객체 : 마치 배열처럼 1. `인덱스로`
- ┣ `프로퍼티 값에 접근할 수 있고`
- ┣ 2. `length 프로퍼티를 갖는 객체를 말함`
- ┣ 유사 배열 객체 : length 프로퍼티를 갖기 때문에
- ┣ 1. `for 문을 통해서 순회가 가능하고`
- ┣ 인덱스를 나타내는 숫자 형식의 문자열을
- ┣ 프로퍼티 키로 가지므로 마치 배열처럼
- ┗ 2. `인덱스로 프로퍼티 값에 접근이 가능함`

```js
// 유사 배열 객체
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
};

// 유사 배열 객체 : length 프로퍼티를 가지기 때문에
// for문을 통해서 순회가 가능함
for (let i = 0; i < arrayLike.length; i++) {
	// 유사 배열 객체 : 배열처럼 인덱스로 프로퍼티 값에
	// 접근이 가능함
	console.log(arrayLike[i]); // 1 2 3
}
```

- 유사 배열 객체 : 이터러블이 아닌 일반 객체임
- ┣ 따라서 → 유사 배열 객체은 `Symbol.iterator 메서드가 없어서`
- ┗ `for...of 문을 통한 순회가 불가능함`

- 단 : `arguments`, `NodeList`, `HTMLCollection`의 경우
- ┣ 이들은 `유사 배열이면서 이터러블임`
- ┣ 정확 말하면 ES6 이터러블이 도입되면서
- ┣ 유사 배열 객체에 iterator 메서드를 구현하여
- ┣ → 이터러블이 되었음
- ┣ 하지만 이터러블이 된 이후에도
- ┣ 1. `length 프로퍼티를 가지며`
- ┗ 2. `인덱스로 접근 가능함은 변함이 없음`

- 배열도 마찬가지로 ES6에서 이터러블이 추가되면서
- ┣ Symbol.iterator 메서드를 구현하여 이터러블이 되었음
- ┣ 하지만 : 모든 유사 배열 객체 → 이터러블은 아님
- ┗ 위 예제처럼 arrayLike : 유사 배열 이지만 이터러블은 아님

- 위와 같은 경우 ES6 도입된
- ┣ `Array.from 메서드를 사용하여`
- ┣ 배열로 간단히 변환가능
- ┣ 유사 배열객체, 이터러블을 인수로 받아
- ┗ `배열로 변환하여 반환함`

```js
// 유사 배열 객체
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
};

// Array.from은 유사 배열 객체 또는
// 이터러블을 배열로 변환함
const arr = Array.from(arrayLike);
console.log(arr); // [1, 2, 3]
```

## 34.5 이터레이션 프로토콜의 필요성

- for...of 문, 스프레드 문법, 배열 디스트럭처링 할당
- ┣ `Array, String, Map, Set, TypedArray(Int8Array, ...)`
- ┣ `DOM 컬렉션(NodeList, HTMLCollection), arguments`와 같이
- ┣ 다양한 데이터 소스를 사용할 수 잇음
- ┣ 위 데이터 소스들은 `모두 이터레이션 프로토콜을 준수하는`
- ┗ `이터러블임`

- ES6 이전의 순회 가능한 데이터 컬렉션 :
- ┣ 배열, 문자열, 유사 배열 객체 들의 각자 방식이 달라서
- ┣ ES6 이후로는 `이터레이션 프로토콜을 준수하는`
- ┗ `이터러블로 통일하여 일원화 하였음`

- 이터러블 : `for...of 문`, `스프레드 문법`
- ┣ `배열 디스트럭처링 할당과 같은`
- ┣ `데이터 소비자(data consumer)`에 의해
- ┣ 사용되므로 `데이터 공급자(data provider) 역할을 한다고`
- ┗ 볼 수 있음

- 만약 : 다양한 데이터 공급자가 각자의 순회 방식을 가진다면
- ┣ 모두 각기 다른 방식을 지원해야 하기 때문에
- ┣ 이는 효율적이지 않다고 볼 수 있음
- ┣ 하지만 다양한 데이터 공급자 : `이터레이션 프로토콜`을
- ┣ 준수하도록 규정하면 → 데이터 소비자 : `이터레이션 프로토콜`
- ┗ 지원하도록 구현하면 됨

- 즉 : 이터러블을 지원하는 데이터 소비자 :
- ┣ 1. 내부에서 `Symbol.iterator` 메서드를 호출해서
- ┣ `이터레이터를 생성하고`
- ┣ 2. next 메서드를 호출하여 이터레이터를 순회하며
- ┣ 이터레이터 result 객체를 반환함
- ┗ 3. `이터레이터 result 객체의 value/done 프로퍼티 값을 취득`

> 소비자 공급자를 연결하는 인터페이스 역할을 함

## 34.6 사용자 정의 이터러블

### 34.6.1 사용자 정의 이터러블 구현

- 이터레이션 프로토콜을 준수하지 않는
- ┣ `일반 객체의 경우도`
- ┣ `이터레이션 프로토콜을 준수하도록 설정하면`
- ┣ `이터러블이 됨`
- ┣ EX ) 피보나치 수열(1, 2, 3, 4, 8, 13...) 구현한
- ┗ 사용자 정의 이터러블 구현

```js
// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
	// Symbol.iterator 메서드를 구현하여
	// 이터러블 프로토콜을 준수함
	[Symbol.iterator]() {
		let [pre, cur] = [0, 1]; // 36.1 배열 디스트럭처링
		const max = 10; // 수열의 최대값

		// Symbol.iterator 메서드 :
		// next 메서드를 소유한 이터레이터를 반환해야 하고
		// next 메서드 : 이터레이터 result 객체를 반환해야함
		return {
			next() {
				[pre, cur] = [cur, pre + cur]; // 이터레이터 result 객체 반환
				return { value: cur, done: cur >= max };
			},
		};
	},
};

// 이터러블인 피보나치 객체를 순화할 때마다 next 메서드가 호출됨
for (const num of fibonacci) {
	console.log(num);
}
```

> 성립 조건

    1. Symbol.iterator 메서드가
    ┗ next 메서드를 갖는 이터레이터 반환
    2. next 메서드의 경우
    ┣ done, value 프로퍼티를 가지는
    ┗ 이터레이터 result 객체를 반환함

> 스프레드, 배열 디스트럭처링에 활용

```js
// 이터러블 : 스프레드 문법의 대상이 될 수 있음
const arr = [...fibonacci];
console.log(arr); // [1, 2, 3, 5, 8]

// 이터러블 : 배열 디스트럭처링 할당의 대상이 될 수 있음
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [3, 5, 8]
```

### 34.6.2 이터러블을 생성하는 함수

- 앞에서 살펴본 fibonacci 이터러블 :
- ┣ 내부에 수열의 max 값을 가지고 있음
- ┣ 이 수열의 최대값은 고정된 값으로
- ┣ 외부에서 전달한 값으로 변경 불가하다는 단점
- ┗ 이룰 수정

```js
// 외부 최대값을 인수로 전달 받아서
// 사용자 정의 이터러블을 반환하는 함수
const fibonacciFunc = function (max) {
	let [pre, cur] = [0, 1];

	// Symbol.iterator 메서드를 구현한 이터러블 반환
	return {
		[Symbol.iterator]() {
			return {
				next() {
					[pre, cur] = [cur, pre + cur];
					return { value: cur, done: cur >= max };
				},
			};
		},
	};
};
```

### 34.6.3 이터러블이면서 이터레이터인 객체를 생성하는 함수

- 앞에서 살펴본 fibonacciFunc 함수 :
- ┣ `이터러블을 반환함`
- ┣ 만약 `이터레이터를 생성하려면` :
- ┗ `Symbol.iterator 메서드 호출`

```js
// fibonacciFunc 함수 : 이터러블을 반환
const iterable = fibonacciFunc(5);
// 이터러블의 Symbol.iterator 메서드 :
// 이터레이터를 반홤함
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 5, done: true}
```

- `이터러블 이면서, 이터레이터인 객체를 생성하면`
- ┣ `Symbol.iterator 메서드를 호출하지 않아도 됨`
- ┣ 다음 객체는 Symbol.iterator 메서드와 next 메서드를 소유한
- ┣ `이터러블이면서, 이터레이터임`
- ┣ Symbol.iterator 메서드 : `this를 반환하므로`
- ┗ `next 메서드를 갖는 이터레이터를 반환함`

```js
// 이터러블이면서 이터레이터인 객체
// 이터레이터를 반환하는
// Symbol.iterator 메서드와
// 이터레이션 result 객체를 반환하는
// next 메서드를 소유함
{
    [Symbol.iterator]() {return this;};
    next() {
        return {value: any, done: boolean};
    }
}
```

- 앞에서 살펴본 fibonacciFunc 함수를
- ┣ 이터러블이면서 이터레이터인 객체를 생성하여
- ┗ 반환하는 함수로 변경

```js
// 이터러블이면서 이터레이터인 객체 반환
const fibonacciFunc = function (max) {
    let [pre, cur] = [0, 1];

    // Symbol.iterator 메서드와
    // next 메서드를 소유한 이터러블인면서
    // 이터레이터인 객체를 반환
    return {
        [Symbol.iterator]() {return this;};
        next() {
            [pre, cur] = [cur, pre+cur];
            return {value: cur, done: cur>=max}
        }
    }
}

// iter는 이터러블이면서 이터레이터임
let iter = fibonacciFunc(10);

// iter는 이터러블이므로 for...of 문으로 순회할 수 있음
for(const num of iter) {
    console.log(num);
}
```

### 34.6.4 무한 이터러블과 지연 평가

- 무한 이터러블을 생성하는 함수를 정의
- ┗ 이는 무한 수열을 간단히 구현 가능

```js
// 무한 이터러블을 생성하는 함수
const fibonacciFunc = function () {
	let [pre, cur] = [0, 1];

	return {
		[Symbol.iterator]() {
			return this;
		},
		next() {
			[pre, cur] = [pre, pre + cur];
			// 무한 구현 → done 삭제
			return { value: cur };
		},
	};
};

// 배열 디스트럭처링을 사용한 무한 이터러블에서
// 3개의 요소만 취득
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3
```

- 이터러블 : 데이터 공급자의 역할을 함
- ┣ 배열이나 문자열 등은 모든 데이터를
- ┣ 메모리에 미리 확보한 다음 데이터를 공급함
- ┣ 하지만 위 예제의 이터러블 :
- ┗ `지연 평가(lazy evaluation)`를 통해 데이터를 생성함

### 지연 평가

> 지연 평가

    필요한 시점까지 데이터 생성 x
    ┣ 필요한 시점 비로소 데이터 생성
    ┗ 결과가 필요할 때까지 평가를 늦춤

- 데이터를 공급하는 메커니즘을 구현한 것으로
- ┣ 소비자인 for...of, 스프레드, 배열 디스트럭처링 할당이
- ┣ 실행 되기 이전짜지는 데이터를 생성하지 않음
- ┣ 고로 :
- ┣ 1. `불필요한 데이터를 미리 생성하지 않고`
- ┣ 2. 데이터를 필요한 순간에 생성하므로 → `빠른 실행 속도`
- ┣ 3. `불필요한 메모리 소비 X`
- ┗ 4. `무한도 표현 가능`
