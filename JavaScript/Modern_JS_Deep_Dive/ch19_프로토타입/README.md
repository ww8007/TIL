# 19. 프로토타입

- JS는
- ┣ 1. 명령형 `imperactive`
- ┣ 2. 함수형 `functional`
- ┣ 3. 프로토타입 기반 `prototype-based`
- ┣ 4. 객체지향 프로그래밍 `OOP`; `Object Oriented Programming`
- ┗ 지원하는 `멀티 패러다임` 프로그래밍 언어

> JS의 경우 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며
> 프로토타입 기반의 객체지향 프로그래밍 언어

## 클래스

- `ES6에서는 클래스가 도입`
- ┣ ES6의 클래스가 기존의 프로토타입 기반 객체지향을 폐지하고
- ┣ 새로운 객체지향 모델을 제공하는 것은 `아님`
- ┣ 사실 `클래스도 함수`, 기존 프로토타입 기반
- ┗ 패턴의 `문법적 설탕(syntax-sugar)`
- `클래스`와 `생성자 함수`는 모두 `프로토타입 기반`의
- ┣ `인스턴스를 생성`하지만 정확히 동일하게 동작 X
- ┣ `클래스` : 생성자 함수보다 `엄격`, 생성자 함수에서 제공하지 않는
- ┗ `기능을 제공`함

- 클래스를 프로토타입 기반 객체 생성 패턴의
- ┣ 단순한 문법적 설탕으로 보기 보다는
- ┗ `새로운 객체 생성 매커니즘`으로 보는 것이 합당

- JS는 `객체 기반의 프로그래밍 언어`
- ┣ JS를 이루는 `모든 것이 객체`
- ┣ `원시 타입(primitive type)`의 값을 제외한
- ┗ 나머지 값들(`함수`, `배열`, `정규 표현식`)은 모두 객체

## 19.1 객체지향 프로그래밍

- 객체지향 프로그래밍 : 프로그램을 명령어 또는 함수의 목록으로 보는
- ┣ 전통적인 명령형 프로그래밍 관점에서 벗어나
- ┣ 여러 개의 독립적 단위 → `객체`의 집합으로
- ┗ 프로그램을 표현하려는 프로그래밍 패러다임

- `객체지향 프로그래밍`은 실세계의 실체(사물이나 개념)을 인식하는
- ┣ `철학적 사고`에서 시작
- ┣ 실체 : 특징이나 성질을 타나내는`(attribute/property)`
- ┗ 이를 통해 `실체를 인식하거나 구별`할 수 있음

> 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 표현하는 것

    추상화(abstraction)이라고 함

> 간단한 이름과 주소를 가짐

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
};
console.log(person);
```

- 이렇게 속성을 통해 여러 개의 값을 하나의 단위로
- ┣ 구성한 복합적인 자료구조 → 객체라고 함
- ┣ `객체지향 프로그래밍` : `독립적인 객체의 집합`
- ┗ 프로그램을 표현하려는 프로그래밍 패러다임

- 객체지향 프로그래밍은 객체의 1. `상태(state)`를 나나태는 데이터
- ┣ 2. 상태 데이터를 조작할 수 있는 `동작(behavior)`을 하나의 논리적인 단위
- ┣ 묶어 생각 → 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 자료구조
- ┗ 이때 `상태 데이터` : `프로퍼티(property)`, `동작` : `메서드(method)`

> 상태 데이터 : 프로퍼티
> 동작 : 메서드

- 각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만
- ┣ 1. 다른 객체와 `관계성`을 가질 수 있음
- ┣ 2. 다른 객체와 `메시지를 주고받거나 데이터를 처리 가능`
- ┗ 3. 다른 객체의 `상태 데이터나 동작을 상속`받음

## 19.2 상속과 프로토 타입

- `상속(inheritance)` : 객체지향 프로그래밍의 핵심 개념
- ┣ 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아
- ┗ 그대로 사용할 수 있다는 것을 의미

- JS는 `프로토타입 기반`으로 `상속을 구현` → `불필요한 중복을 제거`
- ┣ 중복을 제거하는 `방법` : 기존의 코드를 적극적으로 `재사용`
- ┗ 코드 재사용은 매우 중요

```js
// 생성자 함수
function Circle(radius) {
	this.radius = radius;
	this.getArea = function () {
		return Math.PI * this.radius ** 2;
	};
}

