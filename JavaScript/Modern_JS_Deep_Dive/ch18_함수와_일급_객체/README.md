# 함수와 일급 객체

## 18.1 일급 객체

- 다음과 같은 조건을 만족하는 객체를 `일급 객체`

1. `무명의 리터럴`로 생성 → 즉 `런타임에 생성`이 가능

2. `변수나 자료구조(객체, 배열 등)에 저장`이 가능

3. 함수의 `매개변수에 전달`이 가능

4. 함수의 `반환값으로 사용` 가능

> JS 함수의 경우 위의 조건을 모두 만족하므로 일급 객체

```js
// 1. 함수는 무명의 리터럴로 생성 가능
// 2. 함수는 변수에 저장 가능
// 런타임(할당 단계)에 함수 리터럴이 평가되어
// 함수 객체가 생성되고 변수에 할당
const increase = function (num) {
	return ++num;
};

const decrease = function (num) {
	return --num;
};

// 2. 함수는 객체에 저장 가능
const predicates = { increase, decrease };

// 3. 함수의 매개변수에 전달 가능
// 4. 함수의 반환값으로 사용 가능
function makeCounter(predicate) {
	let num = 0;

	return function () {
		num = predicate(num);
		return num;
	};
}

// 3. 함수는 매개변수에게 함수를 전달 가능
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2
```

- `함수가 일급 객체` : `함수를 객체와 동일하게 사용`할 수 있다는 의미
- ┣ `객체` : `값 → 함수` : `값과 동일하게 취급`이 가능
- ┣ 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값,
- ┣ 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지
- ┣ `리터럴`로 정의 가능
- ┗ `런타임(runtime)` 에 함수가 객체로 평가됨

- 일급 객체로서 함수가 가지는 가장 큰 특징 : 일반 객체와 같이 함수의
- ┣ 1. `매개변수에 전달 가능`, `함수의 반환값으로 사용`할 수 도 있다는 것
- ┗ `함수형 프로그래밍`을 가능하게 하는 `JS의 장점 중 하나`

- `함수` : `객체 이지만 일반 객체와는 차이`가 있음
- ┣ `일반 객체는 호출할 수 없지만`, `함수 객체는 호출`할 수 있음
- ┗ 함수 객체는 일반 객체에는 없는 함수 `고유의 프로퍼티를 소유`

## 18.2 함수 객체의 프로퍼티

- 함수 : 객체임
- ┣ 함수도 `프로퍼티`를 가질 수 있음
- ┣ `arguments`, `caller`, `length`, `name`, `prototype`
- ┣ `프로퍼티` : 모두 함수 객체의 `데이터 프로퍼티`
- ┣ `__proto__`는 접근자 프로퍼티이며
- ┣ 함수 객체 고유의 프로퍼티가 아닌 `Object.prototype`
- ┣ 객체의 프로퍼티를 상속받은 것을 알 수 있음
- ┣ Object.prototype 객체의 프로퍼티 : 모든 객체가 상속받아 사용 가능
- ┣ Object.prototype 객체의 `__proto__` 접근자 프로퍼티 : 모든 객체 사용가능
- ┗ 이에 대해서는 뒤에서 설명

### 18.2.1 arguments 프로퍼티

- 함수 객체의 `arguments` `프로퍼티 값` : `arguments 객체`
- ┣ arguments 객체는 함수 호출 시 전달된 인수(argument)들의
- ┣ 정보를 담고 있는 `순회 가능한(iterable)` 유사 배열 객체
- ┣ 함수 내부에서 지역 변수처럼 사용
- ┗ `함수 외부`에서는 `참조 불가`

- 함수 객체의 `arguments 프로퍼티` : 현재 일부 브라우저에서 지원
- ┣ ES3부터 표준에서 폐지됨
- ┣ Function.arguments와 같은 사용법은 권장되지 앟음
- ┣ 함수 내부에서 지역 변수처럼 사용할 수 있는
- ┗ `arguments` 객체를 참조하도록 함

```js
function multiply(x, y) {
	console.log(arguments);
	return x * y;
}
console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 2
console.log(multiply(1, 2, 3)); // 2
```

- 함수 정의시 : 선언한 매개변수는 함수 몸체 내부에서
- ┣ 변수와 동일하게 취급
- ┣ 함수 호출 → 함수 몸체 내에서 암묵적으로 매개변수가 선언
- ┣ undefined로 초기화된 이후 인수가 할당
- ┣ 선언된 매개변수 개수보다 인수를 작게 전달 할 경우
- ┗ 초과된 매개변수는 무시

