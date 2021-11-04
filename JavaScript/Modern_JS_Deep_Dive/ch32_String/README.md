# 32. String

- 표준 빌트인 객체인 String : 원시 타입인 문자열을 다룰 때
- ┗ 유용한 프로퍼티와 메서드를 제공함

## 32.1 String 생성자 함수

- `표준 빌트인 객체`인 `String 객체는`
- ┣ `생성자 함수 객체임`
- ┣ 따라서 : new 연산자와 함께 호출하여
- ┗ `String 인스턴스를 생성이 가능함`

- String 생성자 함수에 인수를 전달하지 않고
- ┣ new 연산자와 함께 호출하면
- ┣ [[StringData]] 내부 슬롯에
- ┗ 빈 문자열을 할당한 `String 래퍼 객체를 생성함`

```js
const strObj = new String();
console.log(strObj); // String {length: 0, [[PrimitiveValue]]: ""}
```

- 위 예제를 크롬 브라우저에서 실행해보면
- ┣ [[PrimitiveValue]]라는 접근할 수 없는 프로퍼티가 보임
- ┣ 이는 [[StringData]] 내부 슬롯을 가리킴
- ┗ ES5 에서는 [[StringData]] → [[PrimitiveValue]] 라고 불렀음

- `String 생성자 함수의 인수로 문자열을 전달하면서`
- ┣ new 연산자와 함께 호출하게 되면
- ┣ [[StringData]] 내부 슬롯에 인수로 전달받은 문자열을
- ┗ 할당한 `String 래퍼 객체를 생성함`

```js
const strObj = new String('Lee');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length :3, [[PrimitiveValue]] : "Lee"}
```

- 11.1.2 문자열에 불변성에서 보았듯
- ┣ String 래퍼 객체 : 배열과 마찬가지로
- ┣ `length 프로퍼티와 인덱스를 나타내는`
- ┣ 숫자 형식의 `문자열을 프로퍼티 키`로
- ┣ 각 문자를 `프로퍼티 값으로 갖는`
- ┣ `유사 배열 객체이면서 이터러블임`
- ┣ 따라서 → 배열과 유사하게 인덱스를 사용하여
- ┗ 각 문자에 접근이 가능

```js
console.log(strObj[0]); // L
```

- 단 : 문자열은 `원시 값`이기 대문에 변경할 수 없음
- ┗ 변경하더라도 오류는 안나고 변경이 안됨

```js
// 문자열은 원시 값이므로 변경이 불가능함
// 이때 에러가 발생하지 않음
strObj[0] = 'S';
console.log(strObj); // Lee
```

- String 생성자 함수의 인수로
- ┣ 문자열이 아닌 값을 전달하게 되면
- ┣ `인수를 문자열로 강제 변환한 후`
- ┣ [[StringData]] 내부 슬롯에 변환된 문자열을
- ┗ `할당한 String 래퍼 객체를 생성함`

```js
const strObj = new String(123);
console.log(strObj);
// String {0: "1", 1: "2", 2: "3", length: 3, [[PrimitiveValue]] : "123"}

strObj = new String(null);
console.log(strObj);
// String {0: "n", 1: "u", 2: "l", 3: "l", length: 4, [[PrimitiveValue]]: null}
```

- 9.3절 명시적 타입 변환에서 살펴보았듯
- ┣ new 연산자를 사용하지 않고
- ┣ `String 생성자 함수를 호출`하면
- ┣ String 인스턴스가 아닌 `문자열을 반환함`
- ┗ 이를 이용하여 → `명시적으로 타입을 변환하기도 함`

```js
// 숫자타입 → 문자열 타입
String(1); // "1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"

// 불리언 타입 → 문자열 타입
String(true); // "true"
```

## 32.2 length 프로퍼티

- length 프로퍼티 : 문자열의 개수를 반환함

```js
'Hello'.length; // 5
'안녕하세요!'.length; // 6
```

- String 래퍼 객체는 배열과 마찬가지로
- ┣ length 프로퍼티를 가짐
- ┣ 그리고 `인덱스를 나타내는 숫자` :
- ┣ `프로퍼티 키`로
- ┣ `각 문자` : `프로퍼티 값`으로 가지므로
- ┗ String 래퍼 객체는 `유사 배열 객체임`

## 32.3 String 메서드

- 배열에는 원본 배열(배열 메서드를 호출한 배열)을
- ┣ 직접 변경하는 메서드 (mutator method)와
- ┣ 원본 배열을 직접 변경하지 않고 새로운 배열을 반환하는
- ┗ (accessor method)가 있음

