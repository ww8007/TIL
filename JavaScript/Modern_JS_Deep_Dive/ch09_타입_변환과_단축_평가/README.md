# 9 타입 변환과 단축 평가

## 9.1 타입 변환이란?

- JS의 모든 값은 타입이 존재
- ┣ 값의 타입은 개발자의 의도에 따라 다른 타입으로 변환 가능
- ┣ 개발자가 의도적으로 타입을 변환하는 것을
- ┣ `명시적 타입변환(explicit coercion)` 또는
- ┗ `타입 캐스팅(type casting)`이라고 함

- 개발자의 의도와는 상관없이 표현식 평가 동중
- ┣ JS 엔진에 의해서 암묵적으로 타입이 변환되기도 함
- ┣ 이를 `암묵적 타입 변환(implicit coercion)`
- ┗ 또는 `타입 강제 변환(type coercion)`이라고 함

```js
var x = 10;
//암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열 생성

var str = x + '';
console.log(typeof str, str);

// x 변수 값이 변경된 것은 아님
console.log(typeof x, x);
```

- 명시적 타입 변환이나 암묵적 타입 변환이
- ┣ 기존 원시 값을 변경 시키는 것은 아님!!!
- ┣ 원시 값 : 변경 불가능한 값(immutable value)이므로 변경 불가
- ┗ 타입 변환이란 기존 원시 값을 사용해 다른 타입의 원시 값을 생성

> 암묵적 타입 변환은 기존 변수 값을 재할당하여 변경하는 것이 X

    JS 엔진이 표현식을 에러 없이 평가하기 위해서
    ┣ 피연산자의 값을 암묵적 타입 변환을 통해서
    ┣ 새로운 타입을 만들어 낸 뒤
    ┗ 단 한 번 사용하고 버리게 됨

- 명시적 타입 변환은 타입을 변경하겠다는 개발자의 의지가 나타남
- ┣ 그러나 암묵적 타입 강제 변환은 JS 엔진에 의해서 암묵적
- ┣ 드러나지 않게 타입이 자동 변환되기 때문에
- ┗ 타입을 변경하겠다는 개발자의 의지가 나타나지 않음

- 그러면 명시적 타입 변환만 사용하고
- ┣ 암묵적 타입 변환은 사용되지 않게 하면 어떨까? 생각 가능
- ┣ 그러나 이의 경우 `오히려 가독성이 떨어지는 경우 발생`
- ┣ 예를 들어 JS 문법을 잘 이해하고 있는 개발자에게는
- ┗ `(10).toString()` 코드 보다 `10 + ''`이 더욱 간결하고 이해하기 쉬움

- 중요한 것은 코드를 예측할 수 있어야 함

## 9.2 암묵적 타입 변환

- JS 엔진은 표현식을 평가할 때
- ┣ 개발자의 의도와는 상관없이 문맥을 고려
- ┗ 그 뒤 암묵적으로 타입을 강제 변환 하는 경우가 존재

```js
// 피연산자가 모두 문자열 타입이어야 하는 경우
'10' + 2; // '102'

// 피연산자가 모두 숫자 타입어야 하는 문맥
5 * '10'; // → 50

// 피연산자 또는 표현식이 불리언 타입어야 하는 문맥
!0; // true
if (1) {
}
```

- 이처럼 표현식을 평가할 때 코드의 문맥에 부합하지 않는
- ┣ 다양한 상황이 발생할 수 잇음
- ┣ 이때 JS는 가급적 에러를 발생시키지 않기 위해서
- ┗ 암묵적 타입 변환을 통해 표현식을 평가하게 됨

### 9.3.1 문자열 타입으로 변환

```js
1 + '2' = '12'
```

- 위 예제의 `+` 연산자는 피연산자 중 하나 이상이 문자열
- ┣ 문자열 연결 연산자로 동작함
- ┣ 문자열 연결 연산자의 역할은 문자열 값을 만드는 것
- ┣ 따라서 문자열 연결 연산자의 모든 피연산자는
- ┗ 코드의 문맥상 모두 문자열 타입이어야 함

- JS 엔진은 문자열 연결 `연산자 표현식`을 `평가 하기 `위해서
- ┗ 연결 연산자 중에서 문자열 타입 아닌 피연산자 → 문자열로 변경

