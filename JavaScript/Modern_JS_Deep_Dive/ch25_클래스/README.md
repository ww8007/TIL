# 25. 클래스

## 25.1 클래스는 프로토타입의 문법적 설탕인가?

- JS : 프로토 타입 기반의 객체지향 언어임
- ┣ 비록 다른 객체 지향 언어와의 차이점이 존재하지만
- ┗ 강력한 객체지향 프로그래밍 능력을 지니고 있음

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
- ┣ 클래스 이름 : 파스칼 케이스를 사용하느 것이 일반적
- ┗ But : 사용하지 않아도 문제 발생 x

```js
// 클래스 선언문
class Person {}
```

- 일반적이지는 않지만 표현식으로 클래스 정의 가능
- ┗ 이름을 가질 수도 있고, 가지지 않을 수 도 있음

```js
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

- 클래스를 표현식으로 정의가 가능함 →
- ┣ 클래스 : 값으로 사용할 수 있는 일급 객체임을 의미
- ┗ 클래스는 일급 객체로 다음과 같은 특징을 가짐

1. 무명의 리터럴로 생성가능 → 런타임에 생성 가능

2. 변수나 자료구조(객체, 배열)에 저장이 가능

3. 함수의 매개변수에 전달 가능

4. 함수의 반환값으로 사용 가능

> 좀 더 자세히 말하면 클래스 : 함수

- 고로 값처럼 사용할 수 있는 일급 객체임

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
- ┣ 함수 객체를 생성하게 됨
- ┣ 클래스가 평가되어 생성된 함수 객체 : 생성자 함수로서 호출할 수 있는
- ┣ 함수 → constructor임
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

- 이처럼 클래스 몸체에서 정의한 메서드 :
- ┣ 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 됨
- ┗ 인스턴스 : 프로토타입 메서드를 상속받아 사용 가능

- 프로토타입 체인 : 기존의 모든 객체 생성 방식 뿐만 아니라
- ┣ 클래스에 의해 생성된 인스턴스도 동일하게 적용됨
- ┗ 생성자 함수의 역할을 클래스가 할 뿐

- 결국 클래스 : 생성자 함수와 같이 인스턴스를 생성하는
- ┗ 생성자 함수라고 볼 수 있음

> 결론적 : 클래스 → 프로토타입 기반의 객체 생성 메커니즘
> 생성자 함수와 동일함

### 25.5.3 정적 메서드

- 정적 메서드 : 인스턴스를 생성하지 않아도 호출이 가능함

- 생성자 함수의 경우 정적 메서드를 생성하기 위해서
- ┗ 명시적으로 생성자 함수에 메서드를 추가해야 함

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

- 정적 메서드 : 클래스에 바인딩된 메서드가 됨
- ┣ 클래스 : 함수 객체로 평가 → 자신의 프로퍼티/메서드 소유 가능
- ┣ 클래스 : 클래스 정의(클래스 선언문이나 클래스 표현식)가
- ┣ 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리
- ┣ 별다른 생성 과정이 필요 없음
- ┣ 고로 : 정적 메서드는 클래스 정의 이후
- ┗ 인스턴스를 생성하지 않아도 호출 가능

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