const circle = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다
// 동일한 동작을 하는 getArea 메서드를 중복 생성하고
// 모든 인스턴스가 중복 소유하게 됨
// getArea 메서드는 하나만 생성하여 모든 인스턴스가
// 공유해서 사용하는 것이 바람직
console.log(circle.getArea === circle2.getArea);
```

> 위 생성자 함수는 문제가 존재

- Circle 생성자 함수가 생성하는 모든 객체(인스턴스)
- ┣ `radius 프로퍼티`와 `getArea 메서드`를 가짐
- ┣ `radius 프로퍼티 값` : 일반적으로 `인스턴스마다 다름`
- ┣ 하지만 `getArea 메서드` : `모든 인스턴스가 공유`해서 사용하는
- ┗ 것이 바람직

- 그런데 위의 Circle 생성자 함수는 인스턴스 생성마다
- ┗ 중복 생성, 중복 소유 → 메모리를 불필요하게 낭비

- 상속을 통해 불필요한 중복을 제거 → `JS는 프로토타입(prototype) 기반`으로
- ┗ 상속을 구현

```js
// 생성자 함수
function Circle(radius) {
	this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가
// getArea 메서드를 공유해서 사용할 수 있도록
// 프로토타입에 추가
// 프로토타입은 Circle 생성자 함수의 prototype
// 프로퍼티에 바인딩되어 있음

Circle.prototype.getArea = function () {
	return Math.PI * this.radius ** 2;
};
```

- Circle 생성자 함수가 `생성한 모든 인스턴스`는
- ┣ 자신의 `프로토타입` : 즉 `상위(부모) 객체 역할`을 하는
- ┗ `Circle prototype`의 `모든 프로퍼티와 메서드를 상속`받음

- getArea 메서드는 단 하나만 생성되어
- ┣ 프로토타입인 Circle.prototype의 메서드로 할당
- ┣ 따라서 Circle `생성자 함수가 생성`하는
- ┣ `모든 인스턴스`는 `getArea 메서드`를 `상속`받아 사용 가능
- ┣ 자신의 상태를 나타내는 `radius 프로퍼티`만
- ┣ 개별적으로 소유하고 `내용이 동일한 메서드`는
- ┗ `상속`을 통해 → `공유`

- `상속` : `코드의 재사용`이란 관점에서 `매우 유용`
- ┣ `생성자 함수`가 생성할 모든 인스턴스가 `공통적으로 사용`할
- ┣ `프로퍼티나 메서드`를 `프로토타입에 미리 구현`해 두면
- ┣ `생성자 함수`가 `생성할 모든 인스턴스는 별도의 구현 없이`
- ┗ 상위(부모) 객체인 프로토타입의 자산을 `공유하여 사용가능`

## 19.3 프로토타입 객체

- `프로토타입 객체` : 객체지향 프로그래밍의 객체 간 `상속(inheritance)`
- ┣ 구현하기 위해 사용
- ┣ `프로토타입` : 어떤 객체의 `상위(부모) 객체의 역할을 하는 객체`
- ┣ 다른 객체에 공유 `프로퍼티(메서드 포함)을 제공`
- ┣ 프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를
- ┗ 자신의 프로퍼티처럼 `자유롭게 사용가능`

- 모든 객체 : `[[Prototype]]`이라는 내부 슬롯을 가지며
- ┣ 이 내부 슬롯의 값 : 프로토타입의 참조(null)인 경우도 있음
- ┣ `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정
- ┣ 객체가 생성될 때 `객체 생성 방식`에 따라
- ┗ 프로토타입이 결정되고 `[[Prototype]]`에 저장됨

- `객체 리터럴`에 의해 생성된 `객체의 프로토타입` :
- ┣ `Object.prototype`이고
- ┣ 생성자 함수에 의해 생성된 객체의
- ┣ 프로토타입 : `생성자 함수의 prototype`
- ┗ 이는 뒤에서 학습

- 모든 객체는 하나의 프로토타입을 가짐
- ┣ 모든 프로토타입은 생성자 함수와 연결되어 있음
- ┗ 객체와 프로토타입과 생성자 함수는 연결되어 있음

- `[[Prototype]]` `내부 슬롯`에는 `직접 접근 불가`하지만
- ┣ `__proto__` 접근자 프로퍼티를 통해
- ┣ 자신의 프로토타입 → 자신의 `[[Prototype]]` 내부 슬롯이 가리키는
- ┣ 프로토타입에 `간접적으로 접근 가능`
- ┣ 프로토 타입은 자신의 `constructor` 프로퍼티를 통해
- ┣ `생성자 함수에 접근 가능`
- ┗ `생성자 함수` : 자신의 `prototype 프로퍼티`를 통해 `프로토타입에 접근가능`

### 19.3.1 `__proto__` 접근자 프로퍼티

- 모든 객체는 `__proto__` 접근자 프로퍼티를 통해
- ┣ 자신의 프로토타입 → `[[Prototype]]` 내부 슬롯에 간접적
- ┗ 접근이 가능하다.

#### `__proto__`는 접근자 프로퍼티다.

- 16.1절에서 보았듯 내부 슬롯은 프로퍼티가 아님
- ┣ 따라서 JS는 원칙적으로 내부 슬롯과 메서드에 직접적으로 접근하는 법을
- ┣ 제공하지 않음
- ┣ 일부 내부 슬롯과 메서드에 간접저그로 접근 방법을 제공
- ┗ 이것이 → `__proto__`

- 접근자 프로퍼티 : 자체적으로 `값([[Value]])` 프로퍼티를 갖는것이 아닌
- ┣ 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는
- ┣ `접근자 함수(accessor function)`, 즉 `[[Get]]`, `[[Set]]`
- ┗ 프로퍼티 어트리뷰트로 구성된 `프로퍼티`

- Object.prototype의 접근자 프로퍼티인 `__proto__`는
- ┣ `getter/setter` 함수라고 불리는 `접근자 함수([[Get/Set]])`
- ┣ 프로퍼티 어트리뷰트에 할당된 함수를 통해
- ┣ `[[Prototype]]` 내부 슬롯의 값을 얻거나 설정함
- ┣ `접근 → Get`
- ┗ `설정 → Set`

```js
const ojb = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어
// obj 객체의 프로토타입을 취득
obj.__proto__;

// setter 함수인 set __proto__가 호출되어
// obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); //1
```

#### `__proto__` 접근자 프로퍼티는 상속을 통해 사용

- `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아닌
- ┣ `Object.prototype`의 프로퍼티
- ┗ `모든 객체` : 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티 사용가능

```js
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않음

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인
// Object.prototype의 접근자 프로퍼티임
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: f, set: f, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티
// __proto__를 상속받아 사용이 가능하다.
console.log({}.__proto__ === Object.prototype); // true
```

#### Object.prototype

- `모든 객체는 프로토타입의 계층 구조`인 `프로토타입 체인에 묶여있음`
- ┣ `JS 엔진`은 `객체의 프로퍼티(메서드 포함)에 접근`하려고 할 때
- ┣ 해당 `객체에 접근하려는 프로퍼티가 없다면`
- ┣ `__proto__` 접근자 프로퍼티가 가리키는 참조를 따라
- ┣ 자신의 부모 역할을 하는 프로토타입의 `프로퍼티를 순차적 검색`
- ┣ 프로토타입의 체인의 종점 : 즉 프로토타입 체인의 최상위 객체는
- ┗ `Object.prototype` 이며 `객체의 프로퍼티와 메서드`는 `모든 객체에 상속`

#### `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

- `[[Prototype]]` 내부 슬롯의 값 → 프로토타입에 접근하기 위해
- ┣ `접근자 프로퍼티`를 `사용하는 이유` : `상호 참조`에 의해
- ┗ 프로토타입 체인이 생성되는 것을 방지하기 위해서

```js
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

- 위 예제에는 `parent 객체`를 → `child 프로토타입`으로 설정한 후
- ┣ `child 객체를 parent 객체의 프로토 타입으로 설정`
- ┣ 코드가 에러 없이 정상적으로 처리되면
- ┣ `서로가 자신의 프로토타입`이 되는 비정상적인
- ┗ `프로토타입 체인`이 만들어지기 때문에 → `__proto__` 접근자 프로퍼티 에러

- 프로토타입 체인 : 단방향 링크드 리스트로 구현
- ┣ 즉 : 프로퍼티 검색 방향이 한쪽 방향으로 흘러가야함
- ┣ 하지만 위 예제의 경우 `순환 참조(circular reference)`가 일어남
- ┣ 무한 루프에 빠지게됨
- ┗ 그렇기에 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 설정

#### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않음

- `__proto__` 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함안된
- ┗ 비표준이 였음 → 그러나 요즘은 대부분 지원

- 하지만 코드 내에서 `__proto__` 접근자 프로퍼티를 직접 사용하는 것은
- ┣ 권장하지 않음
- ┣ 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아님
- ┣ 직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수 있음
- ┗ `__proto__` 접근자 프로퍼티를 사용할 수 없는 경우가 존재

```js
// obj는 프로토타입 체인의 종점
// 따라서 Object.__proto__를 상속받을 수 없음
const obj = Object.create(null);
// obj는 Object.__proto__를 사속받을 수 없음
console.log(ojb.__proto__); // undefined
// 따라서 __proto__ 보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋음
console.log(Object.getPrototypeOf(obj)); //null
```

- 따라서 `__proto__` 접근자 프로퍼티 대신
- ┣ 프로토타입의 `참조를 취득`하고 싶은 경우 :
- ┣ `Object.getPrototypeOf` 메서드를 사용하고
- ┣ 프로토타입을 `교체`하고 싶은 경우 :
- ┗ `Object.setPrototypeOf` 메서드 사용 권고

```js
const obj = {};
const parent = { x: 1 };

// ojb 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto = parent;

console.log(obj.x); // 1
```

- `Object.getPrototypeOf` 메서드와 `Object.setPrototypeOf` 메서드는
- ┣ `get Object.prototype.__proto__` 와 `set Object.prototype.__proto__`
- ┣ 처리 내용과 정확히 일치
- ┣ `Object.getPrototypeOf` 메서드는 `ES5 에서 도입된 메서드`
- ┗ `Object.setPrototypeOf` 메서드는 `ES6에서 도입된 메서드`

### 19.3.2 함수 객체의 prototype 프로퍼티

- 함수 객체만이 소유하는 `prototype 프로퍼티`는 생성자 함수가
- ┗ `생성할 인스턴스의 프로토타입`을 가리킴

```js
// 함수 객체는 prototype 프로퍼티를 소유
(function () {}.hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않음
({}.hasOwnProperty('prototype')); // false
```

- `prototype` 프로퍼티는 생성자 함수가 생성할 `객체(인스턴스)`
- ┣ `프로토타입을 가리킴`
- ┣ 생성자 함수로서 호출할 수 없는 함수 → `non-constructor`인 화살표
- ┣ `ES6 메서드 축약 표현으로 정의한 메서드`의 경우는
- ┗ `prototype 프로퍼티를 소유하지 않으며` 프로토타입 `생성도 안함`

```js
// 화살표 함수는 non-constructor임
const Person = (name) => {
	this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않음
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않음
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드 → non-constructor
const obj = {
	foo() {},
};

// non-constructor는 prototype 프로퍼티를 소유하지 않음
console.log(ojb.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않음
console.log(obj.foo.prototype); // undefined
```

- 생성자 함수로 호출하기 위해 `정의하지 않은 일반 함수`
- ┣ (`함수 선언문`, `함수 표현식`)도 `prototype 프로퍼티를 소유`하지만
- ┣ 객체를 생성하지 않는 `일반 함수의 prototype 프로퍼티`는
- ┗ 아무런 의미가 없음

- 모든 객체가 가지고 있는 (엄밀하게는 Object.prototype) `__proto__`
- ┣ 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는
- ┣ 결국 동일한 프로토타입을 가리킨다.
- ┗ 이들 프로퍼티를 사용하는 주체가 다름

| 구분                              | 소유        | 값                | 사용 주체   | 사용 목적                                                                          |
| --------------------------------- | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------------------- |
| `__proto__` <br/> 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 <br/> 위해 사용                      |
| prototype <br />프로퍼티          | constructor | 프포로타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스의) <br/> 프로토타입을 할당하기 위해 사용 |

- 예를 들어 생성자 함수로 객체 생섷 후 → `__proto__` 접근자 프로퍼티와
- ┗ `prototype` 프로퍼티로 프로토타입 객체에 접근

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype과 me.__proto__는
// 동일한 프로토타입을 가리킴
console.log(Person.prototype === me.__porto__); //true
```

### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

- 모든 프로토타입은 `constructor` `프로퍼티`를 가짐
- ┣ `constructor` 프로퍼티는 `prototype` 프로퍼티로
- ┣ 자신을 참조하고 있는 `생성자 함수를 가리킴`
- ┣ 이 연결 : `생성자 함수가 생성`될 때
- ┗ 즉 : `함수 객체가 생성될 때 이뤄짐`

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

- 위 예제에서 Person 생성자 함수 : `me 객체를 생성`
- ┣ me 객체 : 프로토타입의 `constructor 프로퍼티`를 통해
- ┣ `생성자 함수와 연결`됨
- ┣ me 객체 : `constructor 프로퍼티가 없지만`
- ┣ me 객체의 프로토타입인 `Person.prototype`에는
- ┣ `constructor 프로퍼티가 있음`
- ┣ me 객체는 프로토타입인 Person.prototype의
- ┗ constructor 프로퍼티를 `상속받아 사용 가능`

## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

- `생성자 함수에 의해 생성된 인스턴스`는
- ┣ 프로토타입의 `constructor 프로퍼티`에 의해서
- ┣ `생성자 함수와 연결!`
- ┣ 이 때 constructor 프로퍼티가 가르키는 생성자 함수 :
- ┗ `인스턴스를 생성한 생성자 함수`

```js
// obj 객체를 생성한 생성자 함수는 Object임
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function임
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
	this.name = name;
}

// me 객체를 생성한 생성자 함수 : Person
const me = new Person('Lee');
console.log(me.constructor === Person); // true
```

- 하지만 `리터럴 표기법에 의한 객체 생성 방식`과 같이
- ┣ `new 연산자`와 함께 `생성자 함수를 호출`하여
- ┗ `인스턴스를 생성하지 않는 객체 생성 방식`도 존재

```js
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) {
	return a + b;
};

// 배열 리터럴
const arr = [1, 2, 3];

// 정규 표현식 리터럴
const regexp = /is/gi;
```

- `리터럴 표기법에 의해 생성된 객체`도 물론
- ┣ `프로토타입이 존재`함!
- ┣ 하지만 리터럴 표기법에 의애 생성된 객체 :
- ┣ 프로토타입의 `constructor 프로퍼티`가 가리키는
- ┗ `생성자 함수 → 반드시 객체를 생성한 생성자 함수라고 말 X`

```js
// obj 객체는 Object 생성자 함수로 생성한 객체가 아닌
// 객체 리터럴로 생성
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수임
console.log(obj.constructor === Object); // true
```

- 위 예제의 obj 객체 : Object 생성자 함수로 생성한 객체가 아닌
- ┣ 객체 리터럴에 의해 생성된 객체
- ┣ 하지만 obj 객체 : Object 생성자 함수와 constructor 프로퍼티로 연결
- ┗ 객체 리터럴 → Object 생성자 함수로 생성되는게 아닌지 의문?

- ECMAScript 공식 문서에는 생성자 함수에 인수를 전달하지 않거나
- ┣ `undefined 또는 null을 인수로 전달`하면서 전달하면
- ┣ 내부적으로는 추상 연산 `OrdinaryObjectCreate` 호출
- ┗ Object.prototype을 프로토타입으로 가지는 빈 객체를 생성

> 인수 전달 X, undefined, null의 경우
> Object.prototype을 프로토타입으로 가지는 빈 객체 생성

- 추상연산
- ┣ ECMAScript 사향에서 내부 동작의 구현 알고리즘을 표현
- ┗ ECMAScript 설명을 위해 사용되는 함수와 유사한 의사 코드

```js
// Object 생성자 함수에 의한 객체 생성
// 인수가 전달 되지 않았을 때 추상연산을 호출하여 빈 객체를 생성
let obj = new Object();
console.log(obj); // {}

// new.target이 undefined나 Object가 아닌 경우
// 인스턴스 → Foo.prototype → Object.prototype 순으로
// 프로토타입 체인이 생성
class Foo extends Object {}
new Foo(); // Foo {}

// 인수가 전달된 경우 : 인수를 객체로 변환
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String 객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```

> 객체 리터럴이 평가될 때는 추상연산 호출하여
> 빈 객체를 생성 → 프로퍼티를 추가하도록 정의

- Object 생성자 함수 호출과
- ┣ 객체 리터럴의 평가는
- ┣ `추상 연산 OrdinaryObjectCreate를 호출` → `빈 객체 생성` `동일`
- ┣ `new.target의 확인`, `프로퍼티를 추가하는 처리` 등 세부 내용 `다름`
- ┗ `객체 리터럴`에 의해 생성된 객체 : `Object 생성자 함수`가 생성한 객체 `아님`

- 함수 객체의 경우 차이가 더 명확
- ┣ `Function 생성자 함수` → 1. `렉시컬 스코프`를 만들지 않고
- ┣ 2. `전역 함수인 것처럼 스코프를 생성`하며, 3. `클로저를 만들지 않음`
- ┣ `함수 선언문과 함수 표현식을 평가`하여 `함수 객체 생성의 경우`
- ┣ `Function 생성자 함수가 아님!`
- ┣ constructor 프로퍼티를 통해 확인해보면
- ┗ foo 함수의 생성자 함수는 Function 생성자 함수

```js
// foo 함수의 경우 Function 생성자 함수로 생성한 것이 아닌
// 함수 선언문으로 생성
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면
// foo 생성자 함수 : Function 생성자 함수
console.log(foo.constructor === Function); //true
```

- `리터럴 표기법에 의해 생성된 객체` : `상속을 위해 프로토타입 필요`
- ┣ 리터럴 표기법에 의해 생성된 객체 : `가상적인 생성자 함수`
- ┣ `프로토타입` : `생성자 함수와 더불어 생성`
- ┣ `prototype`, `constructor` 프로퍼티에 의해 `연결`되어 있음
- ┗ 프로토타입과 생성자 함수는 단독으로 존재 X → `쌍으로 존재`

> 언제나 프로토타입과 생성자 함수는 쌍으로 존재함

- 리터럴 표기법(객체, 함수, 배열, 정규표현식)에 의해 생성된
- ┣ 객체 : 생성자 함수에 의해 생성된 객체는 아님
- ┣ 하지만 : 클 틀 `리터럴 표기법 생성` → `생성자 함수`로 생성한
- ┗ 객체와 `본질적인 면에서는 큰 차이가 없음`

- `객체 리터럴`, `Object 생성자` 함수 생성 과정에서의 차이는 존재
- ┣ 하지만 `객체로서는 동일한 특성을 가짐`
- ┣ 함수 리터럴에 의해 생성한 함수, `Function 생성자 함수`
- ┣ 생성한 함수는 생성 과정과 `스코프, 클로저 차이 존재`
- ┗ 그러나 `결국은 같은 함수`

- `프로토타입의 constructor 프로퍼티`를 통해
- ┣ 연결되어 있는 생성자 함수 → 리터럴 표기법으로 만든
- ┗ 생성자 함수와 동일하게 생각하여도 문제 X

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |

## 19.5 프로토타입의 생성 시점

- 리터럴 표기법 의해 `생성된 객체도 생성자 함수와 연결`되는 것
- ┣ `객체` : `리터럴 표기법` 또는 `생성자 함수에 의해 생성`
- ┗ 모든 `객체는 생성자 함수와 연결`

> Object create 메서드와 클래스에 의한 객체 생성

    Object.create 메서드를 이용해서 객체를
    ┣ 생성하는 방법도 존재함
    ┣ 이 메서드와 클래스로 생성한 객체도
    ┗ 생성자 함수와 연결되어 있음

- `프로토타입`은 생`성자 함수가 생성되는 시점에 더불어 생성`
- ┣ 프로토타입과 생성자 함수는 `단독으로 존재할 수 없다는`
- ┣ 점을 꼭 명심!
- ┣ 생성자 함수 : 1. `사용자가 직접 정의한 사용자 정의 생성자 함수`
- ┣ 2. `JS가 기본 제공하는 빌트인 생성자 함수`로 구분 가능
- ┗ 사용자 정의 생성자 함수와 빌트인 생성자 함수를 구분

### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

- 내부 메서드 `[[Construct]]`를 갖는 함수 객체
- ┣ 즉 화살표 함수나 ES6 메서드 축약 표현으로
- ┣ 정의하지 않고 일반 `함수(함수 선언문, 함수 표현식)`
- ┣ 으로 정의한 함수 객체 : new 연산자와 함께 생성자 함수로
- ┗ 호출이 가능하다.

- 생성자 함수로서 호출할 수 잇는 함수
- ┣ 즉 : `constructor`는 `함수 정의가 평가`되어
- ┗ `함수 객체를 생성하는 시점` → `프로토타입도 동시에 생성`

```js
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는
// 시점에 프로토타입도 더불어 생성됨
console.log(Person.prototype); // {constructor: f}

// 생성자 함수
function Person(name) {
	this.name = name;
}
```

- `생성자 함수로서 호출할 수 없는 함수`
- ┗ 즉 `non-constructor`는 `프로토타입이 생성되지 않음`

```js
// 화살표 함수 : non-constructor임
const Person = (name) => {
	this.name = name;
};
// non-constructor는 프로토타입이 생성되지 않음
console.log(Person.prototype); // undefined
```

- 12.4.3절 함수 생성 시점과 함수 호이스팅에서 보았듯
- ┣ `함수 선언문` : `런타임 이전에 JS 엔진`에 의해 먼저 실행
- ┣ `함수 선언문`으로 정의된 Person `생성자 함수` :
- ┣ `어떤 코드보다 먼저 평가`되어 `함수 객체`가 됨
- ┣ `프로토타입도 더불어 생성됨`
- ┣ 생성된 `프로토타입` : Person `생성자 함수`의
- ┣ `prototype 프로퍼티에 바인딩`
- ┗ Person 생성자 함수와 더불어 생성된 프로토타입 내부

- 생성된 프로토타입 : 오직 `constructor 프로퍼티만을 갖는 객체`
- ┣ `프로토타입` : 객체 → `모든 객체` : `프로토타입을 가짐`
- ┣ 프로토타입도 `자신의 프로토타입을 가짐`
- ┣ 생성된 프로토타입의 프로토타입 :
- ┗ `Object.prototype`

- 빌트인 생성자 함수가 아닌 `사용자 생성자 정의 함수` :
- ┣ 자신이 `평가되어 함수 객체로 생성되는 시점`에
- ┣ `프로토타입도 더불어 생성`
- ┗ 생성된 프로토타입 : 언제나 `Object.prototype`

### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점

- Object. String, Number, Function, Array,
- ┣ RegExp, Date, Promise 같은 `빌트인 생성자 함수`도
- ┣ 일반 함수와 마찬가지로 `빌트인 생성자 생성 시점`에
- ┣ `프로토타입이 생성됨`
- ┣ 모든 빌트인 생성자 함수 : `전역 객체가 생성되는 시점`에
- ┣ `생성됨`
- ┗ 생성된 프로토타입 : `생성자 함수의 prototype 프로퍼티에 바인딩`

- 이처럼 객체가 생성되기 이전에 `생성자 함수, 프로토타입`
- ┣ 이미 `객체화되어 존재`
- ┣ `생성자 함수, 리터럴 표기법으로 객체를 생성`하면
- ┣ `프로토타입` : 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당됨
- ┗ 이로써 `생성된 객체 : 프로토타입을 상속`

#### 전역 객체

- 전역 객체 : 코드가 실행되기 이전 단계에
- ┣ JS 엔진에 의해 생성되는 특수한 객체
- ┣ 전역 객체 : 클라이언트 사이드 환경 : `window`
- ┗ 서버 사이드 환경`(Node.js) : global`을 의미

- 전역 객체는 1. 표준 빌트인 객체들과, 2. 환경에 따른
- ┣ 호스트 객체, 3. var 키워드로 선언한 전역 변수, 함수를
- ┣ 프로퍼티로 가지게 됨
- ┗ `Math`, `Reflect`, `JSON`을 `제외`한 `표준 빌트인 객체` : 모두 `생성자 함수`

```js
// 전역 객체 window는 브라우저에 종속적임
// 빌트인 객체인 Object : 전역 객체 window의 프로퍼티
window.Object === Object; //true
```

- `표준 빌트인 객체인 Object` → `전역 객체의 프로퍼티`
- ┣ `전역 객체가 생성되는 시점`에 생성
- ┣ 전역 객체, 표준 비트인 객체에 대해서는
- ┗ 빌트인 객체에서 학습

## 19.6 객체 생성 방식과 프로토타입의 결정

- 객체는 다음과 같이 `다양한 생성 방법이 존재`
- ┣ 1. 객체 리터럴
- ┣ 2. Object 생성자 함수
- ┣ 3. 생성자 함수
- ┣ 4. Object.create 메서드
- ┗ 5. 클래스(ES6)

- 이처럼 다양한 방식으로 생성된 모든 객체는 각 방식마다
- ┣ 세부적인 객체 생성 방식의 차이는 있으나
- ┗ 추상 연산(OrdinaryObjectCreate)에 의해 생성된다는 공통점

- `추상 연산`은 필수적으로 자신이 생성할 객체의
- ┣ 1. `프로토타입의 인수를 전달` 받음
- ┣ 2. 자신이 `생성할 객체에 추가할 프로퍼티 목록` → `옵션 전달` 가능
- ┣ `빈 객체` 생성 → `객체에 추가할 프로퍼티 목록이 인수 전달`된 경우
- ┣ `프로퍼티를 객체에 추가`
- ┣ 인수로 전달받은 프로토타입 → 자신이 생성한 객체의
- ┗ `[[Prototype]]` 내부 슬롯에 할당하고 → 생성한 객체를 반환

> 프로토타입 : 추상 연산 OrdinaryObjectCreate에 전달되는 인수에
> 의해서 결정이 됨
> 인수 : 객체가 생성되는 시점에 객체 생성 방식에 의해 결정

### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

- JS엔진은 객체 리터럴을 평가하여 객체를 생성할 때
- ┣ 추상 연산을 호출함
- ┣ `추상 연산에 전달`되는 `프로토 타입` : `Object.prototype`
- ┣ `객체 리터럴에 의해 생성`되는 객체의 프로토 타입 :
- ┗ `Object.prototype`

```js
const obj = { x: 1 };
```

- `객체 리터럴이 평가`되면 `추상 연산`에 의해 다음과 같이
- ┣ `Object 생성자 함수`와 `Object.prototype`과 `생성된 객체 사이`에
- ┗ 연결이 만들어짐

- 객체 리터럴에 의해 생성된 obj 객체 :
- ┣ `Object.prototype`을 `프로토타입으로 가지면`
- ┣ 이로써 `Object.prototype`을 `상속` 받음
- ┣ obj 객체 : `constructor` 프로퍼티, `hasOwnProperty` `메서드 소유 X`
- ┣ 하지만 : 자신의 프로토타입인 `Object.prototype`의 `constructor` 프로퍼티와
- ┣ hasOwnProperty 메서드를 자신의 자산인 것처럼 자유롭게 사용가능
- ┗ 이는 `obj 객체가 자신의 프로토타입`인 `Object.prototype 상속`!!!!

> 객체가 자신의 프로토타입인 Object.prototype 상속 받으면
> 메서드를 자유 자재로 사용이 가능하다.

```js
const obj = { x: 1 };

// 객체 리터럴에 의해 생성된 obj 객체는
// Object.prototype을 상속받음
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```

### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

- Object 생성자 함수를 인수 없이 호출 → 빈 객체가 생성됨
- ┣ Object 생성자 함수를 호출 → 객체 리터럴과 마찬가지로
- ┣ `OrdinaryObjectCreate`(추상 연산)이 호출됨
- ┣ 이 때 `추상 연산에 전달`되는 `프로토타입` :
- ┣ `Object.prototype`임
- ┣ Object 생성자 함수에 의해 생성되는 객체의 프로토타입 :
- ┗ Object.prototype임

```js
const obj = new Object();
obj.x = 1;
```

- 코드가 실행되면 `추상 연산`에 의해 다음과 같이
- ┣ 1. `Object 생성자 함수`
- ┣ 2. `Object.prototype`과 생성된 `객체 사이에 연결`이
- ┣ 만들어지게 됨
- ┗ 객체 리터럴에 의해 `생성된 객체와 동일한 구조를 가짐`

- Object 생성자 함수에 의해 생성된 obj 객체 :
- ┣ `Object.prototype`을 `프로토타입`으로 갖게 되며
- ┗ 이로써 `Object.prototype을 상속`받음

```js
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체
// Object.prototype을 상속받음
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```

- `객체 리터럴`과 `Object 생성자 함수`에 의한 객체 생성 방식 차이 :
- ┣ `프로퍼티를 추가하는 방식`에 존재함
- ┣ 1. `객체 리터럴 방식` : `리터럴 내부에 프로퍼티 추가`
- ┗ 2. `Object 생성자 방식` : 일단 `빈 객체 생성`한 후 → `프로퍼티 추가`

### 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

- `new 연산자`와 함께 `생성자 함수를 호출`하여
- ┣ 인스턴스를 생성하게 되면
- ┣ 다른 객체 생성 방식과 마찬가지로
- ┗ `추상 연산이 호출!`

- 추상 연산에 `전달되는 프로토타입`
- ┣ 생성자 함수의 `prototype` 프로퍼티에 `바인딩되어 있는`
- ┣ 객체임
- ┣ `생성자 함수에 의해 생성`되는 `객체의 프로토타입` :
- ┗ 생성자 함수의 `prototype 프로퍼티에 바인딩`되어 있는 객체

```js
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');
```

- 코드가 실행되면 추상 연산에 의해서
- ┣ 1. `생성자 함수`
- ┣ 2. 생성자 함수의 `prototype 프로퍼티 바인딩` 되어있는 객체
- ┗ 3. `생성된 객체 사이 연결`

- 표준 빌트인 객체인 Object 생성자 함수와 더불어
- ┣ 생성된 프로토타입 : `Object.prototype`은
- ┣ 다양한 `빌트인 메서드(hasOwnProperty, propertyIsEnumerable)`
- ┗ 등을 `가지고 있음`
- 하지만 사용자 정의 생성자 함수 Person과 더불어
- ┣ 생성된 프로토타입 `Person.prototype`의 프로퍼티는
- ┗ `constructor 뿐임`

- 프로토타입 `Person.prototype`에 `프로퍼티를 추가`하여
- ┣ `하위(자식) 객체가 상속`받을 수 있도록 구현
- ┣ `프로토타입 : 객체`
- ┣ 일반 객체와 같이 `프로토타입에도 프로퍼티 추가/삭제 가능!`
- ┗ 이렇게 추가/삭제된 프로퍼티 : `프로토타입 체인`에 `즉각 반영`

```js
function Person(name) {
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
	console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi My name is Kim
```

> Person 생성자 함수를 통해 생성된 모든 객체 :
> 프로토타입에 추가된 sayHello 메서드를 상속받아서
> 자신의 메소드처럼 사용이 가능하다.

## 19.7 프로토타입 체인

```js
function Person(name) {
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
	console.log(`Hi My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드임
console.log(me.hasOwnProperty('name')); // true
```

- Person 생성자 함수에 의해 생성된 me 객체 :
- ┣ `Object.prototype` 메서드 → `hasOwnProperty`를 호출 가능
- ┗ 이것은 me 객체가 Person.prototype 만이 아닌 Object.prototype 도 상속!

> me 객체의 프로토타입 : Person.prototype

```js
Object.getPrototypeOf(me) === Person.prototype; // true
```

- `Person.prototype`의 프로토타입 : `Object.prototype`임
- ┗ `프로토타입의 프로토타입` → `Object.prototype`

```js
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
```

- JS : `객체의 프로퍼티(메서드 포함)에 접근`하려고 할 때
- ┣ 해당 `객체에 접근하려는 프로퍼티가 없다면`
- ┣ `[[prototype]]` 내부 슬롯의 참조를 따라
- ┣ 자신의 부모 역할을 하는 프로토타입의 `프로퍼티를 순차적으로 검색`
- ┗ 이를 → `프로토타입 체인`

> 프로토타입 체인 : JS가 객체지향 프로그래밍의 상속을 구현하는 매커니즘

```js
// hasOwnProperty : Object.prototype의 메서드
// me 객체 : 프로토타입 체인을 따라 hasOwnProperty 메서드 검색하여 사용
me.hasOwnProperty('name'); // true
```

- `me.hasOwnProperty('name')`과 같이 `메서드를 호출`하면
- ┣ `JS 엔진`은 다음과 같은 과정을 거쳐 메서드를 검색
- ┗ `프로퍼티 참조`의 경우도 `동일함`

1. 먼저 hasOwnProperty 메서드를 호출한 `me 객체`에서

   - ┣ `hasOwnProperty` 메서드를 `검색`
   - ┣ me 객체에는 hasOwnProperty 메서드가 없으므로
   - ┣ 프로토타입 체인을 따라 → `[[Prototype]]` `내부 슬롯에 바인딩` 되어 있는
   - ┣ 프로토타입 → 위 예제 `Person.prototype` 으로 이동하여
   - ┗ `hasOwnProperty 메서드를 검색`

2. Person.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라

   - ┣ 다시 말해 `[[Prototype]]` 내부 슬롯에 바인딩되어 잇는 프로토타입
   - ┗ 위 예제 → `Object.prototype`으로 이동하여 `hasOwnProperty` 검색

3. `Object.prototype`에는 `hasOwnProperty 메서드가 존재`
   - ┣ `JS 엔진`은 `Object.prototype.hasOwnProperty 메서드를 호출`
   - ┗ 이때 Object.prototype.hasOwnProperty 메서드의 `this에는 me 객체 바인딩`

```js
Object.prototype.hasOwnProperty.call(me, 'name');
```

> call 메서드

    call 메서드는 this로 사용할 객체를 전달하면서
    ┣ 함수를 호출하게됨
    ┣ 22절에서 학습 하도록함
    ┣ 지금은 this로 사용할 me 객체를 전달하면서
    ┗ Object.prototype.hasOwnProperty 메서드를 호출 이해

- 프로토타입 체인의 최상위에 위치하는 객체는
- ┣ 언제나 `Object.prototype`임
- ┣ 따라서 → 모든 객체 : `Object.prototype을 상속`받음
- ┣ `Object.prototype` : `프로토타입 체인의 종점(end of prototype chain)`
- ┗ Object.prototype의 프로토타입 → 즉 `[[Prototype]]` 내부 슬롯의 값 : null

- 프로토타입 체인의 종점 : `Object.prototype`에서도 `프로퍼티를 검색 못하는 경우`
- ┣ `undefined를 반환`하게 되는데
- ┗ 이의 경우에도 오류가 발생하지 않는 것을 유념

```js
console.log(me.foo); // undefined
```

- 이처럼 `JS 엔진`은 `프로토타입 체인을 따라`
- ┣ `프로퍼티/메서드를 검색`
- ┣ `JS 엔진`은 `객체 간의 상속 관계`로 이루어진
- ┣ 프로토타입의 `계층적인 구조`에서
- ┣ `객체의 프로퍼티를 검색`
- ┗ → `프로토타입 체인` : `상속과 프로퍼티 검색을 위한 메커니즘`

- 이에 반해 `프로퍼티가 아닌 식별자` : `스코프 체인에서 검색`
- ┣ `JS 엔진`은 `함수의 중첩 관계`로 이루어진 `스코프의 계층적 구조`에서
- ┣ `식별자를 검색`하게됨
- ┗ `스코프 체인` : `식별자 검색을 위한 메커니즘`

```js
me.hasOwnProperty('name');
```

- 위의 예제의 경우
- ┣ 1. `스코프 체인`에서 me 식별자 검색
- ┣ 2. me `식별자 전역에서 선언` → `전역 스코프`에서 `검색`
- ┣ 3. me 식별자 검색 후 me `객체 프로토타입 체인`에서
- ┗ `hasOwnProperty` 메서드를 검색

> 스코프 체인과 프로토타입 체인 : 서로 연관없이 별도로 동작하는 것이 아닌
> 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용

## 19.8 오버라이딩과 프로퍼티 섀도잉

```js
const Person = (function () {
	// 생성자 함수
	function Person(name) {
		this.name = name;
	}
	// 프로토타입 메서드
	Person.prototype.sayHello = function () {
		console.log(`Hi my name is ${this.name}`);
	};
	// 생성자 함수를 반환
	return Person;
})();

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
	console.log(`Hey! may name is ${this.name}`);
};

// 인스턴스 메서드 호출됨
// 프로토타입 메서드는 인스턴스 메서드에 의해 가려짐
my.sayHello(); // Hey! My name is Lee
```

- `생성자 함수로 객체(인스턴스) 생성 후`
- ┗ `인스턴스에 메서드를 추가`

- 프로토타입이 소유한 프로퍼티(메서드 포함)를 → 프로토타입 프로퍼티
- 인스턴스가 소유한 프로퍼티 : 인스턴스 프로퍼티

- 프로토타입 프로퍼티와 `같은 이름의 프로퍼티` :
- ┣ `인스턴스에 추가`하면 `프로토타입 체인`을 `따라`
- ┣ `프로토타입 프로퍼티를 검색`하여 `프로토타입 프로퍼티를 덮어씌우는 것이 아닌`
- ┣ `인스턴스 프로퍼티로 추가`
- ┣ `인스턴스 메서드` : `sayHello`는 프로토타입 메서드 sayHello `오버라이딩`
- ┣ `프로토타입 메서드` : `sayHello는 가려짐`
- ┗ 이렇게 상속 관계에 의해서 프로퍼티 가려지는 현상 → `프로퍼티 섀도잉`

> 인스턴스 프로퍼티에 의해서 프로토타입 프로퍼티 가려짐
> 프로퍼티 새도잉

> 오버라이딩(overriding)

    상위 클래스가 가지고 잇는 메서드를
    ┗ 하위 클래스가 재정의하여 사용하는 방식

> 오버로딩(overloading)

    함수의 이름은 동일하지만 매개변수의 타입
    ┣ 또는 개수가 다른 메서드를 구현하고
    ┣ 매개변수에 의해 메서드를 구별하여 호출하는 방식
    ┣ JS 경우 오버로딩을 지원 X
    ┗ arguments 객체를 사용하여 구현 가능

- 프로퍼티 삭제의 경우도 동일

```js
// 인스턴스 메서드를 삭제
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로
// 프로토타입 메서드가 호출됨
me.sayHello(); // Hi! My name is Lee
```

- 당연히 프로토타입 메서드 삭제가 아닌
- ┗ `인스턴스 메서드의 삭제가 이루어짐`

```js
// 프로토타입 체인을 통해
// 프로토타입 메서드가 삭제되지 않음
delete me.sayHello;
// 프로토타입 메서드가 호출됨
me.sayHello(); // Hi! My name is Lee
```

- 이와 같이 `하위 객체를 통해 `
- ┣ 프로토타입의 `프로퍼티를 변경 또는 삭제 불가`
- ┣ → 오버라이딩이나 추가하는 경우만 가능하다는 점
- ┣ `하위 객체`를 통해 `get 엑세스 허용`
- ┗ but `set의 경우는 불가`

- 프로토타입 프로퍼티를 변경 또는 삭제하려면
- ┗ 직접 접근해야함

```js
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
	console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

## 19.9 프로토타입의 교체

- `프로토타입`은 `임의의 다른 객체로 변경가능`
- ┣ `부모 객체`인 `프로토타입을 동적으로 변경 가능하다는 것`을 의미
- ┣ 이러한 `특징을 활용`하여 `객체 간의 상속 관계 동적 변경 가능`
- ┗ `프로토타입` : `생성자 함수, 인스턴스에 의해 교체 가능`

### 19.9.1 생성자 함수에 의한 프로토타입의 교체

```js
const Person = (function () {
	function Person(name) {
		this.name = name;
	}
	// 생성자 함수의 prototype 프로퍼티를 통해
	// 프로토타입을 교체
	Person.prototype = {
		sayHello() {
			console.log(`Hi! My name is ${this.name}`);
		},
	};
	return Person;
})();
const me = new Person('Lee');
```

- 1 에서 `Person.prototype`에 `객체 리터럴을 할당`
- ┣ 이는 `Person 생성자 함수`가 `생성할 객체의 프로토타입`을
- ┗ `객체 리터럴로 교체`

- `프로토타입`으로 `교체한 객체 리터럴`에는
- ┣ `constructor 프로퍼티가 없음`
- ┣ `constructor 프로퍼티` : `JS 엔진이 프로토타입을 생성`할 때
- ┣ `암묵적으로 추가`한 `프로퍼티`
- ┣ `me 객체의 생성자 함수`를 `검색`하면
- ┗ Person이 아닌 Object가 나옴

```js
// 프로토타입을 교체하면 constructor 프로퍼티와
// 생성자 함수 간의 연결이 파괴됨
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색됨
console.log(me.constructor === Object); // true
```

- 이처럼 프로토타입을 교체하면 constructor 프로퍼티와
- ┣ 생성자 함수 간의 연결이 파괴됨
- ┣ 파괴된 constructor 프로퍼티와 생성자 함수 간의 연결을 되살리기
- ┣ 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하여
- ┗ 프로토타입의 constructor 프로퍼티를 되살림

```js
const Person = (function () {
	function Person(name) {
		this.name = name;
	}

	// 생성자 함수의 prototype 프로퍼티를 통해
	// 프로토타입을 교체
	Person.prototype = {
		// constructor 프로퍼티와 생성자 함수 간의
		// 연결을 설정
		constructor: Person,
		sayHello() {
			console.log(`Hi My name is ${this.name}`);
		},
	};
	return Person;
})();

const me = new Person('Lee');

// constructor 프로퍼티가 생성자 함수를 가리킴
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

### 19.9.2 인스턴스에 의한 프로토타입의 교체

- 프로토타입 : 생성자 함수의 prototype 프로퍼티뿐만 아닌
- ┣ 인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Object.getPrototypeOf`)
- ┣ 통해 접근이 가능하다.
- ┣ 따라서 인스턴스의 `__proto__` 접근자 프로퍼티(또는 Object.setPrototypeOf 메서드)
- ┗ 를 통해서 프로토타입을 교체할 수 있음

- 생성자 함수의 `prototype` 프로퍼티에 다른 임의의 객체를 바인딩하는 것은
- ┣ 미래에 생성할 인스턴스의 프로토타입을 교체하는 것
- ┣ `__proto__` 접근자 프로퍼티를 통해
- ┗ 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것

```js
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
	sayHello() {
		console.log(`Hi! my name is ${this.name}`);
	},
};
// 1 me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent);
// 위 코드는 아래와 동일하게 동작
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

- 1 에서 me 객체의 프로토타입을 parent 객체로 교체
- ┣ 생성자 함수에 의한 프로토타입의 교체와 마찬가ㄷ지로
- ┣ `프로토타입으로 교체한 객체`에는
- ┣ `constructor` 프로퍼티가 없으므로
- ┣ `constructor` 프로퍼티와 생성자 함수 간의 `연결이 파괴됨`
- ┣ 따라서 프로토타입의 `constructor` 프로퍼티로 me 객체의 `생성자`
- ┗ `함수를 검색`하게 되면 `Person이 아닌 Object가 나옴`

```js
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴
console.log(me.constructor === Person); //false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색됨
console.log(me.constructor === Object); // true
```

- 생성자 함수에 의한 프로토타입 교체와
- ┣ 인스턴스에 의한 프로토타입 교체는
- ┣ 별다른 차이점이 없어보임
- ┗ 그러나 `미묘한 차이점이 존재`

- `생성자 함수에 의한 프로토타입 교체`
- ┗ 생성자 함수의 prototype 프로퍼티가 → `교체된` 프로토타입을 `가르킴`

- `인스턴스에 의한 프로토타입 교체`
- ┗ 생성자 함수의 prototype 프로퍼티가 → 교체된 프로토타입을 `가르키지 X`

- 프로토타입으로 `교체한 객체 리터럴`에
- ┣ `constructor 프로퍼티를 추가`하고
- ┣ 생성자 함수의 `prototype 프로퍼티를 재설정`하여
- ┗ `파괴된 생성자` 함수와 `프로토타입` 간의 `연결을 되살림`

```js
function Person(name) {
	this.name = name;
}
const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
	// constructor 프로퍼티와
	// 생성자 함수 간의 연결을 설정
	constructor: Person,
	sayHello() {
		console.log(`Hi! My name is ${this.name}`);
	},
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent);
// 위 코드 아래와 동일하게 동작
// me.__proto__ = parent;

me.sayHello(); // Hi! my name is ~

// constructor 프로퍼티가 생성자 함수를 가르킴
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가르킴
console.log(Person.prototype === Object.getPrototypeOf(me)); //true
```

- 프로토타입 교체를 통해 객체 간의 `상속 관계를 동적으로 변경`
- ┣ 꽤나 번거로움 → 그렇기에 프로토타입은 `직접 교체하지 않는게 좋음`
- ┣ 상속 관계를 인위적 설정 → 뒤에 19.11 직접 상속에서 살펴볼게 편리, 안전
- ┗ `ES6에서 도입된 클래스`를 사용하면 `간편하고 직관적으로 상속관계 구현`

## 19.10 instanceof 연산자

- `instanceof` 연산자 : `이항 연산자`로서 `좌변` : 객체를 가리키는 `식별자`
- ┣ `우항` : `생성자 함수를 가리키는 식별자`를 피연산자
- ┗ `우변` : `함수가 아닌 경우` `TypeError` 발생

- 우변의 생성자 함수의 `prototype`에 `바인딩된 객체`가
- ┣ `좌변의 객체의 프로토타입 체인 상에 존재`하면 → `true`
- ┗ `아닌 경우에는 false`로 평가

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// Person.prototype이 me 객체의 프로토타입 체인 상 존재 → true
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상 존재 → true
console.log(me instanceof Object); // true
```

> instanceof 연산자 동작을 이해하기 위해서 프로토타입을 교체

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결 X
console.log(Person.prototype === parent); //false
console.log(parent.constructor === Person); //false

// Person.prototype이 me 객체의 프로토타입 체인 상 존재 X → false
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상 존재 → true
console.log(me instanceof Object); // true
```

- me 객체 : 비록 `프로토타입이 교체`되어
- ┣ `프로토타입과 생성자 함수 간의 연결이 파괴`되었지만
- ┣ `Person 생성자 함수`에 의해 `생성`된 `인스턴스임에는 틀림없음`
- ┗ 그러나 `me instanceof Person` : `false`

- 이유 : `Person.prototype`이 `me 객체의 프로토타입 체인 상 존재 X`
- ┣ `프로토타입`으로 `교체한 parent 객체`를
- ┣ `Person 생성자 함수`의 `prototype 프로퍼티`에 `바인딩 `
- ┗ `me instanceof Person`은 `true로 평가`

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결 X
console.log(Person.prototype === parent); //false
console.log(parent.constructor === Person); //false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상 존재 X → false
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상 존재 → true
console.log(me instanceof Object); // true
```

- 이처럼 instanceof 연산자 : 프로토타입의 constructor 프로퍼티가
- ┣ 가리키는 생성자 함수를 찾는 것이 아닌
- ┣ `생성자 함수`의 `prototype에 바인딩된 객체`가
- ┗ `프로토타입 체인 상`에 `존재하는지 확인`

> instanceof 연산자 : 프로토타입 체인 상에 존재하는지 확인

- instanceof 연산자의 함수화

```js
function isInstanceof(instance, constructor) {
	// 프로토타입 취득
	const prototype = Object.getPrototypeOf(instance);

	// 재귀 탈출 조건
	// prototype이 null이면 프로토타입 체인 종점 도착
	if (prototype === null) return false;

	// 프로토타입이 생성자 함수의 prototype 프로퍼티에
	// 바인딩된 객체 → true 반환
	// 그렇지 않은 경우 재귀 호출로 프로토타입 체인 상의
	// 상위 프로토 타입으로 이동하여 확인
	return (
		prototype === constructor.prototype || isInstanceof(prototype, constructor)
	);
}
console.log(isInstanceOf(me, Person)); // true
console.log(isInstanceOf(me, Object)); // true
console.log(isInstanceOf(me, Array)); // false
```

- 따라서 `생성자 함수에 의해 프로토타입이 교체`되어
- ┣ `constructor 프로퍼티`와 `생성자 함수 간`의
- ┣ `연결이 파괴`되어도 → `prototype 프로퍼티`와
- ┗ `프로퍼티 간의 연결 파괴 X` → `instance에 대한 영향 X`

```js
const Person = (function () {
	function Person(name) {
		this.name = name;
	}

	// 생성자 함수의 prototype 프로퍼티를 통해
	// 프로토타입을 교체
	Person.prototype = {
		sayHello() {
			console.log(`Hi! My name is ${this.name}`);
		},
	};
	return Person;
})();

const me = new Person('Lee');

// constructor 프로퍼티와 생성자 함수간 연결이 파괴되어도
// instanceof는 아무런 영향을 받지 않음
console.log(me.constructor === Person); //false

// Person.prototype이 me 객체의 프로토타입 체인 상 존재
// true로 평가됨
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상 존재
// true로 평가
console.log(me instanceof Object); // true
```

## 19.11 직접 상속

### 19.11.1 Object.create에 의한 직접 상속

- `Object.create` 메서드는 명시적으로 프로토타입을 지정하여
- ┣ `새로운 객체를 생성`하게됨
- ┣ `Object.create` 메서드도 `다른 객체 생성 방식과 마찬가지로`
- ┗ `추상 연산 OrdinaryObjectCreate를 호출`함

- `Object.create` 메서드의 `첫 번째 매개변수`
- ┣ 1. 생성할 객체의 `프로토타입으로 지정할 객체` 전달
- ┣ 2. 생성할 객체의 `프로퍼티 키`, `프로퍼티 디스크립터`로 이뤄진 `객체`
- ┣ 이제 객체의 형식은 `Object.defineProperties` 메서드의 `두 번째 인수와 동일`
- ┗ 2번째 인수의 경우 옵션 → 생략 가능

```js
Object.create(prototype[, propertiesObject]);
```

```js
// 프로토타입이 null인 객체 생성
// 생성된 객체 : 프로토타입 체인의 종점에 위치
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); //true
// Object.prototype 상속받지 못함
console.log(obj.toString()); // TypeError is not a function

// obj → Object.prototype → null
// obj = {};와 동일
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null
// obj = {x :1}; 과 동일
obj = Object.create(Object.prototype, {
	x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// 위 코드는 아래와 동일
// obj = Object.create(Object.prototype);
// obj.x = 1;

const myProto = { x: 10 };
// 임의의 객체를 적접 상속
obj = Object.create(myProto);
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
	this.name = name;
}
// obj → Person.prototype → Object.prototype → null
// obj = new Person('Lee')와 동일
obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

- 이처럼 `Object.create 메서드`는
- ┣ `첫 번째 매개변수`에 전달한 객체의 `프로토타입 체인에 속하는`
- ┣ `객체를 생성`하게됨
- ┣ 즉 : `객체를 생성`하면서 `직접적으로 상속을 구현`
- ┗ `메서드의 장점`은 다음과 같음

1. new 연산자가 없어도 객체를 생성 가능하다.

2. 프로토타입을 지정하면서 객체를 생성 가능하다.

3. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

- 참고로 `Object.prototype` `빌트인 메서드` ex) `Object.prototype.hasOwnProperty`
- ┣ 등은 `모든 객체의 프로토타입 체인의 종점`
- ┣ 즉 : `object.prototype`의 `메서드`이므로
- ┗ `모든 객체가 상속`받아 `호출`할 수 있음

```js
const obj = { a: 1 };

obj.hasOwnProperty('a'); //true
obj.propertyIsEnumerable('a'); // true
```

- 하지만 ESLint 에서는 앞의 예제와 같이
- ┣ Object.prototype 빌트인 메서드를
- ┗ 객체가 직접 호출하는 것은 권장 X

- `이유` : `Object.create 메서드`를 통해 `프로토타입 체인`의
- ┣ `종점에 위치하는 객체`를 `생성`할 수 있기 때문
- ┣` 프로토타입 체인 종점` 위치 객체 : `Object.prototype 빌트인`
- ┗ `메서드를 사용이 불가`하다.

```js
// 프로토타입이 null인 객체
// 즉 프로토타입 체인의 종점에 위치하는 객체를 생성
const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); //true