> 그렇다고 벼러지는 것은 아니고
> 모든 인수는 arguments 객체의 프로퍼티로 보관

- `arguments 객체` : `인수를 프로퍼티 값`으로 소유
- ┣ `프로퍼티 키` : `인수의 순서`를 나타냄
- ┣ arguments 객체의 `callee 프로퍼티는 호출`되어
- ┣ arguments 객체를 생성한 함수,
- ┣ 즉 : `함수 자신을 가리킴`
- ┗ arguments 객체의 `length 프로퍼티는 인수의 개수`

- arguments 객체의 `Symbol(Symbol.iterator)` 프로퍼티

- arguments 객체의 `Symbol(Symbol.iterator)` 프로퍼티는
- ┣ `arguments 객체`를 `순회 가능한 자료구조`인
- ┣ `이터러블(iterable)`로 만들기 위한 프로퍼티
- ┣ Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하는 것
- ┗ 이터러블이 됨

```js
function multiply(x, y) {
	// 이터레이터
	const iterator = arguments[Symbol.iterator]();

	// 이터레이터의 next 메서드를 호출하여
	// 이터러블 객체 arguments를 순회
	console.log(iterator.next()); // {value: 1, done: false}
	console.log(iterator.next()); // {value: 2, done: false}
	console.log(iterator.next()); // {value: 3, done: false}
	console.log(iterator.next()); // {value: undefined, done: true}

	return x * y;
}

multiply(1, 2, 3);
```

- `선언된 매개변수의 개수`와
- ┣ 함수를 호출할 때 전달하는 `인수의 개수`를
- ┣ `확인하지 않는 JS 특성` 때문에
- ┣ `인수의 개수를 확인` 하고 → `동작을 달리`함
- ┗ 이것이 `arguments 객체`임

> arguments 객체 : 매개변수 개수 확정할 수 없는
> 가변 인자 함수를 구현하는데 유용

```js
function sum() {
	let res = 0;

	// arguments 객체는 length 프로퍼티가 잇는 유사 배열
	// for문으로 순회 가능
	for (let i = 0; i < arguments.length; i++) {
		res += arguments[i];
	}
	return res;
}
console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

- arguments 객체 : 배열 형태로 인자 정보를 담고 있지만
- ┣ 배열이 아닌 → `유사배열(array-like object)`
- ┣ `유사 배열 객체` : `length 프로퍼티`를 가진 객체
- ┗ `for 문을 통해서 순회`할 수 있는 객체

> 유사 배열 객체와 이터러블

    ES6에서 도입된 이터레이션 프로토콜을 준수하면
    ┣ 순회 가능한 자료구조인 이터러블이 됨
    ┣ 이터러블 개념이 없던 ES5에서
    ┣ arguments 객체는 유사 배열 객체로 구분
    ┣ 하지만 이터러블 도입 → ES6
    ┗ arguments 객체 : 1. 유사배열, 2. 이터러블

- `유사 배열 객체` : `배열이 아님`
- ┣ 배열 메서드를 사용할 경우 에러가 발생
- ┣ 배열 메서드를 사용하려면
- ┣ 1. `Function.prototype.call`
- ┣ 2. `Function.prototype.apply`
- ┗ 등을 사용해서 간접 호출해야 하는 번거로움

> 이에 대해서는 추후에 학습

```js
function sum() {
	// arguments 객체를 배열로 변환
	const array = Array.prototype.slice.call(arguments);
	return array.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}
