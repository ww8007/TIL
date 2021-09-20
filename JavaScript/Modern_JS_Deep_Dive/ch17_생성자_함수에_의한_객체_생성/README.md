# 생성자 함수에 의한 객체 생성

- 객체 리터럴에 의한 객체 생성 방식을 살펴봄
- ┣ `객체 리터럴`에 의한 객체 생성 방식은 가장 일반적이고
- ┣ `간단한 객체 생성 방식`
- ┣ 객체 : 객체 리터럴 이외에도 다른 생성 방식 존재
- ┗ 여기서는 `생성자 함수를 이용`해서 객체 생성 살펴보기

## 17.1 Object 생성자 함수

- `new 연산자`와 함께 `Object 생성자 함수를 호출`하면
- ┣ `빈 객체를 생성하여 반환`
- ┣ 빈 객체를 생성한 이후
- ┗ `프로퍼티 또는 메서드를 추가`하여 객체를 완성할 수 있음

```js
// 빈 객체 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
	console.log('hi! my name is' + this.name);
};

console.log(person);
person.sayHello;
```

- `생성자 함수(constructor)` : new 연산자와 함께 호출하여
- ┣ 객체(인스턴스)를 생성하는 함수를 뜻함
- ┣ 생성자 함수에 의해 생성된 객체
- ┗ `인스턴스(instance)` 라고 함

- JS는 `Object 생성자 함수 이외`에도
- ┣ `String`, `Number`, `Boolean`, `Function`,
- ┣ `Array`, `Date`, `RegExp.Promise`
- ┗ 등의 `빌트인(built-in) 생성자 함수`를 제공

```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj); // string {"Lee"}

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj); // number {123}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj); // Boolean {true}

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i
```

- 반드시 Object 생성자 함수를 이용해 빈 객체를 생성해야 하는 것은 아님
- ┣ 객체 생성 : 객체 리터럴 사용이 더 간편
- ┣ Object 생성자 함수를 사용해 → 객체 생성
- ┗ 특별한 이유가 없다면 그다지 유용 X

## 17.2 생성자 함수

### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

- 객체 리터럴 : 직관적이고 간편
- ┣ 그러나 → 생성시 단 하나의 객체만 생성해야함
- ┣ 동일한 프로퍼티를 갖는 객체 여러개를 생성의 경우
- ┗ 코드가 반복되기 때문에 비효율적

- `객체` : `프로퍼티를 통해 고유의 상태(state)를 표현`
- ┣ `메서드`를 통해 상태 데이터인 `프로퍼티를 참조, 조작`하는
- ┣ `동작(behavior) 표현`
- ┣ `프로퍼티` : 객체마다 `다를 경우 존재`
- ┗ `메서드 동일은 일반적!`

> 몇번의 객체 생성이 반복은 괜찮지만 수십개 되면 비효율

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- `생성자 함수에 의한 객체 생성 방식` :
- ┣ 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼
- ┣ `생성자 함수를 사용`하여 `프로퍼티 구조가 동일한 여러 개`를
- ┗ 간편하게 생성 가능

```js
// 생성자 함수
function Circle(radius) {
	// 생성자 함수 내부의 this :
	// 생성자 함수가 생성할 인스턴스를 가르킴
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}

// 인스턴스의 생성
const circle = new Circle(5);
const circle2 = new Circle(10);
```

### this

- `this` : 객체 자신의 프로퍼티나 메서드를 참조하기 위한
- ┣ `자기 참조 변수(self-referencing variable)`
- ┣ this가 가리키는 값
- ┗ this 바인딩 : 함수 호출 방식에 따라 동적으로 결정

| 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

```js
function foo() {
	console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객채는 브라우저 : window
// Node.js : global
foo(); // window

const obj = { foo }; // ES6 프로퍼티 축약 표현
// 메서드로서의 호출
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```

- `생성자 함수` : 객`체(인스턴스)를 생성하는 함수`
- ┣ 자바와 같은 클래스 기반 객체지향 언어와는 다르게
- ┣ 그 `형식이 정해져 있는 것이 아니라`
- ┣ `일반 함수와 동일한 방법`으로 생성자 함수를 정의
- ┗ `new 연산자`와 함께 호출하면 해당 함수 → `생성자 함수로 동작`