- `연산자 표현식`의 `피연산자(피연`산자도 표현식)`만이 `
- ┣ 암묵적 타입 변환의 대상이 되는 것만은 아님
- ┣ 앞에서 언급했듯 JS 엔진은 표현식을 평가할 때
- ┗ 코드 문맥에 부합하도록 `암묵적 타입 변환을 실행`

- ex) ES6 도입된 템플릿 리터럴 표현식 삽입의 경우
- ┗ 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환

```js
`1 + 1 = ${1 + 1}`; // '"1 + 1 = 2"
```

> JS 엔진은 문자열 타입이 아닌 값을 문자열 타입 암묵적 타입 변환 수행시 다음과 같이 동작

```js
0 + ''; // 문자열로 변환

// 불리언
true + ''; // 'true'

// null
('null');

// undefined
('undefined');

// Symbol
(Symbol()) + '' // typeError

// 객체
({}) + '' // [object Object]
Math + '' // [object Math]
[] + '' // ""
[10, 20] + '' // "10,20"
(function(){}) + '' // "function(){}"
Array + '' // "function Array() {[native code]}"
```

### 9.2.2 숫자 타입으로 변환

- 산술 연잔자의 역할은 숫자 값을 만드는 것
- ┣ 따라서 산술 연산자의 모든 피연산자는 코드 문맥상
- ┗ 모두 숫자 타입이어야 함

- JS 엔진은 안술 연산자 표현식을 평가하기 위해서
- ┣ 산술 연산자의 피연산자 중에서 숫자 타입이 아닌
- ┣ 피연산자를 숫자 타입으로 암묵적 타입 변환
- ┗ 변환 불가의 경우 `NaN`

> 비교 연산자의 경우도 강제로 숫자 타입으로 변환하게 됨

> 또한 + 단항 연산자 또한 숫자 타입으로 강제 변환

```js
+''; // 0
+'0'; // 1
+'1'; // 1
+'string'; // NaN

// 불리언
+true; // 1
+false; // 0

// null
+null; // 0

//undefined
+undefined; // NaN

// 심벌
+Symbol(); // Type error

// 객체
+{}; // N
+[]; // 0
+[10, 20]; // NaN
+(function()){} // NaN
```

- 빈 문자열(''), 빈 배열([]), null, false는 0, true는 1로 변환
- ┗ 객체와 빈 배열이 아닌 배열 undefined는 변환되지 않아서 NaN이 됨

### 9.2.3 불리언 타입으로 변환

```js
if ('') console.log(x);
```

- if문이나 for문과 같은 제어문 또는
- ┣ 삼항 조건 연산자의 조건식은 불리언 값,
- ┣ 논리적으로 참/거짓으로 평가되어야 하는 표현식
- ┣ JS 엔진은 조건식의 평가 결과를 불리언 타입으로
- ┗ 암묵적 타입 변환 함

- JS 엔진은 불리언 타입이 아닌 값을
- ┣ Truthy 값(참으로 평가되는 값) 또는
- ┣ Falsy 값(거짓으로 평가되는 값)을 구분
- ┣ 즉 제어문의 조건식과 같이 불리언 값으로
- ┗ 평가 되어야 할 값이 변경되어 평가

> false로 평가되는 Falsy 값

1. false
2. undefined
3. null
4. 0, -0
5. NaN
6. ''(빈 문자열)

> Falsy 값 외의 모든 값은 모두 true로 평가되는 Truthy 한 값

## 9.3 명시적 타입 변환

- 개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양
- ┣ 1. `표준 빌트인 생성자 함수(String, Number, Boolean)`를
- ┣ `new` 연산자 없이 호출하는 방법
- ┗ 2. `암묵적 타입 변환`을 이용하는 방법이 존재

> 표준 빌트인 생성자 함수와 빌트인 메서드

    `표준 빌트인(built-in) 생성자 함수`와
    ┣ 표준 빌트인 메서드는 JS에서 기본 제공하는 함수
    ┣ `표준 빌트인 생성자 함수`는
    ┣ 객체를 생성하기 위한 함수이며 new 연산자와 함꼐 호출
    ┗ 표준 빌트인 메서드는 JS에서 기본제공하는 빌트인 객체의 메서드

### 9.3.1 문자열 타입으로 변환