// obj는 Object.prototype의 블트인 메서드를 사용 불가
console.log(obj.hasOwnProperty('a'));
// TypeError: obj.hasOwnProperty is not a function
```

- 따라서 이 같은 오류를 발생시킬 위험을 없애기 위해서
- ┣ Object.prototype의 빌트인 메서드는 다음과 같이
- ┗ 간접적으로 호출하는 것이 좋음

```js
// 프로토타입이 null인 객체를 생성
const obj = Object.create(null);
obj.a = 1;

// console.log(obj.hasOwnProperty('a'));
// TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않음
console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); //true
```

### 19.11.2 객체 리터럴 내부에서 **proto** 에 의한 직접 상속

- `Object.create` 메서드에 의한 `직접 상속`은
- ┣ 앞에서 다룬 것과 같이 여러 `장점`이 있음
- ┣ 하지만 두 번째 인자로 프로퍼티를 정의하는 것은 `번거로움`
- ┣ 객체를 생성한 이후 프로퍼티를 추가하는 방법도 있으나
- ┗ 이 또한 깔끔한 방법은 아님

- ES6 에서는 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용하여
- ┗ 직접 상속을 구현할 수 있음

```js
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서
// 프로토타입을 지정하여 직접 상속받을 수 있음
const obj = {
	y: 20,
	// 객체를 직접 상속받는다.
	// obj → myProto → Object.prototype → null
	__proto__: myProto,
};
// 위코드는 아래와 동일
const obj = Object.create(myProto, {
	y: { value: 20, writable: true, enumerable: true, configurable: true },
});
console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