> new를 안붙이면 일반 함수로 동작한다.

### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 먼저 생성자 함수의 함수 몸체에서 수행해야 하는것이 무엇인지 생각
- ┣ `생성자 함수의 역할` : 프로퍼티 구조가 동일한 인스턴스를 생성
- ┣ 1. 템플릿(클래스)로서 동작하여 `인스턴스를 생성`
- ┣ 2. 생성된 인스턴스 초기화(인스턴스 프로퍼티 추가, 초기값 할당)
- ┣ `필수` : `생성자 함수가 인스턴스를 생성하는 것`
- ┗ `옵션` : `생성된 인스턴스를 초기화 하는 것`

```js
// 생성자 함수
function Circle(radius) {
	// 인스턴스 초기화
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}
// 인스턴스 생성
const circle1 = new Circle(5); //반지름이 5인 Circle 객체를 생성
```

- 위의 코드에서 1. this 프로퍼티를 추가하고
- ┣ 2. 필요에 따라 전달된 인수를 프로퍼티의 초기값으로 할당
- ┣ 3. 인스턴스 초기화는 보이지만
- ┗ 인스턴스를 생성하고 반환하는 코드은 보이지 않음

- `JS의 엔진`은 `암묵적인 처리`를 통해 `인스턴스를 생성하고 반환`
- ┣ `new 연산자`와 함께 `생성자 함수 호출 → JS 엔진은 암묵적`으로
- ┗ `인스턴스를 생성`하고 `인스턴스를 초기화`한 후 암묵적으로 `인스턴스를 반환`

#### 1. 인스턴스 생성과 this 바인딩

- `암묵적으로 빈 객체가 생성`
- ┣ 이 빈 객체가 바로 : 생성자 함수가 생성한 인스턴스
- ┣ `암묵적으로 생정된 빈 객체`의 경우
- ┣ `this에 바인딩`
- ┣ 생성자 함수 내부의 `this가 생성자 함수가 생성할 인스턴스를 가르키는 이유`
- ┗ 이 처리는 함수 몸체의 코드가 한 줄씩 실행되는 `런타임 이전에 실행`

> 바인딩(name binding)

    바인딩 : 식별자와 값을 연결하는 과정
    ┣ 변수 선언 : 변수 이름(식별자)과 확보된 메모리 공간 주소 바인딩
    ┣ this 바인딩 : this와(키워드 분리 지만 식별자 역할)
    ┗ this가 가리킬 객체를 바인딩

```js
function Circle(radius) {
	// 1. 암묵적으로 인스턴스가 생성되고 this가 바인딩
	console.log(this); // Circle{}

	this.radius = radius;
	this.getDiameter = new (function () {
		return 2 * this.radius;
	})();
}
```

#### 2. 인스턴스 초기화

- `생성자 함수에 기술되어 있는 코드`가 한 줄씩 실행되어
- ┣ `this에 바인딩`되어 있는 `인스턴스를 초기화`
- ┣ 즉 : `this에 바인딩 되어 있는 인스턴스`에
- ┣ 1. `프로퍼티`, 2. `메서드를 추가`하고
- ┣ 3. 생성자 함수가 `인수로 전달받은 초기값`을
- ┣ `인스턴스 프로퍼티에 할당`하여
- ┣ `초기화` 하거나 `고정값을 할당`
- ┗ 이 처리 → 개발자가 기술

```js
function Circle(radius) {
	// 1. 암묵적으로 인스턴스 생성 후
	// ┗ this에 바인딩

	// 2. this에 반잉되어 있는 인스턴스
	// ┗ 초기화
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}
```

#### 3. 인스턴스 반환

- 생성자 함수 내부의 모든 처리가 끝나면
- ┗ 완성된 인스턴스가 바인딩도니 this가 암묵적으로 반환

```js
function Circle(radius) {
	// 1. 암묵적으로 인스턴스 생성 후
	// ┗ this에 바인딩

	// 2. this에 반잉되어 있는 인스턴스
	// ┗ 초기화
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
	// 3. 완성된 인스턴스가 바인딩된
	// ┗ 암묵적으로 반환
}

// 인스턴스 생성, Circle 생성자 함수는 암묵적으로
// this를 반환하게 됨
const circle = new Circle(1);
console.log(circle); // Circle {radius : 1, getDiameter: f}
```

