# 27. 배열

## 27.1 배열이란?

- 배열(array) : 여러 개의 값을 순차적으로 나열한 자료구조
- ┣ 사용 빈도가 매우 높은 가장 기본적인 자료구조
- ┣ JS의 경우 배열을 다루기 위한 유용한 메서드 다수 제공
- ┣ 배열 : 사용 빈도가 높으므로
- ┣ 배열 메서드를 능숙하게 다룰 수 있다면 코딩에 매우 도움
- ┗ 간단한 배열

> 배열 리터럴을 이용한 배열 생성

```js
const arr = ['apple', 'banana', 'orange'];
```

- 배열이 가지고 있는 값 : `요소(element)`
- ┣ JS 모든 값은 배열의 요소가 될 수 있음
- ┣ 1. 원시값, 2. 객체, 3. 함수, 4. 배열
- ┣ JS에서 값으로 인정하는 모든 것은 배열의
- ┣ 요소가 될 수 있음

- ┣ `배열의 요소` : 자신의 위치를 나타내는
- ┣ 0 이상의 `정수인 인덱스(index)를 가짐`
- ┣ 인덱스 : 배열의 요소에 접근할 때 사용함
- ┣ 대부분의 프로그래밍 언어에서 인덱스 :
- ┗ `0부터 시작하게 됨`

- 위 예제의 배열 arr은 3개의 요소
- ┣ 1. apple
- ┣ 2. banana
- ┗ 3. orange로 구성

> 요소의 접근 : 대괄호 표기법을 사용

    대괄호 내에는 접근하고 싶은
    ┗ 요소의 인덱스를 지정함

```js
arr[0]; // 'apple'
arr[1]; // 'banana'
arr[2]; // 'orange'
```

- 배열 : 요소의 개수 → 배열의 길이를 나타내는
- ┗ `length 프로퍼티를 가짐`

```js
arr.length; // 3
```

- 배열 : 인덱스와 length 프로퍼티를 갖기 때문에
- ┗ for문을 통해 순차적으로 요소에 접근 가능

```js
// 배열의 순회
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}
```

> JS에 배열이라는 타입은 존재하지 않음
> 배열은 객체 타입임

```js
typeof arr; // object
```

- 배열 : 1. `배열 리터럴`
- ┣ 2. `Array 생성자 함수`
- ┣ 3. `Array.of`
- ┣ 4. `Array.from` 메서드로 생성 가능
- ┣ 배열의 생성자 함수 : Array 이며
- ┣ `배열의 프로토타입 객체` :
- ┣ `Array.prototype`임
- ┣ Array.prototype은 `배열을 위한`
- ┗ `빌트인 메서드를 제공`함

```js
const arr = [1, 2, 3];

arr.constructor === Array; // true
Object.getPrototypeOf(arr) === Array.prototype; // true
```

- `배열 : 객체`이지만
- ┗ 일반 객체와는 `구별되는 독특한 특징이 존재`함

| 구분            | 객체                      | 배열          |
| --------------- | ------------------------- | ------------- |
| 구조            | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조       | 프로퍼티 키               | 인덱스        |
| 값의 순서       | x                         | o             |
| length 프로퍼티 | x                         | o             |

- 일반 객체와 배열을 구분하는 가장 명확한 차이 :
- ┣ 1. `값의 순서`
- ┣ 2. `length 프로퍼티임`
- ┣ `인덱스로 표현되는 값의 순서`와
- ┣ `length 프로퍼티를 갖는 배열`은
- ┣ 반복문을 통해 `순차적으로 값에 접근`하기
- ┗ `적합한 자료구조`임

```js
const arr = [1, 2, 3];

// 반복문으로 자료구조를 순서대로 순회하기 위해서
// 자료구조의 요소에 순서대로 접근할 수 잇어야 하며
// 자료구조의 길이를 알 수 있어야 함
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]); // 1  2 3
}
```

- `배열의 장점` : `처음부터 순차적으로 요소에 접근`할 수도 있고
- ┣ 마지막부터 `역순으로 요소에 접근할 수도 있으며`
- ┣ `특정 위치부터 순차적으로 요소에 접근`할 수도 있다는 것
- ┣ 이는 `배열이 인덱스`, 즉 : `값의 순서`와
- ┗ `length 프로퍼티를 가지기 때문에 가능한 것`

## 27.2 자바스크립트 배열은 배열이 아니다

- 자료구조에서 말하는 배열은 동일한 크기의
- ┣ 메모리 공간이 빈틈없이 연속적으로 나열된
- ┣ 자료구조를 뜻하게 됨
- ┣ 즉 : 배열의 요소 → 하나의 데이터 타입으로 통일
- ┣ 서로 연속적으로 인접해 있음
- ┗ 이러한 배열을 `밀집 배열(dense array)`

- 자료구조에서 말하는 배열 : 동일한 크기의 메모리 공간이
- ┗ 빈틈없이 연속적으로 나열된 자료구조임

- 이처럼 일반적인 의미의 배열 :
- ┣ 각 요소가 동일한 데이터 크기를 가지고 있으며
- ┣ 빈틈없이 연속적으로 이어져 있으므로
- ┣ 다음과 같이 인덱스를 통해 단 한번의 연산으로
- ┣ 임의의 `요소에 접근(임의 접근(random access))`
- ┗ `시간 복잡도O(1)` 할 수 있음

> 매우 효율적이며 고속으로 동작함

- 하지만 정열되지 않은 배열에서 특정한 요소를 검색하는 경우
- ┣ 모든 요소를 처음부터 특정 요소를 발견할 때 까지
- ┗ `차례대로 검색(선형 검색(linear search), 시간 복잡도O(n))`

```js
// 선형 검색을 통해 배열에 특정 요소가 있는지 탐색
// 배열에 특정 요소가 존재하면 특정 요소의 인덱스를 반환하고
// 존재하지 않으면 -1을 반환
function linearSearch(array, target) {
	const length = array.length;

	for (let i = 0; i < length; i++) {
		if (array[i] === target) return i;
	}

	return -1;
}
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
```

- 또한 배열에 요소를 삽입하거나 삭제하는 경우
- ┣ 배열의 요소를 연속적으로 유지하기 위해서
- ┗ `요소를 이동시켜야 하는 단점`이 존재함

- JS 배열은 지금까지 살펴본 자료구조에서 말하는
- ┣ `일반적인 의미의 배열과 다름`
- ┣ 즉 : 배열의 요소를 위한 각각의 `메모리 공간`은
- ┣ 동일한 크기를 가지지 않아도 되며
- ┣ `연속적으로 이어져 있지 않을 수도 있음`
- ┣ 배열의 요소가 연속적으로 이어져 있지 않는 배열
- ┗ 이를 `희소 배열(sparse array) 이라고 함`

- 이처럼 JS 배열은 엄밀히 말하면 일반적 의미의 배열이 아님
- ┗ `JS 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체`임

```js
// 16.2 프로퍼티 어트리뷰트와 프러퍼티 디스크립터 객체 참고
console.log(Object.getWonPropertyDescriptors([1,2,3]));

{
    '0' {value: 1, writable: true, enumerable: true, configurable: true}
    '1' {value: 2, writable: true, enumerable: true, configurable: true}
    '2' {value: 3, writable: true, enumerable: true, configurable: true}
    'length' {value: 3, writable: true, enumerable: true, configurable: false}
}
```

- 이처럼 JS 배열 : `인덱스를 나타내는 문자열을 프로퍼티 키`로 가지며
- ┣ `length 프로퍼티를 갖는 특수한 객체`임
- ┣ JS 배열의 요소는 사실 `프로퍼티 값`임
- ┣ JS에서 사용할 수 있는 `모든 값은 객체의 프로퍼티 값이 될 수 있음`
- ┗ 어떤 타입의 값 → `배열의 요소가 될 수 있음`

```js
const arr = [
	'string',
	10,
	true,
	null,
	undefined,
	NaN,
	Infinity,
	[],
	{},
	function () {},
];
```

### 일반적인 배열과 JS 배열 비교 장/단점

1. 일반적인 배열은 인덱스로 요소에 빠르게 접근 가능

   - ┣ 그러나 1) `특정 요소를 검색`하거나
   - ┣ 2) `요소를 삽입 또는 삭제`하는 경우에는
   - ┗ `효율적이지 않음`

2. JS 배열 : 해시 테이블로 구현된 객체
   - ┣ 인덱스로 요소에 접근하는 경우 일반적인 배열보다
   - ┣ 성능적인 면에 서 느릴 수 밖에 없는 `구조적 단점 존재`
   - ┣ 특정 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우
   - ┗ 일반적인 배열보다 `빠른 성능을 기대할 수 있음`

- 즉 : JS 배열은 `인덱스로 배열 요소에 접근하는 경우`에는
- ┣ 일반적인 배열보다 느리지만
- ┣ 1. `특정 요소를 검색`하거나
- ┣ 2. `요소를 삽입 또는 삭제`하는 경우에는
- ┣ `일반적인 배열보다 빠름`
- ┣ JS 배열은 인덱스로 접근하는 경우의 성능 대신
- ┣ `특정 요소를 탐색`하거나 `배열 요소를 삽입` 또는 `삭제하는 경우`의
- ┗ `성능을 선택`한 것

- 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수밖에
- ┣ 없는 구조적인 단점을 보완하기 위해
- ┣ 대부분의 모든 JS 엔진은 배열을 일반 객체와 구별하여
- ┣ 좀 더 배열처럼 동작하도록 최적화하여서 구현을 하였음
- ┣ 배열과 일반 객체의 성능을 테스트해보면
- ┗ `배열이 일반 객체보다 약 2배 정도 빠르다는 것`을 알 수 있음

```js
const arr = [];

console.log(time('Array Performance Test'));

for (let i = 0; i < 1000000; i++) {
	arr[i] = i;
}

console.timeEnd('Array Performance Test');
// 약 340ms

const obj = {};

console.log('Object Performance Test');

for (let i = 0; i < 1000000; i++) {
	obj[i] = i;
}

console.timeEnd('Object Performance Test');
```

## 27.3 length 프로퍼티와 희소 배열

- `length 프로퍼티` : 요소의 개수
- ┣ 즉 : 배열의 길이를 나타내는 0 이상의 정수를 값으로 가짐
- ┣ length 프로퍼티의 값은 빈 배열일 경우 0 이며
- ┗ 빈 배열이 아닐 경우 가장 큰 인덱스에 1을 더한 것과 같음