- 하지만 String 객체에는 원본 String 래퍼 객체를
- ┣ 직접 변경하는 메서드는 존재하지 않음
- ┣ 즉 : `String 객체의 메서드`는
- ┣ 언제나 `새로운 문자열을 반환함`
- ┣ 문자열 : `변경 불가능한(immutable)한 원시 값` 이므로
- ┗ `String 래퍼 객체도 읽기 전용(read only)` 객체로 제공됨

### 32.3.1 String.prototype.indexOf

- indexOf 메서드 : 대상 문자열(메서드를 호출한 문자열)에서
- ┣ 인수로 전달받은 문자열을 검색하여
- ┣ `첫 번째 인덱스를 반환함`
- ┗ `검색에 실패하면 → -1을 반환함`

```js
const str = 'Hello World';

// 문자열 str에서 'l'을 검색하여
// 첫 번째 인덱스를 반환함
str.indexOf('l'); // 2

// 문자열 str에서 'or'를 검색하여
// 첫 번째 인덱스를 반환함
str.indexOf('or'); // 7
```

- indexOf 메서드의 2번째 인수로 검색을 시작할
- ┗ 인덱스를 전달이 가능함

```js
// 문자열 str의 인덱스 3부터 'l'을 검색하여
// 첫 번째 인덱스를 반환함
str.indexOf('l', 3); // 3
```

- indexOf 메서드 : 대상 문자열에
- ┗ 특정 문자열이 존재하는지 확인할 때 유용함

```js
if (str.indexOf('Hello')!== -1) P{
    // 문자열 str에 포함되면 처리할 내용
}
```

- ES6에서 도입된 String.prototype.includes 메서드를 사용하면
- ┗ 가독성이 더 좋아짐

```js
if (str.includes('Hello')) {
	// 문자열 str에 'Hello'가 포함되면 처리할 내용
}
```

### 32.3.2 String.prototype.search

- search 메서드 : 대상 문자열에서
- ┣ `인수로 전달받은 정규 표현식과`
- ┣ 매치하는 문자열을 검색하여
- ┣ 일치하는 문자열의 인덱스를 반환함
- ┗ `검색에 실패하면 -1을 반환함`

```js
const str = 'Hello world';

// 문자열 str에서 정규 표현식과 매치하는
// 문자열을 검색하여 일치하는 문자열의
// 인덱스를 반환함
str.search(/o/); // 4
str.search(/x/); // -1
```

### 32.3.3 String.prototype.includes

- ES6에서 도입된 includes 메서드 :
- ┣ 대상 `문자열에 인수로 전달받은 문자열이`
- ┣ 포함되어 있는지 확인하여
- ┗ 그 결과를 true 또는 false로 반환함

```js
const str = 'Hello world';

str.includes('Hello'); // true
str.includes(''); // true
str.includes('x'); // false
```

- includes 메서드의 2번째 인수로 검색을 시작할
- ┗ 인덱스를 전달이 가능함

### 32.3.4 String.prototype.startsWith

- ES6에서 도입된 `startWith 메서드` :
- ┣ 대상 문자열이 인수로 전달받은 문자열로
- ┣ 시작하는지 확인하여
- ┗ `그 결과를 true 또는 false로 반환함`

```js
const str = 'Hello World';

// 문자열이 str이 'He'로 시자갛는지 확인
str.startsWith('He'); // true
```

- `startsWith` 메서드의 2번째 인수로 검색을 시작할
- ┗ 인덱스를 전달이 가능함

### 32.3.5 String.prototype.endsWith

- ES6에서 도입된 `endsWith 메서드` :
- ┣ 대상 문자열이 인수로 전달받은 문자열로
- ┗ 끝나는지 확이함

> true, false 반환

```js
const str = 'Hello world';

// 문자열이 ld로 끝나는지 확인
str.endsWith('ld'); // true
```

> endsWith 2번째 인수로 검색을 시작할 문자열의 길이 전달 가능

```js
// 문자열 str의 처음부터 5자리까지 ('Hello')가
// 'lo'로 끝나는지 확인함
str.endsWith('lo', 5); // true
```

### 32.3.6 String.prototype.charAt

- `charAt` 메서드 :
- ┣ `대상 문자열에서 인수로 전달받은 인덱스에 위치한`
- ┗ 문자열을 검색하여 반환함

```js
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
	console.log(str.charAt(i)); // H e l l o
}
```

- 인덱스는 문자열의 범위
- ┣ 즉 : 0 ~ (문자열의 길이 -1) 사이의 정수이어야 함
- ┣ 인덱스가 문자열의 범위를 벗어난 정수인 경우
- ┗ `빈 문자열을 반환`하게 됨

```js
// 인덱스가 문자열 범위를 벗어난 경우는
// -1을 반환함
str.charAt(5); // ''
```

### 32.3.7 String.prototype.substring