> 만약 this가 아닌 다른 객체를 명시적으로 반환하면
> this가 반환되지 못하고 return 문에 명시적 객체가 반환됨

```js
function Circle(radius) {
	// 1. 암묵적으로 인스턴스 생성 후
	// ┗ this에 바인딩

	// 2. this에 반잉되어 있는 인스턴스
	// ┗ 초기화
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
	// 3. 암묵적으로 this를 반환
	// 명시적으로 객체를 반환하면 암무적인 this 반환이 무시
	return {};
}

// 인스턴스 생성, Circle 생성자 함수는 암묵적으로
// this를 반환하게 됨
const circle = new Circle(1);
console.log(circle); // {}
```

> 하지만 명시적으로 원시 값을 반환하면 원시 반환 값 무시되고
> 암묵적으로 this가 반환됨

```js
return 100;
// 원시 값을 반환하면 원시 값이 무시되고
// 암묵적으로 this가 반환되게 됨
```

- 이처럼 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환
- ┗ 생성자 함수의 기본 동작을 훼손하게 됨

### 17.2.4 내부 메서드 `[[Call]]`과 `[[Constructor]]`

- 함수 선언문 또는 함수 표현식으로 정의한 함수
- ┣ 1. 일반적으로 함수로서 호출할 수 있는 것은 물론
- ┣ 2. 생성자 함수로서 호출
- ┗ 생성자 함수 호출 : new 연산자와 함께 호출 → 객체를 생성

- 함수 : 객체 → `일반 객체(ordinary object)`와 동일하게 동작 가능
- ┣ 함수 객체는 일반 객체가 가지고 있는
- ┣ 1. 내부 슬롯
- ┗ 2. 내부 메서드

```js
// 함수는 객체다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유 가능
foo.prop = 10;

// 함수는 객체이므로 메소드를 소유가능하다.
foo.method = function () {
	console.log(this.prop);
};

foo.method(); // 10
```

- 함수 : 일반객체 이지만, 일반객체와는 다름
- ┣ 일반 객체 : 호출할 수 없음
- ┣ 함수 : 호출 가능
- ┣ 함수 객체는 일반 객체가 가지고 있는
- ┣ 1. 내부 슬롯, 2. 내부 메서드는 물론
- ┣ 함수 객체만을 위함
- ┣ 1. `[[Environment]]`, `[[FormalParameters]]` 등의
- ┣ 내부슬롯과 `[[Call]]`, `[[Constructor]]` 같은 내부 메서드를
- ┗ 추가적으로 가지고 있음

- `함수` → `일반 함수로서 호출`되면 함수 객체의 내부 메서드 `[[Call]]` 호출되고
- ┣ `new 연산자`와 함께 `생성자 함수로서 호출`되면
- ┗ 내부 메서드 [[Construct]] 호출

```js
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Constructor]]가 호출됨
new foo();
```

- `callable` : 내부 메서드 `[[Call]]` 갖는 함수 객체
- `constructor` : 내부 메서드 `[[Construct]]`를 갖는 함수 객체
- `non-constructor` : 내부 메서드 `[[Constructor]]` 가지지 않음

- `호출할 수 없는 객체` : `함수 객체가 아니므로`
- ┣ 함수로서 기능하는 객체 → 함수 객체는 반드시 `callable`
- ┣ 모든 함수 객체는 내부 메서드 `[[Call]]`을 갖고 있음
- ┗ 호출이 가능하다.

- 하지만 모든 함수 객체가 `[[Construct]]`를 가지는 것은 아님
- ┗ 함수 객체는 `constructor`, `non-constructor` 일 수 있음

> 함수 객체는 호출 가능하지만 모든 함수 객체를 함수로서 호출
> 가능한 것은 아니다.

### 17.2.5 constructor와 non-constructor의 구분