```js
[].length; // 0
[1, 2, 3].length; // 3
```

- length 프로퍼티의 값 :
- ┣ 0 ~ 2\*\*32 -1 미만의 양의 정수
- ┣ 즉 : 배열은 요소를 최대 `2**32 -1 (4,294,967,295)개`
- ┣ 가질 수 있음
- ┣ 따라서 → 배열에서 사용할 수 있는 가장 작은 인덱스는
- ┗ 0 이며 가장 큰 인덱스 : `2 ** 32 - 2`임

```js
const arr = [1, 2, 3];
console.log(arr.length); // 3

// 요소 추가
arr.push(4);
// 요소를 추가하면 length 프로퍼티의 값이 자동 갱신됨
console.log(arr.length); // 4

// 요소 삭제
arr.pop();
// 요소를 삭제시 동일하게 자동 갱신
```

- length 프로터의 값 : `요소의 개수`
- ┣ 즉 : 배열의 길이를 바탕으로 결정되지만
- ┣ `임의의 숫자 값을 명시적으로 할당`할 수도 있음
- ┣ 현재 length 프로퍼티 값보다 `작은 숫자 값을 할당`하면
- ┗ `배열의 길이가 줄어들음`

```js
const arr = [1, 2, 3, 4, 5];

// 현재 length 프로퍼티의 값인 5보다 작은 3을 할당
arr.length = 3;

// 배열의 길이가 5에서 3으로 줄어들임
console.log(arr); // [1, 2, 3]
```

- 주의 할 점 : length 프로퍼티 값보다 큰 숫자 값을
- ┣ 할당하는 경우임
- ┣ 이때 length 프로퍼티 값은 변경되지만
- ┗ `실제로 배열의 길이가 늘어나지는 않음`

> 실제보다 큰 값을 반영하는 경우

    반영은 되지만
    ┣ 실제 배열에는 아무런 영향이 없음
    ┣ 값 없이 비어 있는 요소를 위해
    ┣ 메모리 공간 확보 X
    ┗ 빈 요소를 생성하지도 않음

- 이처럼 배열의 요소가 연속적으로
- ┣ 위치하지 않고 일부가 비어 있는 배열을
- ┣ 희소 배열이라고 함

- JS : `희소 배열을 문법적으로 허용`
- ┣ 배열의 뒷부분만 비어 있어서
- ┣ 요소가 연속적으로 위치하는 것처럼
- ┣ 보일 수 있으나 중간이나 앞부분이 비어
- ┗ 있을 수 있음

```js
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않음
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않음
console.log(Object.getOwnPropertyDescriptors(sparse));
```

- 일반적인 배열의 length :
- ┣ 배열의 요소 개수 → 즉 : 배열의 길이와 언제나 일치
- ┣ 그러나 희소 배열의 경우 length와 배열 요소의 개수
- ┣ 일치하지 않게됨
- ┣ `희소 배열의 length :` `희소 배열의 실제 요소 개수`보다
- ┗ `언제나 크다`

> 희소 배열의 경우 사용하지 않는 것이 좋음

    배열에는 같은 타입의 요소를
    ┗ 연속적으로 위치시키는 것이 최선

## 27.4 배열 생성

### 27.4.1 배열 리터럴

- 객체와 마찬가지로 배열도 다양한 생성 방법 존재
- ┣ 가장 일반적이고 간편한 배열 생성 방식 :
- ┗ 배열 리터럴을 사용하는 것

- 배열 리터럴 : 0개 이상의 요소를 쉼표로 구분하여
- ┣ `대괄호([])`로 묶게 됨
- ┣ 배열 리터럴 : 객체 리터럴과 달리
- ┗ `프로퍼티 키가 없고` → `값만 존재함`

```js
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

- 배열 리터럴에 요소를 하나도 추가하지 않으면
- ┗ 배열의 길이 : 즉 length 프로퍼티 값이 0인 배열이 됨

```js
const arr = [];
console.log(arr.length); // 0
```

> 배열 리터럴에 요소를 생략하면 희소 배열이 생성됨

```js
const arr = [1, , 3]; //희소 배열

// 희소 배열의 length는
// 배열의 실제 요소 개수보다 언제나 작음
console.log(arr.length); // 3
console.log(arr); // [1, empty, 3];
console.log(arr[1]); // undefined
```

- 위 예제의 arr은 인덱스가 1인 요소를 갖지 않는 희소 배열임
- ┣ arr[1]이 undefined인 이유는
- ┣ 사실은 객체인 arr에 `프로퍼티키가 1인`
- ┗ `프로퍼티가 존재하지 않기 때문`

### 27.4.2 Array 생성자 함수

- Object 생성자 함수를 통해 객체를 생성할 수 있듯이
- ┗ `Array 생성자 함수를 통해 배열을 생성` 가능

- Array 생성자 함수 :
- ┣ `전달된 인수의 개수에 따라`
- ┗ `다르게 동작`하기 때문에 주의가 필요

1. 전달된 인수가 1개이고 숫자인 경우

- ┗ length 프로퍼티 값이 인수인 배열을 생성함

```js
const arr = new Array(10);

console.log(arr); // [empty x 10]
console.log(arr.length); // 10
```

- 이때 생성된 배열 : 희소 배열임
- ┣ length 프로퍼티 값은 0이 아니지만
- ┗ `실제로 배열의 요소는 존재 하지 않음`

```js
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
    length: {value: 10, writable: true, enumerable : false, configurable: false}
}
*/
```

> 배열 : 요소를 최대 2\*\*32 - 1개 가질 수 있음

- Array 생성자 함수에 전달한 인수는
- ┗ 0 또는 2\*\*32 -1 이하인 양의 정수이어야 함

- 전달된 인수가 없는 경우 : `빈 배열을 생성`
- ┗ `배열 리터럴과 동일하게 동작`하게 됨

- 전달된 인수가 1. 2개 이상이거나
- ┣ 2. 숫자가 아닌 경우
- ┗ 인수를 요소로 갖는 배열을 생성함

```js
// 전달된 인수가 2개 이상이면 인수를 요소로 갖는
// 배열을 생성함
new Array(1, 2, 3); // [1,2,3]

// 전달된 인수가 1개이지만 숫자가 아니면
// 인수를 요소로 가지는 배열을 생성함
new Array({}); // → [{}]
```

- Array 생성자 함수 :
- ┣ new 연산자와 함께 호출하지 않더라도
- ┣ 즉 : `일반 함수로서 호출`해도
- ┣ 배열을 생성하는 `생성자 함수로 동작`하게 됨
- ┣ Array `생성자 함수 내부`에서
- ┗ `new.target`을 `확인하기 때문`임

```js
Array(1, 2, 3); // [1, 2, 3]
```

### 27.4.3 Array.of

- ES6에서 도입된 `Array.of 메서드` :
- ┣ 전달도니 인수를 요소로 갖는 `배열을 생성함`
- ┣ Array.of는 Array 생성자 함수와 다르게
- ┣ 1. `전달된 인수가 1개이고`
- ┣ 2. `전달된 인수가 숫자`이더라도
- ┗ 인수를 요소로 가지는 `배열을 생성`함

```js
// 전달된 인수가 1개이고 숫자이더라도
// 인수를 요소로 갖는 배열을 생성함
Array.of(1); // [1]

Array.of(1, 2, 3); // [1,2,3]

Array.of('string'); // ['string']
```

### 27.4.4. Array.from

- ES6에서 도입된 Array.from 메서드 :
- ┣ `유사 배열 객체(array-like object)` 또는
- ┣ `이터러블 객체(iterable object)`
- ┗ 를 `인수로 전달받아 배열로 변환하여 반환`함

```js
// 유사 배열 객체를 변환하여 배열을 생성함
Array.from({ length: 2, 0: 'a', 1: 'b' }); // ['a', 'b']

// 이터러블을 변환하여 배열을 생성함
// 문자열은 이터러블임
Array.from('Hello'); // ['H', 'e', 'l', 'l', 'o']
```

- Array.from을 상용하면
- ┣ `두 번째 인수`로 전달한 `콜백 함수`를 통해서
- ┣ 1. `값을 만들면서`, 2. `요소를 채울 수 있음`

- ┣ Array.from 메서드 : 두 번째 인수로 전달한
- ┣ `콜백 함수`에 `첫 번째 인수에 의해서`
- ┣ `생성된 배열의 요소값`과 `인덱스`를 `순차적으로`
- ┣ `전달하면서 호출`하고
- ┗ `콜백 함수의 반환값으로 구성된 배열을 반환`함

```js
// Array.from({length : 3}); // [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한
// 콜백 함수의 반환값으로 구성된 배열을 반환함
Array.from({ length: 3 }, (_, i) => i); // [0 ,1, 2]
```

#### 유사 배열 객체와 이터러블 객체

- 유사 배열 객체 `array-like object`
- ┣ 마치 배열처럼 `인덱스로 프로퍼티 값에 접근`이 가능하고
- ┣ `length 프로퍼티를 가지는 객체`를 말함
- ┗ 유사 배열 객체는 배열 처럼 `for문 순회`도 가능

```js
// 유사 배열 객체
const arrayLike = {
	0: 'apple',
	1: 'banana',
	2: 'orange',
	length: 3,
};

