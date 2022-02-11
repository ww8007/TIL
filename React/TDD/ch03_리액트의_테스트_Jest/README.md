# 3. 리액트의 테스트 - Jest

## 목차

- [3. 리액트의 테스트 - Jest](#3-리액트의-테스트---jest)
  - [목차](#목차)
  - [3.1 Jest의 장점](#31-jest의-장점)
  - [3.2 프로젝트 준비](#32-프로젝트-준비)
  - [3.3 Jest 설치](#33-jest-설치)
  - [3.4 사용 방법](#34-사용-방법)
  - [3.5 Matcher](#35-matcher)
    - [3.5.1 toEqual : Obj 비교](#351-toequal--obj-비교)
    - [3.5.2 toBeTruthy, toBeFalsy : 참 / 거짓](#352-tobetruthy-tobefalsy--참--거짓)
    - [3.5.3 toContain : 배열 특정값 포함](#353-tocontain--배열-특정값-포함)
  - [3.6 코드 커버리지](#36-코드-커버리지)

## 3.1 Jest의 장점

- `Jest` : 페이스북에서 개발 관리
- ┣ JS 테스트 프레임워크로써 단숨한에
- ┣ `집중한 테스트 프레임워크임`
- ┗ Ts, Node, Angular, Vue에서도 사용 가능

1. 제로 설정

- 많은 테스트 프레임워크들이
- ┣ `테스트를 하기 위해 많은 설정을 해야함`
- ┣ 테스트에 `집중하지 못하는 단점을 보완`하기 위해
- ┗ 제로 설정을 지향하고 있음

2. 스냅샷

- ┣ 테스트하다 보면 `값을 일일이 확인하기 힘듬`
- ┣ `큰 JS Object가 존재`할 때가 있음
- ┣ Jest는 `이렇게 값 확인이 어려운 큰 Obj`
- ┣ `그대로 저장한 후 추후에 값이`
- ┣ 변경되면 에러를 표시하는 `스냅샷 기능을 제공`
- ┣ React는 이 스냅샷 기능을 통해
- ┗ `랜더링된 컴포넌트의 변경사항이 있는지 체크`

3. 모의 객체

- Jest는 쉽게 `모의 객체(Mocking)을 생성이 가능`
- ┣ 이를 통해 `테스트 범위를 벗어나는 객체들을`
- ┣ 간단하게 `모의 객체로 만듦으로써`
- ┣ `실제로 테스트해야 할 부분을 집중해서`
- ┗ `테스트 할 수 있게 함`

4. 테스트 코드의 분리

- Jest의 `테스트 코드는 완전히 분리되어 있음`
- ┣ 이렇게 분리된 테스는 동시에 실행할 수 있도록 함
- ┣ 따라서 분리된 테스트를 제공하는 Jest는
- ┣ `테스트 코드를 동시에 실행하여`
- ┣ `빠른 성능을 제공함`

4. 간단한 API

- Jest는 `쉽고 간단하게 테스트할 수 있는 뛰어난`
- ┣ API를 제공하고 있음
- ┣ 또한 `--coverage` 옵션을 통해
- ┗ `코드 커버리지(Code coverage)를 간단하게 확인` 가능

## 3.2 프로젝트 준비

> 설치

    mkdir jest-est
    yarn init -y

## 3.3 Jest 설치

> 설치

    yarn add jest

```json
"scripts": {
"test": "jest --watch"
},
```

> 사용법

    yarn test

## 3.4 사용 방법

> index.js

```js
const sum = (a, b) => {
	return a + b;
};

module.exports = {
	sum,
};
```

> index.test.js

```js
const { sum } = require('./index');

describe('test index.js file', () => {
	it('sums 1 + 2 to equal 3', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
```

- `describe` 함수 : Jest가 제공하는 함수
- ┣ `여러 테스트를 한 그룹으로 묶고`
- ┣ 설명을 붙이기 위해서 사용
- ┣ `첫 번째` 매개변수 : 명령 프롬프트에 표시할 `설명`
- ┣ `두 번째` 매개변수 : 여러 테스트를 그룹으로 묶은
- ┗ `콜백 함수`

- `it` 함수 : `실제 테스트가 실행`되는
- ┣ `테스트 명세를 작성`할 때 사용함
- ┣ `첫 번째` 매개변수 : `테스트 명세의 설명`
- ┗ `두 번째` 매개변수 : 실제 테스트 진행하는 `테스트 코드`

- `npm run test`로 Jest가 파일을 감시하고 있다가
- ┣ 변경되면 테스트를 다시 실행하도록
- ┣ `jest --watch` 명령어를 실행해 두었음
- ┣ 고로 파일을 작성하고 저장하면
- ┣ `Jest가 파일의 변경을 감시하고 자동으로 테스트 코드를 실행`
- ┗ 따라서 명령 프롬프트에 다음과 같이 출력

## 3.5 Matcher

- 3.4에서 toBe라는 Matcher를 사용하여
- ┣ 테스트 코드를 작성하였음
- ┣ Matcher는 Jest가 제공하는 함수로써
- ┗ `결과값을 비교하여 테스트의 성공 여부를 판단`

### 3.5.1 toEqual : Obj 비교

- `toEqual` : 오브젝트(Object)를 비교할 때 사용되는
- ┗ Matcher임

```js
const person = (name, age) => {
	return {
		name,
		age,
	};
};
// index.test.js
it('makes a person', () => {
	expect(person('Kim', 20)).toEqual({ name: 'Kim', age: 20 });
});
```

- JS에서는 Object의 내용이 같아도 다른 값으로 인식함
- ┣ 따라서 단순히 person 함수를 통해 생성한 값과
- ┣ `toEqual에서 사용한 값을 비교(===) 하면 다른 값이라고 판단함`
- ┣ 고로 `Jest에서 Object를 테스트 할 때는`
- ┣ `toEqual을 사용`하여 위와 같이 테스트 함
- ┣ `만약 이곳에 toBe를 사용하면 단순히 값을 비교하므로`
- ┗ 테스트를 통과하지 못함

### 3.5.2 toBeTruthy, toBeFalsy : 참 / 거짓

- `toBeTruthy, toBeFalsy`는
- ┣ `참 / 거짓 값(Boolean)`을 체크할 때 사용하는
- ┗ Matcher임

```js
const toggle = (a) => {
	return !a;
};

// test
it('returns false', () => {
	expect(toggle(true)).toBeFalsy();
	expect(toggle(true)).not.toBeTruthy();
});
```

### 3.5.3 toContain : 배열 특정값 포함

- Jest에서는 `배열(Array)에 특정값이 포함되어 있는지를`
- ┗ 확인할 때 `toContain을 사용함`

```js
const range = (start, end) => {
	let result = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
};

// test
it('contain 2', () => {
	expect(range(1, 3)).toContain(2);
});
```

## 3.6 코드 커버리지

- 테스트에서 `코드 커버리지(Code coverage)`
- ┣ 테스트 대상이 되는 소스 코드 중
- ┣ 테스트 코드를 검증된 코드의 비율을 의미
- ┣ `테스트 수행 결과를 정량적으로 나타내는 수치임`
- ┣ 코드 커버리지를 통해 테스트 코드가 얼마나
- ┣ 많은 소스 코드를 테스트 하고 있는지 나타내는지
- ┗ 중요한 지표 중 하나임

> test

    npx jest --coverage

```js
 PASS  ./index.test.js
  test index.js file
    ✓ sums 1 + 2 to equal 3 (1 ms)
    ✓ makes a person (1 ms)
    ✓ returns false
    ✓ contain 2

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.js |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.339 s, estimated 1 s
```
