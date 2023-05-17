# 개요

## 성공적인 프로그래밍

- 성공적인 프로그래밍을 위해 존재
- ┗ 사용성, 성능, 확작성, 기획 변경

## 함수형 프로그래밍

- 성공적인 프로그래밍을 위해
- ┣ 1. 부수 효과를 억제 → 순수 함수를 생성
- ┗ 2. 조합성을 강조 → 모듈화 수준을 높임

> 순수 함수

    언제나 동일한 결과 값을
    ┗ 반환하게 됨

> 모듈화 수준

    생산성이 높아짐

```js
// 아래 add가 순수 함수
function add(a, b) {
	return a + b;
}

console.log(add(10, 5)); // 15
console.log(add(10, 5)); // 15
console.log(add(10, 5)); // 15
```

```js
function add2(a, b) {
	return a + b + c;
}

// c가 상수로 존재하면 add2도 순수 함수

console.log(add(10, 2));
console.log(add(10, 3));
console.log(add(10, 4));
c = 20;
console.log(add2(10, 2));
console.log(add2(10, 3));
console.log(add2(10, 4));
// 이제 add2는 순수 함수가 아님

var c = 20;
console.log(c);
function add3(a, b) {
	c = b;
	return a + b;
}

// return 값으로 소통하는 것을 외에
// 외부에 다른 상태로 소통하는 존재가 있다면
// 이것은 순수 함수가 아님

console.log(c); // 부수 효과가 존재
console.log(add3(20, 30));
console.log(add3(20, 40));
console.log(add3(20, 50));

var obj1 = { val: 10 };

function add4(obj, b) {
	obj.val += b;
}

// 순수 함수가 아니고
// return 문도 존재하지 않음
// add4를 실행하고 나면은
// obj의 value 값이 변경되게 됨
```

- 의문점 :
- ┣ 그러면 함수형 프로그래밍은
- ┣ 값을 어떻게 변경하는가?
- ┣ `add4` 함수와 동일한 역할을 하지만
- ┣ 순수 함수를 생성

```js
var obj1 = { val: 10 };

function add4(obj, b) {
	return { val: obj.val + b };
}
var obj2 = add4(obj1, 20);
console.log(obj1.val);
console.log(obj2.val);
// 값을 참조만 할 뿐
// 변경을 하고 있지 않음
// 인자로 받은 상태를 변경 x
// → 언제나 동일한 결과를 반환함
```

## 순수 함수의 특징

- 모든 값들에 대한 변화를 일으키지 않고
- ┗ 값을 다뤄나가는 프로그래밍

- 중요한 특징 : `평가 시점`이 중요하지 않음
- ┗ 아주 중요한 개념 중 하나임

> 평가 시점

    언제나 동일한 값을 반환함
    ┗ 값에 대한 고민을 할 필요가 없음

- 순수 함수를 통해서 → `조합성을 강조`

### 일급 함수

- `함수를 값으로 다룰 수 있음`
- ┣ 함수 → 변수
- ┣ 1. 이 변수가 값으로 다뤄지고
- ┣ 2. 다른 함수에게 인자로 넘겨지고
- ┣ 3. 다른 함수가 실행이 가능하다는 것이
- ┗ `일급 함수의 조건`

> 원할 때 평가가 가능함

```js
// 변수에 함수를 할당이 가능함
var f1 = function (a) {
	return a * a;
};
console.log(f1);
```

```js
var f2 = add;
console.log(f2);
```

- `함수가 함수를 인자로 받을 수 있음`

```js
// 어떤 함수를 넘겼느냐에 따라서
// 값이 달라지게 됨
function f3(f) {
	return f();
}

// 서로 다른 값을 return 하게 됨
console.log(
	f3(function () {
		return 10;
	})
);
console.log(
	f3(function () {
		return 20;
	})
);
```

- add_maker 함수
- ┣ 1. `일급 함수`와
- ┗ 2. `클로져 개념`을 동시에 사용

- 아래 함수는 어느 시점에 평가를 하든
- ┣ `참조만 하고 변경을 하지 않기 때문에`
- ┣ 동일한 값을 return 한다는 점이 특징
- ┣ `함수를 → 값으로 다루면서`
- ┗ 어느 시점에도 동일한 값을 return 하는 것이 특징

```js
// 함수를 return 하는 함수
function add_maker(a) {
	// 아래 return 함수가 closure 임
	// 이 스코프에서 알고 있는
	// a라는 값을 참조하고 있기 때문에
	// a 라는 값을 기억하고 있음
	// 고로 클로저 개념임
	return function (b) {
		return a + b;
	};
}

var add10 = add_maker(10);

console.log(add10(20));
```

```js
var add5 = add_maker(10);
var add15 = add_maker(15);

console.log(add5(10));
console.log(add10(10));
```

```js
function f4(f1, f2, f3) {
    return f3(f1() + f2());
}

console.log(f4(
    function() {return 2;}
    function() {return 1;}
    function(a) {return a * a;}
));
```

- 위와 같이 형태를 보여주는 것이 특징
- ┣ 함수가 함수를 인자로 받아서
- ┣ 순수 함수들을 만들고
- ┗ `순수 함수들을 사용하는 것이 함수형 프로그래밍`

- `비동기 일어나는 시점`
- ┣ 동시성이 필요한 시점에서
- ┣ `함수를 값으로 다루다가`
- ┗ `원하는 시점에서 평가`

- `for문을 실행`하면서
- ┣ 특정한 시점에 받아둔 함수를
- ┗ `여러번 실행이 가능함`

## 현재 트랜드

- 재미/실시간성
- ┣ `독창성/ 완성도`
- ┗ `더 많아져야 하는 동시성`

- 하드웨어 성능이 좋아지고
- ┣ `컴파일러 성능`이 좋아지고
- ┣ 함수형 프로그래밍 기술
- ┣ 좋아지는 분산 / 리액티브 환경
- ┣ 동시성 병렬성 관련 기술
- ┗ `성공적인 적용 사례와 영향`

- `함수형 프로그래밍` :
- ┣ 애플리케이션, 함수의 구성요소
- ┣ 더 나아가서 언어 자체를 함수처럼
- ┣ `만들고 함수개념을 가장 우선순위를 놓음`

- ┣ 함수형 사고 방식 :
- ┣ 문제의 해결 방법을
- ┗ `동사(함수)들고 구성(조합)하는 것`

```js
// 객체 기준
duck.moveLeft();
duck.moveRight();

// 함수 기준
moveLeft(dog);
moveRight(duck);
```

- 함수를 만들어 놓고
- ┣ 그것에 맞게 데이터를 집어 넣으면
- ┗ `함수가 동작 하도록 설정`