// 유사 배열 객체는 마치 배열처럼
// for문 순화가 가능함
for (let i = 0; i < arrayLike.length; i++) {
	console.log(arrayLike[i]); // apple banana orange
}
```

- 이터러블 객체 :
- ┣ `Symbol.iterator 메서드`를 구현하여
- ┣ `for...of 문으로 순회`할 수 잇으며
- ┣ 1. `스프레드 문법`
- ┣ 2. `배열 디스트럭처링` 할당의 대상으로
- ┗ 사용할 수 있는 객체를 의미함

- ES6에서 제공하는 `빌트인 이터러블`은
- ┣ `Array`, `String`, `Map`, `Set`,
- ┣ `DOM 컬렉션(NodeList, HTMLCollection)`,
- ┗ `arguments` 등이 있음

## 27.5 배열 요소의 참조

- 배열의 요소를 참조할 때에는
- ┣ `대괄호 표기법([])`을 사용하게 됨
- ┣ 대괄호 안에는 인덱스가 와야함
- ┗ `정수로 평가되는 표현식`이라면 `인덱스 대신 사용 가능`

- 인덱스는 값을 참조할 수 있다는 의미에서
- ┗ 객체의 프로퍼티 키와 같은 역할을 함

```js
const arr [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2
```

- 존재하지 않는 요소에 접근하면 undefined 반환

```js
const arr [1, 2];

console.log(arr[2]); // undefined
```

- 배열은 사실 `인덱스를 나타내는 문자열`을
- ┣ `프로퍼티 키로 가지는 객체`라고 할 수 있음
- ┣ 따라서 : 존재하지 않는 프로퍼티 키로
- ┗ 객체의 프로퍼티에 접근했을 때 undefined를 반환하는 것과 동일

> 희소 배열의 존재하지 않는 요소 참조 : undefined 반환

```js
// 희소 배열
const arr = [1, , 3];

// 배열 arr에는 인ㄷ게스가 1인 요소가 존재하지 않음
console.log(Object.getOwnPropertyDescriptors(arr));
```

## 27.6 배열 요소의 추가와 갱신

- 객체에 프로퍼티를 동적으로 추가할 수 있는 것과 동일하게
- ┣ `배열에도 요소를 동적으로 추가가 가능`함
- ┣ 존재하지 않는 `인덱스를 사용해 값을 할당`하면
- ┣ `새로운 요소가 추가`됨
- ┗ 이때 `length 프로퍼티 값은 자동 갱신`됨

```js
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [1, 2]
```

- 만약 현재 배열의 length 프로퍼티 값보다
- ┣ 큰 인덱스로 새로운 요소를 추가하게 된다면
- ┗ `희소 배열`이 됨

```js
arr[100] = 100;

console.log(arr); // [0 , 1, empty x 98, 100]
console.log(arr.length); // 10
```

- 이때 인덱스로 요소에 접근하여 명시적으로
- ┗ `값을 할당하지 않은 요소는 생성되지 않음`

> length 값보다 큰 요소 삽입 → 희소 배열이 생성됨

- 이미 요소가 존재하는 요소에 값을 재할당하면
- ┗ 요소값이 갱신됨

```js
// 요소값의 갱신
arr[1] = 10;
```

- `인덱스` : 요소의 위치를 나타내므로
- ┣ 반드시 `0 이상의 정수(또는 정수 형태의 문자열)`을
- ┣ `사용`해야 함
- ┣ `정수 이외의 값`을 `인덱스로 사용`하게 되면
- ┣ 요소가 생성되는 것이 아닌
- ┣ `프로퍼티가 생성되게 됨`

- ┣ 이때 추가된 프로퍼티 :
- ┗ `length 값에 영향을 주지 않음`

```js
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1,2, foo: 3, bar: 4, '1.1': 5, '-1':6]

// 프로퍼티는 length에 영향을 주지 않음
console.log(arr.length); // 2
```

## 27.7 배열 요소의 삭제

- 배열 : `사실 객체이기 때문에`
- ┣ 배열의 `특정 요소를 삭제`하기 위해서
- ┗ `delete 연산자를 사용`할 수 있음

```js
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]

// length 프로퍼티에 영향을 주지 않음
// 즉 : 희소 배열이 됨
console.log(arr.length); // 3
```

- delete 연산자 :
- ┣ 객체의 프로터리를 삭제함
- ┣ 위 예제의 `delete arr[1]`
- ┣ 프로퍼티 키가 '1'인 프로퍼티를 삭제함
- ┣ 이때 배열은 희소 배열이 되며
- ┣ length 프로퍼티 값은 변하지 않게 됨

> 따라서 희소 배열을 만드는 delete 연산자는
> 사용하지 않는 편이 좋음

```js
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스
// , 삭제할 요소의 수)

// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1 ,3]

// length 프로퍼티가 자동 갱신됨
console.log(arr.length);
```

## 27.8 배열 메서드

- JS 배열을 다룰 때 유용한 메서드를 제공
- ┣ `Array 생성자 함수` :
- ┣ `정적 메서드를 제공`하며
- ┣ 배열 객체의 프로토타입인 `Array.prototype`은
- ┗ `프로토타입 메서드를 제공`함

- 배열 메서드 : 결과물을 반환하는 패턴이 두 가지
- ┣ 이므로 사용에 주의가 필요함
- ┣ 1. 원본 배열(배열 메서드를 호출한 배열)
- ┣━ 즉 : 배열 메서드 구현체 내부에서 this를 가리키는 객체
- ┣━ 을 `직접 변경하는 메서드(mutator method)`
- ┣ 2. 원본 배열을 직접 변경하지 않고
- ┗━ `새로운 배열을 생성하여 반환하는 메서드(accessor method)`

```js
const arr = [1];

// push 메서드 : 원본 배열(arr)을 직접 변경함
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 우너본 배열(arr)을 직접 변경하지 않고
// 새로운 배열을 만들어서 반환하게 됨
const result = arr.concat(3);
console.log(arr); // [1, 2]
console.log(result); // [1, 2, 3]
```

- ES6 이전의 배열 메서드들은
- ┣ 직접 배열의 값을 변경하는 요소들이 많았음
- ┣ `원본 배열을 직접 변경하는 메서드`는
- ┣ 외부 상태를 직접 변경하는 `부수효과가 존재`
- ┗ 사용에 주의해야 함

> 고로 원본 배열을 직접 변경하지 않는

    메서드(accessor method)를 사용하는 것이
    좋음

### 27.8.1 Array.isArray

- `Array.isArray` : Array 생성자 함수의 정적 메서드임
- ┣ `Array.of`, `Array.from`도 정적 메서드 중 하나임
- ┣ `Array.isArray` 메서드 :
- ┣ 전달된 인수가 배열이면 true,
- ┗ 아닐 경우 false를 반환하게 됨

```js
Array.isArray([]); // true
Array.isArray([1,2]); // true

Array.isArray([0: 1, length: 1]); // false
```

### 27.8.2 Array.prototype.indexOf

- indexOf 메서드 : 원본 배열에서 `인수로 전달된 요소`를
- ┗ 검색하여서 `인덱스를 반환`하게 됨

1. 원본 배열에 인수로 전달한 요소와 중복된 요소가 여러개 있다면

- ┗ 첫 번째로 검색된 요소의 인덱스를 반환함

2. 원본 배열에 인수로 전달한 요소가 존재하지 않으면

- ┗ -1을 반환하게 됨

```js
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫 번째로
// 검색된 인덱스를 반환하게 됨
arr.indexOf(2); // 1
// 배열 arr에서 요소 4가 없으므로
// -1를 반환하게 됨
arr.indexOf(4); // -1
// 두 번째 인수는 검색을 시작할 인덱스임
// 두 번째 인수를 생략하면 다시 처음부터 검새갛ㅁ
arr.indexOf(2, 2); // 2
```

```js
const foods = ['apple', 'banana', 'orange'];

// foods 배열에 'orange' 요소가 존재하는지 확인함
if (foods.indexOf('orange') === -1) {
	// foods 배열에 orange 요소가 존재하지 않으면
	// 요소를 추가하게 됨
	foods.push('orange');
}

console.log(foods);
```

- indexOf 메서드 대신 ES7에서 새롭게 도입된
- ┗ Array.prototype.includes 메서드를 사용하면 가독성이 좋음

```js
const food = ['apple', 'banana', 'orange'];

// foods 배열에 'orange' 요소가 존재하는지 확인함
if (!foods.includes('orange')) {
	foods.push('orange');
}
console.log(foods);
```

### 27.8.3 Array.prototype.push

- push 메서드 : 인수로 전달받은 모든 값을
- ┣ 원본 배열의 마지막 요소로 추가하고
- ┗ 변경된 length 프로퍼티 값을 반환함

> push 메서드는 원본 배열을 직접 변경하게 됨

```js
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열 arr의
// 마지막 요소로 추가하고 length 값을 반환함
let result = arr.push(3, 4);
console.log(result); //4

// push 메서드는 원본 배열을 직접 변경함
console.log(arr);
```

- push 메서드의 경우 성능이 좋은 편이 아님
- ┣ `마지막 요소로 추가할 요소가 하나`뿐이라면
- ┣ push 메서드를 사용하는 것이 아닌
- ┣ `length 프로퍼티를 사용`하여
- ┗ 배열의 마지막에 요소를 `직접 추가 가능`

```js
const arr = [1, 2];

// arr.push(3)과 동일한 처리를 함
// 이 방법이 push 메서드를 사용하여 처리하는 것 보다
// 성능이 좋음
arr[arr.length] = 3;
console.log(arr); // [1,2,3]
```

- push 메서드 : `원본 배열을 직접 변경`하게 되는
- ┣ `부수효과가 존재`함
- ┣ 따라서 : push 메서드보다는 ES6 스프레드 문법을 사용하는 것이
- ┣ 좋은 방법임
- ┣ 스프레드 문법을 사용하면 함수 호출 없이 표현식으로
- ┣ 마지막에 요소를 추가할 수 있음
- ┗ `부수효과가 없다는 것이 장점임`

> 이는 35장 스프레드 문법에서 재 학습

```js
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [...arr, 3];
console.log(newArr); // [1, 2, 3];
```

### 27.8.4 Array.prototype.pop

- pop 메서드 : `원본 배열에서 마지막 요소를 제거`하고
- ┣ `제거한 요소를 반환`하게 됨
- ┣ 원본 배열이 `빈 배열`인 경우
- ┣ `undefined를 반환`하게 됨
- ┗ `pop 메서드` → 원본 배열을 직접 변경하는 부수효과 존재

```js
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고
// 제거한 요소를 반환함
let result = arr.pop();
console.log(result); // 2