```

> 이러한 번거로움을 해결하기 위해서 ES6 → Rest

```js
// ES6 Rest parameter
function sum(...args) {
	return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

- ES6 Rest 파라미터의 도입으로 모던 JS에서는
- ┣ arguments 객체의 중요성이 이전 같지는 않지만
- ┗ ES6만 사용하지 않을 수 있기 때문에 알아둘 필요가 있음

### 18.2.2 caller 프로퍼티

- caller 프로퍼티는 ECMAScript 사양에 포함되지 않은
- ┣ 비표준 프로퍼티
- ┣ 이후 표준화 예정도 없음
- ┗ 참고용

```js
function foo(func) {
	return func();
}

function bar() {
	return 'caller: ' + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

- 함수 호출 foo(bar)의 경우 bar 함수를 foo 함수 내에서 호출
- ┣ 이 때 bar 함수의 caller 프로퍼티는
- ┗ bar 함수를 호출한 foo 함수를 가르킴

> 이의 경우 Node.js 환경과 브라우저의 결과가 다름
> 이에 대해서는 모듈 48장 모듈에서 설명

### 18.2.3 length 프로퍼티

- 함수 객체의 length 프로퍼티 : 함수를 정의할 때 선언한 매개변수 개수

```js
function foo() {}
console.log(foo.length); // 0

function baz(x, y) {
	return x * y;
}
console.log(baz.length); // 2
```

- `arguments 객체의 length 프로퍼티`와
- ┣ `함수 객체의 length 프로퍼티 값`은
- ┣ 다를 수 있으니 주의!
- ┣ `arguments length` : `인자의 개수`
- ┗ `함수 객체 length` : `배개변수 개수`

### 18.2.4 name 프로퍼티

- 함수 객체의 `name 프로퍼티` :
- ┣ `함수 이름`을 나타냄
- ┣ name 프로퍼티는 `ES6 이전 비표준`
- ┣ ES6에서 정식 표준
- ┗ name의 경우 `ES5와 ES6의 동작이 다름`
- `익명 함수 표현식`의 경우
- ┣ `ES5` : name 프로퍼티 → `빈 문자열을 값`
- ┗ `ES6` : `함수 객체를 가리키는 식별자`를 값으로 가짐

```js
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); //foo

// 익명 함수 표현식
var anonymousFunc = function () {};
// ES5 : name 프로퍼티 : 빈 문자열을 값으로 가짐
// ES6 : name 프로퍼티 : 함수 객체를 가리키는 변수 이름을 값으로 가짐
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문
function bar() {}
console.log(bar.name); // bar
```

- 함수 선언문에서 살펴본 바와 같이 `함수 이름과`
- ┣ `객체가 가리키는 식별자`는 `의미가 다르다는 것 잊지말기`
- ┗ 함수를 호출 → 함수 이름이 아닌 함수 객체를 가리키는 식별자로 호출

### 18.2.5 **porto** 접근자 프로퍼티

- 모든 객체 : `[[Prototype]]`이라는 `내부 슬롯`을 가짐
- ┣ `[[Prototype]]` 내부슬롯 : `객체지향 프로그래밍`의
- ┣ `상속을 구현`하는 `프로토타입 객체`를 가리킴
- ┣ 프로토타입 객체에 대해서는
- ┗ 뒤에서 살펴보도록 함

- `__proto__` 프로퍼티 : `[[Prototype]]` 내부 슬롯이 가리키는
- ┣ 프로토타입 객체에 접근하기 위해 사용하는 `접근자 프로퍼티`
- ┣ 내부 슬롯에는 직접 접근 X, 간접적인 접근 방법을 제공하는 경우에
- ┣ 한해서 접근이 가능하다.
- ┣ `[[Prototype]]` 내부 슬롯에도 직접 접근 부락하며
- ┗ `__proto__` 접근자 프로퍼티를 통해 간접적인 접근이 가능

```js
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는
// Object.prototype 임
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는
// 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받음
// hasOwnProperty 메서드는 Object.prototype의 메서드
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__')); // false
```

> hasOwnProperty 메서드

    hasOwnProperty 메서드는
    ┣ 인수로 전달받은 프로퍼티 키가
    ┣ 객체 고유의 프로퍼티 키인 경우에만
    ┣ true를 반환하고
    ┣ 상속받은 프로토타입의 프로퍼티 키인 경우
    ┗ false를 반환한다.

### 18.2.6 prototype 프로퍼티

- `prototype` 프로퍼티는 `생성자 함수`로 `호출할 수 있는 함수 객체`
- ┣ 즉 `constructor`만이 소유하는 프로퍼티임
- ┣ `일반 객체`와 생성자 함수로 호출할 수 없는
- ┗ `non-constructor` 에는 `prototype 프로퍼티가 없음`

```js
// 함수 객체는 prototype 프로퍼티를 소유함
(function () {}
	.hasOwnProperty('prototype')
	(
		// true

		// 일반 객체는 prototype 프로퍼티를 소유하지 않음
		{}
	)
	.hasOwnProperty('prototype')); // false
```

- `prototype 프로퍼티`는 `함수가 객체를 생성하는 생성자 함수`로
- ┣ 호출될 때 `생성자 함수가 생성할 인스턴스`의
- ┗ `프로토타입 객체`를 가리킴