## 19.12 정적 프로퍼티/메서드

- 정적(static) 프로퍼티/메서드 : 생성자 함수로 인스턴스를 생성하지
- ┗ 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말함

```js
// 생성자 함수
function Person(name) {
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
	console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = 'static prop';

// 정적 메서드
Person.staticMethod = function () {
	console.log('staticMethod');
};

const me = new Person('Lee');

// 생성자 함수에 추가한 정적 프로퍼티/메서드는
// 생성자 함수로 참조/호출함
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한
// 인스턴스로 참조/호출할 수 없음
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는
// 프로토타입 체인 상에 존재해야 함
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

- Person 생성자 함수 : 객체이므로 자신의 프로퍼티/메서드 소유 가능
- ┣ Person `생성자 함수 객체가 소유한 프로퍼티/메서드` → 정적 `프로퍼티/메서드`
- ┗ `정적 프로퍼티/메서드` : 생성자 함수가 생성한 `인스턴스로 참조/호출 불가`

- `생성자 함수`가 `생성한 인스턴스` : `자신의 프로토타입 체인에 속한`
- ┣ `객체의 프로퍼티/메서드에 접근`할 수 잇음
- ┣ 하지만 `정적 프로퍼티/메서드` : `인스턴스의 프로토타입 체인에 속한 객체`의
- ┗ `프로퍼티/메서드가 아니므로` `인스턴스에 접근 불가`

- 앞에서 살펴본 `Object.create 메서드` : `Object 생성자 함수의 정적 메서드`
- ┣ `Object.prototype.hasOwnProperty` 메서드 → `Object.prototype` 메서드임
- ┣ 따라서 `Object.create` 메서드 → Object.create 메서드 : 인스턴스 즉
- ┣ Object 생성자 함수가 생성한 객체로 호출할 수 없음
- ┣ 하지만 `Object.prototype.hasOwnProperty` 메서드는
- ┣ 모든 객체의 프로토타입 체인의 종점
- ┗ Object.prototype 메서드이므로 모든 객체가 호출할 수 있음

```js
// Object.create는 정적 메서드
const obj = Object.create({ name: 'Lee' });

