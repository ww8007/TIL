# 25. 클래스

## 목차

- [25. 클래스](#25-%ED%81%B4%EB%9E%98%EC%8A%A4)
  - [25.1 클래스는 프로토타입의 문법적 설탕인가?](#251-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%8A%94-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%98-%EB%AC%B8%EB%B2%95%EC%A0%81-%EC%84%A4%ED%83%95%EC%9D%B8%EA%B0%80)
  - [25.2 클래스 정의](#252-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%A0%95%EC%9D%98)
  - [25.3 클래스 호이스팅](#253-%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)
  - [25.4 인스턴스 생성](#254-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1)
  - [25.5 메서드](#255-%EB%A9%94%EC%84%9C%EB%93%9C)
    - [25.5.1 constructor](#2551-constructor)
    - [25.5.2 프로토타입 메서드](#2552-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EB%A9%94%EC%84%9C%EB%93%9C)
    - [25.5.3 정적 메서드](#2553-%EC%A0%95%EC%A0%81-%EB%A9%94%EC%84%9C%EB%93%9C)
    - [25.5.4 정적 메서드와 프로토타입 메서드의 차이](#2554-%EC%A0%95%EC%A0%81-%EB%A9%94%EC%84%9C%EB%93%9C%EC%99%80-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-%EB%A9%94%EC%84%9C%EB%93%9C%EC%9D%98-%EC%B0%A8%EC%9D%B4)
    - [25.5.5 클래스에서 정의한 메서드의 특징](#2555-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%97%90%EC%84%9C-%EC%A0%95%EC%9D%98%ED%95%9C-%EB%A9%94%EC%84%9C%EB%93%9C%EC%9D%98-%ED%8A%B9%EC%A7%95)
  - [25.6 클래스의 인스턴스 생성 과정](#256-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1-%EA%B3%BC%EC%A0%95)
    - [1. 인스턴스 생성과 this 바인딩](#1-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1%EA%B3%BC-this-%EB%B0%94%EC%9D%B8%EB%94%A9)
    - [2. 인스턴스 초기화](#2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%B4%88%EA%B8%B0%ED%99%94)
    - [3. 인스턴스 반환](#3-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%B0%98%ED%99%98)
  - [25.7 프로퍼티](#257-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
    - [25.7.1 인스턴스 프로퍼티](#2571-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
    - [25.7.2 접근자 프로퍼티](#2572-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0)
    - [25.7.3 클래스 필드 정의 제안](#2573-%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%95%84%EB%93%9C-%EC%A0%95%EC%9D%98-%EC%A0%9C%EC%95%88)
      - [클래스 필드와 화살표 함수](#%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%95%84%EB%93%9C%EC%99%80-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98)
    - [25.7.4 private 필드 정의 제언](#2574-private-%ED%95%84%EB%93%9C-%EC%A0%95%EC%9D%98-%EC%A0%9C%EC%96%B8)
      - [25.7.5 static 필드 정의 제안](#2575-static-%ED%95%84%EB%93%9C-%EC%A0%95%EC%9D%98-%EC%A0%9C%EC%95%88)
  - [25.8 상속에 의한 클래스 확장](#258-%EC%83%81%EC%86%8D%EC%97%90-%EC%9D%98%ED%95%9C-%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%99%95%EC%9E%A5)
    - [25.8.1 클래스 상속과 생성자 함수 상속](#2581-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%83%81%EC%86%8D%EA%B3%BC-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98-%EC%83%81%EC%86%8D)
    - [25.8.2 extends 키워드](#2582-extends-%ED%82%A4%EC%9B%8C%EB%93%9C)
    - [25.8.3 동적 상속](#2583-%EB%8F%99%EC%A0%81-%EC%83%81%EC%86%8D)
    - [25.8.4 서브클래스의 constructor](#2584-%EC%84%9C%EB%B8%8C%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-constructor)
    - [25.8.5 super 키워드](#2585-super-%ED%82%A4%EC%9B%8C%EB%93%9C)
      - [super 호출](#super-%ED%98%B8%EC%B6%9C)
      - [super 호출 주의 점](#super-%ED%98%B8%EC%B6%9C-%EC%A3%BC%EC%9D%98-%EC%A0%90)
    - [super 참조](#super-%EC%B0%B8%EC%A1%B0)
    - [25.8.6 상속 클래스의 인스턴스 생성 과정](#2586-%EC%83%81%EC%86%8D-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1-%EA%B3%BC%EC%A0%95)
      - [1. 서브클래스의 super 호출](#1-%EC%84%9C%EB%B8%8C%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-super-%ED%98%B8%EC%B6%9C)
      - [2. 수퍼클래스의 인스턴스 생성과 this 바인딩](#2-%EC%88%98%ED%8D%BC%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1%EA%B3%BC-this-%EB%B0%94%EC%9D%B8%EB%94%A9)
      - [3. 수퍼클래스의 인스턴스 초기화](#3-%EC%88%98%ED%8D%BC%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%B4%88%EA%B8%B0%ED%99%94)
      - [4. 서브클래스 constructor로 복귀와 this 바인딩](#4-%EC%84%9C%EB%B8%8C%ED%81%B4%EB%9E%98%EC%8A%A4-constructor%EB%A1%9C-%EB%B3%B5%EA%B7%80%EC%99%80-this-%EB%B0%94%EC%9D%B8%EB%94%A9)
      - [5. 서브클래스의 인스턴스 초기화](#5-%EC%84%9C%EB%B8%8C%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%B4%88%EA%B8%B0%ED%99%94)
      - [6. 인스턴스 반환](#6-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%B0%98%ED%99%98)
    - [25.8.7 표준 빌트인 생성자 함수 확장](#2587-%ED%91%9C%EC%A4%80-%EB%B9%8C%ED%8A%B8%EC%9D%B8-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98-%ED%99%95%EC%9E%A5)

## 25.1 클래스는 프로토타입의 문법적 설탕인가?

- JS : 프로토 타입 기반의 객체지향 언어임
- ┣ 비록 다른 객체 지향 언어와의 차이점이 존재하지만
- ┗ `강력한 객체지향 프로그래밍 능력`을 지니고 있음

- 프로토타입 기반 객체지향 언어 : 클래스가 필요 없는
- ┣ class free 객체 지향 프로그래밍 언어임
- ┗ `생성자 함수`, `프로토 타입`을 통해 `객체 지향 언어의 상속`을 `구현` 가능

```js
// ES5 생성자 함수
var Person = (function () {
	// 생성자 함수
	function Person(name) {
		this.name = name;
	}

	// 프로토타입 메서드
	Person.prototype.sayHi = function () {
		console.log(`Hi! My name is ` + this.name);
	};

	return Person;
})();

// 인스턴스 생성
var me = new Person('Lee');
my.sayHi(); // Hi! My name is Lee
```

- 그러나 클래스 기반의 언어에 익숙한 프로그래머 → JS 진입 장벽
- ┣ 고로 ES6 에서 등장한 클래스 : 클래스 기반으로 구현 가능
- ┣ 하지만 기존 프로토타입 기반 패턴 → 클래스 기반 패턴처럼
- ┗ 사용가능하도록 한 : `문법적 설탕` 이라고 할 수 있음

> 하지만 둘이 유사하게 동작하지만 차이점이 존재

1. 클래스를 new 연산자 없이 호출하면 오류가 발생

   - ┗ But : 생성자 함수의 경우 일반 함수로 동작

2. 클래스 : 상속을 지원하는 `extends, super 키워드`를 제공

   - ┗ But : 생성자 함수는 키워드 제공 X

3. 클래스 : 호이스팅이 발생하지 않는 것 처럼 보임

   - ┣ But : `함수 선언문 생성자 함수` → `함수 호이스팅`이,
   - ┗ `함수 표현식` → `변수 호이스팅`이 발생

4. 클래스 내의 모든 코드에는 암묵적으로 `strict mode가 지정되어 실행`

   - ┣ strict mode를 해제가 불가능함
   - ┗ But : 생성자 함수 → `strict mode 적용되지 않음`

5. 클래스의 `constructor`, `프로토타입 메서드`, `정적 메서드`는 모두
   - ┣ 프토퍼티 어트리뷰트 [[Enumerable]] 값 : 모두 false
   - ┗ 고로 `열거가 불가능`함

> 클래스 : 문법적 설탕 보다는 → 새로운 객체 생성 메커니즘으로 보는게 좋음

## 25.2 클래스 정의

- 클래스 : class 키워드를 사용하여 정의
- ┣ 클래스 `이름` : `파스칼 케이스`를 사용하는 것이 일반적
- ┗ But : 사용하지 않아도 문제 발생 x

```js
// 클래스 선언문
class Person {}
```

- 일반적이지는 않지만 `표현식으로 클래스 정의 가능`
- ┗ 이름을 가질 수도 있고, 가지지 않을 수 도 있음

```js
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

- `클래스를 표현식으로 정의가 가능`함 →
- ┣ `클래스` : 값으로 사용할 수 있는 `일급 객체`임을 의미
- ┗ 클래스는 일급 객체로 다음과 같은 특징을 가짐

1. `무명의 리터럴`로 생성가능 → `런타임에 생성 가능`

2. `변수나 자료구조(객체, 배열)에 저장`이 가능

3. `함수의 매개변수`에 `전달` 가능

4. `함수의 반환값`으로 `사용` 가능

> 좀 더 자세히 말하면 클래스 : `함수`

- 고로 값처럼 사용할 수 있는 `일급 객체임`

- 클래스 몸체에는 0 개 이상의 메서드만 정의가 가능함
- ┣ 클래스 몸체 정의 메서드 :
- ┣ 1. `constructor(생성자)`
- ┣ 2. `프로토타입 메서드`
- ┗ 3. `정적 메서드`

```js
// 클래스 선언문
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name; // name 프로퍼티 : public
	}

	// 프로토타입 메서드
	sayHi() {
		console.log(`Hi! My name is ${this.name}`);
	}

	// 정적 메서드
	static sayHello() {
		console.log('Hello');
	}
}

// 인스턴스 생성
const me = new Person('Lee');

// 인스턴스 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메서드 호출
me.sayHi();
// 정적 메서드 호출
Person.sayHello(); // Hello
```

## 25.3 클래스 호이스팅

- 클래스 : 함수로 평가됨

```js
// 클래스 선언문
class Person {}

console.log(typeof Person); // function
```

- 클래스 선언문으로 정의한 클래스 : 함수 선언문과 같이
- ┣ 소스코드 평가 과정, 즉 : 런타임 이전에 먼저 평가 되어서
- ┣ `함수 객체를 생성`하게 됨
- ┣ 클래스가 평가되어 생성된 함수 객체 : `생성자 함수로서 호출할 수 있는`
- ┣ 함수 → `constructor`임
- ┣ 생성자 함수로서 호출할 수 있는 함수 : 함수 정의가 평가되어 함수 객체를
- ┗ `생성하는 시점에 프로토타입도 더불어 생성`됨

> 프로토타입, 생성자 함수 : 단독으로 존재할 수 없고 언제나 쌍으로 존재

- 단, 클래스 : 클래스 정의 이전에 참조가 불가능함

```js
console.log(Person);
// ReferenceError: Cannot access Person before initialize

// 클래스 선언문
class Person {}
```

- 클래스 선언문 : 마치 호이스팅이 발생하지 않는 것처럼 보이나
- ┗ 그렇지 않음

```js
const Person = '';

{
	// 호이스팅이 발생하지 않는다면 ''이 출력되어야 함
	console.log(Person);
	// ReferenceError: Cannot access 'Person' before initialization

	// 클래스 선언문
	class Person {}
}
```

- 클래스 선언문도 `변수 선언, 함수 정의와 마찬가지로 호이스팅`이 발생
- ┣ 단 : 클래스 `let`, `const` `키워드로 선언한 변수`처럼 `호이스팅`
- ┣ 클래스 선언문 이전에 `일시적 사각지대 Temporal Dead Zone: TDZ에 빠지게 됨`
- ┗ 호이스팅이 발생하지 않는 것처럼 동작함

- `var`, `let`, `const`, `function`, `function*`, `class`
- ┣ 선언된 모든 `식별자는 호이스팅`됨
- ┗ 모든 선언문은 `런타임 이전에 먼저 실행되기 때문`

## 25.4 인스턴스 생성

- 클래스 : `생성자 함수이며 new 연산자와 함께 호출`되어
- ┗ `인스턴스를 생성`

```js
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

- 함수는 `new 연산자의 사용 여부에 따라 일반 함수로 호출`되거나
- ┣ `인스턴스 생성을 위한 생성자 함수`로 `호출되지만 클래스`는
- ┣ 인스턴스를 `생성하는 것이 유일한 존재 이유`이므로
- ┗ 반드시 `new 연산자와 함께 호출`해야 함

```js
class Person {}

// 클래스를 new 연산자 없이 호출하면 타입 에러가 발생한다.
const me = Person();
// TypeError: Class constructor Foo cannot be invoked without new
```

- `클래스 표현식` : 정의된 클래스의 경우
- ┣ 다음 예제와 같이 `클래스를 가리키는 식별자(Person)`
- ┣ 사용해 인스턴스를 생성하지 않고 `기명 클래스 이름(MyClass)을 사용`해
- ┗ `인스턴스를 생성하면 에러가 발생`함

```js
const Person = class MyClass {};

// 함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 함
const me = new Person();

// 클래스 이름 MyClass는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자임
console.log(MyClass); // ReferenceError: MyClass is not defined

const you = new MyClass(); // ReferenceError: MyClass is not defined
```

- 이는 `기명 함수 표현식과 마찬가지로 클래스 표현식`
- ┗ 클래스 이름은 `외부 코드에서 접근 불가능`함

## 25.5 메서드

- 클래스 몸체에는 `0개 이상의 메서드만 선언할 수` 있음
- ┣ 클래스 `몸체에서 정의할 수 있는 메서드`는
- ┗ `constructor(생성자)`, `프로토타입 메서드`, `정적 메서드`

- `클래스 정의에 대한 새로운 제안 사양`
- ┣ `ECMAScript` 사양 클래스 몸체에 메서드뿐만 아니라 `프로퍼티를 직접 정의`
- ┣ `새로운 표준 사양이 제안`되어 있음
- ┣ 제안 사양에 의해 머지않아 `클래스 몸체에서 메서드뿐`만 아니라
- ┗ 프로퍼티도 정의할 수 있게 될 것으로 보임(현재 `크롬과 같은 모던 브라우저에서 가능)`

### 25.5.1 constructor

- `constructor` : `인스턴스를 생성하고 초기화`하기 위한
- ┣ 특수한 메서드임
- ┗ constructor 이름을 변경할 수 없음

```js
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name;
	}
}
```

- 앞에서 살펴보았듯이 `클래스` : `인스턴스를 생성하기 위한 생성자 함수`
- ┣ 클래스는 내부를 들여다보기 위해 크롬 브라우저의 개발자 도구에서
- ┗ 실행해보기

```js
// 클래스는 함수
console.log(typeof Person); // function
console.dir(Person);
```

- 이처럼 `클래스는 평가되어 함수 객체`가 됨
- ┣ 함수 객체의 프로퍼티에서 살펴보았듯이 `클래스도 함수`
- ┣ `객체 고유의 프로퍼티`를 모두 갖고 있음
- ┣ 함수와 동일하게 `포로토타입과 연결되어 있으며`
- ┗ `자신의 스코프 체인을 구성`

- `클래스가 생성한 인스턴스의 내부`를 들여다보기 위해
- ┗ 코드를 크롬 브라우저의 `개발자 도구에서 실행` 해보기

```js
// 인스턴스 생성
const me = new Person('Lee');
console.log(me);
```

- `Person 클래스` : `constructor 내부에서 this에 추가한`
- ┣ name `프로퍼티가 클래스가 생성된 인스턴스의 추가된 것을 확인`할 수 있음
- ┣ 생성자 함수가와 마찬가지로 constructor 내부에서 this에 추가한
- ┣ 프로퍼티는 인스턴스 프로퍼티가 됨
- ┣ constructor 내부의 this 생성자 함수와 마찬가지로 클래스가 생성한
- ┗ 인스턴스 가리킴

```js
// 클래스
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name;
	}
}

// 생성자 함수
function Person(name) {
	// 인스턴스 생성 및 초기화
	this.name = name;
}
```

- 흥미로운 점 : `클래스가 평가되어 생성된 함수 객체`나
- ┣ 클래스가 생성한 인스턴스 어디에서도 `constructor 메서드`
- ┣ 찾을 수 없다는 점
- ┗ 이는 : 클래스 몸체에 정의한 `constructor가 단순한 메서드가 아님 의미`

- `constructor : 메서드로 해석되는 것이 아닌`
- ┣ 클래스가 평가되어 생성한 함수 객체 코드의 일부가 됨
- ┗ 클래스 정의가 평가 → `constructor의 기술된 동작을 하는 함수 객체` 생성

> 클래스 : constructor, 프로토타입 : constructor

    프로토타입 : 모든 프로토타입이 가지고 있는
    ┗ 프로퍼티이며 생성자 함수를 가리킴

- `constructor` : 생성자 함수와 유사하지만 몇 가지 차이가 존재
- ┣ 1. `클래스 내 하나만` 존재 가능
- ┣ 2. `생략 가능` → `암묵적으로 정의` → `빈 constructor에 의해 빈 객체 생성`
- ┣ 3. `프로퍼티가 추가`되어 `초기화된 인스턴스를 생성하기 위해`서는
- ┗━ `constructor 내부`에서 `this 인스턴스 프로퍼티를 추가`

```js
class Person {
	constructor() {
		// 고정값으로 인스턴스 초기화
		this.name = 'Lee';
		this.address = 'Seoul';
	}
}

// 인스턴스 프로퍼티가 추가됨
const me = new Person();
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

- `인스턴스를 생성할 때 클래스 외부`에서
- ┣ 인스턴스 `프로퍼티의 초기값을 전달`하려면 :
- ┣ 1. `constructor 매개변수를 선언`
- ┣ 2. `인스턴스를 생성할 때 초기값을 전달`
- ┗━ 초기값의 경우 constructor `매개변수로 전달`

```js
class Person {
	constructor(name, address) {
		// 인수로 인스턴스 초기화
		this.name = name;
		this.address = address;
	}
}

// 인수로 초기값을 전달. 초기값은 constructor에 전달
const me = new Person('Lee', 'Seoul');
console.log(me);
```

- 이처럼 constructor 내에서는 인스턴스의 생성과 동시에
- ┣ 인스턴스 프로퍼티 추가를 통해 인스턴스의 초기화를 실행
- ┗ 인스턴스를 초기화하려면 constructor를 생략하면 안됨

- 또한 constructor : 별도의 반환문을 가지면 안됨
- ┣ new 연산자와 함께 클래스 호출 → 생성자 함수와 동일하게
- ┗ 암묵적으로 this → 인스턴스를 반환하기 때문

```js
class Person {
    constructor(name) {
        this.name = name;
    }
    // 명시적으로 객체를 반환하면 this 반환이 무시됨
    return {};
}

// constructor에서 명시적으로 반환한 빈 객체가 반환
const me = new Person('Lee');
console.log(me); // {}
```

- 하지만 명시적으로 원시값을 반환하면 원시값 반환은 무시되고
- ┗ 암묵적으로 this가 반환됨

```js
class Person {
	constructor(name) {
		this.name = name;

		// 명시적으로 원시값을 반환하면 무시되고
		// 의도적으로 this가 반환됨
		return 100;
	}
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

- 이처럼 `constructor 내부에서 명시적으로 this가 아닌 다른 값을 반환 하는 것`
- ┣ `클래스의 기본 동작을 훼손` 하게됨
- ┗ constructor 내부에서 `return 문을 반드시 생략해야 함`

### 25.5.2 프로토타입 메서드

- 생성자 함수를 사용하여 인스턴스를 생성한는 경우
- ┣ 프로토타입 메서드를 생성하기 위해서는
- ┗ 다음과 같이 명시적으로 프로토타입에 메서드를 추가해야함

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}
// 프로토타입 메서드
Person.prototype.sayHi = function () {
	console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
my.sayHi(); // Hi! My name is Lee
```

- `클래스 몸체에서 정의한 메서드` : 생성자 함수에 의한
- ┣ `객체 생성 방식과는 다르게`
- ┣ 클래스의 `prototype 프로퍼티에 메서드를 추가하지 않아도`
- ┗ 기본적으로 `프로토타입 메서드가 됨`

```js
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name;
	}
	// 프로토타입 메서드
	sayHi() {
		console.log(`Hi! My name is ${this.name}`);
	}
}
const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

- 생성자 함수와 마찬가지로 `클래스가 생성한 인스턴스` :
- ┗ `프로토타입 체인의 일원`이 됨

```js
// me 객체의 프로토타입 : Person.prototype
Object.getPrototypeOf(me) === Person.prototype; // true
me instanceof Person; // true

// Person.prototype의 프로토타입은 Object.prototype임
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
me instanceOf Object; // true

// me 객체의 constructor는 Person 클래스임
me.constructor === Person; // true
```

- 이처럼 `클래스 몸체에서 정의한 메서드` :
- ┣ 인스턴스의 프로토타입에 존재하는 `프로토타입 메서드`가 됨
- ┗ 인스턴스 : `프로토타입 메서드를 상속`받아 사용 가능

- 프로토타입 `체인` : 기존의 모든 객체 생성 방식 뿐만 아니라
- ┣ 클래스에 의해 생성된 `인스턴스도 동일하게 적용`됨
- ┗ `생성자 함수의 역할을 클래스가 할 뿐`

- 결국 클래스 : `생성자 함수와 같이 인스턴스를 생성`하는
- ┗ 생성자 함수라고 볼 수 있음

> 결론적 : 클래스 → 프로토타입 기반의 객체 생성 메커니즘
> 생성자 함수와 동일함

### 25.5.3 정적 메서드

- `정적 메서드` : `인스턴스를 생성하지 않아도 호출`이 가능함

- 생성자 함수의 경우 정적 메서드를 생성하기 위해서
- ┗ `명시적으로 생성자 함수에 메서드를 추가`해야 함

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

// 정적 메서드
Person.sayHi = function () {
	console.log('Hi!');
};

// 정적 메서드 호출
Person.sayHi(); // Hi!
```

- 클래스에서 메서드에 static 키워드를 붙이면
- ┗ 정적 메서드(클래스 메서드)가 됨

```js
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name;
	}
	// 정적 메서드
	static sayHi() {
		console.log(`Hi!`);
	}
}
```

- `정적 메서드` : `클래스에 바인딩된 메서드`가 됨
- ┣ 클래스 : 함수 객체로 평가 → `자신의 프로퍼티/메서드 소유` 가능
- ┣ 클래스 : `클래스 정의(클래스 선언문이나 클래스 표현식)`가
- ┣ 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리
- ┣ `별다른 생성 과정이 필요 없음`
- ┣ 고로 : 정적 메서드는 클래스 정의 이후
- ┗ `인스턴스를 생성하지 않아도 호출 가능`

- 정적 메서드 : 프로토타입 메서드처럼 인스턴스로 호출하지 않고
- ┗ 클래스로 호출함

```js
// 정적 메서드 : 클래스로 호출
// 정적 메서드 : 인스턴스 없이 호출 가능
Person.sayHi(); // Hi!
```

- `정적 메서드` : `인스턴스로 호출할 수 없음`
- ┣ 정적 메서드가 `바인딩된 클래스` : `인스턴스의 프로토타입 체인상`
- ┣ 존재하지 않음
- ┣ 다시 말해 인스턴스의 프로토타입 체인 상에는 클래스가 존재하지
- ┗ 않기 때문에 `인스턴스로 클래스의 메서드를 상속받을 수 없음`

```js
// 인스턴스 생성
const me = new Person('Lee');
me.sayHi(); // TypeError: me.sayHi is not a function
```

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

- 정적 메서드와 프로토타입 메서드의 차이점에 대해서 학습
- ┣ 차이점
- ┣ 1. 정적 메서드와 프로토타입 메서드 : `자신이 속해` 있는
- ┣━ `프로토 타입 체인이 다름`
- ┣ 2. 정적 메서드 : `클래스 호출`, 프로토타입 메서드 : `인스턴스로 호출`
- ┣ 3. `정적 메서드` : 인스턴스 프로퍼티를 참조할 수 없음
- ┗━ `프로토타입 메서드` : `인스턴스 프로퍼티를 참조`할 수 있음

```js
class Square {
	// 정적 메서드
	static area(width, height) {
		return width * height;
	}
}

console.log(Square.area(10, 10)); // 100
```

- `정적 메서드` area : 2개의 인수를 전달받아 면적을 계산
- ┣ 이때 → 정적 메서드 area : `인스턴스 프로퍼티를 참조하지 않음`
- ┣ `인스턴스 프로퍼티를 참조`해야 한다면
- ┗ 정적 메서드 대신 `프로토타입 메서드를 사용`해야 함

```js
class Square {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	// 프로토타입 메서드
	area() {
		return this.width * this.height;
	}
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

- `메서드 내부 this` :
- ┣ 메서드를 소유한 객체가 아닌 →
- ┣ `메서드를 호출한 객체`
- ┣ 즉 : `이름 앞의 마침표(.) 앞에 기술`한
- ┗ `객체에 바인딩` 됨

- `프로토타입 메서드` : `인스턴스로 호출`해야 함
- ┣ 프로토타입 메서드 내부 this : `프로토타입 메서드`로
- ┗ `호출한 인스턴스를 가리킴`

- 위 예제 : `square 객체로 프로토타입 메서드 area 호출`
- ┗ area 내부의 this : square 객체를 가리킴

- 정적 메서드 : 클래스로 호출해야 함
- ┣ 정적 메서드 내부 this → 인스턴스 X, 클래스를 가리킴
- ┗ 고로 프로토타입 메서드 <-> 정적 메서드 this 바인딩 다름

- `메서드 내부` : `인스턴스 프로퍼티를 참조할 필요`가 있다면
- ┣ this를 사용해야 함 → 이러한 경우 `프로토타입 메서드로 정의`
- ┣ 메서드 내부에서 인스턴스 프로퍼티를 `참조해야 할 필요가 없다면`
- ┗ this를 사용하지 않게 됨

- 메서드 내부에서 this를 사용하지 않더라도 → `프로토타입 메서드`
- ┣ 정의는 가능함
- ┣ 하지만 : 반드시 `인스턴스를 생성` 후 → `인스턴스로 호출`해야 함
- ┗ 고로 → `this를 사용하지 않는 메서드` : `정적 메서드로 정의` 하는 편

- 표준 빌트인 객체 : `Math, Number, JSON, Object, Reflect`
- ┣ 들은 다양한 정적 메서드를 가지고 있음
- ┗ 이는 App 전역에서 사용이 가능한 유틸리티 함수임

- `클래스`, `생성자 함수`를 `하나의 네임스페이스`로 사용하여
- ┣ `정적 메서드를 모아 놓게` 되면
- ┣ 1. `이름 충돌 가능성을 줄여주고`, 2. `관련 함수들 구조화` 가능
- ┣ `정적 메서드` : `전역에서 사용할 유틸리티 함수`를
- ┗ 1. `전역 함수로 정의 X`, 2. `메서드로 구조화` 할 때 유용

> ES6 추가된 표준 빌트인 객체 NUmber의 정적 메서드

    ES6에서는 Number의 정적 메서드들을 정의
    ┣ `isFinite, isNaN, parseFloat`
    ┣ `parseInt` 등의 정적 메서드 존재
    ┗ 이는 전역 함수보다 염격함

### 25.5.5 클래스에서 정의한 메서드의 특징

- 클래스에서 정의한 메서드 : 다음과 같은 특징을 가짐

1. function 키워드를 생략한 메서드 축약 표현 사용

2. 객체 리터럴과 다르게 클래스에 메서드 정의

   - ┗ 콤마가 필요 없음

3. 암묵적으로 strict mode로 실행

4. for...in 문이나 Object.keys 메서드로 열거 불가

   - ┗ 프로퍼티 어트리뷰트 [[Enumerable]] : false

5. 내부 메서드 [[Construct]]를 갖지 않는
   - ┗ non-construct임 → new 연산자로 호출 불가

## 25.6 클래스의 인스턴스 생성 과정

- `new 연산자 함께 클래스 호출` :
- ┣ 생성자 함수와 마찬가지로 `클래스의 내부 메서드`
- ┣ [[Construct]]가 호출됨
- ┗ 클래스 : new 연산자 없이 호출이 불가

### 1. 인스턴스 생성과 this 바인딩

- `new 연산자와 함께 클래스를 호출`하면
- ┣ constructor의 내부 코드가 실행되기 앞서
- ┣ `암묵적으로 빈 객체가 생성`됨
- ┣ 빈 객체가 바로 (완성은 아니지만) 클래스가 생성한
- ┗ 인스턴스가 됨

- `클래스가 생성한 인스턴스의 프로토타입`으로
- ┣ 클래스의 `prototype 프로퍼티가 가리키는 객체가 설정`됨
- ┣ 암묵적으로 생성된 `빈 객체(인스턴스)` → `this에 바인딩`
- ┗ `constructor 내부의 this` : `클래스가 생성한 인스턴스`를 가리킴

### 2. 인스턴스 초기화

- `constructor 내부 코드가 실행`되어
- ┣ this에 바인딩되어 있는 인스턴스를 초기화
- ┣ 즉 : this에 바인딩되어 있는 인스턴스에
- ┣ 1. 프로퍼티를 추가
- ┣ 2. constructor가 인수로 전달 받은 초기값으로
- ┗━ 인스턴스 프로퍼티 값을 초기화

> 만약 : constructor가 생략되었다면 이 과정도 생략

### 3. 인스턴스 반환

- 클래스의 모든 처리가 끝나면 `완성된 인스턴스`가
- ┗ `바인딩된 this를 암묵적으로 반환`

```js
class Person {
	// 생성자
	constructor(name) {
		// 1. 암묵적으로 인스턴스가 생성되고
		// this에 바인됭됨
		console.log(this); // Person {}
		console.log(Object.getPrototypeOf(this) === Person.prototype); // true
	}
	// 2. this에 바인딩되어 있는 인스턴스를 초기화
	this.name = name;

	// 3. 완성된 인스턴스에 바인딩된 this가 암묵적으로 반환
}
```

## 25.7 프로퍼티

### 25.7.1 인스턴스 프로퍼티

- 인스턴스 프로퍼티 : constructor 내부에 정의

```js
class Person {
	constructor(name) {
		// 인스턴스 프로퍼티
		this.name = name;
	}
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

- 앞에서 살펴 보았듯
- ┣ `constructor 내부 코드가 실행되기 이전`
- ┣ constructor `내부의 this` →
- ┣ 이미 `클래스`가 `암묵으로 생성한 인스턴스`인
- ┗ `빈 객체가 바인딩` 되어 있음

- 생성자 함수에서 → `생성자 함수가 생성할 인스턴스`의
- ┣ `프로퍼티를 정의하는 것과 마찬가지`로
- ┣ `constructor 내부`에서 `this에 인스턴스 프로퍼티를 추가`
- ┣ 클래스가 `암묵적으로 생성한 빈 객체`
- ┗ 즉 : 인스턴스에 `프로퍼티가 추가되어 인스턴스가 초기화`

```js
class Person {
	constructor(name) {
		// 인스턴스 프로퍼티
		this.name = name; // name 프로퍼티 : public
	}
}

const me = new Person('Lee');

// name: public
console.log(me.name); // Lee
```

- `constructor 내부에서 this에 추가한 프로퍼티` :
- ┣ 언제나 `클래스가 생성한 인스턴스의 프로퍼티`가 됨
- ┣ ES6 클래스 : 다른 객체 지향 언어 처럼 접근 제한자 지원 X
- ┣ 따라서 → `언제나 프로퍼티 public`
- ┗ 다행히도 private 프로퍼티를 정의할 수 있는 사양 존재

### 25.7.2 접근자 프로퍼티

- `접근자 프로퍼티(accessor property)` :
- ┣ 자체적으로 값[[Value]](내부 슬롯)을 갖지 않고
- ┣ 다른 데이터 `프로퍼티의 값을 읽거나 저장`할 때 사용하는
- ┗ `접근자 함수(accessor function)로 구성된 프로퍼티`임

```js
const person = {
	// 데이터 프로퍼티
	firstName: 'Jang',
	lastName: 'Hyun',

	// fullName은 접근자 함수로 구성된 접근자 프로퍼티
	// getter 함수
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	// setter 함수
	set fullName(name) {
		// 배열 디스트럭처링 할당
		[this.firstName, this.lastName] = name.split(' ');
	}
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${person.firstName} ${person.lastName}`); // Jang Hyun

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출됨
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출
console.log(person.fullName);

// fullName : 접근자 프로퍼티
// 접근자 프로퍼티 : get, set, enumerable, configurable 프로퍼티 어트리뷰트를 가짐
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
// {get: f, set: f, enumerable: true, configurable: true}
```

- 접근자 프로퍼티 : 클래스에서도 사용이 가능함

```js
class Person = {
	// 데이터 프로퍼티
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	// fullName은 접근자 함수로 구성된 접근자 프로퍼티
	// getter 함수
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	// setter 함수
	set fullName(name) {
		// 배열 디스트럭처링 할당
		[this.firstName, this.lastName] = name.split(' ');
	}
};

const me = new Person('Jang', 'Hyun');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${person.firstName} ${person.lastName}`); // Jang Hyun

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출됨
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출
console.log(person.fullName);

// fullName : 접근자 프로퍼티
// 접근자 프로퍼티 : get, set, enumerable, configurable 프로퍼티 어트리뷰트를 가짐
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
// {get: f, set: f, enumerable: false, configurable: true}
```

- `접근자 프로퍼티` : `자체적으로 값을 가지지 않고`
- ┣ 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는
- ┗ 접근자 함수 → 즉 : `getter 함수`, `setter 함수`로 구성

- `getter` : 인스턴스 프로퍼티에 접근할 때 마다
- ┣ 1. 프로퍼티의 값을 `조작`,
- ┣ 2. `별도의 행위`가 필요할 때 사용
- ┗ getter → `이름 앞에 get 키워드를 사용해 정의`

- `setter` : 인스턴스 프로퍼티에 값을 할당할 때마다
- ┣ 프로퍼티 값을 `조작`하거나 `별도의 행위`에 필요할 때 사용
- ┗ setter → `메서드 이름 앞에 set 키워드를 사용해서 정의`

- 이처럼 `getter`, `setter` 이름은 `인스턴스 프로퍼티처럼 사용`
- ┣ getter는 호출하는 것이 아닌
- ┣ `프로퍼티처럼 참조하는 형식`으로 사용
- ┗ 참조 시 : 내부적으로 `getter가 호출`
- ┣ setter 또한 호출하는 것이 아닌
- ┣ 프로퍼티처럼 `값을 할당하는 형식`으로 사용
- ┗ 할당 시 → 내부적으로 `setter가 호출`

> setter : 무조건 매개변수가 존재해야 하며, 단 하나의 값만 할당받음

- `클래스 메서드` : 기본적으로 프로토타입 메서드
- ┣ `클래스의 접근자 프로퍼티` 또한
- ┣ `인스턴스 프로퍼티 X`
- ┗ `프로토타입의 프로퍼티`가 됨

```js
// Object.getOwnPropertyNames는 비열거형을 포함한
// 모든 프로퍼티 이름을 반환(상속 제외)
Object.getOwnPropertyNames(me); // ["firstName", "lastName"]
Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // ["constructor", "fullName"]
```

### 25.7.3 클래스 필드 정의 제안

- `클래스 필드(멤버)` : `클래스 기반 객체 지향 언어`에서
- ┣ 클래스가 생성할 `인스턴스의 프로퍼티`를
- ┗ 가리키는 용어임!

> 자바의 클래스 필드 : 클래스 내부에서 변수처럼 사용

```java
// 자바의 클래스 정의
public class Person {
	// 1. 클래스 필드 정의
	// 클래스 필드 : 클래스 몸체 this 없이 선언
	private String firstName = "";
	private String lastName = "";

	// 생성자
	Person(String firstName, String lastName) {
		// 3 this는 언제나 클래스가 생성할 인스턴스를 가리킴
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public String getFullName() {
		// 2. 클래스 필드 참조
		// this. 없이도 클래스 필드 참조 가능
		return firstName + " " + lastName;
	}
}

```

- JS 클래스에서 → 인스턴스 프로퍼티를 선언, 초기화 :
- ┗ 반드시 `constructor 내부에서 this에 프로퍼티를 추가`해야 함

- 또한 JS 클래스에서 인스턴스 프로퍼티를 참조하기 위해 :
- ┗ 반드시 `this를 사용하여 참조`해야 함

> JS 클래스 몸체에는 메서드만 선언가능

```js
class Person {
	// 클래스 필드 정의
	name = 'Lee';
}

const me = new Person('Lee');
```

- 위 예제 Node.js 버전 12 이상 돌리면 오류없이 동작

- JS에도 `인스턴스 프로퍼티를 마치 클래스 기반 객체지향`
- ┣ 언어의 `클래스 필드처럼 정의`할 수 있는 `새로운 표준사양`
- ┣ `Class field declarations`가 21년 1월 TC39 프로세스
- ┗ `stage3(candidate)`에 제안

- `Technical Committee 39(TC39)`
- ┣ ECMA 인터내셔널 ECMAScript 이외에도 다양한
- ┣ 기술의 사양을 관리, 샤양을 관리하는 주체인 기술
- ┣ 위원회 또한 존재함
- ┣ 여러 사항 중 ECMA-262 사양(ECMAScript)의 관리를 담당
- ┣ 위원회 : 바로 TC39임
- ┣ 구글, 애플, MS, 모질라 등 페이스북, 트위터
- ┗ `ECMA-262(ECMAScript)` 사양을 제대로 준수해야 하는 기업으로 구성

- `TC39 프로세스`
- ┣ 새로운 표준사양을 추가하기 위해
- ┣ 공식적으로 명문화 해놓은 과정을 말함
- ┣ TC39 프로세스 : 0 단계 ~ 4단계 (총 5단계 구성)
- ┣ 상위 단계로 승급하기 위한 명시적인 조건들 존재
- ┣ 1. stage 0: `strawman`
- ┣ 2. stage 1: `proposal`
- ┣ 3. stage 2: `draft`
- ┣ 4. stage 3: `candidate`
- ┣ 5. stage 4: `finished`
- ┣ stage3까지 승급한 제안 → `심각한 문제 없으면`
- ┣ `대부분 stage 4로 승급`
- ┗ stage5 심각한 문제 없으면 대부분 ECMAScript 버전에 포함

- `클래스 몸체에서 클래스 필드를 정의`할 수 잇는
- ┣ 클래스 필드 정의제안 → 아직 `ECMASCript의 정식 표준 사양 아님`
- ┗ 크롬 72, Node.js 12 이상의 것들은 이를 승급 확정으로 구현

```js
class Person {
	// 클래스 필드 정의
	name = 'Lee';
}
const me = new Person();
console.log(me); // Person {name: "Lee"}
```

- `클래스 몸체` : 클래스 필드를 정의하는 경우
- ┣ `this에 클래스 필드를 바인딩해서는 안됨`
- ┗ `this` : 클래스의 `constructor 메서드 내에서만 유효`

```js
class Person {
	// this에 클래스 필드를 바인딩해서는 안됨
	this.name = ''; // Syntax Error
}
```

> 클래스 필드 참조의 경우 JS 무조건 this를 사용해야 함

```js
class Person {
	// 클래스 필드
	name = 'Jang';

	constructor() {
		console.log(name); // ReferenceError : name is not defined
	}
}
new Person();
```

- 클래스 필드에 초기값을 할당하지 않으면
- ┗ undefined를 가지게됨

```js
class Person {
	// 클래스 필드를 초기화하지 않으면
	// undefined를 가지게 됨
	name;
}

const me = new Person();
console.log(me); // Person {name: undefined}
```

- 인스턴스를 생성할 때 → `외부의 초기값으로 클래스 필드 초기화` :
- ┗ `constructor`에서 클래스 필드를 초기화 해야함

```js
class Person {
	name;
	constructor(name) {
		// 클래스 필드 초기화
		this.name = name;
	}
}
const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

- 이처럼 인스턴스를 생성할 때 → `클래스 필드 초기화 필요`하다면
- ┣ `constructor 밖에서 클래스 필드를 정의할 필요가 없음`
- ┣ 클래스 필드를 초기화 필요 있다면
- ┗ 어짜피 : `constructor 내부에서 클래스 필드를 참조` → `초기화`

- 이때 this : `즉 클래스가 생성한 인스턴스`에
- ┣ `클래스 필드에 해당하는 프로퍼티가 없다면`
- ┗ `자동으로 추가`되기 때문

```js
class Person {
	constructor(name) {
		this.name = name;
	}
}
const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

- `함수` : `일급 객체` → `클래스 필드에 할당 가능`
- ┗ 클래스 필드를 통해 메서드를 정의 가능

```js
class Person {
	// 클래스 필드에 문자열을 할당
	name = 'Lee';

	// 클래스 필드에 함수를 할당
	getName = function () {
		return this.name;
	};
	// 화살표 함수로 정의할 수 있음
	// getName = () => this.name;
}

const me = new Person();
console.log(me); // Person {name: "Lee", getName: f}
console.log(me.getName); // Lee
```

- 이처럼 클래스 필드에 함수 할당 :
- ┣ 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 됨
- ┣ 모든 클래스 필드 : 인스턴스 프로퍼티가 되기 때문
- ┗ `클래스 필드에 함수를 할당하는 것은 권장하지 않음`

#### 클래스 필드와 화살표 함수

- 클래스 필드에 화살표 함수를 할당하여
- ┣ 화살표 함수 내부의 this가 인스턴스를 가리키게
- ┗ 하는 경우도 있음

```js
class App {
	constructor() {
		this.$button = document.querySelector('.btn');
		this.count = 0;

		// increase 메서드 → 이벤트 핸들러로 등록
		// 이벤트 핸들러 내부의 this
		// → DOM 요소 this.$button을 가리킴
		// 하지만 increase는 화살표 함수로 정의
		// increase 내부의 this → 인스턴스를 가리킴
		this.$button.onclick = this.increase.bind(this);
	}

	// 인스턴스 메서드
	// 화살표 함수 내부의 this : 언제나 상위 컨텍스트의 this
	increase = () => (this.$button.textContent = ++this.count);
}
```

- 클래스 필드 정의 제언으로 인해
- ┣ 인스턴스 프로퍼티를 정의하는 방식은 두가지 됨
- ┣ 인스턴스를 생성할 때 외부 클래스 필드로 초기화 필요하면
- ┗ 1. `constructor`에서 `인스턴스 프로퍼티를 정의`하는 기존 방법
- ┣ 인스턴스를 생성할 때 외부 초기값 초기화 필요 없다면
- ┗ 2. constructor, `클래스 필드 정의 제안` 모두 사용 가능

### 25.7.4 private 필드 정의 제언

- JS 완전한 `캡슐화를 지원하지 않음`
- ┣ 또한 접근 제한자도 지원 X
- ┣ 인스턴스 프로퍼티 : 인스턴스를 통해서
- ┣ `클래스 외부에서 언제나 참조 가능`
- ┗ 즉 : 언제나 public

```js
class Person {
	constructor(name) {
		this.name = name; // 인스턴스 프로퍼티 : 기본적으로 public
	}
}

const me = new Person('Lee');
console.log(me.name); // Lee
```

- `클래스 필드 정의 제안` : 또한 여전히 public

> 21년 1월 현재 TC39 private 필드 정의할 수 있는 표준 사양 제안

    아직 확정 X 그러나 구현은 되어있음

> private 필드의 선두에는 #을 붙여줌

    참조에도 동일하게 #

```js
class Person {
	// private 필드 정의
	#name = '';

	constructor(name) {
		// private 필드 참조
		this.#name = name;
	}
}

const me = new Person('Lee');

// private 필드 #name은 클래스 외부에서 참조 불가
console.log(me.#name);
// Syntax Error
```

- 타입스크립트
- ┣ 클래스기반 객체지향 언어가 지원하는
- ┣ 접근제한자를 모두 지원하면
- ┗ 의미 또한 같음

> private : 클래스 내부에서만 참조 가능

- 이처럼 클래스 외부에서 private 필드 직접 접근 불가

- But : 접근자 프로퍼티를 통해 간접적 접근은 가능

```js
class Person {
	// private 필드 정의
	#name = '';
	constructor(name) {
		this.#name = name;
	}

	// name은 접근자 프로퍼티임
	get name() {
		// private 필드를 참조하여 trim한 다음
		// 반환을 함
		return this.#name.trim();
	}
}

const me = new Person('Lee');
console.log(me.name); // Lee
```

- private 필드 : `반드시 클래스 몸체에 정의`
- ┣ private 필드를 `직접 constructor에 정의`하면
- ┗ `에러가 발생`하게됨

```js
class Person {
	constructor(name) {
		// private 필드 : 클래스 몸체에서 저으이
		this.#name = name;
		// SyntaxError
	}
}
```

#### 25.7.5 static 필드 정의 제안

- 클래스 : static 메서드를 사용하여 정적 메서드를 정의 가능
- ┣ But : static 키워드를 사용하여 정적 필드를 정의 불가
- ┣ `static private`, `static private`, `static public`
- ┗ 메서드를 정의할 수 있는 표준 사안 제안

> 정식은 아니지만 이미 구현

```js
class MyMath {
	// static public 필드 정의
	static PI = 22 / 7;

	// static private 필드 정의
	static #num = 10;

	// static 메서드
	static increment() {
		return ++MyMath.#num;
	}
}
console.log(MyMath.PI); // 3.141592
console.log(MyMath.increment()); // 11
```

## 25.8 상속에 의한 클래스 확장

### 25.8.1 클래스 상속과 생성자 함수 상속

- 상속에 의한 클래스 확장 : `지금까지의 프로토타입 기반 상속과는 다른 개념`
- ┣ `프로토타입 기반` 상속 : `프로토타입 체인을 통해 다른 객체의 자산`
- ┗ `상속`받는 개념
- ┣ `상속에 의한 클래스 확장` : 기존 클래스를 상속받아 `새로운 클래스`를
- ┗ `확장(extends)하여 정의`하는 것

- `클래스`와 `생성자 함수` : `인스턴스를 생성하는 함수`라는 점
- ┣ 유사한 부분임
- ┣ 클래스 : 상속을 통해 기존 클래스 확장 문법 기본적 제공
- ┗ 생성자 함수는 그렇지 않음

> 상속에 의한 클래스 확장 : 코드 재사용 관점에서 매우 유용

```js
class Animal {
	constructor(age, weight) {
		this.age = age;
		this.weight = weight;
	}

	eat() {
		return 'eat';
	}

	move() {
		return 'move';
	}
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
	fly() {
		return 'fly';
	}
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

- `클래스` : `상속을 통해 다른 클래스를 확장할 수 있는 문법`인
- ┣ `extends 키워드가 기본적으로 제공`됨
- ┣ extends 키워드를 사용한 클래스 확장 : 간편하고 직관적
- ┣ `생성자 함수` : 클래스와 같이 상속을 통해 다른 생성자 확장
- ┗ `지원하지 않음`

- JS : 클래스 기반 언어가 아니므로 생성자 함수를 이용해서
- ┣ 클래스 흉내 → 시도는 권장하지 않지만
- ┣ `의사 클래스 상속(pseudo classical inheritance)`패턴을 사용하여
- ┣ 상속에 의한 클래스 확장을 흉내 내기도 함
- ┗ 클래스 등장 : 의사 클래스 상속 패턴은 더 이상 필요하지 않음

```js
// 의사 클래스 상송(pseudo classical inheritance)패턴
var Animal (function() {
	function Animal(age, weight) {
		this.age = age;
		this.weight = weight;
	}

	Animal.prototype.eat = function () {
		return 'eat';
	}

	Animal.prototype.move = function () {
		return 'move';
	}

	return Animal;
}());

// Animal 생성자 함수를 상속하여 확장한 Bird 생성자 함수
var Bird = (function() {
	function Bird() {
		// Animal 생성자 함수에게 this와 인수를 전달하면서 호출
		Animal.apply(this, arguments);
	}
	// Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체
	Bird.prototype = Object.create(Animal.prototype);
	// Bird.prototype.constructor을 Animal에서 Bird로 교체
	Bird.prototype.constructor = Bird;

	Bird.prototype.fly = function () {
		return 'fly';
	}

	return Bird;
}());

var bird = new Bird(1, 5);
console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

### 25.8.2 extends 키워드

- 상속을 통해 클래스를 확장하기 위해서는
- ┗ extends 키워드를 사용하여 상속받을 클래스를 정의

```js
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
```

- 상속을 통해 확장된 클래스 → `서브 클래스`
- ┣ 서브 클래스에게 상속된 클래스 → `수퍼 클래스`
- ┣ `서브`를 `파생`, `자식`
- ┗ `수퍼`를 `베이스`, `부모` 라고도 부름

- `extends 키워드` 역할 : 수퍼 클래스와 서브클래스 간의
- ┣ `상속 관계를 설정하는 것`
- ┗ 클래스도 `프로토타입을 통해 상속 관계를 구현`

- 수퍼, 서브 클래스 : `인스턴스의 프로토타입 체인뿐 아닌`
- ┣ `클래스 간의 프로토타입 체인`도 생성함
- ┗ 이를 통해 `프로토타입 메서드`, `정적 메서드` `모두 상속 가능`

### 25.8.3 동적 상속

- `extends 키워드` : 클래스뿐만 아닌 생성자 함수를 상속받아
- ┣ 클래스를 확장이 가능함
- ┗ 단 : extends 키워드 앞에는 반드시 클래스가 와야함

```js
// 생성자 함수
function Base(a) {
	this.a = a;
}

// 생성자 함수를 상속받는 서브 클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

- extends 키워드 다음 : 클래스뿐만 아닌 [[Construct]] 내부 메서드를
- ┣ 갖는 함수 객체로 평가될 수 있는 `모든 표현식을 사용가능`
- ┗ `동적으로 상속받을 대상을 결정 가능`

```js
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class D extends (condition ? Base1 : Base2) {}

const d = new D();
console.log(d); // D {}

console.log(d instanceof Base1); // true
console.log(d instanceof Base2); // false
```

### 25.8.4 서브클래스의 constructor

- 클래스에서 `constructor를 생략`하면
- ┗ 암묵적으로 `비어있는 constructor가 정의`됨

```js
constructor() {}
```

- 서브클래스 : `constructor 생략`하면 클래스에 다음과 같은
- ┣ `constructor가 암묵적으로 정의`
- ┣ `args` : `new 연산자와 함께 클래스를 호출할 때 전달`한
- ┗ 인수의 리스트임

```js
constructor(...args) {super(...args);};
```

- `super()` : 수퍼 클래스의 constructor(super-constructor)
- ┗ 호출하여 `인스턴스를 생성함`

> Rest 파라미터

    매개변수에 `...` 붙이면
    ┣ Rest 파라미터가 됨
    ┣ Rest 파라미터 : 함수에 전달한
    ┗ 인수들의 목록을 배열로 전달받음

```js
// 수퍼 클래스
class Base {}

// 서브 클래스
class Derived extends Base {}
```

- 클래스 : 다음과 같이 암묵적으로 constructor가 정의됨

```js
// 수퍼 클래스
class Base {
	constructor() {}
}

// 서브 클래스
class Derived extends Base {
	constructor(...args) {
		super(...args);
	}
}

const d = new Derived();
console.log(derived); // Derived {}
```

- 위 예제와 같이 수퍼, 서브 모두
- ┣ `constructor 생략` → `빈 객체가 생성`됨
- ┣ `프로퍼티를 소유하는 인스턴스를 생성`하기 위해서는
- ┗ `constructor 내부`에서 `인스턴스`에 `프로퍼티를 추가`

### 25.8.5 super 키워드

- super 키워드 :
- ┣ 1. 함수처럼 호출 가능
- ┣ 2. this와 같이 식별자처럼 참조할 수 있음
- ┗ 특수한 키워드임

1. super를 호출하면 수퍼클래스의 constructor(super-constructor)를 호출
2. super를 참조하면 수퍼클래스의메서드를 호출 가능

#### super 호출

- super 호출 → 수퍼클래스의 constructor(super-constructor)를 호출

- 다음 예제와 같이 수퍼클래스의 constructor 내부에서 추가한
- ┣ 프로퍼티를 그대로 갖는 인스턴스를 생성한다면
- ┣ 서브클래스의 constructor를 생략 가능
- ┣ 이때 new 연산자와 함께 서브 클라스를 호출하면서
- ┣ 전달하게된 인수 : 모두 서브클래스에 암묵적으로 정의된
- ┣ constructor의 super 호출을 통해
- ┗ → 수퍼클래스의 constructor에 전달

```js
// 수퍼 클래스
class Base {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
}

// 서브 클래스
class Derived extends Base {
	// 다음과 같이 암묵적으로 constructor가 정의됨
	// constructor(...args) { super(...args)}
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a:1, b:2}
```

- 수퍼클래스에서 `추가한 프로퍼티`, `서브클래스에서 프로퍼티`를
- ┣ 갖는 인스턴스를 생성 → 서브클래스의 constructor 생략할 수 없음
- ┣ 이때 new 연산자와 함께 서브클래스를 호출하면서
- ┣ 전달한 인수 중에는 수퍼클래스의 constructor에 전달할 필요가 있는
- ┗ 인수 : 서브클래스에서 호출하는 super를 통해 전달

```js
// 수퍼 클래스
class Base {
	constructor(a, b) {
		// -1-
		this.a = a;
		this.b = b;
	}
}

// 서브 클래스
class Derived extends Base {
	constructor(a, b, c) {
		// -2-
		super(a, b); // -3-
		this.c = c;
	}
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived {a:1, b:2, c:3}
```

- new 연산자와 함께 Derived 클래스 호출(1) 하면서
- ┣ 전달한 인수 1, 2, 3은 Derived 클래스의
- ┣ constructor(2)에 전달되고
- ┣ super 호출(3)을 통해
- ┗ Base 클래스의 constructor(4)에 일부가 전달

- 이처럼 `인스턴스 초기화를 위해 전달한 인수` :
- ┣ 수퍼클래스와 서브클래스에 배분되고
- ┣ 상속관계의 두 클래스는 서로 협력하여
- ┗ `인스턴스를 생성`

#### super 호출 주의 점

1. 서브 클래스에서 constructor를 생략하지 않는 경우
   - ┗ 서브클래스의 constructor에서 반드시 super 호출

```js
class Base {}

class Derived extends Base {
	constructor() {
		// Reference Error
		console.log('c call');
	}
}

const d = new Derived();
```

2. 서브클래스의 constructor에서 super를 호출하기 전에는
   - ┗ this를 참조할 수 없음

```js
class Base {}

class Derived extends Base {
	constructor() {
		// Reference Error
		this.a = 1;
		super();
	}
}

const d = new Derived(1);
```

3. super는 반드시 서브클래스의 constructor에서만 호출됨
   - ┗ 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생

```js
class Base {
	constructor() {
		super(); // SyntaxError:
	}
}

function Foo() {
	super(); // SyntaxError: 'super'
}
```

### super 참조

- `메서드 내`에서 `super를 참조`하면 `수퍼클래스의 메서드를 호출`할 수 있음

1. `서브클래스의 프로토타입 메서드 내`에서
   - ┗ `super.sayHi`는 `수퍼클래스의 프로토타입 메서드` `sayHi`를 가리킴

```js
// 수퍼 클래스
class Base {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		return `Hi! ${this.name}`;
	}
}

// 서브 클래스
class Derived extends Base {
	sayHi() {
		// super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킴
		return `${super.sayHi()}. how are your doing?`;
	}
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! ~~
```

- super 참조를 통해 수퍼클래스의 메서드를 참조하려면
- ┣ super가 수퍼클래스의 바인딩된 객체
- ┣ 즉 : 수퍼클래스의 prototype 프로퍼티에
- ┣ 바인딩된 프로토타입을 참조할 수 있어야 함
- ┗ 위 예제 : 다음 예제와 동일하게 동작

```js
// 수퍼클래스
class Base {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		return `Hi ${this.name}`;
	}
}

class Derived extends Base {
	sayHi() {
		// __super는 Base.prototype을 가리킴
		const __super = Object.getPrototypeOf(Derived.prototype);
		return `${__super.sayHi.call(this)} how are you doing?`;
	}
}
```

- `super` : `자신을 참조하고 있는 메서드`(위 예제 : Derived의 SayHi)
- ┣ `바인딩되어 있는 객체`(위 예제의 경우 Derived.prototype)의
- ┣ 프토토타입(위 예제의 경우 Base.prototype)을 가리킴
- ┣ 따라서 super.sayHi는 Base.prototype.sayHi를 가리킴
- ┣ 단 : super.sayHi.sayHi를 호출할 때
- ┣ call 메서드를 사용해 this를 전달해야 함

- `call 메서드를 사용해 this 전달 X`
- ┣ `Base.prototype.sayHi` 메서드 내부 this :
- ┣ Base.prototype을 가리킴
- ┣ `Base.prototype.sayHi` 메서드 : `프로토타입 메서드`이기 때문에
- ┣ 내부의 this : `Base.prototype이 아닌 인스턴스`를 가리켜야 함
- ┗ name 프로퍼티는 → 인스턴스에 존재

- 이처럼 `super 참조가 동작`하기 위해서는
- ┣ `super를 참조하고 있는 메서드`(위 예제 : Derived의 sayHi)
- ┣ 가 `바인딩되어 있는 객체`(Derived.prototype)의
- ┣ `프로토타입`(Base.prototype)을 찾을 수 있어야 함
- ┣ 이를 위해 메서드 : 내부 슬롯 [[HomeObject]]를 가지며
- ┗ 자신을 바인딩하고 있는 객체를 가리킴

```js
// [[HomeObject]] : 메서드 자신을 바인딩하고 있는 객체를 가리킴
// [[HomeObject]]를 통해 메서드 자신을 바인딩하고 잇는
// 객체의 프로토타입을 찾을 수 있음
// ex : Derived 클래스의 sayHi 메서드 : Derived.prototype에 바인딩
// Derived 클래스의 sayHi 메서드 [[HomeObject]] : Derived.prototype
// 이를 통해 Derived 클래스의 sayHi 메서드 → 내부의 super 참조
// 고로 Base.prototype으로 결정됨
// 따라서 : super.sayHi는 Base.prototype.sayHi를 가리킴

super = Object.getPrototypeOf([[HomeObject]]);
```

- 주의할 것 : ES6의 메서드 축약 표현으로 정의된 함수만이
- ┗ [[HomeObject]]를 가진다는 점

```js
const obj = {
	// foo : ES6의 메서드 축약 표현으로 정의한 메서드
	// 따라서 [[HomeObject]]를 가짐
	foo() {},
	// 따라서 [[HomeObject]]를 갖지 않음
	bar: function () {},
};
```

- [[HomeObject]]를 가지는 함수만이 → super를 참조 가능
- ┣ 따라서 : [[HomeObject]]를 가지는 ES6의 메서드 축약 표현으로
- ┣ 정의된 함수만이 → super 참조를 가능함

- 단 : `super 참조`는 `수퍼클래스의 메서드를 참조`하기 위해서 사용
- ┗ `서브클래스의 메서드에서 사용`해야 함

- super 참조 : 클래스의 전유물은 아님
- ┣ 객체 리터럴 : super 참조를 할 수 있음
- ┗ 단 : ES6 메서드 `축약 표현으로 정의된 함수만` 가능

```js
const base = {
	name: 'Lee',
	sayHi() {
		return `Hi! ${this.name}`;
	},
};

const derived = {
	__proto__: base,
	// ES6 메서드 축약 표현으로 정의한 메서드
	// 따라서 [[HomeObject]]를 가짐
	sayHi() {
		return `${super.sayHi()}. how are you doing?`;
	},
};

console.log(derived.sayHi());
```

2. 서브클래스의 정적 메서드 내에서 super.sayHi는
   - ┗ 수퍼클래스의 정적 메서드 sayHi를 가리킴

```js
// 수퍼 클래스
class Base {
	static sayHi() {
		return 'Hi1';
	}
}

// 서브 클래스
class D extends Base {
	static sayHi() {
		// super.sayHi는 수퍼클래싀의 정적 메서드를 가리킴
		return `${super.sayHi()} how are you doing`;
	}
}
console.log(Derived.sayHi()); // Hi! how are you doing?
```

### 25.8.6 상속 클래스의 인스턴스 생성 과정

- 상속 관계에 있는 두 클래스 : 어떻게 협력하여 인스턴스 생성하는지

- 클래스가 단독으로 인스턴스 생성 보다
- ┗ 상속관계에 있는 두 클래스 협력 → 인스턴스 생성이 더 복잡

```js
// super class
class R {
	constructor(w, h) {
		this.w = w;
		this.h = h;
	}
	getArea() {
		return this.w * this.h;
	}
	toString() {
		return `w = ${this.w}, h = ${this.h}`;
	}
}

// subclass
class ColorRec extends R {
	constructor(w, h, c) {
		super(w, h);
		this.c = c;
	}

	// 메서드 오버라이딩
	toString() {
		return super.toString() + `, color = ${this.color}`;
	}
}

const colorRec = new ColorRec(2, 4, 'red');

// 상속을 통해 getArea 메서드를 호출
console.log(colorRec.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRec.toString());
```

> 서브클래스 ColorRec이 new 연산자와 함께 호출되면 다음 과정으로 인스턴스 생성

#### 1. 서브클래스의 super 호출

- JS엔진 : 클래스 평가 → 수퍼, 서브 클래스 구분하기 위해
- ┣ `"base"`, `derived`를 값으로 가지는
- ┣ 내부슬롯 : [[ConstructorKind]]를 가짐
- ┣ 다른 클래스를 상속받지 않는 클래스(그리고 생성자 함수) :
- ┣ 내부 슬롯 [[ConstructorKind]]의 값이 `"base"로 설정`되지만
- ┣ 다른 클래스 상속 → 내부 슬롯 값이 `"derived"로 설정`
- ┣ 이를 통해 `수퍼 클래스와 서브클래스` : `new 연산자와 함께 호출될 때`
- ┗ 동작이 구분됨

- 다른 `클래스를 상속받지 않는 클래스` :
- ┣ new 연산자와 함께 호출시 → `암묵적으로 빈 객체`
- ┣ 즉 : `인스턴스를 생성`하고
- ┗ 이를 `this에 바인딩`

- 서브클래스 : 자신이 직접 인스턴스를 생성하지 않고
- ┣ `수퍼클래스에게 인스턴스 생성을 위임`
- ┗ 이것이 바로 : 서브클래스 `constructor에서 super 호출` 이유

- 서브클래스 : new 연산자와 함께 호출되면
- ┣ 서브클래스 constructor 내부의 `super 키워드` :
- ┣ 함수처럼 호출됨
- ┣ super가 호출되면 수퍼클래스의 `constructor(super-constructor)`
- ┗ 가 호출됨

> 좀 더 정확히 말하면 수퍼클래스 평가되어 생성된 함수 객체 코드 실행

- 만약 서브클래스 constructor 내부에 `super 호출이 없으면`
- ┣ `에러가 발생`함
- ┣ 실제로 인스턴스를 생성하는 주체 : 수퍼 클래스
- ┣ 수퍼클래스의 `constructor를 호출하는 super가 호출 안되면`
- ┗ 인스턴스를 생성할 수 없기 때문

#### 2. 수퍼클래스의 인스턴스 생성과 this 바인딩

- 수퍼클래스의 `constructor 내부의 코드가 실행되기 이전`
- ┣ 암묵적으로 `빈 객체`를 생성
- ┣ 이 빈 객체가 바로(아직 완성되지는 않았지만)
- ┣ `클래스가 생성한 인스턴스`임
- ┣ 암묵적으로 생성된 빈 객체 : 즉 `인스턴스는 this에 바인딩`
- ┣ 따라서 : `수퍼클래스의 constructor 내부의 this` :
- ┗ `생성된 인스턴스`를 가리킴

```js
// 수퍼클래스
class Rectangle {
	constructor(w, h) {
		// 암묵적으로 빈 객체, 즉 : 인스턴스가 생성되고
		// this에 바인딩 됨
		console.log(this); // ColorRect
		// new 연산자와 함께 호출된 함수
		// 즉 : new.target은 ColorRect
		console.log(new.target); // ColorRec
	}
}
```

- `인스턴스` : 수퍼클래스가 생성한 것
- ┣ new 연산자와 함께 호출된 `클래스가 서브클래스라는 점이 중요`
- ┣ 즉 : new 연산자와 함께 `호출된 함수를 가리키는`
- ┣ new.target은 서브클래스를 가리킴
- ┣ 따라서 : `인스턴스` → `new.target이 가리키는 서브클래스`가
- ┗ 생성한 것으로 처리

- 따라서 : `인스턴스의 프로토타입` : `수퍼클래스의 prototype 프로퍼티`가
- ┣ `가리키는 객체(Rectangle.prototype)`가 아닌
- ┣ `new.target` → 즉 : `서브클래스의 prototype 프로퍼티`가 가리키는
- ┗ 객체(ColorRectangle.prototype)임

> 인스턴스 : new.target이 가리키는 서브클래스가 생성
> new.target : 서브클래스의 prototype 프로퍼티가 가리키는 객체

#### 3. 수퍼클래스의 인스턴스 초기화

- `수퍼클래스의 constructor가 실행`되어
- ┣ `this에 바인딩되어 있는 인스턴스를 초기화` 함
- ┣ 즉 : this에 바인딩 되어 있는 `인스턴스에 프로퍼티를 추가`하고
- ┣ `constructor가 인수로 전달받은 초기값`으로 인스턴스의
- ┗ `프로퍼티를 초기화`함

```js
// 수퍼클래스
class Rectangle {
	constructor(w, h) {
		// 암묵적으로 빈 객체, 즉 : 인스턴스가 생성되고
		// this에 바인딩됨
		console.log(this); // ColorRec
		// new 연산자와 함께 호출된 함수
		// 즉 : new.target은 ColorRect임
		console.log(new.target); //ColorRec

		// 생성된 인스턴스의 프로토타입으로
		// ColorRectangle.prototype이 설정됨
		console.log(Object.getPrototypeOf(this) === ColorRec.prototype); // true
		console.log(this instanceof ColorRec); // true
		console.log(this instanceof Rectangle); // true

		// 인스턴스 초기화
		this.w = w;
		this.h = h;

		console.log(this); // ColorRec {w: 2, h: 4}
	}
}
```

#### 4. 서브클래스 constructor로 복귀와 this 바인딩

- `super 호출이 종료`되고 → 제어 흐름이 `서브클래스 constructor로 돌아옴`
- ┣ 이때 `super가 반환한 인스턴스가 this에 바인딩`됨
- ┣ `서브클래스` : 별도의 인스턴스를 생성하지 않고
- ┗ `super가 반환한 인스턴스를 this에 바인딩`하여 그대로 사용

```js
// subclass
class ColorRec extends Rectangle {
	constructor(w, h, c) {
		super(w, h);
	}
	// super가 반환한 인스턴스가 this에 바인딩
	console.log(this); // ColorRect {w:2, h:4}
}
```

- 이처럼 super가 호출되지 않으면 : `인스턴스가 생성되지 않음`
- ┣ `this 바인딩 또한 할 수 없음`
- ┣ 서브클래스의 constructor에서 super를 호출하기 전에는
- ┣ this를 참조할 수 없는 이유가 바로 이 때문
- ┣ 따라서 : 서브 클래스 `constructor 내부의 인스턴스 초기화`
- ┗ 반드시 `super 호출 이후에 처리`해야 함

#### 5. 서브클래스의 인스턴스 초기화

- super 호출 이후, 서브클래스의 `constructor에 기술`되어 있는
- ┣ `인스턴스 초기화`가 실행됨
- ┣ 즉 : `this에 바인딩되어 있는 인스턴스`에 `프로퍼티를 추가`하고
- ┣ `constructor가 인수로 전달받은 초기값`으로 인스턴스의
- ┗ `프로퍼티를 초기화`함

#### 6. 인스턴스 반환

- 클래스의 `모든 처리가 끝나면`
- ┣ 완성된 인스턴스가 `바인딩된 this`가
- ┗ `암묵적으로 반환`됨

```js
// 서브클래스
class ColorRec extends Rec {
	constructor(w, h, c) {
		super(w, h);
	}

	// super가 반환한 인스턴스가 this에 바인딩
	console.log(this); // ColorRect {w: 2, h: 4}

	// 인스턴스 초기화
	this.c = c;

	// 완성된 인스턴가 바인딩된 this가 암묵적으로 반환됨
	console.log(this); // ColorRec {w: 2, h: 4, c: 'red'}
}
```

### 25.8.7 표준 빌트인 생성자 함수 확장

- extends 키워드 다음에는 클래스 뿐만 아닌
- ┣ [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는
- ┣ 모든 표현식을 사용 가능
- ┣ String, Number, Array 같은 표준 빌트인 객체도
- ┣ [[Construct]] 내부 메서드를 갖는 → 생성자 함수임
- ┗ 고로 : extends 키워드를 사용하여 확장 가능

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
	// 중복된 배열 요소를 제거하고 반환함
	// [1, 1, 2, 3] → [1, 2, 3]
	uniq() {
		return this.filter((v, i, self) => self.indexOf(v) === i);
	}

	// 모든 배열 요소의 평균을 구하기
	average() {
		return this.reduce((pre, cur) => pre + cur, 0) / this.length;
	}
}
```

- Array 생성자 함수를 상속받아 확장한 MyArray 클래스가
- ┣ 생성한 인스턴스 : Array.prototype과 MyArray.prototype의 모든 메서드
- ┗ 사용이 가능함

> 주의점 : Array.prototype 메서드 중 map,filter의 경우
> MyArray 클래스의 인스턴스를 반환다는 것

```js
console.log(myArray.filter((v) => v % 2) instanceof MyArray); // true
```

- 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고
- ┣ `Array` `인스턴스를 반환`하면 MyArray 클래스의 메서드와
- ┗ `메서드 체이닝이 불가능함`

> 연속해서 만들어진 배열에 대해서 메서드 체이닝이 가능하다.

- 만약 : MyArray 클래스의 uniq 메서드 : MyArray 클래스가 생성한
- ┣ 인스턴스가 아닌 Array가 생성한 인스턴스를 반환하게 하고 싶다면
- ┗ `Symbol.species`를 사용하여 정적 접근자 프로퍼티를 추가

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
	// 모든 메서드가 Array 타입의 인스턴스를 반환하도록 함
	static get [Symbol.species]() {
		return Array;
	}

	// 중복된 배열 요소를 제거하고 반환함
	uniq() {
		return this.filter((v, i, self) => self.indexOf(v) === i);
	}

	// 모든 배열 요소의 평균을 구함
	average() {
		return this.reduce((pre, cur) => pre + cur, 0) / this.length;
	}
}

console.log(myArray.uniq() instanceof MyArray); // false
console.log(myArray.average() instanceof Array); // true

// 메서드 체이닝
// uniq 메서드 : Array 인스턴스를 반환
// average 메서드를 호출할 수 없음
console.log(myArray.uniq().average());
// TypeError
```

> 클래스안에서 extends를 이용하여서 표준 빌트인 객체를 사용하면
> 메서드 체이닝을 이용 가능하다.
