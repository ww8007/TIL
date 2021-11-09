# 26. ES6 함수의 추가 기능

## 목차

- [26. ES6 함수의 추가 기능](#26-es6-함수의-추가-기능)
  - [목차](#목차)
  - [26.1 함수의 구분](#261-함수의-구분)
  - [26.2 메서드](#262-메서드)
  - [26.3 화살표 함수](#263-화살표-함수)
    - [26.3.1 화살표 함수 정의](#2631-화살표-함수-정의)
      - [함수 정의](#함수-정의)
      - [매개변수 선언](#매개변수-선언)
      - [함수 몸체 정의](#함수-몸체-정의)
    - [26.3.2 화살표 함수와 일반 함수의 차이](#2632-화살표-함수와-일반-함수의-차이)
    - [26.3.3 this](#2633-this)
    - [26.3.4 super](#2634-super)
    - [26.3.5 arguments](#2635-arguments)
  - [Rest 파라미터](#rest-파라미터)
    - [26.4.1 기본 문법](#2641-기본-문법)
    - [26.4.2 Rest 파라미터와 arguments 객체](#2642-rest-파라미터와-arguments-객체)
  - [26.5 매개변수 기본값](#265-매개변수-기본값)

## 26.1 함수의 구분

- ES6 이전까지 JS 함수 : 별다른 구분 없이 사용
- ┣ 1. `일반적인 함수`로서 호출
- ┣ 2. `new 연산자`와 함께 호출하여 인스턴스 생성하는
- ┣━ `생성자 함수`로서의 호출
- ┗ 3. `객체에 바인딩`되어 `메서드`로서 호출 가능

> 편리해 보이지만 성능 down, 실수 유발 가능

```js
var foo = function () {
	return 1;
};

// 일반적인 함수로서 호출
foo(); // → 1

// 생성자 함수로서 호출
new foo(); // → foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // → 1
```

- 이처럼 ES6 이전의 함수 : 사용 목적에 따라 명확히 구분 X
- ┣ 고로 : ES6 이전의 모든 함수 →
- ┣ 1. `일반 함수로서 호출`
- ┣ 2. `생성자 함수로서 호출`이 가능함
- ┗ `callable`, `constructor` 임

```js
var foo = function () {};

// ES6 이전의 모든 함수 → callable, constructor임
foo();
new foo(); // foo {}
```

> callable, constructor/non-constructor

    내부 메서드 [[Call]], [[Constructor]]
    ┣ 에서 살펴보았듯
    ┣ 호출할 수 있는 함수 객체 : callable
    ┣ 인스턴스 생성할 수 있는 함수 객체 : constructor
    ┗ 인스턴스 생성 불가 : non-constructor

- `주의점` : ES6 이전에 일반적으로 메서드로 불리던
- ┣ `객체에 바인딩된 함수` → `callable`, `constructor`임
- ┣ 고로 : 객체에 바인딩된 함수도
- ┣ 1. 일반 함수로서 호출
- ┗ 2. 생성자 함수로서 호출이 가능함

```js
// 프로퍼티 f에 바인딩된 함수 : callable이며 constructor
var obj = {
	x: 10,
	f: function () {
		return this.x;
	},
};

// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f());

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

- 위 예제와 같이 객체에 바인딩된 함수를
- ┣ 생성자 함수로 호출하는 경우가 흔치는 않겠지만
- ┗ 문법상 가능하다는 것은 `문제가 존재`

- 객체에 바인딩된 함수가 constructor라는 것은
- ┣ 객체에 바인딩된 함수 : `prototype 프로퍼티를 가지며`
- ┗ `프토토타입 객체도 생성`한다는 것을 의미
- 함수에 전달되어 보조 함수의 역할을 수행하는
- ┣ 콜백 함수의 경우도 마찬가지임
- ┣ `콜백 함수` : `constructor이기 때문에`
- ┗ `불필요한 프로토타입 객체를 생성`

```js
// 콜백 함수를 사용하는 고차 함수 map,
// 콜백 함수도 constructor이며 프로토타입을 생성함
[1, 2, 3].map(function (item)) {
    return item * 2;
}); // → [2, 4, 6]
```

- 이처럼 ES6 이전의 함수는
- ┣ 1. 실수 유발가능과
- ┗ 2. 의도치 않게 프로토타입 객체 생성

> 그렇기에 ES6에서는 함수를 사용 목적에 따라
> 세 가지 종류로 명확히 구분

| ES6 함수의 구분    | constructor | prototype | super | arguments |
| ------------------ | ----------- | --------- | ----- | --------- |
| 일반 함수(Normal)  | o           | o         | x     | o         |
| 메서드(Method)     | x           | x         | o     | o         |
| 화살표 함수(Arrow) | x           | x         | x     | x         |

- 일반 함수 : 1. 함수 선언문, 2. 함수 표현식으로
- ┣ 으로 정의한 함수를 의미
- ┗ ES6 이전의 일반 함수와 큰 차이가 없음

> 메서드, 화살표 함수는 큰 차이가 존재

- 일반 함수 : constructor
- `ES6 메서드, 화살표 함수 : non-constructor`

## 26.2 메서드

- ES6 이전 사양 : 메서드에 대한 특별한 정의 x
- ┣ 메서드 : 객체에 바인딩된 함수를 일컫는 으미
- ┣ ES6 사양 : 메서드에 대한 정확한 의미 기술
- ┗ `메서드` → `메서드 축약 표현`으로 `정의된 함수`만을 의미

```js
const obj {
    x : 1,
    // foo는 메서드임
    foo() { return this.x; },
    // bar에 바인딩된 함수는 메서드가 아닌 일반 함수
    bar : function() {return this.x; }
}

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

- `ES6 사양에서 정의한 메서드(ES6 메서드)` :
- ┣ 인스턴스를 생성 불가 → non-constructor
- ┗ ES6 메서드 : 생성자 함수로서 호출 불가

```js
new obj.foo(); // TypeError: obj.foo is not a constructor
new obj.bar(); // bar{}
```

- ES6 메서드 : 인스턴스 생성 불가
- ┣ 고로 → 1. `prototype 프로퍼티가 없고`
- ┗ 2. `프로토타입도 생성하지 않음`

```js
// obj.foo : constructor가 아닌 ES6 메서드이므로
// prototype 프포퍼티가 없다.
obj.foo.hasOwnProperty('prototype'); // → false

// obj.bar는 constructor인 일반 함수이므로
// prototype 프로퍼티가 존재함
obj.bar.hasOwnProperty('prototype'); // → true
```

- 참고 : 표준 빌드인 객체가 제공하는
- ┣ 1. `프로토타입 메서드`
- ┣ 2. `정적 메서드`
- ┗ 모두 `non-constructor임`

```js
String.prototype.toUpperCase.prototype; // undefined
String.fromCharCode.prototype; // undefined

Number.prototype.toFixed.prototype; /// undefined
```

- ES6 메서드 : `자신을 바인딩한 객체`를 가리키는
- ┣ 내부 슬롯 → [[HomeObject]]를 가지게 됨
- ┣ super 참조 : 내부 슬롯 [[HomeObject]]를 사용하여
- ┣ `수퍼 클래스의 메서드를 참조`하므로
- ┣ 내부 슬롯 [[HomeObject]]를 갖는
- ┗ ES6 메서드 : `super 키워드를 사용할 수 있음`

```js
const base = {
	name: 'Lee',
	sayHi() {
		return `Hi! ${this.name}`;
	},
};

const derived = {
	__proto__: base,
	// sayHi : ES6 메서드임
	// sayHi의 [[HomeObject]]는 derived.prototype을
	// 가리키게됨
	// super : sayHi의 [[HomeObject]]의 프로토타입인
	// base.prototype을 가리킴
	sayHi() {
		return `${super.sayHi()}. how are you doing?`;
	},
};
console.log(derived.sayHi()); // Hi! Lee. how are you doing
```

- ES6 메서드가 아닌 함수 : super 키워드를 사용 불가
- ┣ ES6 메서드가 아닌 함수 → `내부 슬롯`에
- ┗ `[[HomeObject]]를 가지지 않기 때문`임

```js
const derived = {
	__proto__: base,
	// sayHi는 ES6 메서드가 아님
	// 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로
	// super 키워드를 사용할 수 없음
	sayHi: function () {
		// SyntaxError: 'super' keyword unexpected here
		return `${super.sayHi()}, how are you doing?`;
	},
};
```

- 이처럼 ES6 메서드 :
- ┣ 1. 본연의 기능(super)를 추가하고
- ┣ 2. 의미적으로 맞지 않는 → `constructor는 제거`
- ┣ 메서드를 정의할 때 프로퍼티 값으로
- ┣ `익명 함수 표현식을 할당`하는
- ┗ ES6 이전의 방식은 사용하지 않는것이 좋음

## 26.3 화살표 함수

- 화살표 함수 : function 키워드 대신
- ┣ 화살표 `(=>, fat arrow)`를 사용하여
- ┗ 기존의 함수 정의 방식보다 더 간략하게 함수를 정의 가능

- 화살표 함수 : 표현만 간략한 것이 아닌
- ┣ `내부 동작도 기존의 함수보다 간략`함
- ┣ 또한 : `콜백 함수 내부`에서 `this가 전역객체를 가리키는`
- ┗ `문제를 해결`하기 위한 대안으로 유용

### 26.3.1 화살표 함수 정의

#### 함수 정의

- 화살표 함수 : 함수 선언문으로 정의 불가
- ┣ 함수 표현식으로 정의해야 함
- ┗ 호출 방식 : 기존 함수와 동일함

```js
const multiply = (x, y) => x + y;
multiply(2, 3); // 6
```

#### 매개변수 선언

- 매개변수가 여러 개인 경우 : `소괄호 () 안에 매개변수를 선언`

```js
const arrow = (x, y) => { ... };
```

- 매개변수가 한 개인 경우 : `생략 가능`

```js
const arrow = x => {...};
```

- 매개변수가 없는 경우 : 소괄호()를 생략 불가

```js
const arrow = () => {...};
```

#### 함수 몸체 정의

- 함수 몸체 : `하나의 문으로 구성`
- ┣ 함수 몸체를 감싸는 중괄호 {}를 생략 가능
- ┣ 이때 : 함수 몸체 내부의 문의 경우
- ┣ `값으로 평가될 수 있는 표현식인 문` 일 경우
- ┗ `암묵적으로 반환`됨

```js
// concise body
const power = (x) => x ** 2;
power(2); // 4

// 위 표현식은 다음과 동일함
// block body
const power = (x) => {
	return x ** 2;
};
```

- 함수 몸체를 감싸는 중괄호를 생략한 경우 :
- ┣ 함수 몸체 내부의 문이 표현식이 아닌 문이라면
- ┣ `에러가 발생`하게 됨
- ┗ `표현식이 아닌 문` → `반환이 불가`

```js
const arrow = () => const x = 1; // SyntaxError: Unexpected token 'const'

// 위 표현식은 다음과 같이 해석
const arrow = () => { return const x = 1};
```

- 따라서 : 함수 몸체가 하나의 문으로 구성된다 하더라도
- ┣ 함수 몸체의 문이 → `표현식이 아닌 문`이라면
- ┗ `중괄호 생략이 불가능`함

```js
const arrow = () => {
	const x = 1;
};
```

- `객체 리러털을 반환`하는 경우
- ┗ `객체 리터럴을 소괄호 ()`로 감싸 주어야함

```js
const create = (id, content) => ({ id, content });
create(1, 'JS'); // {id: 1, content: "JS"}

// 위 표현은 다음과 동일
const create = (id, content) => {
	return { id, content };
};
```

- 객체 리터럴을 소괄호로 감싸지 않으면 :
- ┣ 객체 리터럴의 중괄호 `{}`를
- ┗ 함수 몸체를 감싸는 중괄호로 잘못 해석함

```js
// {id, content}를 함수 몸체 내의 쉼표 연산자문으로 해석
const create = (id, content) => {
	id, content;
};
create(1, 'JS'); // undefined;
```

- 함수 몸체가 여러개의 문으로 구성 되는 경우 :
- ┣ 함수 `몸체를 감싸는 중괄호 {}`
- ┗ 생략이 불가능함 → 반환값이 존재하면 명시적으로 반환

```js
const sum = (a, b) => {
	const result = a + b;
	return result;
};
```

- 화살표 함수 : `즉시 실행 함수(IFE)로 사용이 가능`함

```js
const person = ((name) => ({
	sayHi() {
		return `Hi? My name is ${name}`;
	},
}))('Lee');

console.log(person.sayHi());
```

- `화살표 함수` : `일급 객체`이므로
- ┣ `Array.prototype.map`
- ┣ `Array.prototype.filter`
- ┣ `Array.prototype.reduce`와 같은
- ┣ `고차 함수(Higher-Order Function, HOF)에 인수`로 전달 가능
- ┣ 이 경우 일반적인 함수 표현식보다 표현이 간결하고
- ┗ `가독성이 좋음`

```js
// ES5
[1, 2, 3].map(function(v)) {
    return v * 2;
}

// ES6
[1, 2, 3].map(v => v *2);
```

- 이처럼 : 화살표 함수는 `콜백함수로서`
- ┣ 정의할 때 유용함
- ┣ 화살표 함수는 표현만 간략한것이 아닌
- ┣ 1. `일반 함수의 기능을 간략화`
- ┗ 2. `this도 편리하게 설계`됨

### 26.3.2 화살표 함수와 일반 함수의 차이

- 화살표 함수와 일반 함수의 차이는 다음과 같음

1. 화살표 함수 : 인스턴스를 생성할 수 없는 non-constructor임

```js
const Foo = () => {};
// 화살표 함수 : 생성자 함수로서 호출 불가
new Foo(); // TypeError: Foo is not a constructor
```

- 화살표 함수 : 1. `인스턴스를 생성할 수 없으`며
- ┣ 2. `prototype 프로퍼티가 없으`며
- ┗ 3. `프로토타입도 생성하지 않음`

```js
const Foo = () => {};
// 화살표 함수 : prototype 프포퍼티가 없음
Foo.hasOwnProperty('prototype'); // false
```

2. 중복된 매개변수 이름을 선언 불가

- 일반 함수 : 중복된 배개변수 이름을 선언해도 에러 발생 X

```js
function normal(a, a) {
	return a + a;
}
console.log(normal(1, 2)); // 4
```

- 단 : strict mode에서 중복된 매개변수 이름 사용
- ┗ 에러가 발생하게 됨

```js
'use strict';

function normal(a, a) {
	return a + a;
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

> 화살표 함수에서도 중복된 매개변수 이름 사용 불가

```js
const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context
```

3. 화살표 함수 : 함수 자체의

- ┣ 1. `this`, 2. `arguments`, 3. `super`
- ┗ 4. `new.target` 바인딩을 갖지 않음

- 따라서 : 화살표 함수 내부에서 위를 참조하면
- ┣ `스코프 체인`을 통해 `상위 스코프`의
- ┗ this, arguments, super, new.target을 참조함

- 만약 : 화살표 함수와 화살표 함수가 중복된 경우
- ┣ 상위 스코프가 화살표 함수라면
- ┣ `가장 가까운 상위 스코프 중 화살표 함수가 아닌 함수`의
- ┗ `this, arguments, super, new.target을 참조`함

### 26.3.3 this

- 화살표 함수가 일반 함수와 구별되는 가장 큰 특징 :
- ┣ `this라고 할 수 있음`
- ┣ 화살표 함수 : 다른 함수의 인수로 전달되어
- ┗ `콜백함수로 사용되는 경우가 많음`

- 화살표 함수의 this :
- ┣ 일반 함수의 this와 다르게 동작함
- ┣ 이는 : 콜백 함수 내부의 this 문제
- ┣ 즉 : `콜백 함수 내부 this <-> 외부 this`가
- ┣ `다르기 때문에 발생하는 문제를 해결하기 위해`
- ┗ 의도적으로 설계한 것

- `this 바인딩` : 함수의 호출 방식
- ┣ 즉 : 함수가 어떻게 호출되었는지에 따라
- ┣ `동적으로 결정됨`
- ┣ 다시말해 : 함수를 정의할 때
- ┣ this에 바인딩된 객체가 정적으로 결정되는 것이 아닌
- ┗ `함수가 어떻게 호출되는지에 따라서 바인딩 객체 동적 결정`

```js
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}

	add(arr) {
		// add 메서드 : 인수로 전달된 배열 arr를 순회하여
		// 배열의 모든 요소에 prefix를 추가함
		// -1-
		return arr.map(function (item) {
			return this.prefix + item; // -2-
			// TypeError: Cannot read property
			// 'prefix' of undefined
		});
	}
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add[['transition', 'user-select']]);
```

- 위 예제의 실행 결과를 기대값 :
- ┣ ['-webkit-transition', '-webkit-uer-select']임
- ┗ 하지만 TypeError가 발생함

- 프로토타입 메서드 내부인 1.
- ┣ `this` : `메서드를 호출하기 위한 객체`
- ┣ (위 예제의 경우 `prefixer 객체`)를 가리킴
- ┣ 그러나 : `Array.prototype.map의 인수로 전달된`
- ┣ 콜백 함수의 내부인 -2- 에서 `this`
- ┣ `undefined를 가리킴`
- ┣ 이는 : `Array.prototype.map` 메서드가
- ┗ 콜백 함수를 `일반 함수로서 호출`하기 때문

> Array.prototype.map 메서드

    Array.prototype.map 메서드 :
    ┣ 배열을 순회하며 배열의 각 요소에 대하여
    ┣ 인수로 전달된 콜백 함수를 호출함
    ┣ 그리고 콜백 함수의 반환값들로 구성된
    ┗ 새로운 배열을 반환하게 됨

- 22장 this에서 보았듯
- ┣ 일반 함수로서 호출되는 모든 함수 내부의 this :
- ┣ 모든 함수 내부의 this는 전역 객체를 가리킴
- ┣ 그런데 `클래스 내부의 모든 코드`에서
- ┗ `strict mode가 암묵적으로 적용`됨

- 따라서 : Array.prototype.map 메서드의 콜백 함수에도
- ┣ `strict mode가 자동으로 적용`되게 됨
- ┣ strict mode에서 `일반 함수로서 호출`된
- ┣ 모든 함수 내부의 `this에는 전역 객체가 아닌`
- ┣ `undefined가 바인딩`되기 때문에
- ┣ 일반 함수로서 호출되는 `Array.prototype.map`
- ┗ `메서드의 콜백 함수 내부의 this에는 undefined가 바인딩`

- 이때 발생하는 문제가 바로 콜백 함수 내부의 this 문제임
- ┣ 즉 : `콜백 함수의 this(2)`와 `외부 함수의 this(1)`이
- ┣ `서로 다른 값을 가리키고 있기 때문`에
- ┣ TypeError가 발생하게 된 것
- ┗ 그렇기에 `ES6는 다음과 같은 방법을 제시`

1. add 메서드를 호출한 prefixer 객체를 가리키는 일단

- ┗ 회피를 시키고 나서 콜백 함수 내부에서 사용함

```js
add(arr) {
    // this를 일단 회피
    const that = this;
    return arr.map(function (item) {
        // this 대신 that을 참조
        return that.prefix + ' ' + item;
    })
}
```

2. `Array.prototype.map`의 `두 번째 인수`로

- ┣ add 메서드를 호출한 prefixer 겍채를 가리키는
- ┗ `this를 전달함`

- ES5에서 도입된 `Array.prototype.map` :
- ┣ "콜백 함수 내부의 this 문제"를 해결하기 위해
- ┣ `두 번째 인수로 콜백 함수 내부`에서
- ┗ `this로 사용할 객체를 전달 가능`함

```js
add(arr) {
    return arr.map(function (item) {
        return this.prefix + ' ' + item;
    }, this);
    // this에 바인딩된 값이 콜백 함수 내부의
    // this에 바인됭됨
}
```

3. Function.prototype.bind 메서드를 사용하여서

- ┣ add 메서드를 호출한 prefixer 객체를 가리키는
- ┗ this를 바인딩함

```js
add(arr) {
    return arr.map(function (item) {
        return this.prefix + ' ' + item;
    }.bind(this));
}
```

- ES6에서는 화살표 함수를 사용하여
- ┗ 콜백 함수 내부의 this 문제를 해결할 수 있음

```js
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map((item) => this.prefix + item);
	}
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select'];
```

- 화살표 함수 : `함수 자체의 this 바인딩을 갖지 않음`
- ┣ 따라서 `화살표 함수 내부에서 this를 참조`하면
- ┣ 상위 스코프의 this를 그대로 참조함
- ┣ 이를 `lexical this라고 함`
- ┣ 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가
- ┗ `함수가 정의된 위치에 의해 결정된다는 것`을 의미

- 화살표 함수를 제외한 모든 함수 : this 바인딩이 반드시 존재
- ┣ ES6에서 화살표 함수가 도입 되기 이전에는
- ┣ 일반적인 식별자처럼 스코프 체인을 통해
- ┣ this 탐색할 필요가 없었음

- ┣ 하지만 : `화살표 함수는 함수 자체의 this 바인딩 존재 X`
- ┣ 화살표 함수 내부 → `this 참조하면 일반적인 식별자`처럼
- ┣ `스코프 체인`을 통해 `상위 스코프에서 this를 탐색`
- ┣ 화살표 함수를 `Function.prototype.bind`를 `사용`하여
- ┗ 표현하면 다음과 같음

```js
// 화살표 함수 : 상위 스코프의 this를 참조함
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입함
// 위 화살표 함수와 동일하게 동작함.
(function () {
	return this.x;
}.bind(this));
```

- 만약 화살표 함수, 화살표 함수가 중첩된 경우
- ┣ 상위 화살표 함수에도 this 바인딩이 없음
- ┣ 스코프 체인 상에서 가장 가까운 상위 함수 중에서
- ┗ 화살표 함수가 아닌 함수의 this를 참조하게 됨

> 화살표 함수 중첩 → 스코프 체인 상위의 this를 참조

```js
// 중첩 함수 foo의 상위 스코프 : 즉시 실행 함수
// 따라서 화살표 함수 foo의 상위 스코프인
// 즉시 실행 함수의 this를 가리킴
(function () {
	const foo = () => console.log(this);
	foo();
}.call({ a: 1 })); // { a: 1 }

// bar 함수는 화살표 함수를 반환함
// bar 함수가 반환한 화살료 함수의
// 상위 스코프 : 화살표 함수 bar임
// 하지만 : 화살표 함수 : 함수 자체의 this
// 바인딩을 가지지 않으므로
// bar 함수가 반환한
// 화살표 함수 내부에서 참조하는 this :
// 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킴
(function () {
	const bar = () => () => console.log(this);
	bar()();
}.call({ a: 1 })); // {a: 1}
```

- 만약 화살표 함수 : `전역함수`라면
- ┣ `화살표 함수의 this` : `전역 객체를 가리킴`
- ┣ 전역 함수의 `상위 스코프` : `전역`이고
- ┗ `전역에서 this` : `전역 객체`를 가리키기 때문

```js
// 전역 함수 foo의 상위 스코프 :
// 전역이기 때문에 화살표 함수 foo의
// this → 전역 객체를 가리킴
const foo = () => console.log(this);
foo(); // window
```

- 프로퍼티에 `할당한 화살표 함수`도
- ┣ `스코프 체인 상에서 가장 가까운 상위 함수 중`에서
- ┗ `화살표 함수가 아닌 함수의 this`를 `참조`함

```js
// increase 프로퍼티에 할당한 화살표 함수의
// 상위 스코프 : 전역
// 따라서 increase 프로퍼티에 할당한 화살표 함수의
// this : 전역 객체를 가리킴
const counter = {
    num : 1,
    increase: () => ++this.num;
};

console.log(counter.increase()); // NaN
```

- 화살표 함수 : 함수 자체의 this 바인딩 가지지 않음
- ┣ 고로 `Function.prototype.call,`
- ┣ `Function.prototype.apply`
- ┣ `Function.prototype.bind`
- ┣ 메서드를 사용해도 화살표 함수 내부의
- ┗ `this를 교체할 수 없음`!!!

```js
window.x = 1;

const normal = function () {
	return this.x;
};
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 })); // 1
```

- 이 이야기가 화살표 함수 자체가
- ┣ `Function.prototype.call`
- ┣ `Function.prototype.apply`
- ┣ `Function.prototype.bind`
- ┣ 메서드를 호출할 수 없다는 의미가 아님
- ┣ 화살표 함수 자체의 this 바인딩을 갖지 않기 때문에
- ┣ this를 교체 할 수 없고 언제나 `상위 스코프의 this`
- ┗ `바인딩을 참조한다는 점을 기억!!!`

```js
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)()); // 3
```

- 메서드를 `화살표 함수로 정의하는 것은 피해야함`
- ┣ `화살표 함수로 메서드를 정의`하여 보면
- ┣ 여기서 말하는 메서드 : `ES6 메서드가 아닌`
- ┗ `일반적인 의미의 메서드`를 의미

```js
// Bad
const person = {
	name: 'Lee',
	sayHi: () => console.log(`Hi ${this.name}`),
};

// sayHi 프로퍼티에 할당된 화살표 함수
// 내부의 this : 상위 스코프인 전역의 this가 가리키는
// 전역 객체를 가리키므로 이 예제를 브라우저를 실행하게 되면
// window.name과 같음
// 전역 객체 window → 빌트인 프로퍼티 name이 조재
person.sayHi(); // hi
```

- 위 예제의 경우 프로퍼티에 할당한 화살표 함수
- ┣ 내부의 this : 메서드를 호출한 객체인 person을 가리키지 X
- ┣ 상위 스코프인 전역인 this가 가리키는 `전역 객체를 가리킴`
- ┣ 따라서 : `화살표 함수로 메서드를 정의하는 것`은
- ┣ `바람직한 방법이 아님`
- ┣ 메서드를 정의할 때는 `ES6 메서드 축약 표현으로 정의`한
- ┗ `ES6 메서드를 사용`하는 것이 `좋음`

```js
// Good
const person = {
	name: 'Lee',
	sayHi() {
		console.log(`Hi ${this.name}`);
	},
};

person.sayHi(); // Hi Lee
```

- 프로토타입 객체의 `프로퍼티에`
- ┣ `화살표 함수를 할당`하는 것도
- ┗ 동일한 문제가 발생하게 됨

```js
// Bad
function person(name) {
	this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person('Lee');
// 이 예제를 브라우저에서 실행하면 window.name과 같음
person.sayHi(); // Hi
```

- 프로퍼티를 `동적 추가` :
- ┣ `ES6 메서드`를 정의를 `사용할 수 없으므로`
- ┗ `일반 함수를 할당`하게 됨

```js
// Good
function Person(name) {
	this.name = name;
}

Person.prototype.sayHi = function () {
	console.log(`Hi ${this.name}`);
};

const person = new Person('Jang');
person.sayHi(); // Hi Jang
```

- `클래스 필드 정의 제안을 사용`하여
- ┗ `클래스 필드`에 `화살표 함수를 할당 가능`

```js
// Bad
class Person {
	// 클래스 필드 정의 제안
	name = 'Lee';
	sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Lee
```

- 이때 : `sayHi 클래스 필드에 할당한 화살표 함수 내부`에서
- ┣ `this를 참조`하게 되면
- ┣ 상위 스코프의 `this 바인딩을 참조`하게 됨
- ┣ 그렇다면 sayHi `클래스 필드 상위 스코프`??
- ┗ `sayHi 클래스 필드` : `인스턴스 프로퍼티` 이므로 다음과 같음

```js
class Person {
	constructor() {
		(this.name = 'Jang'),
			// 클래스가 생성한 인스턴스(this)의
			// sayHi 프로퍼티에 화살표 함수를 할당함
			// 따라서 : sayHi 프로퍼티는 인스턴스 프로퍼티임
			(this.sayHi = () => console.log(`Hi ${this.name}`));
	}
}
```

- sayHi 클래스 필드에 할당한 화살표 함수의
- ┣ 상위 스코프 : `사실 클래스 외부`임
- ┣ `this`는 `클래스 외부의 this를 참조하지 않고`
- ┣ `클래스가 생성할 인스턴스를 참조`함
- ┣ 따라서 : sayHi 클래스 필드에 할당한 `화살표 함수 내부`에서
- ┣ 참조한 `this : constructor 내부의 this 바인딩과 같음`

- ┣ `constructor 내부의 this 바인딩` :
- ┣ 클래스가 `생성한 인스턴스를 가리킴`
- ┣ `sayHi 클래스 필드에 할당한 화살표 함수 내부`의
- ┣ this 또한 `클래스가 생성한 인스턴스를 가리킴`
- ┣ 하지만 : `클래스 필드에 할당`한
- ┣ `화살표 함수` : `프로토타입 메서드가 아니라`
- ┣ `인스턴스 메서드`가 됨
- ┣ 따라서 : `메서드를 정의`할 때
- ┗` ES6 메서드 축약 표현으로 정의`한 `ES6 메서드를 사용하는 것이 좋음`

```js
// Good
class Person {
	// 클래스 필드 정의
	name = 'Jang';

	sayHi() {
		console.log(`Hi My name is ${this.name}`);
	}
}
const person = new Person();
person.sayHi(); // Hi Lee
```

### 26.3.4 super

- 화살표 함수 : 함수 자체의 `super 바인딩을 가지지 않음`
- ┣ 따라서 : 화살표 함수 내부에서 super를 참조하면
- ┗ this와 마찬가지로 `상위 스코프의 super를 참조`함

> 화살표 함수의 super, this 동일하게 상위 스코프 참조

```js
class Base {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		return `Hi! ${this.name}`;
	}
}

class Derived extends Base {
	// 화살표 함수의 super :
	// 상위 스코프인 constructor의 super를 가리킴
	sayHi = () => `${super.sayHi()} how are you doing`;
}

const derived = new Derived('Jang');
console.log(derived.sayHi()); // Hi Jang ~~~
```

- `super` : `내부 슬롯 [[HomeObject]]를 갖는`
- ┣ `ES6 메서드` 내에서만 사용할 수 있는 키워드임
- ┣ sayHi 클래스 필드에 할당한 화살표 함수 :
- ┣ `ES6 메서드는 아니지만` 함수 자체의 `super 바인딩을 갖지`
- ┣ 않게 되므로 super를 참조해도 `에러가 발생하지 않고 `
- ┣ this와 마찬가지로 클래스 필드에 할당한 `화살표 함수 내부에서`
- ┣ `super를 참조`하게 되면 `constructor 내부의 super 바인딩을 참조`함
- ┗ 위 예제 : `Derived 클래스 constructor 생략 → 암묵적 생성`

### 26.3.5 arguments

- 화살표 함수 : `함수 자체의 arguments 바인딩을 갖지 않음`
- ┣ 따라서 → 화살표 함수 내부에서 arguments 참조
- ┗ `this, super와 동일하게 상위 스코프를 참조`하게 됨

```js
(function()) {
    // 화살표 함수 foo의 arguments는 상위 스코프인
    // 즉시 실행 함수의 arguments를 가리킴
    const foo = () => console.log(arguments);// [Arguments] { '0' : 1, '1', 2}
    foo(3, 4);
}(1, 2);

// 화살표 함수 foo의 arguments는
// 상위 스코프인 전역의 arguments를 가리킴
// 하지만 전역에는 arguments 객체가 존재하지 않음
// arguments 객체는 함수 내부에서만 유효함
const foo = () => console.log(arguments);
foo(1, 2);// ReferenceError: arguments is not defined
```

- arguments 프로퍼티에서 살펴보았듯
- ┣ arguments 객체 : 함수를 정의할 때
- ┣ `매개변수의 개수를 확정할 수 없는`
- ┣ `가변 인자 함수를 구현할 때 유용함`

- ┣ 하지만 화살표 함수 → `arguments 객체 사용 불가`
- ┣ 상위 스코프인 arguments 객체를 참조할 수 있지만
- ┣ 화살표 함수 자신에게 전달된 인수 목록을 확인 불가
- ┣ `상위 함수에게 전달된 인수 목록을 참조`하므로
- ┗ `그다지 도움이 되지 않음`

> 고로 : 화살표 함수로 가변 인자 구현

    Rest 나머지 연산자
    ┗ 파라미터를 사용하여 구현

## Rest 파라미터

### 26.4.1 기본 문법

- Rest 파리미터(나머지 매개변수) :
- ┣ 매개변수 이름 앞에 `세개의 점 ...을 붙여서`
- ┗ 정의한 매개변수를 의미함

> Rest 파리미터 : 함수에 전달된 인수들의 목록을

    배열로 전달받게 됨

```js
function foo(...rest) {
	// 매개변수 rest: 인수들의 목록을
	// 배열로 전달받는 Rest 파라미터임
	console.log(rest); // [1, 2, 3, 4,5]
}

foo(1, 2, 3, 4, 5);
```

- 일반 매개변수와 Rest 파라미터는 함께 사용 가능함
- ┣ 이때 : 함수에 전달된 인수들은
- ┗ `매개변수`와 `Rest 파라미터`에 `순차적으로 할당`됨

```js
function foo(param, ...rest) {
	console.log(param); // 1
	console.log(rest); // [2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
	console.log(param1); // 1
	console.log(param2); // 2
	console.log(rest); // [3, 4, 5]
}

bar(1, 2, 3, 4, 5);
```

- Rest 파라미터 : 이름 그대로 먼저 선언된
- ┣ 매개변수에 할당된 인수를 `제외한 나머지 인수`들로
- ┣ 구성된 배열이 할당됨
- ┗ 따라서 Rest 파라미터 : `반드시 마지막 파라미터야 함`

```js
function foo(...rest, p1, p2) {}

foo(1, 2, 3, 4);
// SyntaxError: Rest ~~~
```

> Rest 파라미터는 단 하나만 선언 가능

- `Rest 파라미터` :
- ┣ 함수 정의 시 선언한 `매개변수 개수를 나타내는`
- ┗ 함수 객체의 `length 프로퍼티에 영향을 주지 않음`

```js
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(bax.length); // 2
```

### 26.4.2 Rest 파라미터와 arguments 객체

- ES5에서는 함수를 정의할 때
- ┣ 매개변수의 개수를 확정할 수 없는 가변 인자 함수의 경우
- ┣ 매개변수를 통해 인수를 전달받는 것이 불가능 하므로
- ┗ arguments 객체를 활용하여 인수를 전달 받았음

- arguments 객체 : 함수 호출 시 전달된 인수(argument)들의
- ┣ 정보를 담고 있는 순회 가능한 `유사 배열 객체(array-like object)`이며
- ┗ `함수 내부에서 지역 변수처럼 사용할 수 있음`

```js
// 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
function sum() {
	// 가변 인자 함수 : arguments 객체를 통해
	// 인수를 전달 받게 됨
	console.log(arguments);
}

sum(1, 2); // {length: 2, '0' : 1, '1':2}
```

- 하지만 : arguments 객체는 배열이 아닌 유사 배열 객체이므로
- ┣ 배열 메서드를 사용하려면
- ┣ Function.prototype.call
- ┣ Function.prototype.apply
- ┣ 메서드를 통해서 arguments 객체를 배열로 변환해야 하는
- ┗ 번거로움이 존재함

```js
function sum() {
	// 유사 배열 객체인 arguments 객체를 배열로 변환
	var array = Array.prototype.slice.call(arguments);

	return array.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

- ES6 에서는 `rest 파라미터를 사용`하여
- ┣ `가변 인자 함수의 인수 목록을 배열`로
- ┣ `직접 전달받을 수 잇음`
- ┣ 이를 통해 `유사 배열 객체인 arguments 객체`를
- ┗ `배열로 변환하는 번거로움을 피할 수 있음`

```js
function sum(...args) {
	// Rest 파라미터 args에 배열 [1, 2, 3, 4, 5]가 할당
	return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

- 함수와 ES6 파라미터와 `arguments 객체를 모두 사용 가능`
- ┣ 하지만 화살표 함수 : 함수 자체의 arguments 객체를 갖지 않음
- ┣ 따라서 화살표 함수로 가변 인자 함수를 구현 하는 경우
- ┗ `반드시 Rest 파라미터를 사용`하도록 함

## 26.5 매개변수 기본값

- 함수를 호출할 때 매개변수의 개부만큼
- ┣ 인수를 전달하는 것이 바람직
- ┣ But: 그렇지 않은 경우에도 에러가 발생하지 않음
- ┣ 이는 JS 엔진이 매개변수의 개수와
- ┗ `인수의 개수를 체크하지 않기 때문`임

- 인수가 전달되지 않은 매개변수의 값 :
- ┣ undefined 임
- ┣ 이를 방치하면 다음 예제에 같이 의도치 않은
- ┗ `결과가 발생할 수 있음`

```js
function sum(x, y) {
	return x + y;
}

console.log(sum(1)); // NaN
```

- 따라서 : 다음 예제와 같이 `매개변수에 인수가 전달되었는지 확인`하여
- ┣ 인수가 전달되지 않은 경우 `매개변수에 기본값을 할당할 필요 있음`
- ┗ 즉 : `방어 코드가 필요`함

```js
function sum(x, y) {
	// 인수가 전달되지 않아 매개변수의 값이
	// undefine인 경우 기본값을 할당함
	x = x || 0;
	y = y || 0;

	return x + y;
}
console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

> ES6에서 도입된 매개변수의 기본값을 사용하면
> 함수 내에서 수행하던 인수 체크 및 초기화 간소화 가능

```js
function sum(x = 0, y = 0) {
	return x + y;
}
console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

- 매개변수 기본값 : 1. `매개변수에 인수를 전달하지 않은 경우`와
- ┗ 2. `undefined를 전달한 경우`에만 `유효`함

```js
function logName(name = 'Jang') {
	console.log(name);
}

logName(); // Jang
logName(undefined); // Jang
logName(null); // null
```

> Rest 파라미터에는 기본값 지정 불가

```js
function foo(...rest = []) {
    console.log(rest);
}
// SyntaxError
```

- 매개변수 기본값 : 함수 정의 시 선언한 매개변수 개수를
- ┣ 나타내는 함수 객체의 length 프로퍼티와
- ┗ arguments 객체에 아무런 영향을 주지 않음

```js
function sum(x, y = 0) {
	console.log(arguments);
}

console.log(sum.length); // 1

sum(1); // Arguments{'0': 1}
sum(1, 2); // Arguments{'0' : 1, '1': 2}
```