// pop 메서드는 원본 배열을 직접 변경함
console.log(arr); // [1]
```

- pop, push를 사용하면 스택을 쉽게 구현이 가능함

> 스택

    데이터를 마지막에 밀어놓고
    ┣ 마지막에 밀어넣은 데이터를 먼저 꺼내게 되는
    ┣ 선입선출의 구조 FIO(Fist In First Out)의 구조
    ┣ 밀어 넣는 것 : push
    ┗ 빼내는 것 : pop 이라고 함

> 스택을 생성자 함수로 구현해보기

```js
const Stack = (function() {
    function Stack(array[]) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} is not an Array`);
        }
        this.array = array;
    }

    Stack.prototype = {
        // 19.9.1 절 생성자 함수에 의한 프로토타입 교체
        constructor: Stack,
        // 스택의 마지막에 데이터를 밀언허음
        push(value) {
            return this.array.push(value);
        }
        // 스택의 가장 마지막 데이터,
        // 즉 : 나중에 밀어넣은 가장 최신의 데이터를 꺼냄
        pop() {
            return this.array.poop();
        },
        // 스택의 복사본 배열을 반환함
        entries() {
            return [...this.array];
        }
    }
    return Stack;
}());

const stack = new Stack([1, 2]);
```

> 스택의 클래스 구현

```js
class Stack {
    #array; // private class member

    constructor(array = []){
        if (!Array.isArray(array)){
            throw new TypeError(`${array} is not an Array`);
        }
        this.#array = array;
    }

    // push
    push(value) {
        return this.#array.push(value);
    }
    // pop
    pop() {
        return this.#array.pop();
    }
    // 복사본 배열 반환
    entries() {
        return [...this.#array];
    }
}
const stack = new Stack({1, 2});
```

### 27.8.5 Array.prototype.unShift

- unShift 메서드 : 인수로 전달받은 모든 값을
- ┣ 1. `원본 배열의 선두에 요소로 추가하`고
- ┣ 2. `변경된 length의 값을 반환`
- ┗ 원본 배열을 변경하는 `부수효과`를 가지고 있음

```js
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두에
// 요소로 추가하고 변경된 length 값을 반환함
let result = arr.unshift(3, 4);
console.log(result); //4

// unshift 메서드는 원본 배열을 직접 변경함
console.log(arr); // [3, 4, 1, 2]
```

- unshift 메서드 : 원본 배열을 변경하는 부수효과
- ┗ 고로 ES6 spread 문법을 사용하는 것이 더 좋음

> 가급적 push, unshift를 사용하는 것 보다
> spread를 사용하는 편이 좋음

```js
const arr = [1, 2, 3];

// ES6 스프레드 문법
const newArr = [3, ...arr];
console.log(newArr); // [3, 1, 2, 3];
```

### 27.8.6 Array.prototype.shift

- shift 메서드 :
- ┣ 원본 배열에서 `첫 번째 요소를 제거`하고
- ┣ `제거한 요소를 반환`함
- ┣ 원본 배열이 `빈 배열`인 경우
- ┗ `undefined를 반환함`

> 원본 배열을 수정하는 부수효과가 존재함

```js
const arr = [1, 2];

// 원본 배열에서 첫 번째 요소를 제거하고
// 제거한 요소를 반환하게 됨
let result = arr.shift();
console.log(result); // 1

// shift 메서드 : 원본 배열을 직접 변경
console.log(arr); // [2]
```

- shift 메서드와 push 메서드를 사용하면
- ┗ 큐를 쉽게 구현이 가능함

> 큐의 클래스 구현

```js
class Queue {
	#array; // private class member

	constructor(array = []) {
		if (!Array.isArray(array)) {
			throw new TypeError(`${array} is not an array`);
		}
	}

	// 큐의 가장 마자믹에 데이터를 삽입
	enqueue(value) {
		return this.#array.push(value);
	}
	//큐의 가장 처음 데이터
	// 즉 : 가장 먼저 밀어넣은 데이터를 꺼냄
	dequeue() {
		return this.#array.shift();
	}
	// 큐의 복사본 배열을 반환
	entries() {
		return [...this.#array];
	}
}

const queue = new Queue([1, 2]);
```

### 27.8.7 Array.prototype.concat

- concat 메서드 : 인수로 전달된 값
- ┣ (배열 또는 원시값)을 원본 배열의
- ┣ 마지막 요소로 추가한 `새로운 배열을 반환`
- ┣ 인수로 전달한 값 : 배열인 경우
- ┣ 배열을 해체하여서 `새로운 배열의 요소로 추가`
- ┗ `원본 배열은 변경되지 않음`

```js
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2을 원본 배열 arr1의 마지막 요소로
// 추가한 새로운 배열을 반환함
// 인수로 전달한 값이 배열인 경우
// 배열을 해체하여서 새로운 배열의 요소로 추가함
let result = arr1.concat(arr2); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로
// 추가한 새로운 배열을 반환함
result = arr1.concat(3);
console.log(result);

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로
// 추가한 새로운 배열을 반환함
result = arr1.concat(arr2, 5);
console.log(result); // [1,2,3,4,5]

// 원본 배열은 변경되지 않음
console.log(arr1); // [1, 2]
```

- push, unshift 메서드 :
- ┣ `concat 메서드로 대체가 가능`함
- ┣ push, unshift 메서드 : concat 메서드와 `유사하게 동작`하지만
- ┗ 다음과 같은 `미묘한 차이`가 있음

- push, unshift → 원본 배열을 반드시 변수에 저장
- concat → 반환값을 변수에 지정

> push, unshift 전달받은 배열을 그대로 추가하지만
> concat의 경우 해체 후 요소로 삽입

```js
const arr = [3, 4];

// unshift와 push 메서드는 그대로 추가
arr.unshift([1, 2]);
arr.push([5, 6]);
console.log(arr); // [[1, 2], 3, 4, [5, 6]]

// concat 메서드 : 인수로 전달받은 배열을 해체하여
// 새로운 배열의 요소로 추가함
let result = [1, 2].concat([3, 4]);
result = result.concat([5, 6]);

console.log(result); // [1, 2, 3, 4, 5, 6];
```

> concat 또한 spread 문법으로 대체가 가능함

```js
let result = [1, 2].concat([3, 4]);
console.log(result); // [1, 2, 3, 4]

// concat 메서드는 ES6의 spread 문법으로 대체 가능
result = [...[1, 2], ...[3, 4]];
console.log(result);
```

> 고로 push/unshift 메서드, concat을 사용하는 것 보다
> spread 문법을 일관적으로 사용하는 것을 추천

### 27.8.8 Array.prototype.splice

- push, pop, unshift, pop 메서드는 모두
- ┣ 원본 배열을 직접 변경하는 메서드
- ┣ `mutator method`임
- ┣ 원본 배열의 처음이나 마지막에 요소를
- ┗ `추가하거나 제거`함

- 원본 배열의 중간에 요소를 추가하거나
- ┣ 중간에 있는 요소를 제거하는 경우
- ┣ splice 메서드를 사용하게됨

- splice 메서드 : 3개의 매개변수가 존재
- ┗ `원본 배열을 직접 변경`함

1. `start` : `원본 배열의 요소를 제거하기 시작할 인덱스`

- ┣ start만 지정하게되면 `start 부터 모든 요소를 제거`함
- ┣ start가 음수인 경우 : `배열의 끝에서의 인덱스`를 나타냄
- ┣ `-1` → `배열 요소의 끝 요소`
- ┗ `-n` → `배열 마지막에서 n번째 요소`

2. `deleteCount` : 원본 배열의 요소를 제거하기 시작할 인덱스인

- ┣ start부터 `제거할 요소의 개수`임
- ┣ deleteCount가 0인 경우 `아무런 요소도 제거되지 않음`
- ┗ `옵션(option)`

3. `items` : 제거한 위치에 삽입될 요소의 목록임

- ┣ 생략할 경우 원본 배열에서 요소들을 제거하기만 함
- ┗ `옵션(option)`

```js
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고
// 그 자리에서 새로운 요소 20, 30을 삽입함
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환
console.log(result); // [2, 3]
// splice 메서드는 원본 배열을 직접 변경
console.log(arr); // [1, 20, 30 ,4]
```

- splice 메서드에 3개의 인수를 빠짐없이 전달하면
- ┣ `첫 번째 인수`, 즉 : `시작 인덱스부터 두번재 인수`
- ┣ 고로 제거할 `요소의 개수`만큼 `원본 배열에서 요소를 제거`
- ┣ `세 번째 인수` → 즉 : 제거한 위치에 삽입한 요소들을
- ┗ `원본 배열에 삽입함`

- splice 메서드의 두번째 인수 :
- ┣ 즉 → 제거할 요소의 개수를 0개로 지정하면
- ┣ `아무런 요소도 제거하지 않고`
- ┗ `새로운 요소들을 삽입`하게 됨

```js
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 0개의 요소를 제거하고
// 그 자리에 새로운 요소 100을 삽입함
const result = arr.splice(1, 0, 100);

// 원본 배열이 변경됨
console.log(arr); // [1, 100, 2, 3, 4]
// 제거한 요소가 반환
console.log(result);
```

- splice 메서드의 `세번째 인수`
- ┣ 즉 → 제거한 위치에 추가할 요소들의
- ┣ 목록을 전달하지 않으면
- ┗ `원본 배열에서 지정된 요소를 제거하기만 함`

```js
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거
const result = arr.splice(1, 2);

// 원본 배열이 변경됨
console.log(arr); // [1, 4]
// 제거한 요소가 배열로 반환
console.log(result); // [2, 3]
```

- splice 메서드의 `세 번째 인수`
- ┣ 즉 : `제거할 요소의 개수`를 `생략`하면
- ┣ 첫 번째 인수로 전달된 시작 인덱스 부터
- ┗ `모든 요소를 제거`함

```js
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거한다.
const result = arr.splice(1);

// 원본 배열이 변경된다.
console.log(arr); // [1]
// 제거된 요소가 배열로 반환된다.
console.log(result); // [2, 3, 4]
```

- 배열에서 특정 요소를 제거하려면 `indexOf 메서드를 통해서`
- ┣ `특정 요소의 인덱스를 취득`한 다음
- ┗ `splice 메서드를 사용`함

```js
const arr = [1, 2, 3, 1, 2];

// 배열 array 에서 item 요소를 제거함
// item 요소가 여러 개 존재하면
// 첫 번째 요소만 제거함
function remove(array, item) {
	// 제거할 item 요소의 인덱스를 취득
	const index = array.indexOf(item);

	// 제거할 item 요소가 있다면 제거함
	if (index !== -1) array.splice(index, 1);

	return array;
}

console.log(remove(arr, 2)); // [1, 3, 1, 2]
console.log(remove(arr, 10)); // [1, 3, 1, 2]
```

> filter 메서드를 사용하여 특정 요소를 제거도 가능함
> 하지만 : 특정 요소가 중복된 경우 모두 제거됨

```js
const arr = [1, 2, 3, 1, 2];

// 배열 array에서 모든 item 요소를 제거함
function removeAll(array, item) {
	return array.filter((v) => v !== item);
}
console.log(removeAll(arr, 2)); // [1, 3, 1]
```

### 27.8.9 Array.prototype.slice

- `slice` 메서드 :
- ┣ `인수로 전달된 범위의 요소들을 복사`하여
- ┣ `배열로 반환`함
- ┣ 원본 배열 → `변경되지 않음`
- ┣ 이름이 유사한 `splice 메서드`는
- ┗ 원본 배열을 변경하니 유의

> slice 메서드 두 개의 매개변수를 가짐

1. start: `복사를 시작할 인덱스`임

- ┣ 음수의 경우 배열의 끝에서의 인덱스를 나타냄
- ┣ EX ) `slice(-2)` 배열 요소 마지막 두개를 복사하여
- ┗ 새로운 배열로 반환