- 그럼 `JS 엔진`은 `constructor`와 `non-constructor`를 구분할까?
- ┣ `JS 엔진`은 함수 정의를 평가하여
- ┣ 함수 객체를 생성할 때 함수 정의 방식에 따라서
- ┗ 함수를 : constructor, non-constructor로 구분
- `constructor` : `함수 선언문`, `함수 표현식`, `클래스(클래스도 함수)`
- `non-constructor` : `메서드(ES6 메서드 축약 표현)`, `화살표 함수`

```js
// 일반 함수 정의 : 함수 선언문, 함수 표현식
function foo() {};
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은
// 일반 함수로 정의된 함수
// 이는 메서드로 인정 X
const baz = {
    x: function ();
}

// 일반 함수로 정의된 함수만이 constructor
new foo(); // foo {}
new bar(); // bar {}

new bar.x(); // → x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError : arrow is not a constructor

// 메서드 정의 ES6의 메서드 축약 표현만 메서드로 인정
const obj = {
    x() {}
};
new obj.x(); // TypeError: obj.x is not a constructor
```

- `함수를 프로퍼티 값`으로 사용하면 `일반적으로 메서드로 통칭`
- ┣ 하지만 `ECMAScript 사양`에서 `메서드`란
- ┣ `ES6의 메서드 축약 표현만`을 의미
- ┣ 함수가 어디에 할당되어 있는지에 따라
- ┣ 메서드인지를 판단하는 것이 아닌
- ┗ `함수 정의 방식에 따라서 구분을 하게 된다는 것을 명심`

> 함수 정의 방식에 따라서 constructor, non-constructor 구분

- 함수를 일반 함수로서 호출 → 함수 객체의 내부 메서드
- ┣ `[[Call]]`이 호출
- ┣ `new 연산자`와 함께 생성자 함수로 호출 → 내부 메서드
- ┣ `[[Constructor]]` 호출
- ┣ non-constructor인 함수 객체는 내부 메서드 `[[Constructor]]`
- ┗ 가지지 않게 됨

```js
function foo() {}

// 일반 함수로서 호출
// [[Call]]이 호출. 모든 함수 객체는 [[Call]]이 구현
foo();

// 생성자 함수로서 호출
// [[Construct]]가 호출
// 이때 [[Construct]]를 갖지 않는다면 에러가 발생
new foo();
```

- 주의할점!
- ┣ 생성자 함수로서 호출될 것을 기대하고
- ┣ 정의하지 않는 일반 함수(`callable`, `constructor`)
- ┗ `new 연산자를 붙여 호출하면 생성자 함수처럼 동작 가능`

### 17.2.6 new 연산자

- 일반 함수와 생성자 함수에 특별한 형식적 차이는 없음
- ┣ new 연산자와 함께 함수를 호출 → 생성자 함수로 동작
- ┣ 다시 말해 함수 객체 내부 메서드 `[[Call]]` 아닌
- ┗ `[[Construct]]`가 호출 된다는 점을 기억!

> 단 new 연산자로 호출되는 함수는 non-constructor가 아니여야 함

```js
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
	return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 일반 함수
function createUser(name, role) {
	return { name, role };
}

// 일반 함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');
// 함수가 생성한 객체를 반환한다.
console.log(inst); // {name: "Lee", role: "admin"}
```

- 반대로 new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출
- ┣ 다시 말해 함수 객체의 `[[Constructor]]`가 호출되는 것이 아닌
- ┗ `[[Call]]`이 호출되는 것을 명심

```js
// 생성자 함수
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * radius;
	};
}

// new 연산자 없이 생성자 함수 호출을 하면
// 일반 함수로서 호출됨
const circle = Circle(5);

console.log(circle); // undefined;

// 일반 함수 내부의 this는 전역 객체 window를 가르킴
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError Cannot read property undefined
```

- Circle 함수를 일반적인 함수로서 호출하게 되면
- ┗ 함수 내부의 this는 전역객체 window를 가르키게됨

- 위 예제의 Circle 함수는 일반 함수로서 호출
- ┣ 함수 내부의 this는 전역 객체 window를 가르킴
- ┣ `radius(프로퍼티)`, `getDiameter(메서드)`
- ┗ 전역 객체의 프로퍼티와 메서드가 됨