- 문자열 타입이 아닌 값을 문자열 타입으로 변환하는 3가지 방법

1. String 생성자 함수를 new 연산자 없이 호출하는 방법

```js
String(1);
String(NaN);
```

2. Object.prototype.toString 메서드를 사용

```js
(1).toString();
true.toString();
```

3. 문자열 연결 연산자를 이용하는 방법

```js
1 + '';
true + '';
```

### 9.3.2 숫자 타입으로 변환

- 숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법은 다음과 같음

1. Number 생성자 함수를 new 생성자 없이 호출

2. parseInt, parseFloat 함수를 사용하는 방법
   ┗ 문자열만 숫자 타입으로 변환 가능

3. `+` 단항 산술 연산자를 이용하는 방법

4. `*` 산술 연산자를 이용하는 방법

### 9.3.3 불리언 타입으로 변환

- 불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 다음과 가틍ㅁ

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법

```js
// 객체 → 불리언
Boolean({}); //true
Boolean([]); //true
```

2. `!` 부정 논리 연산자를 두 번 사용하는 방법

```js
!!'x'; // true
!!''; //flase

// null
!!null; // false
// undefined
!!undefined; // false
```

## 9.4 단축 평가

### 9.4.1 단축 평가

- 앞에서 논리 연산자에서 제대로 다루지 않고 간 부분이 있음
- ┣ 바로 "`논리합(||)` 또는 `논리곱(&&)` 연산자 표현식의 평가 결과는
- ┗ 불리언 값이 아닐 수 있음

- 논리합, 논리곱 연산자 언제나 2개의 피연산자 중 어느한 쪽으로 평가됨

```js
'Cat' && 'Dog'; // Dog
```

- 논리곱(&&)의 경우 두 개의 피연산자가 모두 true일 경우
- ┣ true를 반환가ㅔ 됨
- ┗ 논리곱 연산자는 좌항과 우항으로 평가가 진행

- 첫 번째 피연산자 'Cat'은 Truthy 값이므로 true로 평가
- ┣ 이 시점까지는 위 표현식을 평가할 수 없음
- ┗ 두 번째 피연산자 까지 평가해 보아야 위 표현식을 평가가능

> 다시 말해 두 번째 피연산자가 논피곲 연산자 표현식의 평가 결과를 결정

    이의 경우는 논리합에서도 동일하게 동작

- 논리합(||)의 경우에는 두 개의 피연산자 하나만 true가 되어도 → true 반환
- ┗ 이 때 논리합 연산자는 논리 연산의 결과를 결정한 첫 번째 피연산자을 반환

- 논리합과 논리곱의 경우는
- ┣ 논리 연산의 결과를 결정하는 피연산자를 타입 변환 하지 않고 그대로 반환
- ┗ 이를 `단축 평가(short-circuit evaluation)`이라고 부름

- 단축 평가는 표현식을 평가하는 도중에 `평가 결과가 확정된 경우`
- ┗ `나머지 평가 과정을 생략`하는 것을 말함

- 단축 평가는 다음과 같은 규칙을 따르게 됨

| 단축 평가 표현식         | 평가 결과 |
| ------------------------ | --------- |
| true `논리 합` anything  | true      |
| false `논리 합` anything | anything  |
| true && anything         | anything  |
| false && anything        | false     |

- 단축 평가를 사용하면 if문 대체 가능
- ┣ 어떤 조건이 Truthy 값(참으로 평가되는 값) 일 때
- ┣ 무언가를 해야 한다면 `논리곱(&&)` 연산자를 이용해서
- ┗ if 문을 대체 가능

```js
var done = true;
var message = '';

message = done && '완료';
```

- 조건이 Falsy 값(거짓으로 평가되는 값)일 때 무언가를 해야 한다면
- ┗ `논리 합(||)` 연산자 표현식을 이용해서 표현 가능

```js
message done || '미완료'
```

> 객체를 가리키기를 기대하는 변수가 null 또는 undefined인지 확인하고
> ┗ 프로퍼티를 참조하는 경우

- 객체는 키와 값으로 구성된 → `프로퍼티(property)`의 집합
- ┣ 만약 객체를 가리키기를 기대하는 변수의 값이
- ┣ 객체가 아닌 null 또는 undefined 인 경우
- ┣ 객체의 프로퍼티를 참조하면 타입 에러(TypeError)가 발생
- ┗ 에러가 발생하면 프로그램이 강제 종료