- substring 메서드 : 대상 문자열에서
- ┣ `첫 번째 인수로 전달받은 인덱스에 위치하는`
- ┣ 문자부터 `두 번째 인수로 전달받은 인덱스에`
- ┣ 위치하는 문자의 바로 이전 문자 까지의
- ┗ `부분 문자열을 반환함`

```js
const str = 'Hello World';

// 인덱스 1부터 인덱스 4 이전까지의 부분 문자열을 반환함
str.substring(1, 4); // ell
```

- `substring 두 번째 인수는 생략이 가능함`
- ┣ 이때 첫 번째 인수로 전달한 인덱스에 위치하는
- ┗ 문자부터 마지막 문자까지의 부분 문자열을 반환함

- substring 메서드의 첫 번째 인수는 두 번째 인수보다
- ┣ 작은 정수임
- ┗ 하지만 다음과 같이 인수를 전달하여도 정상 작동함

1. 첫 번째 인수 > 두 번째 인수인 경우 `두 인수는 교환됨`
2. 인수 < 0 또는 NaN인 경우 : `0으로 취급됨`
3. 인수 > 문자열의 길이(str.length)인 경우
   - ┗ `문자열의 길이(str.length)로 취급됨`

- String.prototype.indexOf 메서드와 함께 사용하면
- ┣ 특정 문자열을 기준으로 앞뒤에 위치한
- ┗ 부분 문자열을 취득할 수 있음

```js
const str = 'Hello world';

// 스페이스를 기준으로 앞에 있는 부분 문자열을 취득
str.substring(0, str.indexOf(' ')); // 'Hello'

// 스페이스를 기준으로 뒤에 있는 부분 문자열의 취득
str.substring(str.indexOf(' ') + 1, str.length); // "World"
```

### 32.3.8 String.prototype.slice

- slice 메서드는 `substring 메서드와 동일하게 동작함`
- ┣ 단 : slice 메서드에는 `음수값을 전달이 가능함`
- ┣ 음수인 인수를 전달하면
- ┣ 대상 문자열의 `가장 뒤에서부터 시작하여`
- ┗ `문자열을 잘라서 반환하게됨`

```js
const str = 'hello world';

// substring 메서드는 slice 메서드와 동일하게 동작함
// 0번째 부터 5번째 이전 문자까지 잘라내어 반환함
str.substring(0, 5); // 'hello'
str.slice(0, 5); // 'hello'
```

### 32.3.9 String.prototype.toUpperCase

- `toUpperCase` 메서드 :
- ┗ 대상 문자열을 모두 대문자로 변경한 문자열 반환

```js
const str = 'Hello world';

str.toUpperCase(); // 'HELLO WORLD';
```

### 32.3.10 String.prototype.toLowerCase

- toUpperCase와 반대로 동작함
- ┗ 대상 문자열을 모두 소문자로 변경한 문자열 반환

### 32.3.11 String.prototype.trim

- `trim 메서드` : 대상 문자열 앞뒤에
- ┣ 공백 문자가 있을 경우
- ┗ `이를 제거한 문자열을 반환함`

```js
const str = '   foo   ';
str.trim(); // 'foo'
```

- 21년 1월 현재 stage 4에 제안되어 있는
- ┣ `String.prototype.trimStart`
- ┣ `String.prototype.trimEnd`를 사용하면
- ┗ 앞 / 뒤 공백 문자를 제거한 문자열을 반환함

```js
const str = '   foo   ';

str.trimStart(); // 'foo   '
str.trimEnd(); // '   foo'
```

- `String.prototype.replace` 메서드에
- ┣ `정규 표현식을 인수로 전달하여`
- ┗ `공백 문자를 제거도 가능함`

```js
const str = '   foo  ';

// 첫 번째 인수로 전달한 정규 표현식에
// 매치하는 문자열을 두 번째 인수로 전달한
// 문자열로 치환됨
str.replace(/\s/g, ''); // 'foo'
str.replace(/^\s/g, ''); // 'foo   '
str.replace(/\s+$/g/, ''); // '   foo'
```

### 32.3.12 String.prototype.repeat

- ES6에서 도입된 `repeat 메서드` :
- ┣ 대상 문자열을 인수로 전달받은 정수만큼
- ┣ 반복해 연결한 `새로운 문자열을 반환함`
- ┣ 인수로 전달받은 정수가 0이면 → `빈 문자열 반환`
- ┣ `음수`일 경우 → `RangeError 발생`
- ┗ `인수를 생략`하면 `기본값 0이 설정됨`

```js
const str = 'abc';

str.repeat(); // ''
str.repeat(0); // ''
str.repeat(1); // 'abc'
str.repeat(2); // 'abcbac'
str.repeat(2.5); // 'abcabc' 2.5 → 2
str.repeat(-1); // RagneError
```