// Object.prototype.hasOwnProperty는 프로토타입 메서드
obj.hasOwnProperty('name'); // false
```

- 만약 `인스턴스/프로토타입` 내에서 `this를 사용하지 않는다면`
- ┣ 메서드 : 정적 메서드로 변경이 가능
- ┣ 인스턴스가 호출한 `인스턴스/프로토타입` 메서드 내에서
- ┣ `this → instance를 가리킴`
- ┣ 메서드 내에서 `인스턴스를 참조할 필요가 없다면`
- ┣ `정적 메서드로 변경하여도 동작`함
- ┣ `프로토타입 메서드를 호출` → `인스턴스 생성 필수`
- ┗ `정적메서드` : 인스턴스 생성 하지 `않아도 호출 가능`

```js
function foo() {}

// 프로토타입 메서드
// this를 참조하지 앟는 프로토타입 메서드는
// 정적 메서드로 변경하여도 동일한 효과를 얻음
Foo.prototype.x = function () {
	console.log('x');
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면
// 인스턴스를 생성해야 함
foo.x(); // x

// 정적 메서드
Foo.x = function () {
	console.log('x');
};

// 정적 메서드는 인스턴스를 생성하지 않아도
// 호출이 가능하다.
Foo.x(); // x
```

- MDN 같은 공식 문서에서는
- ┣ 정적 프로퍼티/메서드와
- ┣ 프로토타입 프로퍼티/메서드를 구분하여 소개
- ┗ 표기법만으로도 정적 프로퍼티/메서드와 프로토타입을 구분 가능해야 함

> 참고 : 프로토타입 프로퍼티/메서드 표기할 때
> prototype → # (ex : Object.isPrototypeOf → Object#isPrototypeOf)
> 표기하는 경우도 있음

## 19.13 프로퍼티 존재 확인

### 19.13.1 in 연산자

- in 연산자 : 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인

```js
key in object;
```

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
};

// person 객체에 name 프로퍼티가 존재
console.log('name' in person); // true
```

- in 연산자 : 확인 대상 객체뿐만 아닌
- ┣ 확인 대상 객체가 상속받는 모든 프로토타입의
- ┣ 프로퍼티를 확인하므로 주의가 필요
- ┣ person 객체에는 toString이라는 프로퍼티가 없지만
- ┗ 다음 코드의 실행 결과는 true임

```js
console.log('toString' in person); //true
```

- 이는 in 연산자 : person 객체가 속한 프로토타입 체인 상에
- ┣ 존재하는 모든 `프로토타입에서 toString` `프로퍼티를 검색`했기 때문
- ┗ `toString`은 `Object.prototype`의 메서드

- in 연산자 대신 ES6에서 도입된 `Reflect.has 메서드를 사용 가능`
- ┗ `Reflect.has 메서드` : in 연산자와 `동일하게 동작`

```js
const person = { name: 'Lee' };

console.log(Reflect.has(person, 'name')); // true
console.log(Reflect.has(person, 'toString')); // true
```

### 19.13.2 Object.prototype.hasOwnProperty 메서드

- `Object.prototype.hasOwnProperty` 메서드를 사용해도
- ┗ 객체에 특정 프로퍼티가 존재하는지 확인 가능

```js
console.log(person.hasOwnProperty('name')); //true
```

- `Object.prototype.hasOwnProperty` 메서드 : 이름에서도 알 수 있듯이
- ┣ 인수로 전달받은 프로퍼티 키가
- ┣ `객체 고유의 프로퍼티` 키인 경우 : `true를 반환`
- ┗ `상속받은 프로퍼티` 키인 경우 : `false를 반환`

```js
console.log(person.hasOwnProperty('toString'));
```

## 19.14 프로퍼티 열거

### 19.14.1 for ... in 문

- 객체의 모든 프로퍼티를 순회하며
- ┗ `열거(enumeration)` 하려면 `for ... in`문을 사용

```js
for (변수선언문 in 객체) {...}
```

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
};

