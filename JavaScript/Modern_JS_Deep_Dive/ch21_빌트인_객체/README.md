# 21. 빌트인 객체

## 목차

- [21. 빌트인 객체](#21-빌트인-객체)
  - [목차](#목차)
  - [21.1 자바스크립트 객체의 분류](#211-자바스크립트-객체의-분류)
  - [21.2 표준 빌트인 객체](#212-표준-빌트인-객체)
  - [21.3 원시값과 래퍼 객체](#213-원시값과-래퍼-객체)
  - [21.4 전역 객체](#214-전역-객체)
    - [21.4.1 빌트인 전역 프로퍼티](#2141-빌트인-전역-프로퍼티)
      - [Infinity](#infinity)
      - [NaN](#nan)
      - [undefined](#undefined)
    - [21.4.2 빌트인 전역 함수](#2142-빌트인-전역-함수)
      - [eval](#eval)
      - [isFinite](#isfinite)
      - [isNaN](#isnan)
      - [parseFloat](#parsefloat)
      - [parseInt](#parseint)
      - [encodeURI / decodeURI](#encodeuri--decodeuri)
      - [encodeURIComponent / decodeURIComponent](#encodeuricomponent--decodeuricomponent)
    - [21.4.3 암묵적 전역](#2143-암묵적-전역)

## 21.1 자바스크립트 객체의 분류

1. 표준 빌트인 객체 (standard build-in objects)

- ┗ native objects/ global objects

- `표준 빌트인 객체` : `ECMAScript 사양에 정의된 객체`를 뜻함
- ┣ 애플리케이션 `전역의 공통 기능을 제공`함
- ┣ `ECMAScript 사양에 정의된 객체`이기 때문에
- ┣ JS 실행 환경(브라우저, Node.js)에 상관없이 모두 사용 가능
- ┗ 표준 빌트인 객체 : `전역 객체의 프로퍼티`로서 제공

> 별도의 선언 없이 전역 변수처럼 언제나 참조가 가능함

2. 호스트 객체 (host objects)

- `호스트 객체` : `ECMAScript 사양에 정의되어 있지 않지만 `
- ┣ JS 실행 환경(브라우저, NOde.js)에서 `추가로 제공하는 객체`
- ┣ 브라우저 환경 : `DOM, BOM, Canvas, XMLHttpRequest, fetch, SVG,`
- ┣ `WebStorage, Web Component, Web Worker` 같은 `클라이언트 사이드 Web API`
- ┗ Node.js 환경에서는 NOde.js 고유 API를 호스트 객체로 사용하게 됨

3. 사용자 정의 객체(user-defined objects)

- 사용자 정의 객체 : 표준 필트인 객체나 호스트 객체가 아닌
- ┗ 사용자가 직접 정의한 객체를 의미

## 21.2 표준 빌트인 객체

- JS는 `Object, String, Number, Boolean, Symbol, Date, Math,`
- ┣ `RegExp, Array, Map/Set, WeakMap, WeakSet, Function,`
- ┗ `Promise, Reflect, Proxy, JSON, Error` 등의 40여개 표준 빌트인 객체 제공

- `MATH, Reflect, JSON을 제외한 표준 빌트인 객체` :
- ┣ 모두 `인스턴스를 생성 가능`한 `생성자 함수 객체`임
- ┣ `생성자 함수 객체인 표준 빌트인 객체` :
- ┣ `프로토타입 메서드`와 `정적 메서드`를 제공
- ┣ 생성자 함수 객체가 아닌 `표준 빌트인 객체` :
- ┗ `정적 메서드만 제공`

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj);

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현) 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp);
```

- `생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로포토타입` :
- ┣ 표준 빌트인 객체의 `prototype 프로퍼티에 바인딩된 객체`
- ┣ 표준 빌트인 객체인 `String을 생성자 함수로서 호출`하여
- ┗ 생성한 String 인스턴스의 프로토타입 : `String.prototype`

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String({"Lee"})

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토토입은 String.prototype
console.log(Object.getPrototypeOf(strObj)) === String.prototype) // true
```

- 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체
- ┣ ex ) `String.prototype`는 다양한 기능의
- ┣ `빌트인 프로토타입 메서드를 제공`
- ┣ `표준 빌트인 객체` : `인스턴스 없이도 호출 가능한 빌트인`
- ┗ `정적 메서드를 제공`하게 됨

```js
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); //Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드
// NUmber.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드임
// Number.isInteger는 인수가 정수(integer)인지 검사 Boolean 반환
console.log(Number.isInteger(0.5)); // false
```

## 21.3 원시값과 래퍼 객체

- `문자열이나 숫자, 불리언 등의 원시값이 있는데도`
- ┣ 문자열, 숫자, 불리언 객체를 생성하는
- ┗ String, Number, Boolean 등의 표준 빌트인 `생성자 함수가 존재하는 이유`

- 원시값 : 객체가 X → 프로퍼티나 메서드를 가 수 없는데도
- ┗ 마치 객체처럼 동작

```js
const str = 'hello';

// 원시 타입인 문자열 : 프로퍼티와 메서드를 갖고 있는 객체처럼 동작
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```

- 이는 원시값인 문자열, 숫자, 불리언의 경우
- ┣ 원시값에 대해 `마침표 표기법(또는 대괄호)`으로 접근하면
- ┗ `JS엔진이 일시적으로 원시값을 연관된 객체로 변환`

- 즉 : 원시값을 객체처럼 사용 → 암묵적으로 연관된 객체를 생성
- ┣ `생성된 객체로 프로퍼티에 접근, 메서드를 호출`하고 다시
- ┗ `원시값으로 되돌림`

> 문자열, 숫자, 불리언 값에 접근 생성 객체 → 래퍼 객체(wrapper object)

- ex ) 문자열에 대해 마침표 표기법 접근
- ┣ `래퍼 객체인 String 생성자 함수의 인스턴스가 생성`
- ┗ 문자열의 경우 리패 객체 `[[StringData]]` 내부 슬록에 할당

```js
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환
console.log(str.length); //2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후
// 다시 원시값으로 되돌림
console.log(typeof str); // string
```

> 문자열 래퍼 객체인 String 생성자 함수의 인스턴스 :
> String.prototype의 메서드를 상속받아 사용가능

- 그 후 래퍼 객체의 처리가 종료되면
- ┣ 래퍼 객체의 `[[StringData]]` 내부 슬롯에 할당된 원시값으로
- ┣ 원래의 상태 → `식별자가 원시값을 갖도록 되돌리고`
- ┗ `래퍼 객체 : 가비지 컬렉션의 대상이 됨`

```js
// 1. 식별자 str은 문자열을 값으로 가지고 있음
const str = 'hi';

// 2. 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리크미
// 식별자 str 값 → [[StringData]] 내부 슬롯에 할당
// 래퍼 객체의 name 프로퍼티가 동적 추가
str.name = 'Lee';

// 3. 식별자 str은 다시 원래의 문자열
// 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값 찾음
// 이때 2에서 생성된 래퍼 객체는 아무런 참조를 하지 않은 상태
// 가비지 컬렉션의 대상이 됨

// 4. 식별자 str은 새롭게 암묵적으로 생성된(2와 다른) 래퍼 객체를 가르킴
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않음
console.log(str.name); //undefined

// 5. 식별자 str은 다시 원래의 문자열
// 즉 : 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 가짐
// 이때 4에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로
// 가비지 컬렉션의 대상이 됨
console.log(typeof str, str); // string hello
```

- 숫자 값도 마찬가지임
- ┣ 숫자 값에 대한 마침표 표기법 접근 →
- ┣ 래퍼 객체인 Number 생성자 함수의 인스턴스가 생성되고
- ┣ 숫자는 래퍼 객체의 `[[NumberData]]` 내부 슬롯에 할당
- ┣ 이때 래퍼 객체인 Number 객체는 당연히
- ┣ Number.prototype 메서드를 상속받아 사용가능
- ┗ 사용 종료시 → 가바지 컬렉션의 대상

> 불리언 값도 동일하지만 메서드로 호출되는 경우는 적으므로 유용 X

- ES6에서 새롭게 도입된 원시값인 `Symbol` : 레퍼 객체를 생성
- ┣ 심벌 : 일반적인 원시값과 달리 → 리터럴 표기법으로 생성할 수 없고
- ┗ `Symbol` 함수를 통해 생성해야 하므로 다른 원시값과 차이점이 존재

- 이처럼 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해
- ┣ 마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체인 String, Number, Boolean,
- ┗ Symbol의 프로토타입 메서드 또는 프로퍼티를 참조가능 함
- 고로 `String, Number, Boolean 생성자 함수`를 `new 연산자와 함께 호출`하여
- ┣ 숫자, 불리언 인스턴스를 `생성할 필요가 없으며, 권장 X`
- ┗ Symbol은 생성자 함수가 아니므로 논의에서 제외

- 문자열, 숫자, 불리언, 심벌 이외의 원시값
- ┣ 즉 : null, undefined는 래퍼 객체를 생성하지 않음
- ┗ null, undefined를 객체처럼 사용하면 에러가 발생

## 21.4 전역 객체

- 전역 객체(global object) : 코드가 실행되기 이전 단계에
- ┣ JS엔진에 의해 어떤 객체보다도 먼저 생성되는
- ┗ `특수한 객체`, 어떤 객체에도 속하지 않는 `최상위 객체`

- `전역 객체` : JS 환경에 따라 지칭하는 이름이 제각각
- ┣ `브라우저` 환경 : `window(또는 self, this, frames)가 전역 객체`
- ┗ `Node.js` 환경 : `global이 전역 객체`를 가르킴

> globalThis

    - ES11(ECMAScript11)에서 도입된
    - ┣ globalThis : 브라우저 환경, Node.js 환경에서
    - ┣ 분리되어 잇던 다양한 식별자를 통일 시킴
    - ┗ 표준 사양 → 모든 환경에서 사용가능

- 전역 객체 : 1. `표준 빌트인 객체` : (Object, String, Number,
- ┣ Function, Array)와 2. 환경에 따른 `호스트 객체` :
- ┣ `(클라이언트 Web API, Node.js 호스트 API)`
- ┗ 3.` var 키워드로 선언한 전역 변수와 전역함수`를 프로퍼티로 가짐

- 즉 : `전역 객체` : `계층적 구조상 어떤 객체에도 속하지 않은`
- ┣ `모든 빌트인 객체`(표준 빌트인 객체와 호스트 객체의 최상위 객체)
- ┣ 전역 객체가 최상위 객체라는 것 : `프로토타입 상속 관계상`에서
- ┗ `최상위 객체라는 의미가 아님`

- `전역 객체 자신` : `어떤 객체의 프로퍼티도 아니며`
- ┣ 객체의 `계층적 구조상` `표준 빌트인 객체`, `호스트 객체`를
- ┗ `프로퍼티로 소유`한다고 보면 됨

- 전역 객체의 특징
- ┣ 1. 전역 객체는 개발자가 의도적으로 생성 불가
- ┗ 즉 : 전역 객체 생성할 수 있는 생성자 함수 제공 X
- ┣ 2. `전역 객체의 프로퍼티를 참조`할 때
- ┗ `window(또는 global)`를 생략 가능함

```js
// 문자열 'F'를 16진수로 해석하여 10진수로 변환하여 변환
window.parseInt('F', 16); // 15
parseInt('F', 16); // 15

window.parseInt === parseInt; // true
```

- ┣ 3. `전역 객체` : Object, String, Number, RegExp, ... 등의
- ┗ `모든 표준 빌트인 객체를 프로퍼티로 가지고 있음`
- ┣ 4. `JS 실행 환경(브라우저, Node.js)에 따라`
- ┣ 추가적으로 `프로퍼티와 메서드를 가짐`
- ┣ `브라우저` : `클라이언트 사이드 Web API`
- ┗ `Node.js` : `고유의 API 호스트 객체로 가짐`
- ┣ 6. `var 키워드로 선언한 전역 변수`와
- ┣ 선언하지 않은 변수에 `값을 할당한 암묵적 전역`
- ┗ `전역 함수` : `전역 객체의 프로퍼티`가 됨

```js
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선안하지 않은 변수에 값을 암묵적 전역
// bar : 전역 변수가 아닌 전역 객체의 프로ㅓ티
bar = 2; // window.bar = 2;
console.log(window.bar); // 2

// 전역 함수
function baz() {
	return 3;
}
console.log(window.baz()); // 3
```

- ┣ 7. `let, const 키워돌 선언한 전역 변수` :
- ┣ `전역 객체의 프로퍼티가 아님`
- ┣ 즉 : window.foo와 같이 `접근할 수 없음`
- ┣ let이나 const 키워드로 선언한 `전역 변수는 보이지 않는`
- ┗ `개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내 존재`

```js
let foo = 123;
console.log(window.foo); // undefined
```

- ┣ 8. `브라우저 환경의 모든 JS 코드는 하나의 전역 객체`
- ┣ window를 공유하게 됨
- ┣ 여러 개의 `script 태그를 통해 JS 코드를 분리`해도
- ┣ 하나의 전역 객체 `window를 공유하는 것은 변함이 없음`
- ┗ 분리되어 있는 JS 코드가 하나의 전역을 공유한다는 의미

> 전역 객체는 몇 가지 프로퍼티와 메서드를 가지고 있음
> 전역 객체의 프로퍼티와 메서드 : 전역 객체를 가리키는 식별자
> window, global 생략 가능

### 21.4.1 빌트인 전역 프로퍼티

- 빌트인 전역 프로퍼티(built-in global property) :
- ┣ 객체의 프로퍼티를 의미
- ┗ 애플리케이션 전역에서 사용하는 값을 제공

#### Infinity

- Infinity 프로퍼티 : 무한대를 나타내는 숫자값을 가짐

```js
// 전역 프로퍼티 : window를 생략하고 참조 가능
console.log(window.Infinity === Infinity); //true

// 양의 무한대
console.log(3 / 0); // Infinity
// 음의 무한대
console.log(-3 / 0); // -Infinity
// Infinity는 숫자값
console.log(typeof Infinity); // number
```

#### NaN

- NaN 프로퍼티 : 숫자가 아님(Not-a-Number)을 나타내는
- ┣ 숫자값 NaN을 가짐
- ┗ NaN 프로퍼티는 Number.NaN 프로퍼티와 같음

```js
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN); // number
```

#### undefined

- undefined 프로퍼티 : 원시 타입 undefined 값으로 가짐

```js
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### 21.4.2 빌트인 전역 함수

- 빌트인 전역 함수 `built-in global function`
- ┣ 애플리케이션 전역에서 호출할 수 있는
- ┗ 빌트인 함수로서 전역 객체의 메서드임

#### eval

- eval 함수 : 자바스크립트 코드를 나타내는 문자열을 인수로 전달받음
- ┣ 전달받은 문자열 코드가 표현식 → eval 함수 :
- ┣ 문자열 코드를 런타임에 평가하여 값을 생성
- ┣ 전달받은 인수가 표현식 아닌 문 →
- ┣ eval 함수 : 문자열 코드를 런타임에 실행
- ┣ 문자열 코드가 여러 개의 문으로 이루어져 있다면
- ┗ 모든 문을 실행

```js
/**
 * 주어진 문자열 코드를 런타임에 평가 또는 실행
 * @params {string} code - 코드를 나타내는 문자열
 * @returns {*} 문자열 코드를 평가 / 실행한 결과값
 */
eval(code);
```

```js
// 표현식인 문
eval(`1 + 2;`); // 3
// 표현식이 아닌 문
eval('var x = 5;'); // undefined

// eval 함수에 의해 런타임에 변수 선언문이 실행되어
// x 변수가 선언되엇음
console.log(x); // 5

// 객체 리러털은 반드시 괄호로 둘러쌈
const o = eval('({a: 1})');
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 둘러쌈
const f = eval('(function() {return 1;})');
console.log(f()); // 1
```

- `인수로 전달받은 문자열 코드`가
- ┣ 여러 개 문으로 이루어져 있다면 →
- ┣ 1. `모든 문을 실행`하고
- ┗ 2. `마지막 결과값 반환`

- eval 함수 : 자신이 호출된 위치에 해당하는
- ┗ 기존의 스코프를 런타임에 동적으로 수정

```js
const x = 1;

function foo() {
	// eval 함수는 런타임에 foo 함수의 스코프를 동적으로 수정함
	eval('var x = 2;');
	console.log(x); // 2
}

foo();
console.log(x); // 1
```

- 위 예제의 eval 함수는 새로운 변수 x 변수를 선언하면서
- ┣ foo 함수의 스코프에 선언된 x 변수를 동적으로 추가함
- ┣ 함수가 호출되면 런타임 이전에 먼저 함수 몸체 내부의 모든
- ┣ 선언문을 먼저 실행 후 → 그 결과를 스코프에 등록

- 위 예제의 eval 함수가 호출되는 시점에는
- ┣ 이미 foo 함수의 스코프가 존재함
- ┣ eval 함수 : 기존의 스코프를 런타임에 동적으로 수정
- ┣ eval 함수에 전달된 코드는 이미 그 위치에 존재하던
- ┣ 코드처럼 동작
- ┗ eval 함수가 호출된 foo 함수의 스코프에서 실행됨

```js
const x = 1;

function foo() {
	'use strict';

	// strict mode에서 eval 함수는 기존의 스코프를 수정하지 않고
	// eval 함수 자신의 자체적인 스코프를 생성
	eval('var x = 2; console.log(x);'); // 2
	console.log(x);
}

foo();
console.log(x); // 1
```

- 또한 전달받은 문자열 코드가 `let`, `const 키워드`를 사용한
- ┗ 변수 선언문이라면 `암묵적으로 strict mode가 적용됨`

```js
const x = 1;

function foo() {
	eval(`var x = 2; console.log(x);`); //  2
	// let, const 키워드를 사용한 변수 선언문은 strict mode가 적용됨
	eval(`const x = 3; console.log(x);`);
	console.log(x); // 2
}

foo();
console.log(x); // 1
```

- eval 함수를 통해 사용자로부터 입력받은
- ┣ 콘텐츠(untrusted data)를 실행하는 것은 `보안에 매우 취약함`
- ┣ 또한 eval 함수를 통해 실행되는 코드 :
- ┣ `JS엔진에 의한 최적화가 수행되지 않기` 때문에
- ┗ `eval 함수의 사용은 금지해야 함`

#### isFinite

- 전달받은 인수가 `정상적인 유한수인지 검사`하여
- ┣ `유한수 : true`
- ┣ `무한수 : false`
- ┣ 전달받은 인수의 타입이 숫자가 아닌 경우
- ┣ 숫자로 타입을 변환한 후 검사를 수행
- ┗ `인수가 NaN`으로 평가되어 값이라면 `false 반환`

```js
/**
 * 전달받은 인수가 유한수인지 확인하고 그 결과를 반환
 * @param {number} testValue - 검사 대상 값
 * @returns {boolean} 유한수 여부 확인 결과
 */
isFinite(testValue);

// 인수가 유한수이면 true를 반환
isFinite(0); // true
isFinite(2e64); // true
```

> 인수가 무한수 또는 NaN으로 평가되는 값이면 false 반환

- `isFinite(null)은 true를 반환`함
- ┣ 이것은 null을 숫자로 변환하여 검사를 수행했기 때문
- ┗ `null을 숫자 타입으로 변환 시 0이 됨`

```js
console.log(+null); // 0
```

#### isNaN

- `전달받은 인수가 NaN인지 검사`하여
- ┣ 그 `결과를 불리언 타입으로 반환`
- ┣ 전달받은 인수의 타입이 숫자가 아닌 경우
- ┗ `숫자로 타입을 변환한 후` `검사를 수행`

```js
isNaN(NaN); // true
isNaN(10); // false

// 문자열
isNaN('blablabla'); // true: → NaN
isNaN('10'); // false '10' → 10
```

#### parseFloat

- 전달받은 문자열 인수를 부동 소수점 숫자
- ┣ `floating point number`
- ┗ 즉 : 실수로 `해석(parsing)`하여 반환함

```js
// 문자열을 실수로 해석하여 변환
parseFloat('3.14'); // 3.14
parseFloat('10.00'); // 10

// 공백으로 구분된 문자열은 첫 번째 문자열만변환
parseFloat('34 45 66'); // 34
parseFloat('40 years'); // 40

// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN을 반환
parseFloat('He was 40'); // Nan

// 앞뒤 공백은 무시된다.
parseFloat(' 60 '); // 60
```

#### parseInt

- 전달받은 문자열 인수 → 정수(integer)
- ┗ 해석(parsing)하여 반환함

```js
parseInt(10); // 10
parseInt(10.123); // 10
```

- 두 번째 인수로 `진법을 나타내는 기수(2~36)`를 전달 가능
- ┣ 기수를 지정하면 첫 번째 인수로 전달된 문자열을
- ┣ 해당 기수의 숫자로 해석하여 반환
- ┗ 이때 반환 값은 언제나 10진수임

```js
// 10을 2진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt('10', 2); // 2
// 10을 8진수로 생각하고 그 결과 10진수로 반환
parseInt('10', 8); // 2
```

- `참고로 기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환`하여
- ┗ 반환하고 싶을 때는 `Number.prototype.toString 메서드`를 사용

```js
const x = 15;

// 10진수 15를 2진수로 변환하여 그 결과를 문자열로 변환
x.toString(2); // '1111'
// 문자열 '1111'을 2진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt(x.toString(2), 2); // 15
```

- 두 번째 인수로 진법을 나타내는 기수를 지정하지 않더라도
- ┣ 첫 번째 인수로 전달된 문자열이 `'0x', '0X'`
- ┣ 시작하게 되는 16진수 리터럴 이라면
- ┗ `16진수로 해석하여 10진수 정수로 반환`

```js
// 16 진수 리터럴 0xf 를 16진수로 해석하고
// 10 진수 정수로 그 결과를 반환
parseInt('0xf'); // 15
// 위 코드와 같다.
parseInt('f', 16); // 15
```

> 하지만 2진수, 8진수 리터럴은 제대로 해석하지 못함

> ES5 이전까지는 "0"으로 시작하는 숫자를 8진수로 해석
> ES6 부터는 0을 10진수로 해석하게 됨

- 첫 번째 인수로 전달한 문자열의 첫 번째 문자가
- ┣ 해당 지수의 숫자로 변환될 수 없다면
- ┗ NaN을 반환하게 됨

```js
// 'A'는 10진수로 해석할 수 없음
parseInt('A0'); // NaN
// '2'는 2진수로 해석할 수 없다.
parseInt('20', 2); // NaN
```

- 하지만 첫 번째 인수로 인수로 전달된 문자열의 두 번째 문자부터
- ┣ 해당 진수를 나타내는 숫자가 아닌 문자 (2진수의 2)
- ┣ 마주치게 되면 이 문자와 계속되는 문자들은 전부 무시되며
- ┗ 해석된 정값만 반환

```js
// 10진수로 해석할 수 없는 'A' 이후의 문자는 모두 무시된다.
parseInt('1A0'); // 1
// 2진수로 해석할 수 없는 2 이후로 문자는 모두 무시
parseInt('102', 2); // 2
```

#### encodeURI / decodeURI

- `encodeURI 함수 : 완전한 URI(Uniform Resource Identifier)를 문자열로 전달`받아
- ┣ `이스케이프 처리를 위해 인코딩` 함
- ┣ URI : 인터넷에 있는 자원을 나타내는 유일한 주소를 말함
- ┗ URI 하위 개념으로 URL, URL이 있음

- `인코딩` : `URI의 문자들을 이스케이프 처리하는 것`을 의미
- ┣ `이스케이프 처리` : `네트워크를 통해 정보를 공유`할 때
- ┣ 어떤 시스템에서도 읽을 수 있는 `아스키 문자 셋으로 변환`하는 것
- ┣ `UTF-8 특수 문자`의 경우 `1문자당 : 1 ~ 3`바이트
- ┗ `한글 표현` : `1문자당 3바이트`

- URI 문법 형식 표준 RFC3986에 따르면 URL : URL은 아스키 문자 셋으로 구성
- ┣ 한글을 포함한 대부분의 외국어나 아스키 문제 셋에 지정되지 않은
- ┣ 특수문자의 경우 URL에 포함이 불가하다.
- ┣ URL내에서 의미를 가조 있는 문자 `(%, ?, #)`
- ┣ 시스템에 의해 해석될 수 있는 문자`(<,>)`를 이스케이프 처리하여
- ┗ 문제가 될 수 있는 문제 예방하기 위해 필요

- 단 알파벳, 0 ~ 9의 숫자, `-,_,!,~,*,`,`()` 문자는 이스케이프 처리에서 제외

```js
const uri = `http://example.com?name=이응모&job=programmer&teacher`;
// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩함
const enc = encodeURI(uri);
```

> decodeURI 함수의 경우 반대로 디코딩함

#### encodeURIComponent / decodeURIComponent

- `encodeURIComponent` 함수 : `URI 구성 요소(component)를 인수로 전달 받아 인코딩`
- ┣ 인코딩 : URI 문자들을 이스케이프 처리하는 것을 의미
- ┗ `앞의 특수문자와 0 ~ 9` 의 경우 `동일하게 제외`

- `encodeURIComponent` 함수 : `인수로 전달된 문자열을 URI의 구성요소`인
- ┣ 쿼리 스트링의 일부로 간주
- ┗ 쿼리 스트링 구분자로 사용되는 `=,?,&` 까지 인코딩

- 반면 `encodeURI` 함수 : 매개변수로 전달된 문자열을 `완전한 URI 전체라고 간주`
- ┗ 따라서 쿼리 스트링 구분자로 사용되는 `=, ?, &`은 `인코딩 하지 않음`

### 21.4.3 암묵적 전역

```js
var x = 10; // 전역 변수

function foo() {
	// 선언하지 않은 식별자에 값을 할당
	y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조 가능
console.log(x + y); // 30
```

- `foo 함수 내의 y` : `선언하지 않은 식별자`
- ┣ 따라서 y = 20이 실행되면 참조 에러가 발생할 것 처럼 보임
- ┣ 하지만 : 선언하지 않은 식별자 y : `마치 선언된 전역 변수처럼 동작`
- ┣ 이는 선언하지 않은 식별자에 값을 할당하면
- ┗ `전역 객체의 프로퍼티`가 되기 때문

- foo 함수가 호출 → JS 엔진은 y 변수에 값을 할당하기 위해
- ┣ 먼저 스코프 체인을 통해 선언된 변수인지 확인
- ┣ 이때 foo 함수의 스코프와 전역 스코프 어디에도 확인 불가
- ┣ 오류가 날 것 같지만
- ┣ JS엔진은 이를 `y = 20` → `window.y = 20` 이라고 해석하게 됨
- ┗ 전역 객체에 프로퍼티를 동적 생성

> 이를 암묵적 전역이라고 함

- 하지만 y는 변수 선언 없이 단순히 전역 객체의 프로퍼티로 추가됨
- ┗ `변수가 아니므로 변수 호이스팅 발생 x`

- 또한 `delete 연산자도 당연하게 사용 불가`
