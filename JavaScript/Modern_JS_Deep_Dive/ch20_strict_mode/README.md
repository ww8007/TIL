# 20. strict mode

## 목차

- [20. strict mode](#20-strict-mode)
  - [목차](#목차)
  - [20.1 strict mode란?](#201-strict-mode란)
  - [20.2 strict mode의 적용](#202-strict-mode의-적용)
  - [20.3 전역에 strict mode를 적용하는 것은 피하자](#203-전역에-strict-mode를-적용하는-것은-피하자)
  - [20.4 함수 단위로 strict mode를 적용하는 것도 피하자](#204-함수-단위로-strict-mode를-적용하는-것도-피하자)
  - [20.5 strict mode가 발생시키는 에러](#205-strict-mode가-발생시키는-에러)
    - [20.5.1 암묵적 전역](#2051-암묵적-전역)
    - [20.5.2 변수, 함수, 매개변수의 삭제](#2052-변수-함수-매개변수의-삭제)
    - [20.5.3 매개변수 이름의 중복](#2053-매개변수-이름의-중복)
    - [20.5.4 with 문의 사용](#2054-with-문의-사용)
  - [20.6 strict mode 적용에 의한 변화](#206-strict-mode-적용에-의한-변화)
    - [20.6.1 일반 함수의 this](#2061-일반-함수의-this)
    - [20.6.2 arguments 객체](#2062-arguments-객체)

## 20.1 strict mode란?

- 아래 예제의 결과 생각

```js
function foo() {
	x = 10;
}
foo();

console.log(x); // ?
```

- foo 함수 내에서 선언하지 않은 변수 10을 할당
- ┗ `JS엔진`은 변수 선언을 스코프 체인을 통해 검색 시작

- `JS엔진` : 1. `foo 함수의 스코프`에서 `x 변수 선언 검색`
- ┣ foo 함수 내에는 x 변수의 선언이 없기 때문에
- ┗ 2. `foo 함수 컨텍스트 상위` → (여기서 전역) `선언 검색`

- 전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에
- ┣ `Reference 에러 발생할 것 같지만`
- ┣ `JS엔진` : 암묵적으로 전역 객체에 `x 프로퍼티를 동적 생성`
- ┗ `전역 객체의 x 프로퍼티`는 마치 `전역 변수처럼 사용가능`

> 이를 암묵적 전역이라고 함`(implicit global)`

- 개발자의 의도와 상관없이 발생한 암묵적 전역의 경우
- ┗ 오류를 발생시키는 원인이 될 가능성이 큼

> 반드시 var, let, const 키워드를 사용해서 변수 선언 후 사용

- 하지만 사람이 실수 가능
- ┣ 이를 방지 하기 위해 `ES5`에서 `strict mode(엄격 모드)` 추가
- ┣ `strict mode`는 JS 언어의 문법을 좀 더 엄격히 적용하여
- ┣ 1. `오류를 발생시킬 가능성이 높거나`
- ┗ 2. `JS 엔진의 최적화 작업`에 문제를 일으킬 수 있는 요소를 명시적 에러

- ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과 가능
- ┣ 린트 도구 : `정적 분석(static analysis)` 기능을 통해서
- ┗ 소스코드 실행 → `문법적 오류 뿐`만 아닌, `잠재적 오류`, `오류의 원인 리포팅`

> ES6 경우 클래스와 모듈은 기본적으로 strict mode가 적용됨

## 20.2 strict mode의 적용

- strict mode를 적용시키기 위해서는
- ┣ 전역의 선두 또는 함수 몸체 선두 → `'use strict;'`추가
- ┗ 전역의 선두에 추가하면 스크립트 전체에 strict mode 적용

```js
'use strict';

function foo() {
	x = 10; // Reference Error: x is not defined
}
foo();
```

- 함수 몸체의 선두에 추가하면
- ┣ 1. 해당 함수
- ┗ 2. 중첩 함수 모두 strict mode 적용

```js
function foo() {
	'use strict';

	x = 10; // ReferenceError: x is not defined
}
foo();
```

> 코드 선두에 위치 시키지 않으면 제대로 동작 X

## 20.3 전역에 strict mode를 적용하는 것은 피하자

- `전역에 적용`한 `strict mode` → `스크립트 단위로 동작`
- ┣ 스크립트 단위로 적용된 strict mode의 경우
- ┣ 다른 스크립트에 영향을 주지 않고
- ┗ 해당 스크립트에 한정되어 적용

- `strict mode`, `non-strict mode` 스크립트를 혼용하는 오류를 발생 가능
- ┣ 외부 서드파티 라이브러리를 사용하는 경우
- ┣ `non-strict mode`일 경우가 존재
- ┣ 이를 방지 하기 위해 → 즉시 실행 함수로 스크립트 전체를 감싸서 스코프 구분
- ┗ 즉시 실행 함수 선두 : `strict mode 적용`

```js
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
	'use strict';

	// Do something...
})();
```

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

- `함수 단위 : strict mode 사용 가능`
- ┣ 개별적 선언과 매번 선언하기 번거로움
- ┣ strict mode가 적용된 함수가 `참조할 함수 외부`가
- ┣ non-strict mode로 동작하게 된다면
- ┗ 문제 발생 가능

```js
(function() {
    // non-strict mode
    var let = 10; // 에러가 발생하지 않음
    function foo() {
        'use strict';

        let 20; // Syntax Error:
    }
    foo();
}());
```

> strict mode : 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이
> 바람직함!

## 20.5 strict mode가 발생시키는 에러

- strict mode를 적용시켰을 때 에러가 발생하는 대표적인 사례

### 20.5.1 암묵적 전역

- `선언하지 않은 변수를 참조` → `ReferenceError`

```js
(function () {
	'use strict';

	x = 1;
	console.log(x); // ReferenceError: x is not defined
})();
```

### 20.5.2 변수, 함수, 매개변수의 삭제

- `delete 연산자`로 `변수, 함수, 매개변수 삭제`하면
- ┗ `SyntaxError`가 발생하게 됨

```js
(function foo(){
    'use strict'

    var x =1;
    delete x; // SyntaxError

    function foo(a) {
        delete a; // SyntaxError
    }
    delete foo; // SyntaxError
}())
```

### 20.5.3 매개변수 이름의 중복

- `중복된 매개변수 이름을 사용`하면 `SyntaxError가 발생`

```js
(function () {
	// SyntaxError: Duplicate parameter name
	function foo(x, x) {
		return x + x;
	}
	console.log(foo(1, 2));
})();
```

### 20.5.4 with 문의 사용

- `with문을 사용하면 SyntaxError가 발생`
- ┣ with 문 : 전달된 객체 → 스코프 체인에 추가
- ┣ with 문 : 동일한 객체의 프로퍼티를 반복해서 사용할 때
- ┣ 객체 이름을 생략하는 편의성 존재 하지만
- ┗ 성능, 가독성이 나빠지는 문제 존재

> with 문은 되도록 쓰지 않는 것이 좋음

```js
(function () {
	'use strict';

	// SyntaxError: Strcit mode code
	with ({ x: 1 }) {
		console.log(x);
	}
})();
```

## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

- `strict mode에서 함수` → `일반 함수로서 호출`하면
- ┣ `this에 undefined 바인딩` 됨
- ┣ `생성자 함수가 아닌` `일반 함수 내부`에서는
- ┣ `this를 사용할 필요가 없기 때문`
- ┗ 에러는 발생되지 않음

```js
(function () {
	'use strict';

	function foo() {
		console.log(this); // undefined
	}
	foo();

	function Foo() {
		console.log(this); // Foo
	}
	new Foo();
})();
```

### 20.6.2 arguments 객체

- `strict mode 에서는 매개변수에 전달된 인수`를
- ┗ `재할당하여 변경`하여도 `arguments 객체에는 반영 X`

```js
(function (a)) {
    'use strict';
    // 매개변수에 전달된 인수를 재할당하여 변경
    a= 2;

    // 변경된 인수가 arguments 객체에 반영되지 않음
    console.log(arguments); // {0: 1, length: 1}
}(1));
```
