# 43. Ajax

## 목차

- [43. Ajax](#43-ajax)
  - [목차](#목차)
  - [43.1 Ajax란?](#431-ajax란)
  - [43.2 JSON](#432-json)
    - [43.2.1 JSON 표기 방식](#4321-json-표기-방식)
    - [43.2.2 JSON.stringify](#4322-jsonstringify)
    - [43.2.3 JSON.parse](#4323-jsonparse)
  - [43.3 XMLHttpRequest](#433-xmlhttprequest)

## 43.1 Ajax란?

- `Ajax(Asynchronous JavaScript and XML)` :
- ┣ JS를 사용하여 브라우저가 서버에게
- ┣ 비동기 방식으로 데이터를 요청하고
- ┣ 서버가 응답한 데이터를 수신하여
- ┣ 웹 페이지를 동적으로 갱신하는
- ┣ 프로그래밍 방식을 의미함
- ┣ Ajax는 브라우저에서 제공하는
- ┣ `Web API인 XMLHttpRequest 객체를 기반`으로
- ┣ 동작하게 됨
- ┣ `XMLHttpRequest` : HTTP 비동기 통신을 위한
- ┗ `메서드와 프로퍼티를 제공함`

- 99년 MS가 개발한
- ┣ XMLHttpRequest는 그다지 큰 주목을 받지
- ┣ 못하다가 구글 맵스의 활약으로
- ┗ 대중의 눈에 띄게됨

- 이전의 웹 페이지 : html 태그로 시작해서
- ┣ html 태그로 끝나는 완전한
- ┣ HTML을 서버로부터 전송받아
- ┣ 웹 페이지 전체를 처음부터 다시 랜더링하는
- ┣ 방식으로 동작했음
- ┣ `따라서 화면이 전환되면 서버로부터`
- ┗ `새로운 HTML을 전송받아 전체를 다시 렌더링함`

> 단점도 당연히 존재함

1. 이전 웹페이지와 차이가 없어도 계속 새로 랜더링함

2. 변경할 필요가 없는 부분까지 처음부터 다시 렌더링

- ┗ 화면 깜빡이는 현상 발생

3. 클라이언트, 서버가 동기적으로 동작

- ┗ 서버 응답까지 블로킹됨

- Ajax 등장 : 이전의 전통적인 패러다임을
- ┣ 획기적으로 전환했음
- ┣ 즉 : 서버로부터 웹페이지의 변경에
- ┣ `필요한 데이터만 비동기 방식으로 전송받아`
- ┣ `웹페이지를 변경할 필요가 없는 부분은 `
- ┗ `재 렌더링을 하지 않아 퍼포먼스 향상됨`

## 43.2 JSON

- `JSON(JavaScript Object Notation)` :
- ┣ 클라이언트와 서버 간의 HTTP 통신을 위한
- ┣ `텍스트 데이터 포맷임`
- ┣ JS에 종속되지 않는 언어 독립형 데이터 포맷
- ┗ 다양한 프로그래밍 언어에서 사용이 가능함

### 43.2.1 JSON 표기 방식

- JSON : JS의 객체 리터럴과 유사하게
- ┣ 키와 값으로 구성된 순수한 텍스트임
- ┗ `JSON 키의 경우 반드시 큰 따옴표로 묶어야함`

- 값 : 객체 리터럴과 같은 표기법을 그대로 사용 가능

```json
{
	"name": "Jang",
	"age": 26,
	"alive": true
}
```

### 43.2.2 JSON.stringify

- `JSON.stringfy` 메서드 :
- ┣ 객체를 JSON 포맷의 문자열로 변환함
- ┣ 클라이언트가 서버로 객체를 전송하기
- ┣ 위해서는 `객체를 문자열화 해야 하는데`
- ┗ 이를 `직렬화(serializing) 라고 함`

```js
const obj = {
	name: 'jang',
	age: 26,
};

const json = JSON.stringfy(obj);

// 객체를 JSON 포맷의 문자열로 변환하면서
// 들여쓰기 함
const prettyJson = JSON.stringfy(obj, null, 2);

// replacer 함수 :
// 값의 타입이 Number이면 필터링되어
// 반환되 않음
function filter(key, value) {
	// undefined 반환하지 않음
	return typeof value === 'number' ? undefined : value;
}

// JSON.stringfy 메서드에 두 번째 인수로
// replacer 함수를 전달함
const strFilteredObject = JSON.stringfy(obj, filter, 2);
```

> JSON.stringfy 메서드

    객체뿐만 아닌
    ┣ 배열도 JSON 포맷의
    ┗ 문자열로 변환함

### 43.2.3 JSON.parse

- JSON.parse 메서드 :
- ┣ JSON 포맷의 문자열을 객체로 변환함
- ┣ 서버로부터 클라이언트에게 전송된
- ┣ JSON 데이터 : 문자열임
- ┣ `이를 사용하기 위해서`
- ┗ `역직력렬화(deserialize) 과정을 거침`

```js
const obj = {
	name: 'jang',
	age: 26,
};

const json = JSON.stringfy(obj);

const parsed = JSON.parse(json);
```

> 배열 또한 동일하게 배열 객체로 변환됨

## 43.3 XMLHttpRequest

- 브라우저 : 주소창이나 HTML의 form 태그
- ┣ 또는 a 태그를 통해 HTTP 요청 전송 기능을
- ┣ 기본 제공함
- ┣ JS를 사용하여 HTTP 요청을 전송하려면
- ┣ XMLHttpRequest 객체를 사용함
- ┣ `Web API인 XMLHttpRequest 객체 :`
- ┣ `HTTP 요청과 HTTP 응답 수신을 위한 다양한 `
- ┗ `메서드와 프로퍼티를 제공함`

```js
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();
```