2. end : `복사를 종료할 인덱스`임

- ┣ 이 인덱스에 해당하는 요소는 복사되지 않음
- ┣ end의 경우 생략 가능하며
- ┗ 생략 시 `기본값` : `length 프로퍼티임`

```js
const arr = [1, 2, 3];

// arr[0] 부터 arr[1] 이전 arr[1] 미포함 까지 복사하여 반환
arr.slice(0, 1); // [1]

// arr[1] 부터 arr[2] 이전 arr[2] 미포함 까지 복사하여 반환
arr.slice(1, 2); // [2]

// 원본의 경우 변경되지 않음
```

- slice 메서드 : 첫 번째(start)로 전달받은 인덱스부터
- ┣ 두 번째(end)로 전달받은 인덱스 이전까지의
- ┗ 요소들을 복사하여 배열로 반환함

> 두번째 end 값을 생략하면 모든 요소를 복사하여 배열로 반환

```js
const arr = [1, 2, 3];

// arr[1]부터 이후의 모든 요소를 복사하여 반환함
arr.slice(1); // [2, 3]
```

- slice 메서드의 `첫 번째 인수가 음수`인 경우
- ┣ `배열의 끝에서부터 요소를 복사`하여
- ┗ `배열로 반환`함

```js
const arr = [1, 2, 3];

// 배열의 끝에서부터 요소를 한 개 복사하여 반환함
arr.slice(-1); // [3]

// 배열의 끝에서부터 요소를 두 개 복사하여 반환함
arr.slice(-2); // [2, 3]
```

- slice 메서드의 `인수를 모두 생략`하면
- ┣ 원본 배열의 `복사본을 생성`하여 `반환`함
- ┗ 이때 생성된 복사본 : `얕은 복사(shallow copy)를 통해 생성`

```js
const todos = {
    {id: 1, content: 'HTML', completed: false},
    {id: 2, content: 'CSS', completed: true},
    {id: 3, content: 'JS', completed: false}
}

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// todos와 _todos는 참조값이 다른 별개의 객체임
console.log(todos === _todos) // false

// 배열 요소의 참조값이 같음
// 즉 : 얕은 복사되었음
console.log(_todos[0] === todos[0]);// true
```

> 얕은 복사와 깊은 복사

    11.2.1
    ┣ 객체를 프로퍼티 값으로 갖는
    ┣ 객체의 경우 얕은 복사는
    ┣ 한 단계 까지만 복사하는 것을 말하고
    ┣ 깊은 복사 : 중첩 객체까지 모두 복사
    ┣ slice, 스프레드, Object.assign 모두 얕은 복사
    ┣ 깊은 복사 Lodash 라이브러리 cloneDeep 메서드
    ┗ 사용하는 것을 추천

- slice 메서드가 복사본을 생성하는 것을 이용하여서
- ┣ `arguments`, `HTMLCollection`, `NodeList` 같은
- ┗ `유사 배열 객체`를 `배열로 변환` 가능

```js
function sum() {
	// 유사 배열 객체를 배열로 변환(ES5)
	var array = Array.prototype.slice.call(arguments);
	console.log(arr); // [1,2, 3]

	return arr.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}

console.log(sum(1, 2, 3)); // 6
```

- Array.from 메서드를 사용하면
- ┣ 유사 배열 객체를 배열로 변환 가능
- ┣ Array.from 메서드는 1. `유사 배열 객체` 또는
- ┗ 2. `이터러블 객체`를 `배열로 변환`함

```js
function sum() {
	const arr = Array.from(arguments);
	console.log(arr); // [1,2,3]

	return arr.reduce((pre, cur) => pre + cur, 0);
}
```

> arguments 객체 : 유사 배열 객체이면서
> 이터러블 객체임
> 이터러블 객체의 경우 spread 문법을 사용하여
> 간단하게 배열로 변환이 가능

```js
function sum() {
	// 이터러블을 배열로 변환(ES6 스프레드 문법)
	const arr = [...arguments];
	console.log(arr); // [1, 2, 3];

	return arr.reduce((pre, cur) => pre + cur, 0);
}
```

### 27.8.10 Array.prototype.join

- Join 메서드 : 원본 배열의 모든 요소를 문자열로 변환하고
- ┣ 인수로 전달받은 문자열,
- ┣ 즉 : 구분자(separator)로
- ┣ 연결한 문자열을 반환한함
- ┣ `구분자` : `생략 가능`,
- ┗ `기본 구분자` : `콤마(,)`

```js
const arr = [1, 2, 3, 4];

// 기본 구분자 : 콤마임
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후
// 기본 구분자로 연결한 문자열을 반환함
arr.join(); // '1, 2, 3, 4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후
// 빈 문자열로 연결한 문자열을 반환함
arr.join(''); // '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후
// ':'로 연결한 문자열을 반환함
arr.join(':'); // '1:2:3:4'
```

### 27.8.11 Array.prototype.reverse

- reverse 메서드 :
- ┣ 원본 배열의 순서를 반대로 뒤집음
- ┣ 이때 `원본 배열이 변경`됨
- ┗ `반환값` : `변경된 배열`임

```js
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메서드 : 원본 배열을 직접 변경함
console.log(arr); // [3,2,1]

// 반환값 : 변경된 배열
console.log(result); // [3, 2, 1]
```

### Array.prototype.fill

- ES6에서 도입된 `fill` 메서드 :
- ┣ 인수로 전달받은 값의 배열의 처음부터
- ┣ `끝까지 요소로 채움`
- ┗ `원본 배열` : `변경`

> 부수효과 존재

```js
const arr = [1, 2, 3];

// 인수로 전달받은 값 0을 배열의 처음부터
// 끝나지 요소로 채움
arr.fill(0);

// fill 메서드 : 원본 배열을 직접 변경
console.log(arr); // [0, 0, 0]
```

- 두 번째 `인수로 요소 채우기를 시작할`
- ┗ 인덱스를 전달할 수 있음

> 세 번째 인수로 요소 채우기를 멈출 인덱스를 전달 가능

```js
const arr = [1, 2, 3, 4, 5];

// 인수로 전달받은 0을 배열의 인덱스
// 1부터 3 이전 (인덱스 3 미포함)까지
// 요소로 채움
arr.fill(0, 1, 3);

// fill 메서드 : 원본 배열의 직접 변경
console.log(arr); // [1, 0, 0, 4, 5]
```

- fill 메서드를 사용하면 `배열을 생성하면서`
- ┗ 특정 값으로 `요소를 채울 수 있음`

```js
const arr = new Array(3);
console.log(arr); // [empty * 3];

// 인수로 전달받은 값 1을 배열의 처음부터
// 끝까지 요소로 채움
const result = arr.fill(1);

// fill 메서드 : 원본 배열을 직접 변경함
console.log(arr); // [1, 1, 1]
```

- fill 메서드를 사용하여 요소를 채울 경우
- ┣ 모든 요소를 하나의 값만으로 채울 수밖에
- ┣ 없다는 단점이 존재함

- ┣ 하지만 : `Array.from 메서드를 사용`하면
- ┣ 두 번째 인수로 전달한 `콜백 함수`를 통해
- ┣ `요소값을 만들면서 배열을 채울 수 있음`
- ┣ Array.from 메서드 :
- ┣ `두 번째 인수로 전달한 콜백 함수`에
- ┣ 첫 번째 인수에 의해 생성된 `배열의 요소값`과
- ┣ `인덱스`를 `순차적으로 전달하면서 호출`하고
- ┗ 콜백 함수의 `반환값으로 구성된 배열`을 `반환`

```js
// 인수로 전달받은 정수만큼 요소를 생성하고
// 0부터 1씩 증가하면서 요소를 채움
const sequences = (length = 0) => Array.from({ length }, (_, i) => i);
// const sequences = (length = 0) => Array.from(new Array(length), (_,i)=> i);

console.log(sequence(3)); // [0, 1, 2]
```

### 27.8.13 Array.prototype.includes

- `ES7에서 도입된 includes 메서드` :
- ┣ 배열 내에 `특정 요소가 포함`되어 있는지 확인하여
- ┣ true 또는 false를 반환함
- ┗ `첫 번째 인수로 검색할 대상을 지정`함

```js
const arr = [1, 2, 3];

// 배열에 요소 2가 포함되어 있는지 확인함
arr.includes(2); // true

// 배열에 요소 100이 포함되어 있는지 확인함
arr.includes(100); // false
```

- 두 번째 인수로 :
- ┣ `검색을 시작할 인덱스를 전달`할 수 있음
- ┣ 두 번째 인수를 생략할 경우 `기본값 0이 설정`됨
- ┣ 만약 `두 번째에 음수를 전달`하면
- ┣ length 프로퍼티 값과 음수 `인덱스 값을 합산`하여
- ┗ `(length + index) 검색 시작 인덱스를 설정`함

```js
const arr = [1, 2, 3];

// 배열에 요소 1이 포함되어 있는지
// 인덱스 1부터 확인함
arr.includes(1, 1); // false

// 배열에 요소 3이 포함되어 있는지
// 인덱스 2(arr.length -1)부터 확인함
arr.includes(3, -1); // true
```

- 배열에서 인수로 전달된 요소를 검색하여
- ┣ 인덱스를 반환하는 `indexOf 메서드`를 사용하여도
- ┣ 배열 내에 특정 요소가 포함되어 있는지 확인 가능
- ┣ 그러나 indexOf 메서드를 사용하면
- ┣ 1. `반환값이 -1인지 확인`해 보아야 하고
- ┗ 2. `배열에 NaN이 포함되어 있는지 확인 불가` 단점 존재

```js
[NaN].indexOf(NaN) !== -1; // false
[NaN].includes(NaN); // true
```

### 27.8.14 Array.prototype.flat

