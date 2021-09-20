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
