# 16. 프로퍼티 어트리뷰트

## 목차

- [16. 프로퍼티 어트리뷰트](#16-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8)
  - [16.1 내부 슬록과 내부 메서드](#161-%EB%82%B4%EB%B6%80-%EC%8A%AC%EB%A1%9D%EA%B3%BC-%EB%82%B4%EB%B6%80-%EB%A9%94%EC%84%9C%EB%93%9C)
  - [16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체](#162-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8%EC%99%80-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EB%94%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%84%B0-%EA%B0%9D%EC%B2%B4)
  - [16.3 데이터 프로퍼티와 접근자 프로퍼티](#163-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%99%80-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
    - [16.3.1 데이터 프로퍼티](#1631-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
    - [16.3.2 접근자 프로퍼티](#1632-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
  - [16.4 프러퍼티 정의](#164-%ED%94%84%EB%9F%AC%ED%8D%BC%ED%8B%B0-%EC%A0%95%EC%9D%98)
  - [16.5 객체 변경 방지](#165-%EA%B0%9D%EC%B2%B4-%EB%B3%80%EA%B2%BD-%EB%B0%A9%EC%A7%80)
    - [16.5.1 객체 확장 금지](#1651-%EA%B0%9D%EC%B2%B4-%ED%99%95%EC%9E%A5-%EA%B8%88%EC%A7%80)
    - [16.5.2 객체 밀봉](#1652-%EA%B0%9D%EC%B2%B4-%EB%B0%80%EB%B4%89)
    - [16.5.3 객체 동결](#1653-%EA%B0%9D%EC%B2%B4-%EB%8F%99%EA%B2%B0)
    - [16.5.4 불변 객체](#1654-%EB%B6%88%EB%B3%80-%EA%B0%9D%EC%B2%B4)

## 16.1 내부 슬록과 내부 메서드

- 앞으로 살펴볼 프로퍼티 어트리뷰트를 위해하기 위해서
- ┣ `내부 슬롯(internal slot)`, `내부 메서드(internal method)`
- ┗ 개념에 대해서 알아보자

- 내부 슬롯과 내부 메서드는 JS 엔진의 구현 알고리즘을 설명하기 위해
- ┣ ECMAScript 사양에서 사용하는
- ┣ `의사 프로퍼티(pseudo property)`, `의사 메서드(pseudo method)`임
- ┣ ES6에서 사양에 등장하는 `이중 대괄호([[...]])`로 감싼 이름들이
- ┗ 내부 슬롯과 내부 메서드

- 내부 슬롯과 내부 메서드는 ECMAScript 사양에 정의된 대로
- ┣ 구현되어 JS 엔진에서 실제로 동작 하지만 개발자가 직접 접근은 못함
- ┣ 내부 슬롯과 내부 메서드는 JS 엔진의 내부 로직이므로 JS는
- ┣ 내부 슬롯, 메서드에 접근하거나 호출하는 방법을 제공하지 않음
- ┣ 단, 일부 슬롯과 내부 메서드에서 한하여 간접적으로
- ┗ 접근할 수 있는 수단을 제공하기는 함

- 모든 객체 : `[[Prototype]]`이라는 내부 슬롯을 가짐
- ┣ 내부 슬롯은 JS 엔진의 내부 로직으로 → 원칙적 접근을 불가 하지만
- ┗ `[[Prototype]]` 내부 슬롯의 경우, `__proto__`를 통해 간접적 접근 가능

```js
const o = {};

// 내부 슬롯은 JS 엔진의 내부 로직이므로 직접 접근 불가
o[[Prototype]]; // Uncaught SyntaxError
// 단, 일부 내부 슬롯, 메서드의 경우 간접적으로 접근 가능한 수단 제공
o.__proto__; // Object.prototype
```

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

- JS 엔진은 프로퍼티를 생성할 때
- ┣ 프로퍼티 상태를 나타내는 → 프로퍼티 어트리뷰트를
- ┣ 기본값으로 자동정의함
- ┣ 프로퍼티 상태 : 1. `프로퍼티의 값(value)`, 2. `값의 갱신 가능 여부(writable)`
- ┣ 3. `열거 가능 여부(enumerable)`, 4. `재할당 가능여부(configurable)`를 말함

- 프로퍼티 어트리뷰트 : JS 엔진이 관리하는 내부 상태 값(meta-prototype)인 내부 슬롯
- ┣ `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`
- ┣ 프로퍼티 어트리뷰트는 직접 접근할 수 없지만
- ┗ `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인 가능

```js
const person = {
	name: 'Jang',
};
// 프로퍼티 어트리뷰트 정보를 제공하는
// 프로퍼티 디스크립터 객체를 반환
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Jang", writable : true, enumerable: true, configurable: true}
```

- `Object.getOwnPropertyDescriptor` 메서드를 호출 할 때
- ┣ 1. 첫 번째 매개변수 : 객체의 참조를 전달
- ┣ 2. 두 번째 매개변수 : 프로퍼티 키를 문자열로 전달
- ┣ Object.getOwnPropertyDescriptor 메서드 :
- ┣ 프로퍼티 어트리뷰트 정보를 제공하는
- ┣ `프로퍼티 디스크립터(PropertyDescriptor)` 객체를 반환
- ┣ 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한
- ┗ 프로퍼티 디스크립터를 요구하면 → undefined 반환

- `Object.getOwnPropertyDescriptor` 메서드는 하나의 프로퍼티에 대해
- ┣ 프로퍼티 디스크립터 객체를 반환하지만
- ┣ ES8에 도입된 `Object.getOwnPropertyDescriptors` 메서드는
- ┣ 모든 프로퍼티 어트리뷰트 정보를 제공하는
- ┗ `프로퍼티 디스크립터 객체들을 반환`

```js
const person = {
	name: 'Jang',
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는
// 프로퍼티 디스크립터 객체들을 반환
console.log(Object.getOwnPropertyDescriptors(person));
// {
//     name : {value: "Jang", writable : true, enumerable: true, configurable: true}
//     age : {value: 20, writable : true, enumerable: true, configurable: true}
// }
```

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

- 프로퍼티 : 데이터 프로퍼티와 접근자 프로퍼티로 구분가능

1. `데이터 프로퍼티 (data property)`

   - ┣ `키`와 `값`으로 구성된 일반적인 프로퍼티
   - ┗ 지금까지 살펴본 모든 프로퍼티 : `데이터 프로퍼티`

2. `접근자 프로퍼티 (accessor property)`
   - `자체적으로 값을 갖지 않고` 다른 데이터 프로퍼티의
   - ┣ `값을 읽거나 저장할 때 호출`되는
   - ┣ `접근자 함수(access function)`으로 구성된
   - ┗ 프로퍼티임

### 16.3.1 데이터 프로퍼티

- 데이터 프로퍼티(data property)는 다음과 같은 프로퍼티 어트리뷰트를 가짐
- ┗ 프로퍼티 어트리뷰트는 JS 엔진이 프로퍼티 생성할 때 기본값으로 자동 정의

| 프로퍼티 어트리뷰트                    | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                                                                                                                                                                                                                        |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[[Value]]`                            | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 접근 하면 반환되는 값 <br/> - 프로퍼티 키를 통해 프로퍼티 값을 변경하면 `[[Value]]` 값을 <br/> 재할당함. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 프로퍼티의 `[[Value]]`에 값을 저장함                                            |
| `[[Writable]]`                         | writable                            | - 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 가짐 <br/> `[[Writable]]`의 값이 false인 경우 해당 프로퍼티의 `[[Value]]`의 값을 <br/>                                                                                                                                |
| 변경할 수 없는 읽기 전용 프로퍼티가 됨 |
| `[[Enumerable]]`                       | enumerable                          | - 프로퍼티 열거 가능 여부를 나타내며 불리언 값을 가짐 <br/> - `[[Enumerable]]`의 값이 false인 경우 해당 프로퍼티는 `for...in` <br/> 문이나 `Object.keys` 메서드 등으로 열거가 불가                                                                                          |
| [[Configurable]]                       | configurable                        | - 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 가짐 <br/> - [[Configurable]]의 값이 false 인 경우 해당 프로퍼티의 삭제 <br/> 프로퍼티 어트리뷰트 값의 변경이 금지됨. , 단 `[[Writable]]`이 true인 경우 `[[Value]]` 변경과 `[[Writable]]`을 false로 변경하는 것은 허용 |

> 예제

```js
const person = {
	name: 'Jang',
};

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는
// 프로퍼티 디스크립터 객체들을 반환
console.log(Object.getOwnPropertyDescriptors(person));
// {
//     name : {value: "Jang", writable : true, enumerable: true, configurable: true}
// }
```

- `Object.getOwnPropertyDescriptors` 메서드가 반환한
- ┣ `프로퍼티 디스크립터 객체`를 살펴보면
- ┣ `value` 프로퍼티의 값 : `'Jang'`임
- ┣ `writable`, `enumerable`, `configurable` 프로퍼티 값은 모두 true
- ┗ 이것은 프로퍼티 어트리뷰트가 모두 true 임을 의미

### 16.3.2 접근자 프로퍼티

- `접근자 프로퍼티(accessor property)`는 자체적으로는 값을 가지지 않고
- ┣ 다른 `데이터 프로퍼티 값을 읽거나, 저장`을 할 때
- ┣ 사용하는 `접근자 함수(accessor function)` 구성된 프로퍼티
- ┗ 접근자 프로티는 : 프로퍼티 어트리뷰를 가짐

| 프로퍼티 <br/> 어트리뷰트 | 프로퍼티 디스크립터 <br/> 객체의 프로퍼티 | 설명                                                                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[[Get]]`                 | get                                       | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 <br/> 함수임. 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 <br/> 어트리뷰터 `[[Get]]`의 값, 즉 `getter` 함수가 호출되고 그 결과가 <br/> 프로퍼티 값으로 반환        |
| `[[Set]]`                 | set                                       | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 <br/> 접근자 함수임. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 <br/> 어트리뷰트 `[[Set]]`의 값, 즉 `setter` 함수가 호출되고 그 결과가 프로퍼티 <br/> 값으로 저장된다. |
| `[[Enumerable]]`          | enumerable                                | 데이터 프로퍼티의 `[[Enumerable]]`과 같다.                                                                                                                                                                                                            |
| `[[Configurable]]`        | configurable                              | 데이터 프로퍼티의 `[[Configurable]]`과 같다.                                                                                                                                                                                                          |

> 접근자 함수는 getter/setter 함수라고 부름
> 접근자 프로퍼티는 getter, setter 둘 다 적용가능하고 하나만 적용도 가능

```js
const person = {
    firstName : 'Jang',
    lastName: 'Hyun'
    // fullName은 접근자 함수로 구성된 접근자 프로퍼티
    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },
    // setter 함수
    set fullName() {
        // 배열 디스트럭처링 할당
        [this.firstName, this.lastName] = name.split(' ');
    }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Jang Hyun

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출
person.fullName = 'Kim who';
console.log(person); // {firstName: "Kim", lastName: "who"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출됨
console.log(person.fullName); // Kim wno

// firstName은 데이터 프로퍼티
// 데이터프 프로퍼티는 [[Value]], [[Writable]],
// [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Kim", writable : true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티
// 접근자 프로퍼티는 [[Get]], [[Set]],
// [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 가짐
let descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: f, set: f, enumerable: true, configurable: true}
```

- person 객체의 firstName과 lastName 프로퍼티는
- ┣ 일반적인 데이터 프로퍼티임
- ┣ 메서드 앞에 get, set이 붙은 메서드가 있는데
- ┣ 이것들이 getter, setter 함수이고
- ┗ getter/setter 함수의 이름 fullName : `접근자 프로퍼티`임

- `접근자 프로퍼티`는 자체적으로 `값(프로퍼티의 어트리뷰트)`
- ┣ `[[Value]]`을 가지지 않으며
- ┗ 다만 `데이터 프로퍼티의 값`을 `읽거나 저장`할 때 관여할 뿐

- 이를 내부 슬롯/메서드 관점에서 설명하자면
- ┣ 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면
- ┗ 내부적으로 `[[Get]]` 내부 메서드가 호출되어 다음과 같이 동작

1. 프로퍼티 키가 유일한지 확인

   - ┣ 프로퍼티 키 : 문자열, 심벌
   - ┣ 프로퍼티 키 "fullName"은 문자열이므로
   - ┗ 유요한 프로퍼티 키임

2. 프로토타입 체인에서 프로퍼티를 검색

   - ┗ person 객체에 fullName 프로퍼티가 존재

3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지

   - ┗ 접근자 프로퍼티인지 확인함, fullName : 접근자 프로퍼티

4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 `[[Get]]`의 값
   - ┣ 즉 getter 함수를 호출하여 그 결과를 반환
   - ┣ 프로퍼티 fullName의 프로퍼티 어트리뷰터 `[[Get]]`의 값은
   - ┣ `Object.getOwnPropertyDescriptor` 메서드가 반환하는
   - ┗ `프로퍼티 디스크립터(Property Descriptor)` 객체의 get 프로퍼티와 같음

> 프로토 타입(prototype)

      프로토타입 : 어떤 객체의 상위(부모) 객체의 역할을 하는 객체
      ┣ 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를
      ┣ 상속하게 됨
      ┣ 프로토 타입 객체의 프로퍼티나 메서드를 상속받은 → 하위 객체
      ┗ 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용가능

      프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로
      ┣ 연결되어 있는 상속 구조를 뜻함
      ┣ 객체의 프로퍼티나 메서드에 접근하려고 할 때
      ┣ 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면
      ┣ 프로토타입 체인에 따라 프로토타입의 프로퍼티나 메서드를
      ┣ 차례대로 검색
      ┗ 프로토타입과 프로토타입 체인에 대해서는 뒤에서 설명

- 접근자 프로퍼티, 데이터 프로퍼티 구별법

```js
// 일반 객체의 __proto__는 접근자 프로퍼티
Object.getOwnPropertyDescriptor(Objet.prototype, '__proto__');
// {get: f, set: f, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티임
Object.getOwnPropertyDescriptor(function () {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```

> Object.getOwnPropertyDescriptor 메서드가 반환한 프로퍼티 어트리뷰트 객체로
> 표현한 프로퍼티 디스크립터 객체를 유심히 살표보자
> 접근자 프로퍼티와 데이터 프로퍼티의 프로퍼티 디스크립터 객체의
> 프로퍼티가 다른것을 알 수 잇음

## 16.4 프러퍼티 정의

- 프로퍼티 정의 : 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를
- ┣ 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의
- ┣ 1. 프로퍼티 값을 갱신 가능하도록 할 것 인지
- ┣ 2. 프로퍼티를 열거 가능하도록 할 것 인지
- ┗ 정의가 가능하다.

> 이를 통해서 객체의 프로퍼티가 어떻게 동작해야 하는지 명확히 정의 가능

```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
	value: 'Jang',
	writable: true,
	enumerable: true,
	configurable: true,
});

Object.defineProperty(person, 'lastName', {
	value: 'Hyun',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'fistName');
console.log('firstName', descriptor);
// firstName {value : "Jang", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Hyun", writable: false, enumerable: false, configurable: false}

// [[Enumerable]] : false
// 해당 프로퍼티 for ... in 문이나 Object.keys 등으로 열거 불가
// lastName 프로퍼티는 [[Enumerable]] 값이 false → 열거 안됨
console.log(Object.keys(person)); // Jang

// [[Writable]] : false
// 값 변경 불가
// 값을 변경하면 에러는 발생하지 않고 무시됨
person.lastName = 'Kim';

// [[Configurable]] : false
// 해당 프로퍼티 삭제불가
// 프로퍼티 삭제해도 에러는 발생하지 않고 무시됨
delete person.lastName;

// [[Configurable]] : false
// 해당 프로퍼티 재정의 불가

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
	//getter 함수
	get() {
		return `${this.firstName} ${this.lastName}`;
	},
	// setter 함수
	set(name) {
		[this.firstName, this.lastName] = name.split(' ');
	},
	enumerable: true,
	configurable: true,
});
```

- `Object.defineProperty` 메서드로 프로퍼티를 정의할 때
- ┣ 프로퍼티 디스크립터 객체의 프로퍼티를 이부 생략 가능
- ┗ 프로퍼티 디스크립터에서 생략된 어트리뷰튼 다음과 같이 기본값이 적용

| 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 생략했을 때의 기본값 |
| ----------------------------------- | ---------------------------- | -------------------- |
| value                               | `[[Value]]`                  | undefined            |
| get                                 | `[[Get]]`                    | undefined            |
| set                                 | `[[Set]]`                    | undefined            |
| writable                            | `[[Writable]]`               | undefined            |
| enumerable                          | `[[Enumerable]]`             | undefined            |
| configurable                        | `[[Configurable]]`           | undefined            |

- `Object.defineProperty` 메서드는 `한번에 하나의 프로퍼티만 정의` 가능
- ┗ `Object.defineProperties` 사용하면 여러개의 프로퍼티 한 번에 정의 가능

```js
const person = {};

Object.defineProperties(person, {
	// 데이터 프로퍼티 정의
	firstName: {
		value: 'Jang',
		writable: true,
		enumerable: true,
		configurable: true,
	},
	lastName: {
		value: 'Hyun',
		writable: true,
		enumerable: true,
		configurable: true,
	},
    // 접근자 프로퍼티 정의
    fullName: {
        // getter 함수
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
        // setter 함수
        set(name) {
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable: true,
        configurable: true,
    }
});

person.fullName = 'Jang Hyun';
console.log(person); // {firstName : "Jang", lastName: "Hyun"}
```

## 16.5 객체 변경 방지

- 객체는 변경 가능한 값이므로 재할당 없이 직접 변경 가능
- ┣ 1. `프로퍼티를 추가하거나 삭제`할 수 있고
- ┣ 2. `프로퍼티 값을 갱신`할 수 있으며
- ┣ 3. `Object.defineProperty`
- ┣ 4. `Object.defineProperties`
- ┗ 메서드를 사용하여 프로퍼티 `어트리뷰트를 재정의` 가능

- JS는 객체의 변경을 방지하는 다양한 메서드를 제공
- ┗ 객체 변경 방지 메서드들은 객체의 변경을 금지하는 정도가 다름

| 구분           | 메서드                   | 프로퍼티 <br/> 추가 | 프로퍼티 <br/> 삭제 | 프로퍼티 <br/> 값 읽기 | 프로퍼티 <br/> 값 쓰기 | 프로퍼티 어트 <br/> 리뷰트 재정의 |
| -------------- | ------------------------ | ------------------- | ------------------- | ---------------------- | ---------------------- | --------------------------------- |
| 객체 확장 금지 | Object.preventExtensions | X                   | O                   | O                      | O                      | O                                 |
| 객체 밀봉      | Object.seal              | X                   | X                   | O                      | O                      | X                                 |
| 객체 동결      | Object.freeze            | X                   | X                   | O                      | X                      | X                                 |

### 16.5.1 객체 확장 금지

- `Object.preventExtensions` 메서드는 객체의 `확장을 금지`함
- ┣ 객체 `확장 금지` : 프로퍼티의 추가를 금지를 의미
- ┣ 확장이 금지된 객체 : 프로퍼티 추가가 금지
- ┣ `프로퍼티는 프로퍼티 동적 추가`와
- ┣ `Object.defineProperty` 메서드로 추가 할 수 있음
- ┗ 이 두개의 추가 방법이 모두 금지

- 확장이 가능한 객체 여부 `Object.isExtensible` 메서드는 확인 확인할 수 있음

```js
const person = { name: 'Lee' };

//person 객체는 확장이 금지된 객체가 아님
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지
person.age = 20; // 무시, strict 모드에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 추가는 금지되지만 삭제는 가능
delete person.name;

// 프로퍼티 정의에 의한 프로퍼티 추가도 금지
Object.defineProperty(person, 'age', { value: 20 });
// Type Error : Cannot define property age, object is not extensible
```

### 16.5.2 객체 밀봉

- Object.seal 메서드 : 객체를 밀봉
- ┣ 객체 밀봉(seal)이란 프로퍼티 추가 및 삭제와
- ┣ 프로퍼티 어트리뷰트 정의 금지를 의미
- ┗ 밀봉된 객체는 읽기와 쓰기만 가능

- 밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인 가능

```js
const person = { name: 'Lee' };
// person 객체는 밀봉(seal)된 객체가 아님
console.log(Object.isSealed(person)); //false

// person 객체를 밀봉(seal)하여 프로퍼티를 추가, 삭제, 재정의를 금지
Object.seal(person);

// person 객체는 밀봉(seal)된 객체
console.log(Object.isSeal(person)); // true

// 밀봉된 객체는 configurable이 false

// 프로퍼티 추가 금지
// 프로퍼티 삭제 금지
// 프로퍼티 값 갱신은 가능

person.name = 'Kim';
console.log(person);

// 프로퍼티 어트리뷰트 재정의 금지
Object.defineProperty(person, 'name', { configurable: true });
// TypeError : cannot redefine property : name
```

### 16.5.3 객체 동결

- `Object.freeze` 메서드는 객체를 동결
- ┣ `객체 동결` : 프로퍼티 추가 및 삭제와
- ┣ `프로퍼티 어트리뷰트 재정의 금지`
- ┗ `프로퍼티 값 갱신 금지` 의미

> 동결된 객체는 읽기만 가능

- Object.isFrozen 메서드

### 16.5.4 불변 객체

- 지금까지의 변경 방지 메서드들은
- ┣ `얕은 (shallow only)로 직속 프로퍼티만 변경`이 방지되고
- ┣ `중첩 객체까지는 영향을 주지 못함`
- ┗ `Object.freeze` 메서드로 객체를 동결하여도 `중첩 객체까지 동결은 불가`

- 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면
- ┣ 객체를 값으로 갖는 `모든 프로퍼티`에 대해 `재귀적으로 Object.freeze` 메서드를
- ┗ `호출 해야함`

```js
const person = {
	name: 'Lee',
	address: { city: 'Seoul' },
};

// 얕은 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결
console.log(Object.isFrozen(person)); //true
// 중첩 객체까지 동결하지 못함
console.log(Object.isFrozen(person.address)); //false

person.address.city = 'Busan';
console.log(person);
// {name: "Lee", address: {city: "Busan"}}
```

- 객체의 `중첩 객체까지 동결하여 변경이 불가능한 읽기 전용`의
- ┣ `읽기 전용의 불변 객체`를 `구현`하기 위해서는
- ┣ 객체를 값으로 갖는 `모든 프로퍼티에 대해서`
- ┗ `재귀적으로 Object.freeze 메서드 호출`

```js
function deepFreeze(target) {
	// 객체가 아니거나 동결된 객체는 무시하고
	// 동결되지 않은 객체만 동결
	if (target && typeof target === 'object' && !Object.isFrozen(target)) {
		Object.freeze(target);
		Object.keys(target).forEach((key) => deepFreeze(target[key]));
	}
	// 모든 프로퍼티를 순회하여 재구적으로 동결
	// Object.keys 메서드는 객체 자신의 열거 가능한
	// 프로퍼티 키를 배열로 반환함
	// forEach 메서드는 배열을 순회하여 배열의 각 요소에 대해서
	// 콜백 함수를 실행
	return target;
}

const person = {
	name: 'Lee',
	address: { city: 'Seoul' },
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
// 변경해도 오류는 안나지만 변경은 되지 않음!!!
```