- ES10에서 도입된 `flat 메서드` :
- ┣ 인수로 전달한 깊이만큼
- ┗ 재귀적으로 `배열을 평탄화 함`

```js
[1, [2, 3, 4, 5]].flat(); // [1, 2, 3, 4, 5]
```

- 중첩 배열을 평탄화 할 깊이를 인수로 전달 가능
- ┣ 기본값 : 1
- ┣ 인수로 Infinity를 전달할 경우 :
- ┗ `중첩 배열이 모두 평탄화` 됨

```js
[1, [2, [3, [4]]]].flat(); // [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(1); // [1, 2, [3, [4]]]

// 중첩 배열을 평탄화 하기 위한 인수로 2 전달
// 2단계 깊이까지 평탄화
[1, [2, [3, [4]]]].flat(2); // [1, 2, 3, [4]]

// 두번 평탄화 한것과 동일
[1, [2, [3, [4]]]].flat().flat(); // [1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한
// 깊이 값을 Infinity로 지정하여
// 중첩 배열 모두를 평탄화 함
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
```

## 27.9 배열 고차 함수

- 고차함수(Higher-Order Function HOF) :
- ┣ 1. 함수를 인수로 전달 받거나
- ┣ 2. 함수를 반환하는 함수를 말함

- ┣ `JS 함수` → `일급 객체`이므로
- ┣ 함수를 값처럼 `인수로 전달`할 수 있으며
- ┣ `반환도 가능함`

- 고차 함수 :
- ┣ 1. `외부 상태 변경`
- ┣ 2. `가변(mutable) 데이터`를 `피하고`
- ┣ 3. `불변성(immutability)를 지향` 하는
- ┗ `함수형 프로그래밍`에 기반을 두고 있음

- 함수형 프로그래밍 :
- ┣ `순수 함수(pure function)`와
- ┣ `보조 함수`의 `조합`을 통해서
- ┣ 로직 내에 존재하는
- ┣ 1. `조건문, 반복문을 제거`하여 → 복잡성을 해결
- ┗ 2. 변수의 사용을 억제하여 → 상태 변경을 피함

- 함수형 프로그래밍은 결국 :
- ┣ 순수 함수를 통해 부수 효과를 최대한 억제하여
- ┗ 오류를 피하고, 안정성을 높힌다고 볼 수 있음

### 27.9.1 Array.prototype.sort

- `sort` 메서드 : 배열의 요소를 정렬함
- ┣ `원본 배열을 직접 변경`하여
- ┣ `정렬된 배열을 반환`함
- ┗ sort 메서드 : 기본적으로 `오름차순 요소 정렬`

```js
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드 : 원본 배열을 직접 변경함
console.log(fruits); // ['Apple', 'Banana', 'Orange']
```

- 한글 문자열인 요소도 오름차순 정렬

```js
const fruits = ['바나나', '오렌지', '사과'];

fruits.sort();

console.log(fruits); // ['바나나', '사과', '오렌지']
```

> 내림차순 사용하고 싶다면

    sort 메서드 사용하여 오름차순
    ┗ reverse 메서드 사용하여 내림차순

- 문자열 요소로 이루어진 배열의 정렬 문제가 없음
- ┣ 하지만 `숫자 요소로 이루어진 배열의 정렬 주의` 필요
- ┗ 예제 학습

```js
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열
// 의도한 대로 정렬되지 않음
console.log(points); // [1, 10, 100, 2, 25, 25, 40, 5]
```

- sort 메서드의 기본 정렬 순서 :
- ┣ `유니코드 포인트의 순서`를 따름
- ┣ 배열의 요소가 숫자 타입이라 할지라도
- ┣ 배열의 요소를 일시적으로 → `문자열로 변환한 후`
- ┗ `유니코드 코드 포인트의 순서를 기준`으로 정렬

```js
['2', '1'].sort(); // ["1", "2"]
[2, 1].sort(); // [1, 2]
```

- 따라서 숫자 요소를 정렬할 때는
- ┣ sort 메서드에 정렬 순서를 정의하는
- ┣ 비교 함수를 인수로 전달해야 함
- ┣ 비교 함수는 양수나 음수 또는 0을 반환

- ┣ 비교 함수의 `반환값` : `0보다 작으면`
- ┣ 비교 함수의 `첫 번째 인수를 우선으로 정렬`
- ┣ `0 이면` `정렬하지 않고`
- ┣ `0 보다 크면` : `두 번째 인수를 우선`하여 정렬

```js
const points = [40, 100, 1, 5, 2, 25, 100];

// 숫자 배열의 오름차순 정렬
// 비교 함수의 반환값이 0보다 작으면
// a를 우선하여 저렬함
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length - 1]); // 1 100

// 숫자 배열의 내림차순 정렬
// 비교 함수의 반환값 : 0보다 작으면 b를 우선으로 정렬
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]
```

- 객체를 요소로 갖는 배열을 정렬하는 예제
- ┗ 다음과 같음

```js
const todos = [
    {id: 4, content: 'JS'}
    {id: 2, content: 'HTML'}
    {id: 1, content: 'CSS'}
]

// 비교 함수, 매개변수 key는 프로퍼티 키임
function compare(key) {
    // 프로퍼티 값이 문자열인 경우
    // 산술 연산으로 비교하면 → NaN
    // 고로 비교 연산을 사용

    // 비교 함수 : 양수 / 음수 / 0를
    // 반환하면 되기 때문에
    // 산술 연산 대신 비교 연산을 사용할 수 있음
    return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

// id를 기준으로 오름차순 정렬
todos.sort(compare('id'));
console.log(todos);

// content를 기준으로 오름차순 정렬
todos.sort(compare('content'));
console.log(todos);
```

> sort 메서드의 정렬 알고리즘

    sort 메서드 : quicksort 알고리즘 사용
    ┣ 그러나 동일한 값의 요소가 중복되면
    ┣ 초기 순서가 변경될 수 있음
    ┣ 고로 불안정함
    ┣ ES10(ECMAScript 2019) 에서는
    ┗ timsort 알고리즘의 사용으로 변경

### 27.9.2 Array.prototype.forEach

- 함수형 프로그래밍 :
- ┣ 1. 순수 함수
- ┣ 2. 보조 함수의 조합
- ┣ 로직 내에 존재하는 조건문, 반복문 제거 목적
- ┗ 변수의 사용을 억제

- 조건문, 반복문 이해를 어렵게 함
- ┣ 특히 : for문의 경우 변수를 선언해야 하며
- ┣ 조건식과 증감식으로 이루어져 있음
- ┗ `함수형 프로그래밍을 추구하는 바와 맞지 않음`

```js
const numbers = [1, 2, 3];
const pows = [];

// for문을 이용한 배열 순회
for (let i = 0; i < number.length; i++) {
	pows.push(numbers[i] ** 2);
}

console.log(numbers); // [1, 4, 9]
```

- forEach 메서드 : for문을 대체할 수 있는 `고차함수`임
- ┣ `forEach` 메서드는 `자신의 내부에서 반복문을 실행`
- ┣ forEach 메서드 : `반복문을 추상화한 고차 함수`로서
- ┣ 내부에서 반복문을 통해 `자신을 호출한 배열을 순회`하며
- ┣ 수행해야할 처리 → `콜백 함수로 전달 받아서 반복 호출`
- ┗ for 문으로 구현된 위 예제를 forEach로 처리해 보기

```js
const numbers = [1, 2, 3];
const pows = [];

// forEach 메서드 : numbers 배열의 모든 요소를 순회하면서
// 콜백 함수를 반복 호출하게 됨
numbers.forEach((item) => pows.push(items ** 2));
console.log(pows); // [1, 4, 9]
```

- 위 예제의 경우 forEach 메서드 :
- ┣ numbers 배열의 모든 요소를 순회하여
- ┣ 콜백 함수를 반복 호출함
- ┣ numbers 배열의 요소가 3개이므로
- ┣ → 콜백 함수도 3번이 호출되게 됨
- ┣ 이때 `콜백 함수를 호출하는 forEach 메서드` :
- ┗ `콜백 함수에 인수를 전달`할 수 있음

- forEach 메서드의 콜백 함수 :
- ┣ forEach 메서드를 호출한
- ┣ 1. `배열의 요소값`
- ┣ 2. `인덱스`
- ┣ 3. `호출한 배열 자체 → this`
- ┗ 고로 3개의 인수 순차적으로 전달 가능

```js
// for Each 메서드 : 콜백 함수를 호출하면서
// 3개 (요소값, 인덱스, this)를 인수로 전달
[1, 2, 3].forEach((item, index, arr) => {
	console.log(`요소값 : ${item}, 인덱스: ${index}, this:${Json.stringfy(arr)}`);
});
```

> Json.stringfy 메서드

    Json.stringfy 메서드 :
    ┣ 객체를 JSON 포맷의 문자열로 변환하게됨
    ┣ 위 예제에서는 객체인 arr 배열을 문자열로
    ┗ 출력하기 위해 사용

- forEach 메서드 : 원본 배열(this 배열)을
- ┣ `변경하지 않는다는 것`이 `특징`
- ┣ 하지만 → 콜백함수를 통해서
- ┗ 원본배열의 변경 또한 가능함

```js
const numbers = [1, 2, 3];

// forEach 메서드 : 원본 배열을 변경하지 않지만
// 콜백 함수를 통해 원본 배열을 변경 가능함
// 콜백 함수의 세 번째 매개변수
// arr → 원본 배열 numbers를 가리키게 됨
// 따라서 콜백 함수의 세 번째 매개변수
// arr을 직접 변경하면 원본 배열 numbers가 변경됨
numbers.forEach((item, index, arr) => {
	arr[index] = item ** 2;
});
```

> forEach 메서드의 반환값 : 언제나 undefined

```js
const result = [1, 2, 3].forEach(console.log);
console.log(result); // undefined;
```

- forEach 메서드의 두번째 인수로
- ┣ forEach 메서드의 콜백 함수 내부에서
- ┗ `this로 사용할 객체를 전달`이 `가능함`

```js
class Numbers {
	numberArray = [];
	multiply(arr) {
		arr.forEach(function (item) {
			// TypeError: cannot read property
			this.numberArray.push(item * item);
		});
	}
}

const numbers = new Numbers();
numbers.multiply[(1, 2, 3)];
```

