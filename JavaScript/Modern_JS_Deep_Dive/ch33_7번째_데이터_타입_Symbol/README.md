# 33. 7번째 데이터 타입 Symbol

## 33.1 심벌이란?

- 97년 JS가 ECMAScript로 표준화된 이래로
- ┣ JS에는 6개의 타입 즉 :
- ┣ 1. `문자열`
- ┣ 2. `숫자`
- ┣ 3. `불리언`
- ┣ 4. `undefined`
- ┣ 5. `null`
- ┗ 6. `객체 타입`이 있었음

- `심벌(symbol)` : `ES6`에서 도입된 `7번째 데이터 타입`으로
- ┣ `변경 불가능한 원시 타입의 값임`
- ┣ 심벌 값은 다른 값과 중복되지 않는
- ┣ `유일무이한 값임`
- ┣ 따라서 → 주로 이름 충돌 위험이 없는
- ┣ 유일한 `프로퍼티 키를 만들기 위해 사용함`
- ┣ 10.3 프로퍼티에서 보았듯
- ┣ 프로퍼티 키로 사용할 수 있는 값 :
- ┗ 빈 문자열을 포함하는 `모든 문자열 또는 심벌 값`

## 33.2 심벌 값의 생성

### 33.2.1 Symbol 함수

- 심벌 값 : Symbol 함수를 호출하여 생성함
- ┣ 다른 원시값
- ┣ 즉 : 문자열, 숫자, 불리언 등의 경우
- ┣ 리터럴 표기법을 통해 값을 생성할 수 있지만
- ┣ 심벌 값은 : `Symbol 함수를 호출하여 생성해야 함`
- ┣ 이때 작성된 심벌 값은 외부로 노출되지 않아
- ┣ 확인할 수 없으며
- ┗ `다른 값과 절대 중복되지 않는 유일무이한 값임`

```js
// Symbol 함수를 호출하여
// 유일무이한 심벌 값을 생성함
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아
// 확인이 불가함
console.log(mySymbol); // Symbol()
```

- 언뜻 보면 생성자 함수로 객체를 생성하는 것처럼 보이지만
- ┣ Symbol 함수는 : String, Number, Boolean 생성자 함수와 달리
- ┣ `new 연산자와 함께 호출하지 않음`
- ┣ new 연산자와 함께 생성자 함수 또는
- ┣ 클래스를 호출하면 : `객체(인스턴스)가 생성되지만`
- ┗ `심벌 값 : 변경 불가능한 원시 값임`

```js
new Symbol(); // TypeError
```

- Symbol 함수에는 `선택적으로 문자열을 인수로 전달 가능`
- ┣ 이 문자열은 생성된 심벌 값에 대한
- ┣ `설명(description)으로 디버깅 용도로만 사용됨`
- ┣ 심벌 값에 어떠한 영향도 미치지 않음
- ┣ 즉 : 심벌 값에 대한 설명이 같더라도
- ┗ `생성된 심벌 값은 유일무이한 값임`

```js
// 심벌 값에 대한 설명이 같더라도
// 유일무이한 심벌 값을 생성함
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

- 심벌 값도 문자열, 숫자, 불리언 같이
- ┣ 객체에 접근하면 `암묵적으로 래퍼 객체를 생성함`
- ┣ 다음 예제의 description 프로퍼티와
- ┗ toString 메서드 : `Symbol.prototype의 프로퍼티임`

```js
const mySymbol = Symbol('mySymbol');

// 심벌도 래퍼 객체를 생성함
console.log(mySymbol.description); // mySymbol
console.log(mySymbol.toString()); // Symbol(mySymbol)
```

- 심벌 값 : 암묵적으로 문자열이나 숫자 타입으로 변환되지 않음

- 단 : 불리언 타입으로는 암묵적으로 타입 변환됨
- ┗ 이를 통해 if 문 등에서 존재 확인 가능

```js
const mySymbol = Symbol();

// 불리언 타입으로는 암묵적으로 타입 변환됨
console.log(!!mySymbol); // true

// if 문에서 존재 확인 가능
if (mySymbol) console.log('mySymbol exist');
```

### 33.2.2 Symbol.for / Symbol.keyFor 메서드

- `Symbol.for` 메서드 :
- ┣ 인수로 전달받은 문자열을 키로 사용하여
- ┣ 키와 심벌 값의 쌍들이 저장되어 있는
- ┣ `전역 심벌 레지스트리(global symbol registry)에서`
- ┗ `해당 키와 일치하는 심벌 값을 검색함`

1. 검색에 성공하면 새로운 심벌 값을 생성하지 않고 반환함

2. 검색에 실패하면 새로운 심벌 값을 생성하여

- ┣ `Symbol.for` 메서드의 인수로 전달된 키로
- ┣ `전역 심벌 레지스트리`에 저장한 후
- ┗ `생성된 심벌 값을 반환함`

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된
// 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심별 레지스트리에 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for(mySymbol);

console.log(s1 === s2); // true
```

- Symbol 함수 : 호출될 때마다
- ┣ 유일무이한 심벌 값을 생성함
- ┣ 이때 JS 엔진이 관리하는 심벌 값의
- ┣ 저장소인 전역 심벌 레지스트리에서
- ┣ 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로
- ┗ 전역 심벌 레지스트리에 등록되어 관리되지 않음

- 하지만 `Symbol.for` 메서드를 사용하면
- ┣ 에플리케이션 전역에서 중복되지 않는
- ┣ `유일무이한 상수인 심벌 값을 단 하나만 생성하여`
- ┗ `전역 심벌 레지스트리를 통해 공유할 수 있음`

