# 28. Number

- `표준 빌트인 객체 (standard built-in object)`
- ┣ Number는 원시 타입인 숫자를 다룰 때
- ┗ 유용한 `프로퍼티`와 `메서드`를 `제공`함

## 목차

- [28. Number](#28-number)
  - [목차](#목차)
  - [28.1 Number 생성자 함수](#281-number-생성자-함수)
  - [28.2 Number 프로퍼티](#282-number-프로퍼티)
    - [28.2.1 Number.EPSILOn](#2821-numberepsilon)
    - [28.2.2 Number.MAX_VALUE](#2822-numbermax_value)
    - [28.2.3 Number.MIN_VALUE](#2823-numbermin_value)
    - [28.2.4 Number.MAX_SAFE_INTEGER](#2824-numbermax_safe_integer)
    - [28.2.5 Number.MIN_SAFE_INTEGER](#2825-numbermin_safe_integer)
    - [28.2.6 Number.POSITIVE_INFINITY](#2826-numberpositive_infinity)
    - [28.2.7 Number.NEGATIVE_INFINITY](#2827-numbernegative_infinity)
    - [28.2.8 Number.NaN](#2828-numbernan)
  - [28.3 Number 메서드](#283-number-메서드)
    - [28.3.1 Number.isFinite](#2831-numberisfinite)
    - [28.3.2 Number.isInteger](#2832-numberisinteger)
    - [28.3.3 Number.isNaN](#2833-numberisnan)
    - [28.3.4 Number.isSafeInteger](#2834-numberissafeinteger)
    - [28.3.5 Number.prototype.toExponential](#2835-numberprototypetoexponential)
    - [28.3.6 Number.prototype.toFixed](#2836-numberprototypetofixed)
    - [28.3.7 Number.prototype.toPrecision](#2837-numberprototypetoprecision)
    - [28.3.8 Number.prototype.toString](#2838-numberprototypetostring)

## 28.1 Number 생성자 함수

- 표준 빌트인 객체인 Number 객체 :
- ┣ `생성자 함수 객체`임
- ┣ 따라서 : `new 연산자`와 함께 호출하여
- ┗ `Number 인스턴스를 생성`할 수 있음

- Number 생성자 함수에 `인수를 전달하지 않고`
- ┣ `new 연산자와 함께 호출`하면
- ┣ [[NumberData]] 내부 슬롯에 0을 할당한
- ┗ `Number 래퍼 객체`를 생성함

```js
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}
```

- 위 예제를 크롬 브라우저의 개발자 도구에서 실행해 보면
- ┣ [[PrimitiveValue]]라는 접근할 수 없는
- ┣ 프로퍼티가 보임
- ┣ 이는 : [[NumberData]] 내부 슬롯을 가리킴
- ┗ ES5 에서는 [[NumberData]] 를 [[PrimitiveValue]]라고 불림

- Number 생성자 함수의 `인수로 숫자를 전달`하면서
- ┣ `new 연산자와 함께 호출`하게 되면
- ┣ [[NumberData]] 내부 슬롯에
- ┣ 인수로 전달받은 `숫자를 할당한`
- ┗ `Number 래퍼 객체를 생성`함

```js
const numbObj = new Number(10);
console.log(numObj); // Number {[[primitiveValue]]: 10}
```

- Number 생성자 함수의 인수로 숫자가 아닌 값을 전달하면
- ┣ `숫자로 강제 변환`한 후
- ┣ [[NumberData]] 내부 슬롯에 변환된
- ┣ 숫자를 할당한 Number 래퍼 객체를 생성함
- ┣ 인수를 숫자로 `변환 할 수 없다면`
- ┣ `NaN`을 → [[NumberData]] 내부 슬롯에 할당한
- ┗ `Number 래퍼 객체를 생성함`

```js
let numOjb = new Number('10');
console.log(numObj); // Number {[[primitiveValue]]: 10}

let numOjb = new Number('Hello');
console.log(numObj); // Number {[[primitiveValue]]: NaN}
```

## 28.2 Number 프로퍼티

### 28.2.1 Number.EPSILOn

- ES6에서 도입된 `Number.EPSILON`은
- ┣ 1과 1보다 큰 숫자 중에서
- ┗ 가장 작은 숫자와의 차이와 같음

- 다음 예제와 같이 부동소수점 산술 연산 :
- ┣ 정확한 결과를 기대하기 어려움
- ┣ 정수 2진법 → 오차 없이 저장 가능하지만
- ┣ 부동소수점을 표현하기 위해 널리 쓰이는 표준인
- ┣ `IEEE 754`는 `2진법으로 변환`했을 때
- ┗ `무한소수`가 되어 `미세한 오차`가 날 수 밖에 없는 한계 존재

```js
0.1 + 0.2; // 0.300000000004
0.1 + 0.2 === 0.3; // false
```

- `Number.EPSILON`은 부동소수점으로 인해 발생하는
- ┣ 오차를 해결하기 위해 사용됨
- ┣ 다음 예제 `Number.EPSILON`을 사용하여
- ┗ `부동 소수점을 비교`하는 함수

```js
function isEqual(a, b) {
	// a와 b를 뺀 값의 절대값이
	// Number.EPSILON 보다 작으면
	// 같은 수로 인정함
	return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // true
```

### 28.2.2 Number.MAX_VALUE

- `Number.MAX_VALUE` : JS에서 표현할 수 있는
- ┣ 가장 큰 양수 값을 알려줌
- ┣ `Number.MAX_VALUE` 보다 큰 값
- ┗ `Infinity` 임

### 28.2.3 Number.MIN_VALUE

- `Number.MIN_VALUE`는 JS에서 표현할 수 있는
- ┣ `가장 작은 양수 값`을 나타냄
- ┣ `Number.MIN_VALUE` 보다 작은 값은
- ┗ `숫자 0`임

### 28.2.4 Number.MAX_SAFE_INTEGER

- `Number.MAX_SAFE_INTEGER` :
- ┣ JS에서 안전하게 표현할 수 있는
- ┗ `가장 큰` 정수 값

### 28.2.5 Number.MIN_SAFE_INTEGER

- `Number.MIN_SAFE_INTEGER` :
- ┣ JS에서 안전하게 표현할 수 있는
- ┗ `가장 작은` 정수 값

### 28.2.6 Number.POSITIVE_INFINITY

- `Number.POSITIVE_INFINITY` :
- ┣ 양의 무한대를 나타내는
- ┗ 숫자값 : `Infinity`와 같음

### 28.2.7 Number.NEGATIVE_INFINITY

- `Number.NEGATIVE_INFINITY` :
- ┣ 음의 무한대를 나타내는
- ┗ 숫자값 : `-Infinity`와 같음

### 28.2.8 Number.NaN

- `Number.NaN` : `숫자가 아님(Not-a-Number)`을
- ┣ 나타내는 숫자값임
- ┗ Number.NaN : window.NaN과 같음

```js
Number.NaN; // NaN
```

## 28.3 Number 메서드

### 28.3.1 Number.isFinite

- ES6에서 도입된 `Number.isFinite` 정적 메서드 :
- ┣ 인수로 전달된 숫자값이 정상적인 유한수
- ┣ 즉 → Infinity, -Infinity가 아닌지 검사하여
- ┗ 그 결과를 `불리언 값으로 반환`함

```js
// 인수가 정상적인 유한수이면 true 반환
Number.isFinite(0); // true
// 인수가 무한수 이면 false 반환
Number.isFinite(Infinity); // false
```

> 인수가 NaN이면 언제나 false를 반환

- Number.isFinite 메서드 :
- ┣ `빌트인 전역 함수 isFinite`와 차이가 있음
- ┣ `빌트인 전역 함수 isFinite`는 전달 받은 인수를
- ┣ 숫자로 `암묵적인 타입 변환 후` → `검사를 수행`
- ┣ Number.isFinite : 전달받은 인수를 `암묵적 타입 변환 X`
- ┗ 고로 `숫자가 아닌 값이 인수로 전달` → `false 반환`

### 28.3.2 Number.isInteger

- ES6에서 도입된 `Number.isInteger` `정적 메서드` :
- ┣ 인수로 전달된 숫자값이 `정수(integer)인지 검사`하여
- ┣ 그 결과를 `불리언 값으로 반환`
- ┗ `암묵적인 타입 변환을 진행하지 않음`

### 28.3.3 Number.isNaN

- ES6에서 도입된 Number.isNaN 정적 메서드 :
- ┣ 인수로 전달된 숫자값이
- ┣ `NaN인지 검사`하여 그 결과를
- ┗ `불리언 값으로 반환함`

- 빌트인 전역 함수 `isNaN`과의 `차이점` :
- ┣ `빌트인 전역 함수` → 암묵적인 타입 변환
- ┗ `Number.isNaN` → `인수가 숫자 아니면 false`

### 28.3.4 Number.isSafeInteger

- ES6 도입된 `Number.isSafeInteger` 정적 메서드 :
- ┣ 인수로 전달된 숫자값이 `안전한 정수인지 검사`하여
- ┣ 그 결과 값을 `불리언으로 반환`
- ┣ 안전한 정수 : `-(253 -1)`, `253 -1` 사이의 정수
- ┗ 암묵적인 타입 변환 X

### 28.3.5 Number.prototype.toExponential

- `toExponential` 메서드 :
- ┣ `숫자를 지수 표기법으로 변환`하여
- ┗ `문자열로 반환함`

> 지수 표기법

    매우 크거나 작은 숫자를
    ┣ 주로 표기할 때 사용
    ┣ e(Exponent) 앞에 있는 숫자에
    ┣ 10의 n승을 곱하는 형식으로
    ┣ 수를 나타내는 방식
    ┣ 인수로 소수점 이하로
    ┗ 표현할 자리수를 전달 가능

```js
(77.1234).toExponential(); // "7.71234e+1"
(77.1234).toExponential(4); // "7.7123e+1"
(77.1234).toExponential(2); // "7.71+1"
```

- 참고로 `숫자 리터럴`과 함께
- ┣ Number `프로토타입 메서드를 사용할 경우`
- ┗ 에러가 발생함

- 숫자 뒤의 .은 의미가 애매모호
- ┣ 1. `부동 소수점 숫자의 소수 구분 기호`
- ┣ 2. `객체 프로퍼티에 접근`하기 위한
- ┗ `프로퍼티 접근 연산자`일 수 있음

- `JS 엔진` : `숫자 뒤의 .`을 `부동 소수점 숫자`의
- ┣ `소수 구분 기호로 해석`
- ┣ 그러나 77.toExponential() 에서
- ┣ 77 : `Number 래퍼 객체`임
- ┣ 그렇기에 `프로퍼티로 해석할 수 없기에`
- ┗ `SyntaxError`가 발생하게 됨

```js
(77.1234).toExponential(); // "7.71234e+1"
```

- 위 예제의 경우 77 뒤에 . 뒤에 숫자가 이어지므로
- ┣ . : 명백하게 부동 소수점 숫자의 소수 구분 기호임
- ┣ `숫자에 소수점은 하나만 존재함`
- ┣ `두번째 .` → `프로퍼티 접근 연산자`로 해석됨
- ┣ 숫자 리터럴과 함께 메서드를 사용할 경우
- ┗ 오해를 해결하기 위해서 `그룹 연산자와 함께 사용 권장`

```js
(77).toExponential(); // "7.7e+1"
```

### 28.3.6 Number.prototype.toFixed

- toFixed 메서드 :
- ┣ `숫자를 반올림하여 문자열로 반환`
- ┣ 반올림하는 `소수점 이하 자리수를 나타내는`
- ┣ `0 ~ 20 사이의 정수값`을 `인수로 전달 가능`
- ┗ 인수를 생략하면 `기본값 0이 지정`

```js
// 소주점 이하 반올림
// 인수를 생략하면 기본값 0이 지정
(12345.6789).toFixed(); // "123456"
(12345.6789).toFixed(1); // "123456.7"
(12345.6789).toFixed(2); // "123456.68"
(12345.6789).toFixed(3); // "123456.679"
```

### 28.3.7 Number.prototype.toPrecision

- `toPrecision` 메서드 :
- ┣ 인수로 전달받은 `전체 자리수까지 유효`하도록
- ┣ `나머지 자릿수를 반올림`하여 `문자열로 반환`
- ┣ 인수로 전달받은 전체 자릿수로 표현 불가한 경우 :
- ┗ `지수 표기법으로 결과를 반환`

```js
// 전체 자릿수 유효, 인수를 생략하면
// 기본값 0이 지정됨
(12345.6789).toPrecision(); // "12345.6789"
// 전체 1자릿수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // "1.2e+4"
// 전체 6자릿수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // "12345.7"
```

### 28.3.8 Number.prototype.toString

- toString 메서드 :
- ┣ 숫자를 문자열로 변환하여 반환함
- ┣ 진법을 나타내는 2 ~ 36 사이의 정수값을
- ┗ 전달이 가능함

> 인수 생략 : 기본값 10진법

```js
// 인수를 생략하면 10진수 문자열을 반환함
(10).toString(); // "10"
// 2진수 문자열을 반환
(16).toString(2); // "10000"
// 8진수 문자열을 반환
(16).toString(8); // "20"
// 16진수 문자열을 반환
(16).toString(16); // "10"
```
