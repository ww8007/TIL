# 8 제어문

- 제어문은(control flow statement)은 조건에 따라 코드 블럭을 실행(조건문)
- ┣ 또는 반복 실행(반복문)할 때 사용
- ┣ 일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행됨
- ┗ 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어 가능

- 하지만 코드의 실행 순서가 변경된다는 점은
- ┣ 직관적으로 코드의 흐름을 혼란스럽게 만듬
- ┣ 제어문은 코드 흐름을 어렵게 만들어 가독성을 해치는 단점
- ┗ forEach, map, filter 같은 고차 함수들이 이를 해결하려고 노력

## 8.1 블록문

- 블록문(block statement, compound statement)는 0개 이상의 문을
- ┣ 괄호로 묶은 것
- ┣ 코드 블록 또는 블록이라고 부르기도 함
- ┗ JS 블록문은 하나의 실행 단위로 취급

- 블록문은 단독으로 사용할 수 있으나
- ┗ 일반적으로 제어문이나 함수를 정의할 때 사용하는 것이 일반적

> 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 가짐

- 블록문의 끝에는 세미콜론을 붙이지 않음

## 8.2 조건문

- 조건문(compound statement)은 주어진 조건식(conditional expression)의
- ┣ 평가 결과에 따라 코드 블록(블록문)의 실행을 결정
- ┗ 조건식은 불리언 값으로 평가될 수 있는 표현식

### 8.3.1 if... else 문

- if ... else 문은 주어진 조건식(불리언 값으로 평가 가능)의 평가결 결과
- ┣ 논리적 참 또는 거짓에 따라 실행할 코드 블럭을 선택
- ┗ 조건식 true → if , false → else

- if 문의 조건식은 불리언 값으로 평가되야 함
- ┣ if 문의 조건식이 불리언 값이 아닌 값으로 평가되면
- ┗ JS 엔진에 의해 암묵적으로 불리언 `값으로 변환` 실행할 코드 블럭 결정하게 됨

> if, else, else if

    else, else if문은 사용해도 되고 사용하지 않아도 된다.

> if ... else 문은 삼항 조건 연산자로 바꿔 쓸 수 있음

```js
// x가 짝수이면 짝수 홀수이면 문자열 홀수를 할당
var x = 2;

// 0은 false로 취급
var result = x % 2 ? '홀수' : '짝수';
console.log(result); //짝수
```

> 경우의 수가 3가지인 경우 이렇게 표현 가능

```js
var num = 2;
// 0은 false로 취급

var kind = num ? (num > 0 ? '양수' : '음수') : '영';
console.log(kind);
```

- num > 0 ? '양수' : '음수'는 표현식
- ┣ 즉 `삼항 조건 연산자`는 `값으로 평가되는 표현식`을 만듬
- ┣ `삼항 조건 연산자` 표현식은 값처럼 사용할 수 있기 때문에 변수에 할당 가능
- ┣ `if ... else` 문은 표현식이 아닌 문
- ┗ `if ... else` 문은 값처럼 사용할 수 없기 때문에 변수에 할당 불가

> 단순히 값을 결정하여 변수에 할당은 삼항 조건 연산자가 좋음

### 8.2.2 switch 문

- `switch` 문은 주어진 표현식을 평가여 그 값과 일치하는 표현식을 갖는
- ┣ `case` 문으로 실행 흐름을 옮김
- ┣ `case` 문은 상황(`case`)를 의미하는 표현식을 지정하고
- ┣ 콜론을 이용해서 마치게됨
- ┗ 그 뒤에 실행할 문들을 위치시키게 됨

- `switch` 문의 표현식과 일치하는 `case` 문이 없다면
- ┣ 실행 순서는 `default` 문으로 이동하게 됨
- ┣ `default` 문은 선택사항
- ┗ 사용해도 되고 사용하지 않아도 괜찮음

- if ... else 문의 경우 → 값이 불리언
- ┗ `switch` 문의 경우 → 문자열, 숫자 값인 경우가 많음

- if, else : 논리적인 참, 거짓으로 실행할 코드 블럭을 결정
- ┗ `switch` : 다양한 상황(`case`)에 따라 실행할 코드 블록을 결정할 때 사용

- `switch` 문의 표현식
- ┣ month 변수의 평가 결과인 숫자 값 11과 일치하는
- ┗ `case` 문으로 실행 흐름이 이동

> `switch`문을 사용하였지만 break 문을 사용하지 않아서 생기는 오류를

    `폴스루` fall through 라고 함

- default 문에는 break 문을 생략하는 것이 일반적
- ┗ default 문이 맨 마지막에 위치하여 실행이 종료되면 `switch` 문 빠져나감

- break 문을 생략한 `폴스루`가 유용한 경우도 존재
- ┗ `case` 여러 문을 하나의 조건으로 사용 가능

```js
var year = 2000;
var month = 2;
var days = 0;

switch (month) {
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:
		days = 31;
		break;
	case 4:
	case 6:
	case 9:
	case 11:
		days = 30;
		break;
	case 2:
		days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
}
```

- switch 문은 case, default, break 등 다양한 키워드를 사용해야 하고
- ┣ `폴스루`가 발생하는 등 문법이 복잡
- ┣ C 언어를 기반으로 하는 프밍 언어 (C-family)는 대부분 switch 문을 지원하지만
- ┗ 파이썬 같이 switch 문을 지원하지 않는 경우도 존재

## 8.3 반복문

- 반복문(loop statement)은 조건식의 결과가 참인 경우
- ┣ 코드 블럭을 실행하게 됨
- ┣ 그 후 조건식을 다시 평가하여
- ┣ 여전히 참 → 코드 블럭 다시 실행
- ┗ 이는 조건식이 거짓 일 때 까지 반복