- forEach 메서드의 콜백 함수 :
- ┣ `일반 함수로 호출`되므로
- ┣ `콜백 함수의 내부의 this`는 → `undefined를 가리킴`
- ┣ this가 전역 객체가 아닌
- ┣ `undefined를 가리키는 이유`는
- ┣ 클래스 내부의 모든 코드에는 `암묵적`으로
- ┣ `strict mode`가 적용되기 때문

> class 내부에서는 암묵적으로

    strict mode가 적용됨을 기억

- forEach 메서드의 콜백 함수 내부의 this와
- ┣ multiply 메서드의 this를 일치시키 위해서는
- ┣ forEach 메서드의 두번째 인수로
- ┗ `this로 사용할 객체를 전달`하면 됨

> 두 번째 인수로 this로 사용할 객체 전달하기

```js
class Numbers {
	numberArray = [];

	multiply(arr) {
		arr.forEach(function (item) {
			this.numberArray.push(item * item);
		}, this); // forEach 메서드의 콜백 함수 내부에서
		// this로 사용할 객체를 전달
	}
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers); // [1, 4, 9]
```

- 더 나은 방법 : `ES6의 화살표 함수 사용`
- ┣ 화살표 함수의 경우 함수 자체의
- ┣ `this 바인딩`을 `가지지 않음`
- ┣ 따라서 → 화살표 함수 내부에서 this를 참조하면
- ┣ `상위 스코프의 this`를 즉 : `multiply 메서드 내부`의
- ┗ `this를 그대로 참조`하게 됨

```js
class Numbers {
	numberArray = [];

	multiply(arr) {
		// 화살표 함수 내부에서 this를 참조하게 되면
		// 상위 스코프의 this를 그대로 참조하게 됨
		arr.forEach((item) => this.numberArray.push(item * item));
	}
}
const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray);
```

- forEach 메서드의 동작을 이해하기 위해서
- ┗ forEach `메서드의 폴리필`을 학습

```js
// 만약 Array.prototype에 forEach 메서드가 존재하지 않으면
// 폴리필을 추가함
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		// 첫 번째 인수가 함수가 아니면 TypeError 발생
		if (typeof callback !== 'function') {
			throw new TypeError(callback + 'is not a function');
		}

		// this로 사용할 두 번째 인수를 전달받지 못하면
		// 전역 객체를 this로 사용함
		thisArg = thisArg || window;
	};

	// for문으로 배열을 순회하면서 콜백 함수를 호출함
	for (var i = 0; i < this.length; i++) {
		// call 메서드를 통해 thisArg를 전달하면서
		// 콜백 함수를 호출함
		// 이때 콜백 함수의 인수로
		// 1. 배열 요소, 2. 인덱스, 3. 배열 자신 전달
		callback.call(thisArg, this[i], i, this);
	}
}
```

- 이처럼 forEach 메서드도 내부에서는 반복문 (for문)을 통해
- ┣ `배열을 순회할 수 밖에 없는 구조`를 가지고 있음
- ┣ 단 : 반복문을 `메서드 내부로 은닉`하여서
- ┗ `흐름을 이해하기 쉽게` 하고, `복잡성을 해결`함

- forEach 메서드 : for문과 달리
- ┣ 1. `break`, 2. `continue` 문을 `사용 불가`
- ┣ 다시 말해 배열 순회의 중간 탈출이 불가
- ┗ 모든 요소를 빠짐없이 순회 해야함

```js
[1, 2, 3].forEach(item => {
    console.log(item);
    if (item > 1) break; // SyntaxError
})
```

- 희소 배열읠 경우 존재하지 않는 요소
- ┣ 순회 대상에서 제외됨
- ┣ 이는 앞으로 살펴볼 배열을 순회하는
- ┣ 1. `map`, 2. `filter`, 3. `reduce` 에서도
- ┗ `동일한 특징`을 가지고 있음

```js
// 희소 배열
const arr = [1, , 3];

// for문을 이용한 희소 배열 순회
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]); // 1, undefined, 3
}

// forEach문을 이용한 희소 배열 순회
arr.forEach((item) => console.log(v));
```

- forEach 메서드 : `for문에 비해 성능이 떨어짐`
- ┣ 그러나 `가독성이 좋은` `장점`을 가지고 있음
- ┣ 따라서 요소의 배열의 `요소개수가 많거나`
- ┣ `성능 개선`, `복잡한 코드`를 제외하고서는
- ┗ forEach 문을 사용하는 것을 추천

### 27.9.3 Array.prototype.map

- `map` 메서드 : 자신을 호출한 배열의 `모든 요소를 순회`
- ┣ 인수로 전달받은 콜백 함수를 반복 호출함
- ┣ 그리고 : 콜백 함수의 반환값들로 구성된
- ┣ `새로운 배열을 반환함`
- ┗ 원본 배열의 경우 → 변경되지 않음

```js
const numbers = [1, 4, 9];

// map 메서드 : numbers 배열의 모든 요소들을 순회하며
// 콜백 함수를 반복적으로 호출하게 됨
// 그리고 콜백 함수의 반환값들로 구성된
// 새로운 배열을 만들어냄
const roots = numbers.map((item) => Math.sqrt(item));

// 위 코드는 다음과 같음
// const roots = numbers.map(Math.sqrt);
```

- forEach, map의 공통점 :
- ┣ 모든 요소를 순회하면서
- ┣ 인수로 전달받은 `콜백함수를 실행` 한다는 점
- ┣ 하지만 forEach 메서드 : 언제나 `undefined를 반환`
- ┣ map 메서드 : 콜백 함수의 반환값들로 구성된
- ┗ `새로운 배열을 반환 한다는 점`이 차이점임

- forEach 메서드 : 단순히 반복문을 대처하기 위한
- ┗ `고차 함수`임

- map 메서드 : 요소값을 다른 값으로
- ┣ `매핑(mapping)`한 새로운 배열을 반환하기 위한
- ┗ `고차 함수`임
- map 메서드가 생성하여 반환하는 새로운 배열의
- ┣ length 프로퍼티 값은 map 메서드를 호출한 배열의
- ┣ `length 프로퍼티 값과 반드시 일치함`
- ┣ 즉 : map 메서드를 호출한 배열과
- ┗ 반환한 배열의 경우 `1 : 1`을 매핑 한다고 보면됨

- forEach 메서드와 마찬가지로
- ┣ map 메서드의 경우도
- ┣ 1. 배열의 요소 값
- ┣ 2. 인덱스
- ┗ 3. 배열 자신(this)를 전달받음

```js
// map 메서드 : 콜백 함수를 호출하면서 인덱스 3개 넘겨줄 수 있음
[1, 2, 3].map((item, index, arr) => {
	console.log(
		`요소값 : ${item}, 인덱스 : ${index} this: ${JSON.stringfy(arr)}}`
	);
	return item;
});
```

- forEach 메서드와 마찬가지로
- ┣ map 메서드의 두 번째 인수로 map 메서드의
- ┣ 콜백 함수 내부에서 this로 사용할 객체를
- ┗ 전달이 가능함

```js
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		// 화살표 함수 내부에서 this를 참조하면
		// 상위 스코픠의 this를 그대로 참조함
		return arr.map((item) => this.prefix + item);
	}
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```

### 27.9.4 Array.prototype.filter

- filter 메서드 : 자신을 호출한 배열의 모든 요소를
- ┣ 순회하면서 인수로 전달받은 콜백 함수를 `반복 호출`
- ┣ 콜백 함수의 반환값이 → `true인 요소로만 구성`된
- ┣ `새로운 배열을 반환`함
- ┗ `원본 배열` : `변경되지 않음`

```js
const numbers = [1, 2, 3, 4, 5];

// filter 메서드 : numbers 배열의 모든 요소를 순회하며
// 콜백 함수를 반복 호출함
// 콜백 함수의 반환값이 true인 요소로만 구성된
// 새로운 배열을 반환함
// 다음의 경우 numbers 배열에서 홀수인 요소만 필터링 함
// 1의 경우 → true로 평가
const odds = numbers.filter((item) => item % 2);
console.log(odds); // [1, 3, 5]
```

- forEach, map 메서드와 마찬가지로
- ┣ filter 메서드 : 자신을 호출한 배열의
- ┣ 모든 요소를 `순회하면서 전달받은 콜백 함수`를
- ┗ `반복적으로 호출`하게됨

- forEach : 언제나 `undefined를 반환`하고
- map : 콜백 함수의 반환값으로 구성된 `새로운 배열 반환`
- filter : 콜백 함수의 `반환값 → true로 이루어진 배열 반환`

- filter 메서드 : `자신을 호출한 배열`에서
- ┣ 필터링 조건을 만족하는 `특정 요소만 추출하여`
- ┣ 새로운 배열을 만들고 싶을 때 사용함
- ┣ 위 예제에서 filter 메서드의 콜백 함수 요소값을
- ┗ 2로 나눈 나머지를 반환함

- 따라서 : filter 메서드가 생성하여
- ┣ 반환한 새로운 배열의 length 프로퍼티 값은
- ┣ filter 메서드를 `호출한 배열의 length`
- ┗ 프로퍼티 `값과 같거나 적다는 것을 알 수 있음`

- forEach, map 메서드와 마찬가지로
- ┣ filter 메서드의 콜백 함수 :
- ┣ 3개의 인수
- ┣ 1. `배열 요소`
- ┣ 2. `인덱스`
- ┣ 3. 배열 자체 `this`
- ┗ 전달 받을 수 있음

> class 내부에서 화살표 함수 사용

```js
const Users {
    constructor() {
        this.users = {
            {id: 1, name: 'Lee'},
            {id: 2, name: 'Kim'}
        }
    }
}
// 요소 추출
findById(id) {
    // id가 일치하는 사용자만 반환함
    return this.users.filter(user => user.id === id);
}

// 요소 제거
remove(id) {
    // 일치하지 않는 사용자를 제거
    this.users = this.users.filter(user => user.id !== id);
}

const users = new Users();

let user = users.findById(1);

users.remove(1);
```

- filter 메서드를 사용해 특정 요소를 제거할 경우
- ┣ 특정 요소가 중복되어 있다면 → `중복된 요소를 모두`
- ┣ 제거하게 됨
- ┣ 특정 요소 `하나만을 제거`하려면 →
- ┣ 특정 요소의 `인덱스를 확인`하고
- ┗ `splice 메서드`를 사용하는 것을 추천

### 27.9.5 Array.prototype.reduce