// for...in 문의 변수 prop에 person 객체의
// 프로퍼티 키가 할당됨
for (const key in person) {
	console.log(key + ': ' + person[key]);
}
// name: Lee;
// address: Seoul;
```

- `for ... in`문은 프로퍼티 개수만큼 순회하며
- ┣ `for ... in` 문의 변수 선언문에서 선언한 변수에
- ┗ `프로퍼티 키를 할당`

- `for...in` 문 : 연산자처럼 순회 대상 객체의 프로퍼티뿐만 아닌
- ┗ 상속받은 프로토타입의 프로퍼티까지 열거

> 하지만 toString 같은 Object.prototype의 프로퍼티가 열거되지 않음

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
};

// in 연산자는 객체가 상속받은 모든 프로토타입의
// 프로퍼티를 확인함
console.log('toString' in person); // true

// for...in문도 객체가 상속받은 모든 프로토타입을 열거
// 그러나 toString 같은 Object.prototype의 프로퍼티 열거 안됨
for (const key in person) {
	console.log(key + ': ' + person[key]);
}

// name: Lee
// address: Seoul
```

- 이는 `toString 메서드가 열거할 수 없도록 정의되어 있는`
- ┣ 프로퍼티이기 때문!
- ┣ 다시 말해 Object.prototype.string 프로퍼티의
- ┣ 프로퍼티 어트리뷰트 : `[[Enumerable]]` 값이 false이기 때문
- ┗ [[Enumerable]] : 프로퍼티의 열거 가능 여부를 나타내며 `불리언`