```js
var elem = null;
var value = elem.value; // TypeError
```

- 이때 단축 평가를 사용하면 에러 발생시키지 않음

```js
var elem = null;
// elem이 null이나 undefined 같은 Falsy 값이면 elem 값으로 평가
// elem이 Truthy 값이면 elem.value로 평가
var value = elem && elem.value; // null
```

> 함수 매개변수에 기본값을 설정할 때

- 함수를 호출할 때 인수를 전달하지 않으면 → 매개변수에 undefined 할당
- ┗ 이때 단축 평가를 사용해서 기본값을 설정하면 에러 방지 가능

```js
// 단축 평가를 이용한 매개변수 기본 값 설정
function getStringLength(str) {
	str = str || '';
	return str.length;
}

// ES6 매개변수의 기본값 설정
function getStringLength(str = '') {
	return str.length;
}
```

### 9.4.2 옵셔널 체이닝 연산자

- ES11(ECMAScript2020)에서 도입된 `옵셔널 체이닝(optional chaining)`의 경우
- ┣ 연산자 `?.`는 좌항의 피연산자가 null 또는 undefined 인 경우 undefined 반환
- ┗ 그렇지 않은 경우는 우항의 프로퍼티 참조를 이어간다.

```js
var elem = null;

// elem 이 null, undefined 경우에는 undefined 반환
// 아닌 경우 우항의 프로퍼티 참조를 이어가게됨

var value = elem?.value;
console.log(value);
```

- 옵셔널 체이닝 연산자 `?.` 객체를 가리키기를 변수가
- ┣ `null` 또는 `undefined`가 아닌지 확인하고 나서
- ┣ 프로퍼티를 참조할 때 유용
- ┣ 옵셔널 체이닝 연산자 `?.` 도입되기 이전에는
- ┣ `논리 연산자(&&)`를 사용한 단축 평가를 통해 null 또는 undefined 인지 확인

```js
var elem = null;

var value - elem && elem.value;
console.log(value);
```

- 논리 연산자 &&는 `좌항 피연산자가` false로 평가되는
- ┣ Falsy 값(`false`, `undefined`, `null`, `0`, `-0`, `NaN`, `''`)이면
- ┣ 좌항 피연산자를 그대로 반환
- ┣ 좌항 피연산자가 Falsy 값인 0 이나 ''도 마찬가지
- ┗ 하지만 0이나 ''는 `객체로 평가` 될 때도 있음

```js
var str = '';

var length = str && str.length;
console.log(length);
```

> 하지만 옵셔널 체이닝 연산자의 경우 좌항 피연산자가 false로 평가되는 값 이더라도
>
> > null 또는 undefined가 아닌 경우에 대해서는 프로퍼티 참조를 이어감

```js
var str = '';

var len = str?.length;
console.log(len);
```

### 9.4.3 null 병합 연산자

- ES11(ECMAScript2020)에서 도입된 null 병합(nullish coalescing) 연산자
- ┣ `??` 의 경우에는 `좌항의 피연산자가 null, undefined인 경우` 우항의 피연산자 반환
- ┗ null 병합 연산자는 `??` `변수에 기본값을 설정`할 때 유용

```js
var foo = null ?? 'default string';
console.log(foo);
```

- null 병합 연산자 이용 이전에도 `논리합 연산자(||)` 를 이용해서
- ┣ 변수의 기본값을 설정한 경우가 있음
- ┣ 논리 연산자의 경우 좌항 : false, Falsy의 경우 우항의 피연사자를 반환
- ┗ 그러나 Falsy 값이 `0`이나 `''`도 기본값으로서 유요하다면 예기치 않은 동작 발생

```js
// Falsy 값인 0이나 ''도 기본값으로 유효하다면 예기치 않은 동작 발생
var foo = '' || 'default string';
console.log(foo); // default string
```

- 하지만 null 병합 연산자 ??는 좌항의 false, Falsy 라도
- ┗ null이나 undefined가 아니라면 좌항의 피연산자 그대로 반환

```js
var foo = '' ?? 'default string';
console.log(foo); // ''
```