- reduce 메서드 : 자신을 호출한 배열의 모든 요소를
- ┣ 순회하면서 전달받은 `콜백 함수를 반복 호출`함
- ┣ 콜백 함수의 `반환값을 다음 순회 시`에
- ┣ 콜백 함수의 `첫 번째 인수로 전달`하면서
- ┣ `콜백 함수를 호출`하여
- ┣ `하나의 결과값을 만들어 반환`하게 됨
- ┗ 원본 배열 → `변경되지 않음`

- reduce 메서드 :
- ┣ 1. 콜백 함수
- ┗ 2. 초기값 전달 받음

- reduce 콜백 함수 :
- ┣ 1. `초기값` 또는 `콜백 함수의 이전 반환값`
- ┣ 2. reduce 메서드를 호출한 `배열의 요소값`
- ┣ 3. `인덱스`
- ┗ 4. `배열 자체` → `this` 인자로 가질 수 있음

> EX) 2개의 인수 즉 콜백 함수와 초기값 0을 전달 받음

```js
// 1부터 4까지 누적을 구함
const sum = [1, 2, 3, 4].reduce((acc, cur, index, array) => acc + cur, 0);
console.log(sum); // 10
```

- reduce 메서드의 콜백 함수 :
- ┣ `4개의 인수를 전달받아`
- ┣ `배열의 length 만큼` 총 4회 호출되게 됨
- ┣ 이때 콜백 함수로 전달되는 인수와 반환값은
- ┗ 다음과 같음

| 구분    | accumulator | currentValue | index | array        | 콜백 함수의 반환값 |
| ------- | ----------- | ------------ | ----- | ------------ | ------------------ |
| 첫 번째 | 0 (초기값)  | 1            | 0     | [1, 2, 3, 4] | 1 (acc + cur)      |
| 두 번째 | 1 (초기값)  | 2            | 1     | [1, 2, 3, 4] | 3 (acc + cur)      |
| 세 번째 | 3 (초기값)  | 3            | 2     | [1, 2, 3, 4] | 6 (acc + cur)      |
| 네 번째 | 6 (초기값)  | 4            | 3     | [1, 2, 3, 4] | 10 (acc + cur)     |

- 이처럼 reduce 메서드 :
- ┣ 1. `초기값`과 배열의 2. `첫 번째 요소값`을
- ┣ `콜백 함수에게 인수로 전달`하면서
- ┣ 다음 순회에는 1. `콜백 함수의 반환값`과
- ┣ 2. `두 번째 요소값`을 콜백 함수의 인수로 전달하면서
- ┗ 호출 하게됨, 이 과정 반복 → 하나의 결과값을 반환

- `reduce 메서드` : 자신을 호출한
- ┣ 배열의 `모든 요소들을 순회`하며
- ┣ `하나의 결과값을 구해야 하는 경우`에
- ┗ 사용을 하게됨

#### 평균 구하기

```js
const values = [1, 2, 3, 4, 5, 6];

const avg = values.reduce((acc, cur, i, { length }) => {
	// 마지막 순회가 아니면 누적값을 반환하고
	// 마지막 순회면 누적값으로 평균을 구해 반환
	return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(avg); //3.5
```

#### 최대값 구하기

```js
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
```

> 최대값의 경우 reduce 사용보다 Math.max를 사용하는 것이 직관적임

```js
const values = [1, 2, 3, 4, 5];

const max = Math.math(...values);
// var max = Math.math.apply(null, values);
console.log(max); // 5
```

#### 요소의 중복 횟수 구하기

```js
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
	// 첫 번째 순회 시 acc :
	// 초기값인 {}이고 cur :
	// 첫 번째 요소인 banana임
	// 초기값으로 전달받은 빈 객체의 요소값인 cur을
	// 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로 할당
	// 만약 프로퍼티 값이 undefined인 경우
	// 프로퍼티 값을 1로 초기화
	acc[cur] = (acc[cur] || 0) + 1;
	return acc;
}, {});
```

#### 중첩 배열 평탄화

```js
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);

console.log(values); // [1, 2, 3, 4, 5, 6]
```

> 중첩 배열의 평탄화의 경우

    ES10 → ECMAScript 2019 도입된
    ┣ Array.prototype.flat 메서드 사용이
    ┗ 좀 더 직관적임

```js
[1, [2, 3]].flat(); // [1, 2, 3];
```

- 인자값의 경우 평탄화를 위한 깊이 값임을 기억

#### 중복 요소 제거

```js
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce((acc, cur, i, arr) => {
	// 순회 중인 요소의 인덱스가
	// 자신의 인덱스라면 처음 순회 하는 요소임
	// 이 요소만 초기값으로 전달받은
	// 배열에 담아서 반환을 하게됨
	// 순회 중인 요소의 인덱스가
	// 자신의 인덱스가 아니라면 중복된 요소임
	if (arr.indexOf[cur] === i) acc.push(cur);
	return acc;
}, []);

console.log(result);
```

- 중복 요소를 제거할 때는
- ┣ reduce 메서드보다 filter 메서드를 사용하는 방법이
- ┗ 더 직관적임

```js
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 순회 중인 요소의 인덱스 → 자신의 인덱스
// 처음 순회하는 요소
// 이 요소만 필터링
const result = values.filter((v, i, arr) => arr.indexOf(v) === i);
console.log(result); // [1, 2, 3, 5, 4]
```

> 또한 : 중복되지 않는 유일한 Set 사용 가능

    중복 요소 제거할 때 이 방법 추천

```js
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 중복을 허용하지 않는 Set 객체의 특성을 활용하여
// 배열에서 중복된 요소를 제거 가능함
const result = [...new Set(values)];
console.log(result);
```

- 이처럼 : map, filter, some, every, find 등의
- ┣ 모든 배열의 고차 함수 → reduce 메서드로 구현 가능
- ┣ reduce 메서드의 두 번째 인수로 전달하는 초기값 :
- ┗ `첫 번째 순회에 콜백 함수의 첫 번째 인수로 전달`됨

> 주의점 :

    두 번째 인수로 전달하는
    ┗ 초기값은 생략이 가능함

```js
// reduce 메서드의 두 번째 인수
// 즉 : 초기값을 생략했음
const sum = [1, 2, 3, 4].reduce((acc, cur) => acc + cur);
console.log(sum); // 10
```

> 그러나 reduce를 호출할 때는 언제나 초기값 전달이 안전함

```js
const sum = [].reduce((acc, cur) => acc + cur);
// TypeError: Reduce of array with no initial value
```

> 초기값 전달 시 에러가 나지 않음

```js
const sum = [].reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 0
```

```js
const products = [
    {id : 1, price: 100}
    {id : 2, price: 200},
    {id : 3, price: 300},
]


// 1번째 순회 시 acc : {id: 1, price: 100}
// cur : {id:2, price: 200} 이지만
// 2번째 순회를 하면
// acc : 300, cur : {id:3, price: 300}임
// 2번째 순회 시 acc에 객체가 아닌 숫자값이 전달
const priceSum = products.reduce((acc, cur) => acc.price + cur.price);

console.log(priceSum); // NaN
```

- 이처럼 객체의 특정 프로퍼티 값을 합상하는 경우 초기값 전달

```js
const products = [
    {id : 1, price: 100}
    {id : 2, price: 200},
    {id : 3, price: 300},
]


const priceSum = products.reduce((acc, cur) => acc.price + cur.price, 0);
console.log(priceSum); // 600
```

### 27.9.6 Array.prototype.some

- some 메서드 : 자신을 호출한 배열의 요소를 순회하면서
- ┣ 인수로 전달된 콜백 함수를 호출함
- ┣ 이때 some 메서드 : 콜백 함수의 반환값이
- ┣ 단 한번이라도 참이면 → true
- ┣ 모두 거짓이면 → false 반환함
- ┣ 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여
- ┣ 그 결과를 불리언 타입으로 반환함
- ┣ 단 : some 메서드를 호출한 배열이
- ┗ 빈 배열인 경우 false를 반환하므로 주의

- forEach, map, filter와 마찬가지로
- ┣ some 메서드의 콜백 함수도
- ┣ 1. 호출한 요소값
- ┣ 2. 인덱스
- ┗ 3. 배열 자체 → this를 전달 받을 수 있음

```js
[5, 10, 15].some((item) => item < 0); //false
[5, 10, 15].some((item) => item > 0); //true
```

### 27.9.7 Array.prototype.every

- every 메서드 : 자신을 호출한 배열의 요소를 순회하며
- ┣ 인수로 전달된 콜백 함수를 호출함
- ┣ every 메서드 : 콜백 함수의 반환값이
- ┣ 모두 참이면 true,
- ┗ 단 한번이라도 거짓이면 : false 반환

> 빈 배열의 경우 false 반환

- 이외의 것들은 some과 동일함

### 27.9.8 Array.prototype.find

- ES6에서 도입된 find 메서드는
- ┣ `자신을 호출한 배열 요소를 순회` 하면서
- ┣ 인수로 `전달된 콜백 함수를 호출`하여
- ┣ 반환값이 `true인 첫 번째 요소를 반환`함
- ┣ 콜백 함수의 반환값이 true인 요소가 존재하지 않으면
- ┗ `undefined를 반환`함

- forEach, map, filter 메서드와 동일하게
- ┗ 3개의 인자값 받을 수 있음

```js
const users = [
    {id: 1, name: 'Lee'}
    {id: 2, name: 'Kim'}
    {id: 3, name: 'Choi'}
    {id: 4, name: 'Park'}
]

const users.find(user => user.id === 2); // {id:2, name:'Kim'}
```

- filter 메서드의 경우 콜백 함수의 호출 결과가
- ┣ true인 요소만 추출한 새로운 배열을 반환함
- ┣ 따라서 `filter 메서드`의 반환값은 → `언제나 배열`임
- ┣ 하지만 find 메서드는 `반환값이 true인 `
- ┣ 첫 번째 `요소를 반환`하기 때문에
- ┗ 배열이 아닌 `요소임`

```js
// filter 메서드 : 배열을 반환함
[1, 2, 2, 3].filter((item) => item === 2); // [2, 2];

// find 메서드는 요소를 반환함
[1, 2, 2, 3].find((item) => item === 2); //2
```

- forEach, map, filter와 마찬가지로
- ┣ find 메서드의 두 번째 인수로
- ┣ find 내부의 this로 사용할 객체 전달 가능
- ┗ 화살표 함수 사용이 좀 더 좋음