```js
// Object.getOwnPropertyDescriptor 메서드 :
// 프로퍼티 디스크립터 객체를 반환
// 프로퍼티 디스크립터 객체 :
// 프로퍼티 어트리뷰트 정보를 담고 있는 객체
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
// {value : f, writable: true, enumerable: false, configurable: true}
```

- 따라서 `for...in`문에 대해 좀 더 정확히 표현하면 아래와 같음

- `for...in` 문은 `객체의 프로토타입 체인 상에 존재`하는 모든
- ┣ `프로토타입의 프로퍼티 중`에서 프로퍼티 어트리뷰트
- ┣ `[[Enumerable]]`의 값이 : `true`인 프로퍼티를 순회하며
- ┗ `열거(enumeration)`

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
	__proto__: { age: 20 },
};

for (const key in person) {
	console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
```

- for...in 문은 프로퍼티가 심벌인 프로퍼티는 열거 X

```js
const sym = Symbol();
const obj = {
	a: 1,
	[sym]: 10,
};
```

- `상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거`하러면
- ┣ `Object.prototype.hasOwnProperty` 메서드를 사용하여
- ┗ 객체 자신의 프로퍼티인지 확인해야 함

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
	__proto__: { age: 20 },
};

for (const key in person) {
	// 객체 자신의 프로퍼티인지 확인
	if (!person.hasOwnProperty(key)) continue;
	console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
```

- 위 예제의 결과는 person 객체의 프로퍼티가 정의된 순서대로
- ┣ 열거 되어 있음
- ┗ 하지만 `for...in` 문은 `순서를 보장하지 않으므로 주의`

> 하지만 대부분의 모던 브라우저는 순서를 보장하고
> 숫자(사실은 문자열)인 프러퍼티 키에 대해서는 정렬을 실시

- 배열에는 `for...in`문을 사용하기 보다는
- ┣ 일반적인 `for문`이나 `for...of`문,
- ┣ `Array.prototype.forEach` 사용을 권장
- ┗ 사실 배열도 객체 : 프로퍼티와 상속받은 프로퍼티 포함 가능

```js
const arr = [1,2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 잇음

for (const i in arr) [
	// 프로퍼티 x도 출력
	console.log(arr[i]); // 1 2 3 10
]

// arr.length는 3
for (let i =0; i< arr.length; i++){
	console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외
arr.forEach(v => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당
for (const value of arr) {
	console.log(value); // 1 2 3
}
```

### 19.14.2 Object.keys/values/entries 메서드

- `for...in` 문 : `객체 자신의 고유 프로퍼티뿐만 아닌`
- ┣ `상속받은 프로퍼티도 열거`
- ┣ 따라서 `Object.prototype.hasOwnProperty` 메서드를 사용하여
- ┗ `객체 자신의 프로퍼티인지 확인`하는 `추가 처리가 필요`

- 객체 자신의 고유 프로퍼티만 열거하기 위해서
- ┗ `for...in 문 보다`는 `Object.keys/values/entries` 메서드 사용 권장

- `Object.keys` 메서드 : `객체 자신의 열거 가능한(enumerable)`
- ┗ `프로퍼티 키`를 `배열로 반환`

```js
const person = {
	name: 'Lee',
	address: 'Seoul',
	__proto__: { age: 20 },
};
console.log(Object.keys(person)); // ["name", "address"]
```

- ES8에서 도입된 `Object.values` 메서드 : 객체 자신의 열거 가능한 프로퍼티 값
- ┗ 배열로 반환하게 됨

```js
console.log(Object.values(person)); // ["Lee", "Seoul"]
```

- ES8에서 도입된 `Object.entries` 메서드 : 객체 자신의 열거 가능한
- ┗ 프로퍼티 `키와 값`의 `배열을 배열에 담아 반환`

```js
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
//
// name Lee
// address Seoul
//
```