> 일반 함수와 생성자 함수에 특별한 형식적 차니는 존재 하지 않음
> 생성자 함수는 일반적으로 첫 문자를 대문자!
> (파스칼 케이스로)명명하여서 일반 함수와 구별

### 17.2.7 new.target

- 생성자 함수가 new 연산자 없이 호출되는 경우를 방지하기 위해
- ┣ `파스칼 케이스 컨벤션` 사용한다 하더라도
- ┣ 실수는 언제나 발생 가능
- ┗ 그렇기에 `ES6 → new.target을 지원`

- `new.target`은 this와 유사하게 `constructor인 모든 함수 내부`에서
- ┣ `암묵적으로 지역 변수와 같이 사용`되며
- ┣ `메타 프로퍼티`라고 부름
- ┗ 참고로 `IE`는 new.target을 `지원안함`

- `함수 내부`에서 `new.target`을 사용하면
- ┣ new 연산자와 함께 `생성자 함수로서 호출되었는지 확인 가능`
- ┣ new 연산자와 함께 `생성자 함수로서 호출`되면
- ┣ 함수 내부의 `new.target`은 `함수 자신을 가르킴`
- ┗ `new 연산자 없이 일반 함수` 호출 내부 `new.target → undefined`

- 함수 내부에서 `new.target`을 사용하여
- ┣ new 연산자와 `생성자 함수로서 호출했는지 확인`하여
- ┣ 그렇지 않은 경우 : `new 연산자와 함께 재귀 호출`을 통해
- ┗ 생성자 함수로서 호출가능

```js
function Circle(radius) {
	// 이 함수가 new 연산자와 함께 호출되지 않으면
	// new.target은 undefined임
	if (!new.target) {
		// new 연산자와 함께 생성자 함수를 재귀호출
		// 생성된 인스턴스를 반환
		return new Circle(radius);
	}
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}
// new 연산자 없이 생성자 함수를 호출하여도
// new.target을 통해 생성자 함수로서 호출됨
const circle = Circle(5);
console.log(circle.getDiameter());
```

- 스코프 세이프 생성자 패턴(scope-safe constructor)
- ┣ new.target은 ES6에서 도입된 최신 문법 → IE 지원 X
- ┗ new.target을 사용못하는 환경 → 스코프세이프 생성자 패턴 사용

```js
// Scope safe constructor pattern
function Circle(radius) {
	// 생성자 함수가 new 연산자와 함께 호출되면
	// 함수의 선두에서 빈 객체를 생성, this에 바인딩
	// this와 Circle은 프로토타입에 의해 연결

	// 이 함수가 new 연산자와 함께 호출되지 않았다면
	// 이 시점의 this는 전역 객체 window를 가르킴
	// 즉, this와 Circle은 프로토타입에 의해 연결되지 않음

	if (!(this instanceof Circle)) {
		// new 연산자와 함께 호출하여 생성된 인스턴스 반환
		return new Circle(radius);
	}
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

- new 연산자와 함께 `생성자 함수에 의해 생성된 객체(인스턴스)`는
- ┣ `프로토타입`에 의해 `생성자 함수와 연결됨`
- ┣ `이를 이용`해 `new 연산자와 함께 호출되었는지 확인 가능`
- ┣ `프로토타입`과 `instanceof 연산자`에 대해서는
- ┗ 뒤에서 학습

- 대부분의 빌트인 생성자 함수(`Object`, `Number`, `Boolean`, `Function`, `Array`
- ┣ `Date`, `RegExp`, `Promise`) 는 new 연산자와 함께 호출되었는지를 확인 후
- ┗ 적절한 값을 반환하게 됨

> Object와 function 생성자 함수는 new 연산자 없이 호출해도
> new 연산자와 함께 호출되었을 때와 동일하게 동작

> 하지만 String, Number, Boolean 생성자 함수는
> new 생성자와 함수와 함께 호출 되었을 때와 다르게 동작
> 이를 이용해서 데이터 타입을 변환 하기도 함

```js
const str = String(123);
console.log(str, typeof str); // 123 string

const num = Number('123');
console.log(num, typeof num); // 123 number

const bool = Boolean('true');
console.log(bool, typeof bool); // true boolean
```