- `Symbol.keyFor` 메서드를 사용하면 :
- ┗ 전역 심벌 레지스트리에 저장된 `심벌 값의 키를 추출 가능`

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면
// 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s1); // mySymbol

// Symbol 함수를 호출하여 생성한
// 심벌 값은 전역 심벌 레지스트리에 등록되어
// 관리되지 않음
const s2 = Symbol('foo');
// 전역 심벌 레지스트리에 저장된
// 심벌 값의 키를 추출
Symbol.keyFor(s2); // undefined
```

## 33.3 심벌과 상수

- 예를 들어 4방향을 나타내는 상수를 정의한다고 가정

```js
// 위, 아래, 왼쪽, 오른쪽 나타내는 상수 정의
// 이 때 1, 2, 3, 4 에는 특별한 의미가 없고
// 상수 이름에 의미가 있음
const Direction = {
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4,
};
// 변수에 상수를 할당
const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
	console.log('You are going UP');
}
```

- 위의 경우 다른 변수 값과 중복될 수 있음

> 이런 경우 Symbol을 사용함

```js
const Direction = {
    UP: Symbol('up')
    DOWN: Symbol('down')
    RIGHT: Symbol('right')
    LEFT: Symbol('left')
}
```

### enum

- `enum` : `명명된 숫자 상수(named numeric constant)`의
- ┣ 집합으로 열겨형(enumerated type)이라고 불림
- ┣ JS는 enum을 지원하지 않지만
- ┗ `Typescript 에서는 enum을 지원함`

- JS에서 enum을 흉내내서 사용하기 위해
- ┣ 객체의 변경을 동결하는
- ┗ `Object.freeze 메서드와 심벌값을 사용`

```js
const Direction = Object.freeze({
    UP: Symbol('up')
    DOWN: Symbol('down')
    RIGHT: Symbol('right')
    LEFT: Symbol('left')
})
```

## 33.4 심벌과 프로퍼티 키

- 객체의 프로퍼티 키 :
- ┣ `빈 문자열을 포함하는 모든 문자열 또는`
- ┣ 심벌 값으로 만들 수 있으며
- ┗ `동적으로 생성할 수 있음`

- 심벌 값으로 프로퍼티 키를 동적 생성하여
- ┣ 프로퍼티 생성을 가정
- ┣ 심벌 값을 프로퍼티 키로 사용하기 위해서는
- ┣ `프로퍼티 키`로 사용할 사용할 `심벌 값에 대괄호를 사용`
- ┗ `접근에도 동일하게 대괄호를 사용해야 함`

```js
const obj = {
	// 심벌 값으로 프로퍼티 키를 생성
	[Symbol.for('mySymbol')]: 1,
};
obj[Symbol.for('mySymbol')]; // 1
```

- `심벌 값` : 유일무이한 값이므로
- ┣ 심벌 값으로 프로퍼티 키를 만들면
- ┣ `다른 프로퍼티 키와 절대 충돌하지 않음`
- ┗ 미래에 추가될 어떤 프로퍼티 키와도 충돌할 위험이 없음

## 33.5 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티 :
- ┣ `for ... in` 문이나 `Object.keys`, `Object.getOwnPropertyNames` 메서드로
- ┣ 검색이 물가능함
- ┣ 이처럼 심벌 값을 프로퍼티 키로 사용하여
- ┣ 프로퍼티를 생성하면
- ┗ `외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있음`

```js
const obj = {
	// 심벌 값으로 프로퍼티 키를 생성
	[Symbol('mySymbol')]: 1,
};

for (const key in obj) {
	console.log(key); // 아무것도 출력 안됨
}
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
```

> 하지만 ES6 에서 도입된 Object.getOwnPropertySymbols 사용하면
> 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티 검색 가능

```js
const obj = {
	// 심벌 값으로 프로퍼티 키를 생성
	[Symbol('mySymbol')]: 1,
};

// 인수로 전달한 객체의 심벌 프로퍼티 키를 반환
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있음
const symbolKey = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey]); // 1
```

## 33.6 심벌과 표준 빌트인 객체 확장

- 일반적으로 표준 빌트인 객체에
- ┣ 사용자 정의 메서드를 직접 추가하여 확장하는 것은
- ┣ 권장하지 않음
- ┗ 표준 빌트인 객체 : 읽기 전용으로 사용하는 것이 좋음

```js
// 표준 빌트인 객체를 확장하는 것은 권장하지 않음
Array.prototype.sum = function () {
	return this.reduce((acc, cur) => acc + cur, 0);
}[(1, 2)].sum(); // 3
```

- 그 이유는 개발자가 직접 추가한 메서드와
- ┣ 미래에 표준 사양으로 추가될 메서드의 이름이 중복 가능함
- ┣ 하지만 `중복될 걱정이 없는 심벌 값으로 프로퍼티 키를 생성하여`
- ┗ `표준 빌트인 객체를 확장하면 이 문제가 사라짐`

```js
// 심벌 값으로 프로퍼티 키를 동적 생성하면
// 다른 프로퍼티 키와 절대 충돌하지 않아 안전함
Array.prototype[Symbol.for('sum')] = function () {
	return this.reduce((acc, cur) => {
		acc + cur, 0;
	});
};

[1, 2][Symbol.for('sum')](); // 3
```

## 33.7 Well-known Symbol

- JS가 기본 제공하는 빌트인 심벌 값이 존재함
-