> JS의 경우 세 가지 반복문인 for문, while문, do ...while문을 제공

- 반복문 대체할 수 있는 기능
- ┣ JS에서 배열을 순회할 때 사용하는 : `forEach` 메서드
- ┣ 객체의 프로퍼티 열거할 때 사용하는 : `for...in`문
- ┣ ES6에서 도입된 이터러블 순회 : `for ...of`문
- ┗ 이와 같은 다양한 기능 제공

### 8.3.1 for문

- for 문은 조건식이 거짓으로 평가될 때 까지 코드 블록을 반복 실행
- ┗ `매우 중요한 요소`

```js
for (var i = 0; i < 2; i++) {
	console.log(i);
}
```

- for문의 변수 선언문, 조건식, 증감식은
- ┗ 모두 옵션이기 때문에 반드시 사용할 필요 없음

> 하지만 무한 루프가 되지 않기 위해서는 주의 필요

```js
for (;;) {}
```

### 8.3.2 while 문

- while 문은 주어진 조건식의 평가 결과가 참이면
- ┣ 코드 블록을 계속해서 반복 실행하게 됨
- ┣ for 문 : 반복 횟수가 `명확`할 때 주로 사용
- ┗ while 문 : 반복 횟수가 `불명확` 할 때 주로 사용

- while 문의 경우 조건문의 평가 결과가 거짓이 될 경우
- ┣ 코드 블록을 실행하지 않고 종료하게 됨
- ┣ 만약 조건식의 평가 결과가 불리언 값이 아니면
- ┗ 불리언 값으로 강제 변환하여 논리적 참, 거짓을 구분

> while문도 무한 루프에 대한 우려를 하면서 진행

    무한루프 탈출하려면 코드 블럭 내에 if 문으로 탈출조건
    `break` 문으로 코드 블록을 탈출

```js
var count = 0;

while (true) {
	console.log(count);
	count++;
	// count가 3이면 코드 블록을 탈출
	if (count === 3) break;
}
```

### 8.3.3 do ...while 문

- do ...while 문은 코드 블록을 먼저 실행하고
- ┣ 조건식을 평가하게 됨
- ┗ 코드 블록은 `무조건 한 번 이상 실행`되는 점이 특징!!!

```js
var count = 0;

do {
	console.log(count);
	count++;
} while (count < 3);
```

## 8.4 break 문

- switch 문과 while 문에서 보았듯 break 문은 코드 블럭을 탈출
- ┣ 좀 더 정확하게 말하자면 코드 블럭을 탈출하는 것이 아닌
- ┣ 레이블 문, 반복문(`for`, `for...in`, `for...of`, `while`, `do...while`)
- ┣ 또는 switch 문의 코드 블록을 탈출
- ┗ 만약 다른 문에서 break를 이용해서 탈출 시도시 → Syntax Error

```js
if (true) {
    break; // Syntax Error
}
```

> 레이블 문(label statement)이란 식별자가 붙은 문을 말함

```js
// foo 라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');
```

- 레이블 문은 실행 순서를 제어하는 데 사용
- ┣ 사실 switch 문의 case 문과 default 문도 레이블 문
- ┗ 레이블 문을 탈출하기 위해서는 break 문에 레이블 식별자를 지정

```js
foo: {
	console.log(1);
	break foo; // foo 레이블 블록문 탈출
	console.log(2); // 2는 무시됨
}
console.log('Done!');
```

- 중첩된 for 문의 `내부 for 문`에서
- ┣ `break 문`을 실행하면 → `내부 for문 탈출`하여 → 외부 for문 진입
- ┗ 이 때 내부 for 문이 아닌 `외부 for문` 탈출 → `레이블 문 사용`

```js
outer: for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		// i + j === 3 인 경우 outer라는 식별자가 붙은 레이블 for 문을 탈출
		if (i + j === 3) break outer;
		console.log(`inner [${i}, ${j}]`);
	}
}

console.log('Done');
```

- 레이블 문은 중첩된 for문을 빠져나가는데 특화!!!
- ┣ 다른 경우에 대해서 사용은 권장하지 않음
- ┗ 오히려 흐름이 복잡해 지고 가독성이 나빠짐

- break 문은 레이블 문뿐 아니라 switch 문에서도 사용 가능
- ┣ 이 경우에는 break 문에 레이블 식별자를 저장하지 않음
- ┗ break 문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복 회피 가능

> 문자열에서 특정 문자 인덱스(위치) 검색 예시

```js
var string = 'Hello world';
var search = 'l';
var index;

// 문자열은 유사 배열이기 때문에 for문으로 순회 가능
for (var i = 0; i < string.length; i++) {
	if (string[i] === search) {
		index = i;
		break; // 반복문 탈출
	}
}

console.log(index);
```

## 8.5 continue 문

- continue 문은 반복문의 코드 블록 실행을
- ┣ 현 지점에서 중단하고
- ┣ 반복문의 증감식으로 실행 흐름을 이동시킴
- ┗ break 문처럼 반복문을 탈출하지는 않음

```js
// continue 문 사용하지 않으면 if 문 내에서 코드 작성
for (var i = 0; i < string.length; i++) {
	// 'l'이면 카운트를 증가
	if (string[i] === search) {
		count++;
	}
}

// continue 문을 사용하면 if 바깥에서 코드 작성 가능
for (var i = 0; i < string.length; i++) {
	// 'l'이면 카운트를 증가
	if (string[i] === search) continue; // for문 하나를 증가 시키기 때문에 무관

	count++;
}
```
