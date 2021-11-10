# 목록

- [35. 스프레드 문법](#35-%EC%8A%A4%ED%94%84%EB%A0%88%EB%93%9C-%EB%AC%B8%EB%B2%95)
  - [35.1 함수 호출문의 인수 목록에서 사용하는 경우](#351-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C%EB%AC%B8%EC%9D%98-%EC%9D%B8%EC%88%98-%EB%AA%A9%EB%A1%9D%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
  - [35.2 배열 리터럴 내부에서 사용하는 경우](#352-%EB%B0%B0%EC%97%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
    - [35.2.1 concat](#3521-concat)
    - [35.2.2 splice](#3522-splice)
    - [35.2.3 배열 복사](#3523-%EB%B0%B0%EC%97%B4-%EB%B3%B5%EC%82%AC)
    - [35.2.4 이터러블을 배열로 변환](#3524-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94%EC%9D%84-%EB%B0%B0%EC%97%B4%EB%A1%9C-%EB%B3%80%ED%99%98)
  - [35.3 객체 리터럴 내부에서 사용하는 경우](#353-%EA%B0%9D%EC%B2%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)

# 35. 스프레드 문법

- ES6에서 도입된 스프레드 문법(spread syntax)
- ┣ 전개 문법 `...`은 하나로 뭉쳐 있는
- ┣ 여러 값들의 집합을 펼쳐서(전개, 분산하여)
- ┗ 개별적인 값들의 목록으로 만듬

- 스프레드 문법을 사용할 수 있는 대상
- ┣ `Array, String, Map, Set,`
- ┣ `DOM 컬렉션(NodeList, HTMLCollection)`
- ┗ arguments와 같이 → `for...of 문으로 순회 가능`

```js
// ...[1, 2, 3]은 [1, 2, 3]을 개별 요소로 분리함
console.log(...[1, 2, 3]); // 1 2 3

// 문자열은 이터러블임
console.log(...'Hello'); // H e l l o

// Map과 Set은 이터러블임
console.log(
	...new Map([
		['a', '1'],
		['b', '2'],
	])
); // ['a', '1'] ['b', '2']
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체 :
// 스프레드 문법의 대상이 될 수 없음
console.log(...{ a: 1, b: 2 });
// TypeError
```

- 위 예제에서 `...[1, 2, 3]` :
- ┣ 이터러블인 배열을 펼쳐서 요소들을
- ┣ 개별적인 값들의 목록 1 2 3으로 만듬
- ┣ 이때 1 2 3 → `값이 아닌 값들의 목록임`
- ┣ 즉 : 스프레드 문법의 결과 : `값이 아님`
- ┣ 이는 스프레드 문법이 피연산자를 연산하여
- ┣ `값을 생성하는 연산자가 아님을 의미`
- ┗ 스프레드 문법의 결과 → `변수에 할당 불가`

```js
// 스프레드 문법의 결과는 값이 아님
const list = ...[1, 2, 3]; // SyntaxError
```

- 이처럼 스프레드 문법의 결과물 :
- ┣ 값으로 사용 불가
- ┣ `다음과 같이 쉼표로 구분한 값의 목록을`
- ┗ `사용하는 문맥에서만 사용이 가능함`

> 값의 목록을 사용하는 문맥

    1. 함수 호출문의 인수 목록
    2. 배열 리터럴의 요소 목록
    3. 객체 리터럴의 프로퍼티 목록

## 35.1 함수 호출문의 인수 목록에서 사용하는 경우

- 요소들의 집합인 `배열을 펼쳐서`
- ┣ `개별적인 값들의 목록으로 만든 후`
- ┣ `이를 함수의 인수 목록으로 전달`해야 하는
- ┗ 경우가 존재함

```js
const arr = [1, 2, 3];

// 배열 arr의 요소 중에서 최대값을 구하기 위해
// Math.max를 사용함
const max = Math.max(arr); // NaN
```

- Math.max 메서드 :
- ┣ 매개변수 개수를 확정할 수 없는
- ┣ `가변 인자 함수`
- ┣ 숫자가 아닌 배열을 인수로 전달하면
- ┣ 최대값을 구할 수 없으므로
- ┗ `NaN을 반환하게 됨`

- 이 같은 문제를 해결하기 위해서
- ┣ 배열을 펼쳐서 요소들의 개별적인 값들의
- ┣ 목록으로 만든 후
- ┗ `Math.max 메서드의 인수로 전달`

- 스프레드 문법이 제공되기 전
- ┗ `Function.prototype.apply`를 사용

```js
var arr = [1, 2, 3];

// apply 함수의 2번째 인수(배열)은
// apply 함수가 호출하는 함수의 인수 목록
// 따라서 배열이 펼쳐져서 인수로 전달되는
// 효과가 존재함
var max = Math.max.apply(null, arr); // 3
```

> 스프레드 문법을 사용하면 더 간결하고
> 가독성이 좋다는 장점을 가지고 있음

```js
const arr = [1, 2, 3];

// 스프레드 문법을 사용하여
// 배열 arr을 1, 2, 3으로 펼쳐서
// Math.max에 전달함
// Math.max(...[1, 2, 3]) === Math.max(1, 2, 3)
// 같다고 볼 수 있음
const max = Math.max(...arr); // 3
```

- 스프레드 문법은 앞에서 살펴본
- ┣ Rest 파라미터와 형태가 동일하여
- ┣ 혼동할 수 있으므로 주의가 필요함

- `Rest 파라미터` :
- ┣ `함수에 전달된 인수들의 목록을`
- ┣ `배열로 전달받기 위해서`
- ┗ `매개변수` 이름 앞에 `...을 붙이는 것`

- `스프레드 문법` :
- ┣ 여러 개의 값이 하나로
- ┣ `뭉쳐 있는 배열과 같은 이터러블을`
- ┣ `펼쳐서 개별적인 값들의`
- ┗ `목록을 만드는 것`

> Rest: 인수의 목록 배열 전달
> 스프레드 : 목록을 만드는 것

    서로 반대의 개념임

```js
// Rest 파라미터 : 인수들의 목록을
// 배열로 전달받음
function foo(...rest) {
	console.log(rest); // 1, 2, 3 → [1, 2, 3]
}

// 스프레드 문법 :
// 배열과 같은 이터러블을 펼쳐서
// 개별적인 값들의 목록을 만듬
// [1, 2, 3] → 1, 2, 3
foo(...[1, 2, 3]);
```

## 35.2 배열 리터럴 내부에서 사용하는 경우

- 스프레드 문법 :
- ┣ `배열 리터럴에 사용하면`
- ┣ ES5에서 사용하던 기존 방식보다
- ┗ `더욱 간결하고 가독성 좋게 표현 가능`

### 35.2.1 concat

- ES5에서 2개의 배열 → 1개의 배열로 결합
- ┣ 배열 리터럴만으로 해결 X
- ┗ `concat 메서드를 사용해야 함`

```js
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr); //[1, 2, 3, 4]
```

- 스프레드 문법 사용 :
- ┣ `별도의 메서드를 사용하지 않고`
- ┣ 배열 리터럴만으로 2개의 배열을
- ┗ `1개의 배열로 결합이 가능함`

```js
// ES6
const arr [...[1,2], ...[3,4]];
console.log(arr); // [1, 2, 3, 4]
```

### 35.2.2 splice

- ES5에서 어떤 배열의 중간에 다른
- ┣ `배열의 요소들을 추가, 제거 하려면`
- ┣ `splice 메서드`를 사용해야 함
- ┣ splice 메서드 `세 번째 인수로 배열 전달 →`
- ┗ `배열 자체가 추가됨`

```js
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

// 세 번째 인수  arr2를 해체하여
// 전달해야 함
// 그렇지 않으면 배열 자체가 추가됨
arr1.splice(0, 1, arr2);
// 기대한 결과 : [1, 2, 3, 4]
// 실제 결과 : [1, [2, 3], 4]
```

- 이러한 경우 :
- ┣ `Function.prototype.apply 메서드`를 사용하여
- ┣ splice 메서드를 호출해야함
- ┣ `apply 두 번째 인수(배열)` :
- ┣ apply 메서드가 호출하는 함수에
- ┗ `해체되어 전달됨`

```js
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [1, 2, 3, 4]
```

> 스프레드 문법을 사용하면 간결, 가독성 UP

```js
// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr.splice(1, 0, ...arr2);
console.log(arr1); // [1, 2, 3, 4]
```

### 35.2.3 배열 복사

- ES5에서 배열을 `복사` :
- ┗ `splice 메서드를 사용`

```js
// ES5
var origin = [1, 2];
var copy = origin.splice();

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

> 스프레드 문법을 사용하면 간결, 가독성 UP

```js
// ES6
const origin = [1, 2];
const copy = [...origin];

console.log(copy); // [1, 2]
console.log(copy === origin);
```

> 주의점

    splice, 스프레드를 이용한
    ┣ 복사의 경우 :
    ┣ 얕은 복사하여 새로운 복사본
    ┗ 생성하게 됨

### 35.2.4 이터러블을 배열로 변환

- ES5에서 이터러블을 → 배열로 변환
- ┣ 1. `Function.prototype.apply`
- ┣ 2. `Function.prototype.call`
- ┗ 메서드를 사용하여 `slice 메서드 호출`

```js
// ES5
function sum() {
	// 이터러블이면서 유사 배열 객체인
	// arguments를 배열로 변환
	var args = Array.prototype.slice.call(arguments);

	return args.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}

console.log(sum(1, 2, 3)); // 6
```

- 이 방법은 `이터러블 뿐만 아닌`
- ┗ `유사 배열 객체도 배열로 변환이 가능함`

```js
// 이터러블이 아닌 유사 배열 객체
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
};

const arr = Array.prototype.slice.call(arrayLike); // [1, 2, 3]
console.log(Array.isArray(arr)); // true
```

- 스프레드 문법 사용 :
- ┣ 좀 더 간편하게 이터러블
- ┣ `배열로 변환이 가능함`
- ┣ `arguments 객체` :
- ┣ 이터러블이면서 유사 배열 객체임
- ┗ 따라서 → `스프레드 문법 대상 가능`

```js
function sum() {
	// 이터러블이면서 유사배열 객체인
	// arguments를 배열로 변환
	return [...arguments].reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

- 위 예제보다 나은 방법 :
- ┗ `Rest 파라미터를 사용하는 것`

```js
// Rest 파라미터 args :
// 함수에 전달된 인수들의 목록을
// 배열로 전달받음
const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);

console.log(sum(1, 2, 3)); // 6
```

- 단 : 이터러블이 아닌
- ┣ `유사 배열 객체의 경우`
- ┗ `스프레드 문법의 대상이 될 수 없음`

```js
// 이터러블이 아닌
// 유사 배열 객체
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
};

const arr = [...arrayLike];
// TypeError: object is not iterable
```

- 이터러블이 아닌
- ┣ `유사 배열 객체 → 배열로 변경`하려면
- ┣ `ES6 도입된 Array.from 메서드를 사용함`
- ┣ Array.from 메서드 : 유사 배열 객체 또는
- ┗ `이터러블을 인수로 전달받아 배열로 변환 후 반환`

```js
// Array.from :
// 유사 배열 또는 이터러블을 배열로 변환
Array.from(arrayLike); // [1 ,2, 3]
```

## 35.3 객체 리터럴 내부에서 사용하는 경우

- Rest 프로퍼티와 함께
- ┣ 21년 1월 TC39 프로세스의 stage4(Finished)
- ┣ 단계에 제안되어 있는 스프레드 프로퍼티를
- ┣ 사용하면 `객체 리터럴의 프로퍼티 목록에도`
- ┣ `스프레드 문법을 사용할 수 있음`
- ┣ 스프레드 문법의 대상 : 이터러블이어야 하지만
- ┣ `스프레드 프로퍼티 제안` : `일반 객체를 대상으로도`
- ┗ `스프레드 문법의 사용을 허용함`

```js
// 스프레드 프로퍼티
// 객체 복사(얕은 복사)
const obj = { x: 1, y: 2 };
const copy = { ...obj };

console.log(copy); // {x : 1, y: 2}
console.log(copy === obj); // false

// 객체 병함
const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } };
console.log(merged); // {x:1, y:2, a:3, b:4}
```

- 스프레드 프로퍼티 제안 전:
- ┣ `ES6에서 도입된 Object.assign 메서드를`
- ┣ 사용하여 `여러 개의 객체를 병합하거나`
- ┗ `특정 프로퍼티를 변경 또는 추가`

```js
// 객체 병합, 프로퍼티가 중복되는 경우
// 뒤에 위치한 프로퍼티가 우선권을 가짐
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 });
console.log(merged); // {x:1, y:10, z:3}

// 특정 프로퍼티 변경
const changed = Object.assign({}, { x: 1, y: 2 }, { y: 100 });
console.log(changed); // {x: 1, y: 100}

// 프로퍼티 추가
const added = Object.assign({}, { x: 1, y: 2 }, { z: 0 });
console.log(added); // {x: 1, y: 2, z: 0}
```
