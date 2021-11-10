# 36. 디스트럭처링 할당

- `디스트럭처링 할당(destructuring assignment)`
- ┣ 구조 분해 할당 : 배열과 같은
- ┣ 이터러블, 객체를
- ┣ `destructing(비구조화, 구조 파괴)하여`
- ┣ `1개 이상의 변수에 개별적으로 할당하는 것을 말함`
- ┣ 배열과 같은 이터러블 또는 객체 리터럴에서
- ┗ 필요한 값만 추출하여 변수에 할당할 때 유용함

## 목차

- [36. 디스트럭처링 할당](#36-%EB%94%94%EC%8A%A4%ED%8A%B8%EB%9F%AD%EC%B2%98%EB%A7%81-%ED%95%A0%EB%8B%B9)
  - [36.1 배열 디스트럭처링 할당](#361-%EB%B0%B0%EC%97%B4-%EB%94%94%EC%8A%A4%ED%8A%B8%EB%9F%AD%EC%B2%98%EB%A7%81-%ED%95%A0%EB%8B%B9)
  - [36.2 객체 디스트럭처링 할당](#362-%EA%B0%9D%EC%B2%B4-%EB%94%94%EC%8A%A4%ED%8A%B8%EB%9F%AD%EC%B2%98%EB%A7%81-%ED%95%A0%EB%8B%B9)

## 36.1 배열 디스트럭처링 할당

- ES5에서 구조화된 배열을 디스트럭처링하여
- ┣ 1개 이상의 변수에 할당하는 방법은
- ┗ 다음과 같음

```js
// ES5
var arr = [1, 2, 3];

var one = arr[0];
var two = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3
```

- ES6의 배열 디스트럭처링 할당 :
- ┣ 배열의 각 요소를 배열로부터 추출하여
- ┣ 1개 이상의 변수에 할당함
- ┣ `배열 디스트럭처링의 할당의 대상` :
- ┣ `이터러블이어야 하며`
- ┣ `할당 기준 : 배열의 인덱스임`
- ┗ → `순서대로 할당 된다는 말`

```js
const arr = [1, 2, 3];

// ES6 배열 디스트럭처링 할당
// 변수 one, two, three를 선언하고
// 배열 arr을 디스트럭처링하여 할당함
// 이때 할당 기준 : 배열의 인덱스
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

- 배열 디스트럭처링 할당 위해서 :
- ┣ 할당 연산자 왼쪽에 값을 할당받을
- ┣ 변수를 선언해야 함
- ┗ `이때 변수를 배열 리터럴 형태로 선언함`

```js
const [x, y] = [1, 2];
```

> 이때 우변 : 이터러블을 할당하지 않으면
> 에러가 발생함

```js
const [x, y]; // SyntaxError
const [a, b] = {}; // TypeError
```

- 배열 디스트럭처링 할당의
- ┣ `변수 선언문 : 다음처럼 선언과 할당을`
- ┣ `분리가 가능함`
- ┣ 이 경우 const 키워드로 변수를 선언할 수 없으므로
- ┗ `권장하지 않음`

```js
let x, y;
[x, y] = [1, 2];
```

- 배열 디스트럭처링 할당의 기준 :
- ┣ 배열의 인덱스임
- ┣ 즉 : 순서대로 할당됨
- ┣ 이때 `변수의 개수와 이터러블의 요소 개수가`
- ┗ `반드시 일치할 필요는 없음`

```js
const [a, b] = [1, 2];
console.log(a, b); // 1 2

const [c, d] = [1];
console.log(c, d); // 1 undefined

const [e, f] = [1, 2, 3];
console.log(e, f); // 1 2

const [g, , h] = [1, 2, 3];

console.log(g, h); // 1 3
```

> 배열 디스트럭처링 할당을 위한 변수에
> 기본값을 설정이 가능함

```js
// 기본값
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 1 2 3

// 기본값으로 할당된 값이 우선함
const [e, f = 10, g = 3] = [1, 2];
console.log(e, f, g); // 1 2 3
```

- 배열 디스트럭처링 할당 :
- ┣ 배열과 같은 이터러블에서
- ┣ `필요한 요소만 추출하여 → 변수에 할당하고`
- ┣ 싶을 때 유용함
- ┣ 다음 예제 URL 파싱하여
- ┣ protocol, host, path 프로퍼티 갖는 객체
- ┗ 생성해 반환

- 배열 디스트럭처링 할당을 위한 변수에
- ┣ Rest 파라미터와 유사하게 `Rest 요소(Rest Element)`
- ┣ 사용이 가능함
- ┣ `Rest 요소` : Rest 파라미터와 마찬가지로
- ┗ `반드시 마지막에 위치해야 함`

```js
// Rest 요소
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 , [2, 3]
```

## 36.2 객체 디스트럭처링 할당

- ES5에서 객체의 각 프로퍼티를
- ┣ 객체로부터 디스트럭처링하여
- ┣ 변수에 할당하기 위해서는
- ┗ `프로퍼티 키를 사용해야 함`

```js
// ES5
var user = { firstName: 'Jang', lastName: 'Hyun' };

var firstName = user.firstName;
var lastName = user.lastName;
```

- ES6의 객체 디스트럭처링 할당 :
- ┣ 객체의 각 프로퍼티를 객체로부터 추출하여
- ┣ 1개 이상의 변수에 할당
- ┣ 이때 객체 디스트럭처링 할당의 대상(할당문의 우변) :
- ┣ 객체이어야 하며
- ┣ `할당 기준 : 프로퍼티 키임`
- ┣ `즉 순서는 의미가 없으며 선언된 변수 이름과`
- ┗ `프로퍼티 키가 일치하면 할당됨`

```js
const user = { firstName: 'Jang', lastName: 'Hyun' };

// ES6 객체 디스트럭처링 할당
// 변수 lastName, firstName을 선언하고
// user 객체를 디스트럭처링하여 할당함

// 이때 프로퍼티 키를 기준으로
// 디스트럭처링 할당이 이루어짐
// 순서는 의미가 없음
const { firstName, lastName } = user;
console.log(firstName, lastName);
```

- 위 예제에서 객체 리터럴 형태로 선언한 변수 :
- ┣ lastName, firstName임
- ┗ `이는 프로퍼티 축약 표현을 통해 선언한 것`

```js
const { lastName, firstName } = user;
// 위와 아래는 동치다
const { lastName: lastName, firstName: firstName } = user;
```

- `따라서 객체의 프로퍼티 키와 `
- ┣ 다른 변수 이름으로 프로퍼티 값을 할당
- ┣ 받기 위해서는
- ┗ `다음과 같이 변수를 선언함`

```js
const user = { firstName: 'Jang', lastName: 'Hyun' };

// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어짐
// 프로퍼티 키가 lastName인 프로퍼티 값을 ln에 할당
// 프로퍼티 키가 firstName인 프로퍼티 값을 fn에 할당
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Jang Hyun
```

- 객체 디스트럭처링 할당을 위한 변수에
- ┗ `기본값을 설정 가능함`

```js
const {firstName: 'Jang', lastName} = {lastName: 'Hyun'};
console.log(firstName, lastName); // Jang Hyun

const {firstName: fn, lastName: ln} = {lastName: 'Hyun'}
console.log(fn, ln); // Jang Hyun
```

- `객체 디스트럭처링 할당` :
- ┣ 객체에서 프로퍼티 키로 필요한
- ┣ `프로퍼티 값만 추출하여 변수에`
- ┗ `할당하고 싶을 때 유용함`

```js
const str = 'Hello';
// String 래퍼 객체로부터 length 프로퍼티만
// 추출해옴
const { length } = str;
console.log(length); //5

const todo = { id: 1, content: 'HTML', completed: true };
// todo 객체로부터 id 프로퍼티만 추출
const { id } = todo;
console.log(id); // 1
```

- 객체 디스트럭처링 할당 :
- ┣ `객체를 인수로 전달받는 함수의`
- ┗ `매개변수에도 사용이 가능함`

```js
function printTodo(todo) {
	console.log(
		`할일 ${todo.content}은 ${todo.completed ? '완료' : '미완료'} 상태 입니다.`
	);
}

printTodo({ id: 1, content: 'HTML', completed: true }); // 할일 HTML은 완료 상태 입니다.
```

- 위 예제에서 객체를 인수로 전달받는 매개변수
- ┣ todo에 객체 디스트럭처링 할당을 사용하면
- ┗ 좀 더 간단하고 가독성 좋게 표현 가능함

```js
function printTodo({ content, completed }) {
	console.log(
		`할일 ${todo.content}은 ${todo.completed ? '완료' : '미완료'} 상태 입니다.`
	);
}
```

- 배열의 요소가 객체인 경우 :
- ┣ `배열 디스트럭처링 할당과`
- ┣ `객체 디스트럭처링 할당을`
- ┗ `혼용이 가능함`

```js
const todos = [
	{ id: 1, content: 'HTML', completed: true },
	{ id: 2, content: 'CSS', completed: false },
	{ id: 3, content: 'JS', completed: false },
];

// todos 배열의 두 번째 요소인 객체로부터
// id 프로퍼티만 추출함
const [, { id }] = todos;
console.log(id); // 2
```

- 중첩 객체의 경우 : 다음과 같이 사용

```js
const user = {
	name: 'Jang',
	address: {
		zipCode: 03068,
		city: 'Seoul',
	},
};

// address 프로퍼티 키로 객체를 추출하고
// 이 객체의 city 프로퍼티 키로
// 값을 추출함
const {
	address: { city },
} = user;
console.log(city); // 'Seoul'
```

- 객체 디스트럭처링 할당을 위한 변수에
- ┣ Rest 파라미터나 Rest 요소에 유사하게
- ┣ `Rest 프로퍼티 ...`을 사용이 가능함
- ┗ `Rest 프로퍼티 : 마지막에 위치해야 함`

```js
// Rest 프로퍼티
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 {y:2, z:3}
```

- Rest 프로퍼티 : 스프레드 프로퍼티와 함께
- ┣ `21년 1월 TC39 프로세스의 stage 4(Finished)에`
- ┗ 제안되어 있음
