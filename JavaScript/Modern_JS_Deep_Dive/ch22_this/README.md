# 22. this

## 목차

- [22. this](#22-this)
  - [목차](#목차)
  - [22.1 this 키워드](#221-this-키워드)
  - [22.2 함수 호출 방식과 this 바인딩](#222-함수-호출-방식과-this-바인딩)
    - [22.2.1 일반 함수 호출](#2221-일반-함수-호출)
    - [22.2.2 메서드 호출](#2222-메서드-호출)
    - [22.2.3 생성자 함수 호출](#2223-생성자-함수-호출)
    - [22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출](#2224-functionprototypeapplycallbind-메서드에-의한-간접-호출)

## 22.1 this 키워드

- `객체` : `상태(state)를 나타내는 프로퍼티`와
- ┣ `동작(behavior)`을 나타내는 `메서드를 하나의 논리적인 단위`로
- ┗ 묶은 `복합적인 자료구조`

- `동작을 나타내는 메서드` : `자신이 속한 객체의 상태`
- ┣ 즉 : `프로퍼티틀 참조하고 변경`할 수 있어야함
- ┣ `메서드가 자신이 속한 객체의 프로퍼티 참조`하기 위해
- ┗ 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 함

- `객체 리러터럴 방식으로 생성한 객체`의 경우
- ┣ `메서드 내부에서 자신이 속한 객체를 가리키는 식별자`를
- ┗ `재귀적으로 참조` 가능

```js
const circle = {
	// 프로퍼티 : 객체 고유의 상태 데이터
	radius: 5,
	// 메서드 : 상태 데이터를 참조하고 조작하는 동작
	getDiameter() {
		// 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드 참조하려면
		// 자신이 속한 객체인 circle을 참조할 수 있어야함
		return 2 * circle.radius;
	},
};

console.log(circle.getDiameter()); // 10
```

- `getDiameter 메서드` 내에서 → `메서드 내에서 메서드 자신이 속한 객체`를
- ┣ `가리키는 식별자 circle을 참조`하고 있음
- ┣ 이 참조 표현식이 `평가되는 시점` :
- ┗ `getDiameter 메서드가 호출되어 함수 몸체가 실행되는 시점`

- `객체 리터럴` : `circle 변수에 할당되기 직전에 평가`
- ┣ getDiameter 메서드가 `호출되는 시점`에는
- ┣ 이미 `객체 리터럴의 평가가 완료되어 객체가 생성`되었고
- ┣ `circle 식별자에 생성된 객체가 할당된 이후`
- ┗ 따라서 메서드 내부에서 circle 식별자 참조 가능

```js
function Circle(radius) {
    // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를
    // 가리키는 식별자를 알 수 없음
    ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
    // 이 시점에는 생성자 함수 자신이 생성할
    // 인스턴스를 가리키는 식별자를 알 수 없음
    return 2 * ????.radius;
}

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의
const circle = new Circle(5);
```

- `생성자 함수 내부` : `프로퍼티`, `메서드`를 `추가`하기 위해
- ┣ `자신이 생성할 인스턴스를 참조`할 수 있어야함
- ┣ 하지만 : `생성자 함수에 의한 객체 생성 방식` →
- ┣ 1. `생성자 함수를 정의`
- ┣ 2. `new 연산자와 함께 생성자 함수`를 호출
- ┗ 위와 같은 단계가 필요

> 생성자 함수 → 인스턴스 생성 : 생성자 함수 존재

- `생성자 함수를 정의`하는 시점 : `인스턴스를 생성 이전`
- ┣ `식별자를 알 수 없음`
- ┣ 자신이 속한 객체 또는 `자신이 생성할 인스턴스`를
- ┣ `가리키는 특수한 식별자`가 필요
- ┗ 이를 위해 JS : `this라는 특수한 식별자 제공`

- `this` : 자신이 속한 객체, 자신이 생성할 인스턴스를 가리키는
- ┣ `자기 참조 변수(self-referencing variable)`
- ┣ this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의
- ┗ `프로퍼티, 메서드를 참조 가능`

- `this` : `JS엔진에 의해서 암묵적으로 생성`
- ┣ `코드 어디서든 참조가 가능`
- ┣ 함수를 호출 : `arguments 객체`, `this`가 `암묵적으로 함수 내부 전달`
- ┣ 함수 내부 : `arguments 객체를 지역 변수처럼`
- ┗ `사용`할 수 있는 것처럼 → `this 또한 지역 변수처럼 사용`가능

> 단 : this가 가리키는 값 : this 바인딩의 경우 함수 호출 방식에 의해서
> 동적으로 결정됨

- `this 바인딩`
- ┣ `바인딩` : `식별자와 값을 연결하는 과정`을 의미함
- ┣ `변수 선언` : 변수 이름, 확보된 메모리 공간의 `주소를 바인딩`
- ┗ `this 바인딩` : `this`와 `this가 가리킬 객체를 바인딩` 하는 것

```js
// 객체 리터럴
const Circle = {
	radius: 5,
	getDiameter() {
		// this는 메서드를 호출한 객체를 가리킴
		return 2 * this.radius;
	},
};

console.log(circle.getDiameter()); // 10
```

- `객체 리터럴의 메서드 내부`에서의 `this` :
- ┗ `메서드를 호출한 객체` → circle을 가리킴

```js
// 생성자 함수
function Circle(radius) {
	// this는 생성자 함수가 생성할 인스턴스를 가리킴
	this.radius = radius;
}

Circle.prototype.getDiameter = function () {
	// this는 생성자 함수가 생성할 인스턴스를 가리킴
	return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

- `생성자 함수 내부의 this` : `생성자 함수가 생성할 인스턴스 가리킴`
- ┗ `this` : `상황에 따라 가리키는 대상이 다름`

- JAVA, C++ 같은 클래스 기반 언어 : this
- ┗ 언제나 클래스가 생성하는 인스턴스를 가리킴

- JS this : 함수가 호출되는 방식에 따라
- ┣ this에 바인딩될 값 :
- ┗ this 바인딩이 동적으로 결정됨

> strict mode 또한 this 바인딩에 영향을 줌

- this는 코드 어디에서든 참조 가능 → 전역에서도 함 내부에서도 참조 가능

```js
// this : 어디서든지 참조 가능
// 전역에서 this : 전역 객체 window 가리킴
console.log(this); //window

function square(number) {
	// 일반 함수 내부에서 this :
	// 전역 객체 window 가리킴
	console.log(this); // window
	return number * number;
}

square(2);

const person = {
	name: 'Lee',
	getName() {
		// 메서드 내부에서 this는 메서드를 호출한 객체를 가리킴
		console.log(this); // {name: "Lee", getName: f}
		return this.name;
	},
};
console.log(person.getName()); // Lee

function Person(name) {
	this.name = name;
	// 생성자 함수 내부에서 this :
	// 생성자 함수가 생성할 인스턴스를 가리킴
	console.log(this); // Person {name: "Lee"};

	const me = new Person('Lee');
}
```

- 하지만 `this` : `객체의 프로퍼티나 메서드를 참조`하기 위한
- ┣ `자기 참조 변수`이므로
- ┣ 일반적으로 `객체의 메서드` 또는 `생성자 함수 내부`에서만 의미
- ┣ `strict mode`가 적용된 `일반 함수 내부의 this` : `undefined가 바인딩`
- ┗ 일반 함수 내부에서는 `this를 사용할 필요가 없기 때문`

## 22.2 함수 호출 방식과 this 바인딩

- `this 바인딩(바인딩될 값)` : `함수 호출 방식`
- ┣ `함수가 어떻게 호출`되었는지에 따라
- ┗ `동적으로 결정`됨

- 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.
- ┣ 함수의 상위 스코프를 결정하는 방식인
- ┣ `렉시컬 스코프(lexical scope)` : `함수 정의가 평가`되어
- ┗ `함수 객체가 생성되는 시점`에 `상위 스코프를 결정`

- `this 바인딩` : `함수 호출 시점에 결정`

- 주의점
- ┣ 함수도 다양한 방식으로 호출 가능
- ┣ 함수 호출 방식
- ┣ 1. `일반 함수` 호출
- ┣ 2. `메서드` 호출
- ┣ 3. `생성자 함수` 호출
- ┗ 4. `Function.prototype.apply/call/bind 메서드`에 의한 `간접 호출`

```js
// this 바인딩 : 함수 호출 방식에 따라 동적으로 결정
const foo = function () {
	console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출 가능

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this : 전역 객체 window
foo(); //window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this :
// 메서드를 호출한 객체 obj
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this :
// 생성자 함수가 생성한 인스턴스를 가리킴
new foo(); // foo{}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this :
// 인수에 의해 결정
const bar = { name: 'bar' };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

> 함수 호출 방식에 따라 this 바인딩이 어떻게 결정되는지 학습

### 22.2.1 일반 함수 호출

- 기본적으로 `this` : `전역 객체(global object)가 바인딩` 됨

```js
function foo() {
	console.log("foo's this: ", this); // window
	function bar() {
		console.log("bar's this: ", this); // window
	}
	bar();
}
foo();
```

- 위 예제외 같이 `전역 함수는 물론`이고
- ┣ `중첩 함수` → `일반 함수로 호출`하게되면
- ┗ `함수 내부의 this` : `전역 객체가 바인딩`됨

- 다만 this의 경우 객체의 프로퍼티나 메서드 참조용
- ┗ `일반 함수에서는 의미가 없음`

> strict mode : undefined 바인딩

- `메서드 내에서 정의한 중첩 함수` :
- ┣ `일반 함수로 호출`되면
- ┣ 중첩 함수 내부의 this :
- ┗ 전역 객체가 바인딩됨

```js
// var 키워드로 선언한 전역 변수 value
// 전역 객체의 프로퍼티
var value = 1;
// const 키워드로 선언한 전역 변수 value :
// 전역 객체의 프로퍼티가 아님
// const value = 1;

const obj = {
    value : 100,
    foo() {
        console.log("foo's this: ", this); // {value: 100, foo: f}
        console.log("foo's this.value" this.value); // 100

        // 메서드 내부에서 정의한 중첩 함수
        function bar() {
            console.log("bar's this: ", this); // window
            console.log("bar's this.value: ", this.value); //1
        }
    }

    // 메서드 내에서 정의한 중첩 함수도
    // 일반 함수로 호출하게 되면 this :
    // window 전역 객체가 바인딩됨
    bar();
};

boj.foo();
```

- `콜백 함수` → `일반 함수로 호출`된다면
- ┗ `콜백 함수 내부 this` : `전역 객체가 바인딩`

> 어떤 함수라도 일반 함수 호출 → this에 전역 객체 바인딩

- 하지만 `메서드 내에서 정의한 중첩 함수` 또는
- ┣ `메서드에게 전달한 콜백 함수(보조 함수)`가
- ┣ 일반 함수로 호출 될 때 메서드 내의 중첩 함수, 콜백함수의
- ┗ `this` → `전역 객체를 바인딩` 하는 것은 `문제`가 있음

- `중첩`, `콜백` → `헬퍼 함수` 역할
- ┣ 외부 함수의 일반 로직을 대신하는 경우가 대부분
- ┗ `일반 함수의 호출은 이를 망침`

> 메서드 내부 중첩, 콜백 함수 this 바인딩 일치법

```js
var value = 1;

const obj = {
	value: 100,
	foo() {
		// this 바인딩(obj)를 변수 that에 할당
		const that = this;

		// 콜백 함수 내부에서 this 대신 that을 참조
		setTimeout(function () {
			console.log(that.value); // 100
		}, 100);
	},
};
obj.foo();
```

- 위 방법 이외에도 JS : this를 `명시적으로 바인딩` 할 수 있는
- ┣ 1. `Function.prototype.apply`
- ┣ 2. `Function.prototype.call`
- ┗ 3. `Function.prototype.bind`

```js
var value = 1;

const obj = {
	value: 100,
	foo() {
		// 콜백 함수에 명시적으로 this를 바인딩
		setTimeout(
			function () {
				console.log(this.value); // 100
			}.bind(this),
			100
		);
	},
};
obj.foo();
```

> 또는 화살표 함수를 사용해서 this 바인딩 일치 가능

```js
var value = 1;

const obj = {
	value: 100,
	foo() {
		setTimeout(() => console.log(this.value), 100); //100
	},
};
obj.foo();
```

### 22.2.2 메서드 호출

- 메서드 내부의 `this` : `메서드를 호출한 객체`
- ┣ 즉 : 메서드를 호출할 때
- ┣ 메서드 이름 앞의 `마침표(.)` 연산자 앞에 기술한 객체 바인딩
- ┣ 주의점 : 메서드 내부의 this는 메서드를 소유한 객체가 아닌
- ┗ `메서드를 호출한 객체에 바인딩` 된다는 점

```js
const person = {
	name: 'Lee',
	getName() {
		// 메서드 내부의 this : 메서드를 호출한 객체에 바인딩
		return this.name;
	},
};

// 메서드 getName을 호출한 객체 : person임
console.log(person.getName()); // Lee
```

- 위 에제의 `getName 메서드` : `person 객체의 메서드로 정의`
- ┣ `메서드` : `프로퍼티에 바인딩된 함수`
- ┣ person 객체의 `getName 프로퍼티가 가리키는 함수 객체` :
- ┣ `person 객체에 포함된 것이 아닌`
- ┗ → `독립적으로 존재`하는 `별도의 객체`

> getName 프로퍼티가 함수 객체를 가리키고 있을 뿐
> 메서드는 객체에 포함된 것이 아닌 독립적으로 존재하는 별도의 객체

- 따라서 `getName 프로퍼티가 가리키는 함수 객체`
- ┣ 즉 : `getName 메서드` → `다른 객체의 프로퍼티에 할당`하는 것
- ┣ `다른 객체의 메서드`가 될 수 도 있고
- ┗ `일반 변수로 할당`하여 `일반 함수로 호출 가능`

```js
const anotherPerson = {
	name: 'Kim',
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체 : anotherPerson임
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 잉ㄹ반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name
// ┗ 브라우저 환경에서 window.name과 같게 됨
// 브라우저에서의 window.name → 창 이름을 나타내는 빌트인 프로퍼티
// 기본값 : ''
// Node.js 환경에서 this.name : undefined임
```

- 따라서 `메서드 내부의 this` : 프로퍼티로 메서드를 가리키고 있는
- ┣ 객체와는 관계가 없고
- ┗ `메서드를 호출한 객체에 바인딩`됨

- `프로토타입 메서드 내부`에서 사용된 `this` :
- ┣ 일반 메서드와 마찬가지로 해당 메서드를 `호출한 객체`에
- ┗ `바인딩`되게 됨

```js
function Person(name) {
	this.name = name;
}

Person.prototype.getName = function () {
	return this.name;
};

const me = new Person('Lee');

// getName 메서들르 호출한 객체 : me
console.log(me.getName()); // 1. Lee

Person.prototype.name = 'Kim';

// getName 메서드를 호출한 객체 : Person.prototype
console.log(Person.prototype.getName()); // 2. Kim
```

- ┣ 1의 경우 `메서드를 호출한 객체는 me`임
- ┣ `getName 메서드 내부의 this는 me를 가리키며`
- ┗ `this.name`은 `'Lee'`임
- ┣ 2의 경우 getName 메서드를 호출한 객체 : Person.prototype임
- ┣ `Person.prototype`도 `객체`이며 `직접 메서드를 호출 가능`
- ┣ 따라서 `getName 메서드 내부`의 this는
- ┗ `Person.prototype`을 가리키며 this.name은 'Kim'임

### 22.2.3 생성자 함수 호출

- 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩

```js
// 생성자 함수
function Circle(radius) {
	// 생성자 함수 내부의 this는 생성자 함수가
	// 생성할 인스턴스를 가리킴
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

- 17.2 생성자 함수에서 보았듯
- ┣ `생성자 함수` : 이름 그대로 `객체(인스턴스)를 생성하는 함수`
- ┣ `일반 함수와 동일한 방법`으로 `생성자 함수를 정의`하고
- ┣ `new 연산자와 함께 호출`하면
- ┣ 해당 함수는 `생성자 함수로 동작`하게 됨
- ┣ 만약 new 연산자와 함께 생성자 함수를 호출 안하면
- ┗ 그냥 `일반 함수로 동작`하게 됨

```js
// new 연산자와 함께 호출하지 않으면
// 생성자 함수로 동작 X
// 일반적인 함수의 호출
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로
// 암묵적으로 undefined를 반환함
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킴
console.log(radius); // 15
```

### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

- `apply`, `call`, `bind` 메서드 :
- ┣ `Function.prototype`의 메서드
- ┗ 이들 메서드 : `모든 함수가 상속받아 사용 가능`

- `Function.prototype.apply`, `Function.prototype.call` 메서드 :
- ┣ `this로 사용할 객체`와 `인수 리스트를 인수`로 전달받아
- ┗ `함수를 호출`하게 됨

```js
Function.prototype.apply(thisArg[, argsArray]);

Function.prototype.call(thisArg[, arg1[, arg2[, ...]]]);
```

- 예제

```js
function getThisBinding() {
	return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서
// 인수로 전달할 객체를
// getThisBinding 함수의 this에 바인딩
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

- `apply, call 메서드의 본질적인 기능` :
- ┣ `함수를 호출`하는 것
- ┣ 함수를 호출하면서 `첫 번째 인수`로
- ┣ 전달한 특장 객체의 호출한 함수의
- ┗ `this를 바인딩`함

- `apply, call 메서드는 호출할 함수`에
- ┣ `인수를 전달하는 방식`만 다를 뿐
- ┣ `동일하게 동작`하게 됨
- ┣ ex) `호출할 함수 getThisBinding 함수`에
- ┣ `인수를 전달하지 않음`
- ┣ apply, call 메서드를 통해 `getThisBinding 함수`를
- ┗ `호출하면서 인수를 전달`

```js
function getThisBinding() {
	console.log(arguments);
	return this;
}

// this로 사용할 객체
const thisARg = { a: 1 };

// getThisBinding 함수를 호출하면서
// 인수로 전달할 객체를 getThisBinding 함수에 바인딩
// apply 메서드 : 호출할 함수의 인수를 배열로 묶어 전달
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
// {a : 1}

// call 메서드 : 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
// {a : 1}
```

- `apply 메서드` : `호출할 함수의 인수를 배열로 묶어 전달`
- ┣ `call 메서드` : `인수를 쉼표로 구분`한 `리스트 형식으로 전달`
- ┣ 이처럼 `apply와 call 메서드` : `호출할 함수에 인수를 전달 방식`만 다를 뿐
- ┗ `this로 사용할 객체`를 전달 → `함수를 호출하는 것은 동일`

```js
function convertArgsToArray() {
	console.log(arguments);

	// arguments 객체를 배열로 변환
	// Array.prototype.slice를 인수 없이 호출하면
	// ┗ 배열의 복사본을 생성하게 됨
	const arr = Array.prototype.slice.call(arguments);
	// const arr = Array.prototype.slice.apply(arguments);
	console.log(arr);

	return arr;
}
convertArgsToArray(1, 2, 3); // {1, 2, 3}
```

- 아직 배열에 대한 학습은 하지 않았음 → 추후에 설명

> Function.prototype.bind 메서드 : apply, call 메서드와는 달리
> 함수를 호출하지 않고 this로 사용할 객체만 전달

```js
function getThisBinding() {
	return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드 : 함수에 this로 사용할 객체를 전달
// bind 메서드 : 함수를 호출하지는 않음
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드 : 함수를 호출하지는 않으므로 명시적 호출
console.log(getThisBinding.bind(thisArg)()); // {a : 1}
```

- `bind 메서드` : `메서드의 this`, `내부의 중첩함수 또는 콜백함수`의
- ┗ this가 `불일치하는 문제 해결`!!!

```js
const person = {
	name: 'Lee',
	foo(callback) {
		// 1
		setTimeout(callback, 100);
	},
};

person.foo(function () {
	console.log(`Hi my name is ${this.name}`); // 2 Hi my name is
	// 일반 함수로 호출된 콜백 함수 : 브라우저환경 window.name
	// 브라우저 window.name 기본 값 : ''
	// Node.js 환경에서 this.name : undefined
});
```

> 이런 경우에 대해서 bind를 사용가능

```js
const person = {
	name: 'Lee',
	foo(callback) {
		// bind 메서드로 callback 함수 내부의 this 바인딩을 전달
		setTimeout(callback.bind(this), 100);
	},
};

person.foo(function () {
	console.log(`Hi! my name is ${this.name}`); // good work
});
```

> this 바인딩 동적 결정

| 함수 호출 방식                                                   | this 바인딩                                                                  |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 일반 함수 호출                                                   | 전역 객체                                                                    |
| 메서드 호출                                                      | 메서드를 호출한 객체                                                         |
| 생성자 함수 호출                                                 | 생성자 함수가 (미래에) 생성할 인스턴스                                       |
| Function.prototype.apply/call/bind <br/> 메서드에 의한 간접 호출 | Function.prototype.apply/call/bind 메서드에 <br/> 첫 번째 인수로 전달한 객체 |
