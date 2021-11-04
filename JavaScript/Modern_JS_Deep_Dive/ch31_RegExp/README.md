# 31. RegExp

## 목차

- [31. RegExp](#31-regexp)
  - [31.1 정규 표현식이란?](#311-%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%B4%EB%9E%80)
  - [31.2 정규 표현식의 생성](#312-%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%98-%EC%83%9D%EC%84%B1)
  - [31.3 RegExp 메서드](#313-regexp-%EB%A9%94%EC%84%9C%EB%93%9C)
    - [31.3.1 RegExp.prototype.exec](#3131-regexpprototypeexec)
    - [31.3.2 RegExp.prototype.test](#3132-regexpprototypetest)
    - [31.3.3 String.prototype.match](#3133-stringprototypematch)
  - [31.4 플래그](#314-%ED%94%8C%EB%9E%98%EA%B7%B8)
  - [31.5 패턴](#315-%ED%8C%A8%ED%84%B4)
    - [31.5.1 문자열 검색](#3151-%EB%AC%B8%EC%9E%90%EC%97%B4-%EA%B2%80%EC%83%89)
    - [31.5.2 임의의 문자열 검색](#3152-%EC%9E%84%EC%9D%98%EC%9D%98-%EB%AC%B8%EC%9E%90%EC%97%B4-%EA%B2%80%EC%83%89)
    - [31.5.3 반복 검색](#3153-%EB%B0%98%EB%B3%B5-%EA%B2%80%EC%83%89)
    - [31.5.4 OR 검색](#3154-or-%EA%B2%80%EC%83%89)
      - [대소문자를 구별하지 않고 알파벳을 검색하는 방법](#%EB%8C%80%EC%86%8C%EB%AC%B8%EC%9E%90%EB%A5%BC-%EA%B5%AC%EB%B3%84%ED%95%98%EC%A7%80-%EC%95%8A%EA%B3%A0-%EC%95%8C%ED%8C%8C%EB%B2%B3%EC%9D%84-%EA%B2%80%EC%83%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
      - [숫자를 검색하는 방법](#%EC%88%AB%EC%9E%90%EB%A5%BC-%EA%B2%80%EC%83%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
    - [31.5.5 NOT 검색](#3155-not-%EA%B2%80%EC%83%89)
    - [31.4.6 시작 위치로 검색](#3146-%EC%8B%9C%EC%9E%91-%EC%9C%84%EC%B9%98%EB%A1%9C-%EA%B2%80%EC%83%89)
    - [31.5.7 마지막 위치로 검색](#3157-%EB%A7%88%EC%A7%80%EB%A7%89-%EC%9C%84%EC%B9%98%EB%A1%9C-%EA%B2%80%EC%83%89)
  - [31.6 자주 사용하는 정규 표현식](#316-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9D)
    - [31.6.1 특정 단어로 시작하는지 검사](#3161-%ED%8A%B9%EC%A0%95-%EB%8B%A8%EC%96%B4%EB%A1%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.2 특정 단어로 끝나는지 검사](#3162-%ED%8A%B9%EC%A0%95-%EB%8B%A8%EC%96%B4%EB%A1%9C-%EB%81%9D%EB%82%98%EB%8A%94%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.3 숫자로만 이루어진 문자열인지 검사](#3163-%EC%88%AB%EC%9E%90%EB%A1%9C%EB%A7%8C-%EC%9D%B4%EB%A3%A8%EC%96%B4%EC%A7%84-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%9D%B8%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.4 하나 이상의 공백으로 시작하는지 검사](#3164-%ED%95%98%EB%82%98-%EC%9D%B4%EC%83%81%EC%9D%98-%EA%B3%B5%EB%B0%B1%EC%9C%BC%EB%A1%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.5 아이디로 사용 가능한지 검사](#3165-%EC%95%84%EC%9D%B4%EB%94%94%EB%A1%9C-%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.6 메일 주소 형식에 맞는지 검사](#3166-%EB%A9%94%EC%9D%BC-%EC%A3%BC%EC%86%8C-%ED%98%95%EC%8B%9D%EC%97%90-%EB%A7%9E%EB%8A%94%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.7 핸드폰 번호 형식에 맞는지 검사](#3167-%ED%95%B8%EB%93%9C%ED%8F%B0-%EB%B2%88%ED%98%B8-%ED%98%95%EC%8B%9D%EC%97%90-%EB%A7%9E%EB%8A%94%EC%A7%80-%EA%B2%80%EC%82%AC)
    - [31.6.8 특수 문자 포함 여부 검사](#3168-%ED%8A%B9%EC%88%98-%EB%AC%B8%EC%9E%90-%ED%8F%AC%ED%95%A8-%EC%97%AC%EB%B6%80-%EA%B2%80%EC%82%AC)

## 31.1 정규 표현식이란?

- `정규 표현식(regular expression)` :
- ┣ 일정한 패턴을 가진 문자열의 집합을 표현하기 위해
- ┣ 사용하는 형식의 언어임
- ┣ 정규 표현식은 `JS의 고유 문법이 아니며`
- ┣ 대부분의 프로그래밍 언어와 에디터에 내장
- ┣ JS : 펄(Perl)의 정규 표현식 문법을
- ┗ `ES3 부터 도입`

- 정규 표현식 : 문자열을 대상으로
- ┣ 패턴 매칭 기능을 제공함
- ┣ `패턴 매칭 기능` :
- ┣ 특정 패턴과 일치하는 문자열을
- ┣ 1. `검색하거나`
- ┗ 2. `추출, 치환` 할 수 있는 기능을 뜻함

- EX ) 회원가입 화면에서
- ┣ 사용자로부터 입력받은 휴대폰 전화번호
- ┣ 유효성을 확인하는 경우를 생각
- ┣ 이를 정규 표현식으로 정의하고
- ┗ 패턴에 매칭하는지 확인이 가능함

```js
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의함
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트 함
regExp.test(tel); // false;
```

- 만약 정규표현식을 사용하지 않는다면
- ┣ 반복문, 조건문을 사용하여서 이를
- ┗ 검증해야함

- 정규 표현식을 사용하면 반복문과 조건문 제거 가능
- ┣ 그러나 주석이나 공백을 허용하지 않고
- ┣ 여러 가지 기호를 혼합하기 때문에
- ┗ 가독성이 좋지 않다는 단점을 가지고 있음

## 31.2 정규 표현식의 생성

- 정규 표현식 객체(RegExp 객체)를 생성하기 위해서
- ┣ 1. `정규 표현식 리터럴과`
- ┣ 2. `RegExp 생성자 함수`를 사용할 수 있음
- ┗ 일반적인 방법 : `정규표현식 리터럴`을 사용하는 것

```js
/regexp/i
1. 시작, 종료 기호
2. 패턴
3. 플래그(flag)
```

- 정규 표현식 리터럴의 경우
- ┗ 패턴, 플래그로 구성됨

```js
const target - 'Is this all there is?';

// 패턴 : is
// 플래그 : i → 대소문자를 구분하지 않고 검색
const regExp = /is/i;

// test 메서드 : target 문자열에 대해 정규 표현식
// regExp의 패턴을 검색하여
// 매칭 결과를 불리언 값으로 반환함
regExp.test(target); // true
```

> RegExp 생성자 함수를 사용하여 RegExp 객체를 생성도 가능

```js
/**
* pattern : 정규 표현식의 패턴
* flags : 정규 표현식의 플래그(g, i, m, u, y)
*/

new RegExp(pattern[, flags])
```

```js
const target = 'Is this all there is';

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp(is, 'i');

regexp.test(target);
true;
```

## 31.3 RegExp 메서드

- 정규 표현식을 사용하는 메서드
- ┣ 1. `RegExp.prototype.exec`
- ┣ 2. `RegExp.prototype.test`
- ┣ 3. `RegExp.prototype.match`
- ┣ 4. `RegExp.prototype.replace`
- ┣ 5. `RegExp.prototype.search`
- ┣ 6. `RegExp.prototype.split`
- ┗ 등이 존재함

> 여기서는

    RegExp.prototype.exec
    RegExp.prototype.test
    String.prototype.match 학습

### 31.3.1 RegExp.prototype.exec

- exec 메서드 :
- ┣ `인수로 전달받은 문자열`에 대해서
- ┣ `정규 표현식 패턴을 검색`하여
- ┗ 매칭 결과를 `배열로 반환함`

> 매칭 결과 없는 경우 : null 반환

```js
const target = 'Is this all right';
const regExp = /is/;

regExp.exec(target);
// ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

- exec 메서드 : `문자열 내의 모든 패턴을 검색하는`
- ┣ `g 플래그를 지정해도`
- ┗ `첫 번째 매칭 결과만 반환`하므로 주의 필요

### 31.3.2 RegExp.prototype.test

- test 메서드 : 인수로 전달받은 문자열에 대해
- ┣ `정규 표현식 패턴을 검색하여`
- ┗ 매칭 결과를 `불리언 값으로 반환함`

```js
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // true
```

### 31.3.3 String.prototype.match

- String `표준 빌트인 객체가 제공하는`
- ┣ match 메서드 :
- ┣ 대상 문자열과 인수로 전달받은
- ┣ `정규 표현식과의 매칭 결과를`
- ┗ `배열로 반환함`

```js
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp);
// ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

- `exec` 메서드 : 문자열 내의 모든 패턴을 검색하는
- ┣ g 플래그를 지정해도 첫 번째 매칭 결과만 반환함
- ┣ 하지만 `String.prototype.match 메서드는`
- ┗ `모든 매칭 결과를 배열로 반환하게 됨`

```js
const target = 'Is this all there is?';
const regExp = /is/g;

target.match(regExp); // ["is", "is"]
```

## 31.4 플래그

- 패턴과 함께 정규 표현식을 구성하는 플래그는
- ┣ `정규 표현식의 검색 방식을 설정하기 위해서 사용`
- ┣ 플래그는 총 6개가 존재함
- ┗ 그중 중요한 3개의 플래그를 학습

| 플래그 | 의미        | 설명                                                               |
| ------ | ----------- | ------------------------------------------------------------------ |
| i      | Ignore case | 대소문자를 구분하지 않고 패턴을 검색                               |
| g      | Global      | 대상 문자열 내에서 패턴과 일치하는 <br/> 모든 문자열을 전역 검색함 |
| m      | Multi line  | 문자열의 행이 바뀌더라도 <br/> 패턴 검색을 계속함                  |

- `플래그` : 옵션이므로 선택적으로 사용할 수 있으며
- ┣ `순서와 상관없이 하나 이상의 플래그를 동시에`
- ┣ `설정이 가능함`
- ┣ 어떠한 플래그를 사용하지 않는 경우
- ┣ `대소문자를 구분`하게 되며
- ┣ 문자열 검색 매칭 대상이 1개 이상 존재해도
- ┗ `첫 번째 매칭한 대상만 검색하고 종료함`

```js
const target = 'Is there all there is?';

// target 문자열에서 is 문자열을
// 대소문자를 구별하여 한 번만 검색함
target.match(/is/);

// target 문자열에서 is 문자열을 대소문자
// 구분하지 않고 한 번만 검색함
target.match(/is/i);

// target 문자열에서 is 문자열을
// 대소문자 구분하여 전역 검색함
target.match(/is/g);
// ["is", "is"]

// target 문자열에서 is 문자열을
// 대소문자를 구별하지 않고 전역 검색함
target.match(/is/gi);
//["Is", "is", "is"]
```

## 31.5 패턴

- 정규 표현식 : 일정한 규칙을 가진
- ┣ 문자열의 집합을 표현하기 위해 사용하는 언어
- ┗ 정규 표현식 : `패턴과 플래그로 구성됨`

> 패턴, 플래그

    패턴 : 문자열의 일정한 규칙을
    ┗ 표현하기 위해서 사용됨
    플래그 : 정규 표현식의
    ┗ 검색 방식을 설정하기 위해 사용

- 패턴 : `/`로 열고 닫으며
- ┣ 문자열의 따옴표는 생략하게 됨
- ┣ `따옴표를 포함하면` : 따옴표 까지
- ┗ `패턴에 포함시켜서 검색하게 됨`

- ┣ 계속해서 `패턴은 특별한 의미를 가지는`
- ┣ `메타문자(meta character) 또는 기호로`
- ┣ 표현이 가능함
- ┣ 어떤 문자열 내에 `패턴과 일치하는 문자열`이
- ┣ 존재하는 경우 → 정규 표현식과 매치된다고 표현
- ┗ 패턴을 표현하는 몇 가지 방법에 대해 학습

### 31.5.1 문자열 검색

- 정규 표현식 : 패턴에 문자 또는 문자열을 지정하면
- ┣ 검색 대상 문자열에서
- ┣ 패턴으로 지정한 문자 또는 문자열을 검색함
- ┣ 물론 정규 표현식을 생성하는 것만으로는
- ┗ `검색이 수행되는 것은 아님`
- 앞서 살펴본 RegExp 메서드를 사용해서
- ┣ 검색 대상 문자열과 정규 표현식의
- ┗ 매칭 결과를 구하면 검색이 시작됨

- 검색 대상 문자열과 플래그를 생략한
- ┣ 정규 표현식의 매칭 결과를 구하면
- ┣ 대소문자를 구별하여 정규 표현식과 매칭한
- ┗ `첫 번째 결과만 반환하게 됨`

```js
const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴.
// 플래그가 생략되었으므로 대소문자를 구별함
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트함
regExp.test(target); // true

// target과 정규 표현식의 매칭 결과를 구함
target.match(regExp);
```

> 대소문자를 구별하지 않고 검색하기 위해서는
> 플래그 i를 사용함

```js
const target = 'Is there all there is?';

// 'is' 문자열과 매치하는 패턴.
// 플래그 i를 추가하면
// 대소문자를 구별하지 않음
const regExp = /is/i;

target.match(regExp);
// ["Is", index: 0, input: "Is there all there is?", groups: undefined]
```

- 검색 대상 문자열 내에서 `패턴과 일치하는 모든 문자열을`
- ┗ 전역으로 검색하기 위해서는 플래그 : g를 사용

```js
const target = 'Is there all there is?';

// 'is'문자열과 매치하는 패턴
// 플래그 g를 사용하면 대상 문자열 내에서
// 패턴과 일치하는 모든 문자열을 전역 검색함

const regExp = /is/gi;

target.match(regExp); //
```

### 31.5.2 임의의 문자열 검색

- . : 임의의 문자 한 개를 의미함
- ┣ `문자의 내용은 무엇이든 상관없음`
- ┣ 다음 예제의 경우 . 을 연속하여
- ┣ 패턴을 생성했기 때문에 → `문자의 내용과 무관하게`
- ┗ `상관없이 3자리 문자열과 매치함`

```js
const target = 'Is there all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색
const regExp = /.../g;

target.match(regExp); // ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 31.5.3 반복 검색

- {m,n}은 앞선 패턴(다음 예제 : A)이
- ┣ `최소 m번, 최대 n번`
- ┣ `반복되는 문자열`을 의미함
- ┣ 콤마 뒤에 공백이 있을 겨웅
- ┣ 제대로 동작하지 않기 때문에
- ┗ 사용에 주의 요함

```js
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역검색
const regExp = /A{1,2}/g;

target.match(regExp); // ["A", "AA", "A", "AA", "A"]
```

> {n}은 앞선 패턴 n번 반복되는 문자열을 뜻함

    {n} 은 {n,n}과 같음

```js
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색함
const regExp = /A{2}/g;

target.match(regExp); // ["AA", "AA"]
```

- {n,} : 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미

```js
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색함
const regExp = /A{2,}/g;

target.match(regExp); // ["AA", "AAA"]
```

- ┣ `+ : 앞선 패턴이 최소 한번 이상`
- ┣ `반복되는 문자열을 의미함`
- ┣ 즉 : + 의 경우 `{1,}과 같다고 볼 수 있음`
- ┣ 다음 예제의 경우 A+는 앞선 패턴
- ┣ 'A'가 한번 이상 반복되는 문자열
- ┗ 즉 'A'로만 이루어진 문자열 'A', 'AA', 'AAA'만을 반환

```js
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색함
const regExp = /A+/g;

target.match(regExp); // ["A", "AA", "AAA"]
```

- ┣ `?` : 앞선 패턴이 최대 한 번(0번 이상) 반복되는
- ┣ 문자열을 의미함
- ┣ 즉 : `? 는 {0,1}과 같음`
- ┣ 다음 예제의 경우 /color?r/ 는 'colo' 다음
- ┣ 'u'가 최대 한 번(0번 이상) 반복되고
- ┗ 'r'과 이어지는 문자열 'color', 'colour'와 매치

```js
const target = 'color colour';

// 'colo'다음 'u'가 최대 한 번(0번 이상) 반복되고
// 'r'과 이어지는 문자열을 전역 검색함
const regExp = /colou?r/g;

target.match(regExp); // ["color", "colour"]
```

### 31.5.4 OR 검색

- `|` : or의 의미를 가짐
- ┣ 다음 예제의 경우
- ┗ `/A|B/는 'A' 또는 'B'를 의미함`

```js
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'를 전역 검색함
const regExp = /A|B/g;

target.match(regExp); // ["A", "A", "A", "B", "B", "B", "A", "B"]
```

- 분해되지 않은 단어 레벨로 검색하기 위해서는
- ┗ `+`와 함께 사용함

```js
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색함
// 'A', 'AA', 'AAA', 'B', 'BB', 'BBB'
const regExp = /A+|B+/g;

target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

- 위 예제 : 패턴을 or로 한 번 이상 반복하는 것 이므로
- ┣ 간단하게 표현하면 다음과 같음
- ┣ `[]`내의 문자는 `or로 동작함`
- ┣ 그 뒤에 `+`를 사용하면
- ┗ `앞선 패턴을 한 번 이상 반복함`

```js
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색함
// 'A', 'AA', 'AAA', 'B', 'BB', 'BBB'
const regExp = /[AB]+/g;

target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

- 범위를 지정하기 위해서는 `[]`내에
- ┣ `-`를 사용함
- ┗ 다음 예제의 경우 `대문자 알파벳을 검색함`

```js
const target = 'A AA BB ZZ Aa Bb';

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색함
// 'A', 'AA', 'AAA', 'B', 'BB', 'BBB', 'Z', 'ZZ', 'ZZZ'
const regExp = /[A-Z]+/g;

target.match(regExp); // ["A", "AA", "BB", "ZZ", "A", "B"]
```

#### 대소문자를 구별하지 않고 알파벳을 검색하는 방법

```js
const target = 'AA BB Aa Bb 12';

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색함
const regExp = /[A-Za-z]+/g;

target.match(regExp); // ["AA", "BB", "Aa", "Bb"]
```

#### 숫자를 검색하는 방법

```js
const target = 'AA BB 12,345';

// '0' ~ '9'가 한 번 이상 반복되는 문자열을
// 전역 검색함
const regExp = /[0-9]+/g;

target.match(regExp); // ["12", "345"]
```

- 위 예제를 간단히 표현하면 다음과 같음
- ┣ `\d` : 숫자를 의미함
- ┣ 즉 : `\d` : `[0-9]`와 같음
- ┣ `\D` 는 `\d`와 반대로 동작함
- ┗ 즉 : `\D`는 숫자가 아닌 문자를 의미함

```js
const target = 'AA BB 12,345';

// '0' ~ '9' 또는 ',' 한 번 이상 반복되는 문자열을
// 전역 검색함
const regExp = /[\d,]+/g;

target.match(regExp); // ["12,345"]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자)
// 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색함
regExp = /[\D,]+/g;

target.match(regExp); // ["AA BB", ","]
```

- `\w` : 알파벳, 숫자, 언더스코어 의미
- ┣ 즉 : \w 의 경우
- ┣ [A-Za-z0-9_]와 같음
- ┣ `\W` : `\w`와 `반대로 동작함`
- ┗ 즉 : `\W는 알파벳, 숫자, 언더스코어가 아닌 문자`

```js
const target = 'Aa Bb 12,345 _$%&';

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상
// 반복되는 문자열을 전역검색함
let regExp = /[\w,]+/g;

target.match(regExp); // ["Aa", "Bb", '12,345", "_"]

// 알파벳, 숫자, 언더 스코어 아닌 문자 또는
// ","가 한 번 이상 반복되는 문자열을 전역 검색함
regExp = /[\W,]+/g;

target.match(regExp); //[" ", " ", ",", "$%&"]
```

### 31.5.5 NOT 검색

- [...]내의 `^`은 not의 의미를 가짐
- ┣ 예를 들어 [^0-9]는 숫자를 제외한 문자를 의미함
- ┣ [0-9]와 같은 의미의 `\d`와 반대로 동작하는
- ┣ `\D`는 `[^0-9]`와 같고
- ┣ `[A-Za-Z0-9_]`와 같은 의미의 `\w`
- ┗ 반대로 동작하는 `\W`는 [^a-za-z0-9_]와 같음

```js
const target = 'AA BB 12 Aa Bb';

// 숫자를 제외한 문자열을 전역 검색함
const regExp = /[^0-9]+/g;

target.match(regExp); // ["AA BB Aa Bb"]
```

### 31.4.6 시작 위치로 검색

- [...]밖의 `^` : 문자열의 시작을 의미함
- ┣ 단 : [...] 내의 `^` : not의 의미를 가지므로
- ┗ 주의해서 사용해야 함

```js
const target = 'https://google.com';

// 'https'로 시작하는지 검사함
const regExp = /^https/;

regExp.test(target); // true
```

### 31.5.7 마지막 위치로 검색

- `$` : 문자열의 마지막을 나타냄

```js
const target = 'https/google.com';

// 'com'으로 끝나는지 검사함
const regExp = /com$/;

regExp.test(target); // true
```

## 31.6 자주 사용하는 정규 표현식

### 31.6.1 특정 단어로 시작하는지 검사

- 다음 예제 : 검색 대상 문자열이
- ┣ 'http', 'https'로 시작하는지 검사함
- ┣ [...] 밖의 `^` : 문자열의 시작을 의미하고
- ┣ `?` : 앞선 패턴(다음 예제에서 's')가
- ┣ 최대 한 번(0번 포함)이상 포함되는지를 의미
- ┣ 다시 말해 → 검색 대상 문자열에 앞선 패턴
- ┗ `'s'`이 있거나 없거나 검색됨

```js
const url = 'https//google.com';

// http, https로 시작되는지 검사함
/^https?:\/\//.test(url); // true
```

- 다음 방법도 동일하게 동작함

```js
/^(http|https):\/\//.test(url); // true
```

### 31.6.2 특정 단어로 끝나는지 검사

- 다음 예제는 검색 대상 문자열이
- ┣ html로 끝나는지 검색
- ┗ `$` : 문자열의 마지막을 의미함

```js
const fileName = 'index.html';

// 'html'로 끝나는지 검사함
/html%/.test(fileName); // true
```

### 31.6.3 숫자로만 이루어진 문자열인지 검사

- 다음 예제는 검색 대상 문자열이 숫자로만
- ┗ 이루어진 문자열인지 검사함

- [...] 바깥의 `^` :
- ┣ 문자열의 시작을
- ┣ `$` : 문자열의 마지막을 의미
- ┣ `\d` : 숫자를 의미
- ┣ `+` : 앞선 패턴이 최소 한 번 이상
- ┣ 반복되는 문자열을 의미
- ┣ 즉 : 처음과 끝이 숫자이고
- ┗ 최소 한 번 이상 반복되는 문자열과 매치

```js
const target = '12345';

// 숫자로만 이루어진 문자열인지 검사함
/^\d+$/.test(target); // true
```

### 31.6.4 하나 이상의 공백으로 시작하는지 검사

- 다음 예제는 검색 대상 문자열이
- ┣ 하나 이상의 공백으로 시작하는지 검사함
- ┣ `\s`는 여러 가지 공백 문자(스페이스, 탭등)을 의미함
- ┗ 즉 : `\s` : [\t\r\n\v\f] 과 같은 의미

```js
const target = '  Hi!';

// 하나 이상의 공백으로 시작하는지 검사함
/^[\s]+/.test(target); // true
```

### 31.6.5 아이디로 사용 가능한지 검사

- 다음 예제는 검색 대상 문자열이 알파벳 대소문자 또는
- ┣ 숫자로 시작하고 끝나며 4 ~ 10 자리 인지 검사함
- ┣ {4,10}은 앞선 패턴(알파벳 대문자 또는 숫자)이
- ┣ `최소 4번, 최대 10번 이상 반복되는 문자열을 의미함`
- ┗ 즉 : 4 ~ 10자리로 이루어진 알파벳 또는 대소문자 또는 숫자를 의미

```js
const id = 'ww8007';

// 알파벳 대소문자 또는 숫자로 시작하고
// 끝나며 4 ~ 10 자리인지 검사함
/^[A-Za-z0-9]{4,10}$/.test(id); // true
```

### 31.6.6 메일 주소 형식에 맞는지 검사

- 다음 예제 : 검색 대상 문자열이 메일 주소 형식에 맞는지 검사

```js
const email = 'wshmin@naver.com';

/^[0-9a-zA-Z]([-_\.]?[0-09-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
	email
);
```

- `인터넷 메시지 형식(internet message) 규약`인
- ┣ `RFC 5322`에 맞는 정교한 패턴 매칭이 필요한 경우
- ┗ 무척이나 복잡한 패턴을 사용할 필요가 있음

### 31.6.7 핸드폰 번호 형식에 맞는지 검사

- 다음 예제 : 검색 대상 문자열이 핸드폰 번호
- ┗ 형식에 맞는지 검사함

```js
const cellphone = '010-1234-5678';

/^\d{3}-\d{4}-\d{4}$/.test(cellphone); // true
```

### 31.6.8 특수 문자 포함 여부 검사

- 다음 예제 : 검색 대상 문자열에 특수 문자가
- ┣ 포함되어 있는지 검사함
- ┗ 특수 문자 : `A-Za-z0-9` 이외의 문자임

```js
const target = 'abc#123';

/[^A-Za-z0-9])/gi.test(target); // true
```

- 특수문자를 제거할 때는 `String.prototype.replace` 메서드를 사용

```js
// 특수 문자를 제거함
target.replace(/[^A-Za-z0-9]/gi, ''); // abc123
```
